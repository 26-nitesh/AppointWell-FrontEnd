import { TableHead } from "@material-ui/core";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from "react";
import { getAppointMentByHospital } from "../Service/commonService";

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


const AppointMentList = (props) =>{
    const classes = useStyles();
    console.log(props.data);
    const [showVerifyWithAgency, setShowVerifyWithAgency] = useState(true);
    const [appList, setAppList] = React.useState([])


    React.useEffect(()=>{
        async function fetchData() {
          const response = await  getAppointMentByHospital(props.data,false);
            if(response!=null){
                setAppList(response)
               }
        }
        fetchData();
      }, []);
    const verifyWithAgency = () =>{

    //    updateVerifiedAtHospital
        setShowVerifyWithAgency(false) 
    }
    return(
        <>
            <div className={classes.listContainer}>
        <Typography variant="subtitle1" className={classes.listTitle} style={{fontSize:'32px'}}>
          List of Appointments
        </Typography>
      </div>
      <TableContainer component={Paper} style={{ marginTop: '30px', width: '80%' ,margin: 'auto' }}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow className={classes.tableHead}>
              <TableCell sx={{ fontWeight: 'bold' ,fontSize: '20px' }}>Employee Email</TableCell>
              <TableCell sx={{ fontWeight: 'bold' ,fontSize: '20px' }}>Date Of AppointMent</TableCell>
              <TableCell sx={{ fontWeight: 'bold' ,fontSize: '20px' }}>Status</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {appList.map((appointment)=>(
        <>
        <TableRow key={appointment.appointmentId}>
                <TableCell style={{ fontWeight: 'bold', fontSize: '15px' }}><Button variant="text"  sx={{ textTransform: 'none' }}>{appointment.employeeEmail}</Button></TableCell>
                <TableCell style={{ fontWeight: 'bold', fontSize: '15px' }}>{appointment.appointmentDate}</TableCell>
                <TableCell style={{  fontSize: '15px' }}>{appointment.status}</TableCell>
              <TableCell> {showVerifyWithAgency? <Button variant="text" style={{textTransform:'none'}} onClick={verifyWithAgency}>verify with Agency</Button>:<></>}</TableCell>
              </TableRow>
        </>
          ))}
          </TableBody>
          </Table>
          </TableContainer>
        </>
    )

}
export default AppointMentList;