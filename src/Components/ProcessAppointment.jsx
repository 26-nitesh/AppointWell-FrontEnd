import React, { useEffect, useState } from 'react';
import { createAppointMent, getAllHospitalsForOrg } from '../Service/commonService';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';



const useStyles = makeStyles({
    table: {
        minWidth: 650,
        '& tbody tr:hover': {
          backgroundColor: '#f6fff2',
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

})


const ProcessAppointment = (props) =>{
    const classes = useStyles();
    const[selectedHosp, setSelectedHosp] = useState('');
    const [openDialog, setopenDialog] = useState(false);
    const [hospitals, sethospitals] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [sucessMessage, setSucessMessage] = useState(null);
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
}
const handleSaveAppointment = async()=>{
    setopenDialog(false)
    const response = await createAppointMent(props.email,selectedHosp,selectedDate);
    if(response.status==='200'){
        alert(response.message)
        setErrorMessage(null);
        setSucessMessage(response.message);
    }else {
        alert(response.message)
        setSucessMessage(null)
        setErrorMessage(response.message);
    }
    console.log(response);
    // setopenDialog(false)
}
    return(
        <>
        {/* {sucessMessage && <MyAlert severity="success" message={sucessMessage}/>}
        {errorMessage && <MyAlert severity="error" message={errorMessage}/>} */}
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
            {hospitals.map((hospital) =>(
                <>
                <TableRow key={hospital.hospitalId}>
                <TableCell style={{ fontWeight: 'bold', fontSize: '15px' }}><Button variant="text"  sx={{ textTransform: 'none' }} >{hospital.hospitalEmail}</Button></TableCell>
                <TableCell style={{ fontWeight: 'bold', fontSize: '15px' }}>{hospital.hospitalName}</TableCell>
                <TableCell><Button variant="contained" onClick={() => handleAddappointment(hospital.hospitalEmail)}>Book</Button></TableCell>
              </TableRow>
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
          <Button onClick={handleSaveAppointment}>Confirm</Button>
        </DialogActions>
              </Dialog>}
                </>
            ))}
          </TableBody>
         </Table>
          </TableContainer>
        </>
    )
}

export default ProcessAppointment;