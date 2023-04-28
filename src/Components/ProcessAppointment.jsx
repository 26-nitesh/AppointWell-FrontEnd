import React, { useEffect, useState } from 'react';
import { createAppointMent, getAllHospitalsForOrg } from '../Service/commonService';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { TablePagination } from '@material-ui/core';
import { findHospitalByEmail } from '../Service/EmployeeService';



const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
        '& tbody tr:hover': {
          backgroundColor: '#f6fff2',
        },
      },
      card: {
        minWidth: 400,
        maxWidth: 700,
        // minHeight:400,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[4],
        [theme.breakpoints.up('md')]: {
          padding: theme.spacing(4),
        },
      },
      tableHead: {
        backgroundColor: '#f6fff2',
        fontWeight: 'bold',
        fontSize: '24px',
      },
      listContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: '50px',
      },
      listTitle: {
        fontWeight: 'bold',
        fontSize: '32px',
        marginBottom: '20px',
      },

}));


const ProcessAppointment = (props) =>{
    const classes = useStyles();
    const[selectedHosp, setSelectedHosp] = useState('');
    const [openDialog, setopenDialog] = useState(false);
    const [hospitals, sethospitals] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [sucessMessage, setSucessMessage] = useState(null);
    const [selectedEmailForAddInfo, setSelectedEmailForAddInfo] = useState(null);
    const [hospitalForAddInfo, setHospitalForAddInfo] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const[openDialogForResponse,setopenDialogForResponse] = useState(false)
    React.useEffect(()=>{
        async function getAllHospitals() {

            // console.log(props.comapnyEmail);
            const response = await getAllHospitalsForOrg(props.comapnyEmail);
            if(response!=null){
                sethospitals(response)
            }
            console.log(response);
        //   const response = await getEmp(compEmail);
        //     // setOrgDetails(response.data.data)
        //     setName(response.data.data.empName);
        }
        getAllHospitals();
      }, []);

const handleAddappointment = (hospialEmail)=>{
    setSelectedHosp(hospialEmail)
    setopenDialog(true)

}
const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

const handleDialogClose = ()=>{
    setopenDialog(false)
    setopenDialogForResponse(false)
}
const handleSaveAppointment = async()=>{
    setopenDialog(false)
    const response = await createAppointMent(props.email,selectedHosp,selectedDate);
    if(response.status==='200'){
        // alert(response.message)
        setErrorMessage(null);
        setSucessMessage(response.message);
        setopenDialogForResponse(true)

    }else {
        setSucessMessage(null)
        setErrorMessage(response.message);
        setopenDialogForResponse(true)

    }
    console.log(response);
    // setopenDialog(false)
}
const handleHospitalClick = async(email) =>{
  if(selectedEmailForAddInfo===email)
  setSelectedEmailForAddInfo(null)
  else{
    const hosp = await findHospitalByEmail(email);
  if(hosp!=null){
      setSelectedEmailForAddInfo(email);
      setHospitalForAddInfo(hosp)
  }
  }
  // console.log(agency);
}
    return(
        <>
       <Dialog open={openDialogForResponse} onClose={handleDialogClose}>
       <Card  className={classes.card}>
        {sucessMessage &&(
          <Alert severity="success">Hurrah ! Appointment booked</Alert> )}
        {errorMessage && (
        <Alert severity="error">You Already have an on going transaction</Alert>)}
        <DialogActions>
          <Button variant='contained' onClick={handleDialogClose}>OK </Button>
        </DialogActions>
       </Card>
       </Dialog>
          <div className={classes.listContainer}>
        <Typography variant="subtitle1" className={classes.listTitle} style={{fontSize:'32px'}}>
          List of Available Hospitals
        </Typography>
      </div>
          <TableContainer component={Paper} style={{ marginTop: '30px', width: '80%' ,margin: 'auto' }}>
          <Table className={classes.table}>
          <TableHead>
            <TableRow className={classes.tableHead}>
            <TableCell sx={{ fontWeight: 'bold' ,fontSize: '20px' }}>hospial Email</TableCell>
              <TableCell sx={{ fontWeight: 'bold' ,fontSize: '20px' }}>hospital Name</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {  (rowsPerPage > 0
                    ? hospitals.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : hospitals
                ).map((hospital) =>(
                <>
                <TableRow key={hospital.hospitalId}>
                <TableCell style={{ fontWeight: 'bold', fontSize: '15px' }}><Button variant="text"  sx={{ textTransform: 'none' }}  onClick={() => handleHospitalClick(hospital.hospitalEmail)}  >{hospital.hospitalEmail}</Button></TableCell>
                <TableCell style={{ fontWeight: 'bold', fontSize: '15px' }}>{hospital.hospitalName}</TableCell>
                <TableCell><Button variant="contained" onClick={() => handleAddappointment(hospital.hospitalEmail)}>Book</Button></TableCell>
              </TableRow>
              {selectedEmailForAddInfo && selectedEmailForAddInfo ===hospital.hospitalEmail && <TableRow> 
    <TableCell colSpan={3}>
      <div style={{ paddingLeft: '32px' }}>
        <Typography variant="subtitle1" style={{ color: '#666666' }}>
          <strong>Name:</strong> {hospitalForAddInfo.hospitalName}
        </Typography>
        <Typography variant="subtitle1" style={{ color: '#666666', marginTop: '8px' }}>
          <strong>Address:</strong> {hospitalForAddInfo.addLine1}  {hospitalForAddInfo.city}  {hospitalForAddInfo.zip}
        </Typography>
      </div>
    </TableCell>
    </TableRow>}
           {selectedHosp=== hospital.hospitalEmail&& <Dialog open={openDialog} onClose={handleDialogClose}>
           <DialogTitle>Select Date and Book Appointment</DialogTitle>
        {/* <DialogContent> */}
          <div style={{margin: 'auto'}}>
          <TextField
  label="Select Date"
  type="date"

  value={selectedDate}
  onChange={handleDateChange}
  InputLabelProps={{
    shrink: true,
  }}
  style={{padding:'5px' }} // Add this style property
/>
          </div>
        {/* </DialogContent> */}
        <DialogActions>
          <Button onClick={handleDialogClose} >Cancel</Button>
          <Button  onClick={handleSaveAppointment}>Confirm</Button>
        </DialogActions>
              </Dialog>}
                </>
            ))}
          </TableBody>
         </Table>
         <TablePagination
  rowsPerPageOptions={[5, 10, 25]}
  component="div"
  count={hospitals.length}
  rowsPerPage={rowsPerPage}
  page={page}
  onPageChange={(event, newPage) => {
    setPage(newPage);
  }}
  onRowsPerPageChange={(event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }}
/>
          </TableContainer>
        </>
    )
}

export default ProcessAppointment;