import React, { useState } from "react";
import { getAppointmentsByEmployee } from "../Service/EmployeeService";
import { Alert, AlertTitle, Button, Dialog, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { makeStyles } from '@material-ui/core/styles';

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
   
});

const EmpViewAppointMent = (props) =>{
  const classes = useStyles();

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
    return(
        <>
        <TableContainer component={Paper} style={{ marginTop: '30px' ,margin: 'auto', }}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow className={classes.tableHead} style={{whiteSpace: 'nowrap'}}>
              <TableCell sx={{ fontWeight: 'bold' ,fontSize: '18px' }}>AppointMent ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold' ,fontSize: '18px' }}>hospital</TableCell>
              <TableCell sx={{ fontWeight: 'bold' ,fontSize: '18px' }}>Booking Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold' ,fontSize: '18px' }}>Appointment Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold' ,fontSize: '18px' }}>status</TableCell>
              <TableCell sx={{ fontWeight: 'bold' ,fontSize: '18px' }}>remarks</TableCell>
              <TableCell></TableCell>
              </TableRow>
              </TableHead>
              <TableBody>
            {appointments.map((app)=>(
                <>
                <TableRow key={app.appintmentId} style={{height:'5px', whiteSpace: 'nowrap'}}>
                <TableCell style={{ fontWeight: 'bold', fontSize: '15px'}}>{app.appintmentId}</TableCell>
              <TableCell style={{ fontSize: '15px'}}>{app.hospitalEmail}</TableCell>
              <TableCell style={{ fontSize: '15px'}}>{app.bookingDate}</TableCell>
              <TableCell style={{ fontSize: '15px'}}>{app.appointmentDate}</TableCell>
              <TableCell style={{ fontSize: '15px', color: app.status === 'completed' ? 'green' : app.status === 'rejected' ? 'red' : 'black' }}>{app.status}</TableCell>
               <TableCell style={{ fontSize: '15px'}}>{app.remarks}</TableCell>
               <TableCell style={{ fontSize: '15px'}}>
        <Button disabled={app.status !== 'completed'}>See Report</Button>
      </TableCell>
               
                {/* <TableCell style={{  fontSize: '15px'}}>{claim.claimDate}</TableCell>  */}
                </TableRow>
                </>
            ))}
            </TableBody>
              </Table>
              </TableContainer>
        </>
    )
}
export default EmpViewAppointMent;