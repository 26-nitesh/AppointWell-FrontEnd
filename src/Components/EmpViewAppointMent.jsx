import React, { useState } from "react";
import { getAppointmentsByEmployee } from "../Service/EmployeeService";
import { Alert, AlertTitle, Button, Card, Dialog, DialogActions, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { makeStyles } from '@material-ui/core/styles';
import { TablePagination } from "@material-ui/core";
import { getReportById } from "../Service/reportService";
import logo from '../logo.png';

const useStyles = makeStyles((theme) => ({
  table: {
      minWidth: 650,
      '& tbody tr:hover': {
        backgroundColor: '#f6fff2',
      },
    },
    logo: {
      marginRight: theme.spacing(2),
      height: 70, 
      // width: 80,
      // borderRadius: '100%', 
      objectFit: 'cover',
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

const EmpViewAppointMent = (props) =>{
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const[reportGenerated,setReportGenerated]= useState({});
  const[openReportDialog,setOpenReportDialog] = useState(false);
  const[selectedAppId,setSelectedAppId] = useState(null)//selectedAppId
    const [appointments, setAppointments] = useState([]);
    React.useEffect(()=>{
        async function fetchData() {
      const apps =   await getAppointmentsByEmployee(props.email);
      console.log(apps);
        if(apps!=null)
        setAppointments(apps);
        }
        fetchData();
      }, []);

const handleDialogClose=  ()=>{
setOpenReportDialog(false)
}

      const handleSeeReport = async(appId) =>{
        setSelectedAppId(appId)
      const report = await  getReportById(appId)
      // console.log(report);
      if(report.HttpStatus===200){
        // console.log(report.data.reportDetails          );
        setReportGenerated(report.data);
        setOpenReportDialog(true);
      }
        // console.log("view Report");
        // console.log(report);
      }

      const handleDownloadReport = () => {
        const binaryData = reportGenerated.reportFileData; // Assuming the binary data is already available as a string
      
        // Decode the Base64-encoded string to obtain the binary data
        const decodedData = atob(binaryData);
      
        const uint8Array = new Uint8Array(decodedData.length);
        for (let i = 0; i < decodedData.length; i++) {
          uint8Array[i] = decodedData.charCodeAt(i);
        }
      
        const blob = new Blob([uint8Array], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
      
        const link = document.createElement('a');
        link.href = url;
        link.download = reportGenerated.appointmentId+'_checkup_report.pdf';
        link.click();
      
        URL.revokeObjectURL(url);
      };
      

    return(
        <>
        <TableContainer component={Paper} style={{ marginTop: '30px' ,margin: 'auto', }}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow className={classes.tableHead} style={{whiteSpace: 'nowrap'}}>
              <TableCell sx={{ fontWeight: 'bold' ,fontSize: '18px' }}>AppointMent ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold' ,fontSize: '18px' }}>Hospital</TableCell>
              <TableCell sx={{ fontWeight: 'bold' ,fontSize: '18px' }}>Booking Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold' ,fontSize: '18px' }}>Appointment Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold' ,fontSize: '18px' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold' ,fontSize: '18px' }}>Remarks</TableCell>
              <TableCell></TableCell>
              </TableRow>
              </TableHead>
              <TableBody>
              {  (rowsPerPage > 0
                    ? appointments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : appointments
                ).map((app)=>(
                <>
                <TableRow key={app.appintmentId} style={{height:'5px', whiteSpace: 'nowrap'}}>
                <TableCell style={{ fontWeight: 'bold', fontSize: '15px'}}>{app.appintmentId}</TableCell>
              <TableCell style={{ fontSize: '15px'}}>{app.hospitalEmail}</TableCell>
              <TableCell style={{ fontSize: '15px'}}>{app.bookingDate}</TableCell>
              <TableCell style={{ fontSize: '15px'}}>{app.appointmentDate}</TableCell>
              <TableCell style={{ fontWeight: 'bold', fontSize: '15px', color: app.status === 'completed' ? 'green' : app.status === 'rejected' ? 'red' : 'black' }}>{app.status.toUpperCase()}</TableCell>
               <TableCell style={{ fontSize: '15px'}}>{app.remarks}</TableCell>
               <TableCell style={{ fontSize: '15px'}}>
        <Button disabled={app.status !== 'completed'} onClick={()=>{handleSeeReport(app.appintmentId)}}>See Report</Button>
      </TableCell>
      {selectedAppId===app.appintmentId &&
       <Dialog open={openReportDialog} onClose={handleDialogClose}> 
       <Card  className={classes.card}>
       <img src={logo} alt="Logo" className={classes.logo} />

       <Typography variant="subtitle1" style={{ color: '#666666' }}>
          <strong>Appointment Id:</strong>  {reportGenerated.appointmentId}
        </Typography>

        <Typography variant="subtitle1"  style={{ color: '#666666' }}>
          <strong>Date of Appointment :</strong>  {reportGenerated.appointmentDate}
        </Typography>

        <Typography variant="subtitle1"  style={{ color: '#666666' }}>
          <strong>Details :</strong>  {reportGenerated.reportDetails}
        </Typography>
        <Typography variant="subtitle1"  style={{ color: '#666666' }}>
          <strong>Remarks :</strong>  {reportGenerated.remarks}
        </Typography>

        <DialogActions>
<Button variant="contained" style={{backgroundColor:'#00087d',textTransform:'none'}} onClick={handleDownloadReport}>Download Report</Button>
<Button variant="contained" style={{backgroundColor:'#e8021d',textTransform:'none'}} onClick={handleDialogClose}>Cancel</Button>


</DialogActions>
       </Card>
      </Dialog>}
                {/* <TableCell style={{  fontSize: '15px'}}>{claim.claimDate}</TableCell>  */}
                </TableRow>
                </>
            ))}
            </TableBody>
              </Table>
              <TablePagination
  rowsPerPageOptions={[5, 10, 25]}
  component="div"
  count={appointments.length}
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
export default EmpViewAppointMent;