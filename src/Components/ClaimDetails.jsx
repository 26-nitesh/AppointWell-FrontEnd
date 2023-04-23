import React, { useState } from "react";
import { getClaimRecords } from "../Service/ClaimService";
import { Alert, AlertTitle, Button, Dialog, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
    table: {
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

const ClaimDetails = (props) =>{
    const [claims, setClaims] = useState([]);
    const classes = useStyles();
    React.useEffect(()=>{
        async function fetchData() {
      const claims =   await getClaimRecords(props.agencyEmail);
      setClaims(claims);
        }
        fetchData();
      }, []);
    return(
        <>
          <div className={classes.listContainer}>
        <Typography variant="subtitle1" className={classes.listTitle} style={{fontSize:'32px'}}>
          Appointment And their Claims
        </Typography>
      </div>
      <TableContainer component={Paper} style={{ marginTop: '30px', width: '100%' ,margin: 'auto' }}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow className={classes.tableHead}>
              <TableCell sx={{ fontWeight: 'bold' ,fontSize: '20px' }}>hospital Email</TableCell>
              <TableCell sx={{ fontWeight: 'bold' ,fontSize: '20px' }}>hospital Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' ,fontSize: '20px' }}>employee Email</TableCell>
              <TableCell sx={{ fontWeight: 'bold' ,fontSize: '20px' }}>company Email</TableCell>
              <TableCell sx={{ fontWeight: 'bold' ,fontSize: '20px' }}>status</TableCell>
              <TableCell sx={{ fontWeight: 'bold' ,fontSize: '20px' }}>Claim Amount</TableCell>
              <TableCell></TableCell><TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {claims.map((claim)=>(
                <>
                <TableRow key={claim.appintmentId} style={{height:'5px', whiteSpace: 'nowrap'}}>
                <TableCell style={{ fontWeight: 'bold', fontSize: '15px'}}>{claim.hospitalEmail}</TableCell>
                <TableCell style={{ fontWeight: 'bold', fontSize: '15px'}}>hospitalName</TableCell>
                <TableCell style={{ fontWeight: 'bold', fontSize: '15px'}}>{claim.employeeEmail}</TableCell>
                <TableCell style={{ fontWeight: 'bold', fontSize: '15px'}}>company Email</TableCell>
                <TableCell style={{  fontSize: '15px'}}>{claim.status}</TableCell> 
                <TableCell style={{ fontWeight: 'bold', fontSize: '15px'}}>{claim.amount}</TableCell>
                <TableCell style={{  fontSize: '15px' }}><Button variant="text"
                disabled={claim.status !== 'claim submitted'}
                // onClick={() => handleCreateReport(appointment.employeeEmail)}
                style={{textTransform:'none'}}>
               Approve</Button>
                </TableCell>
                <TableCell style={{  fontSize: '15px' }}><Button variant="text"
                disabled={claim.status !== 'claim submitted'}
                // onClick={() => handleCreateReport(appointment.employeeEmail)}
                style={{textTransform:'none',color:'red'}}>
               Reject</Button>
                </TableCell>
                </TableRow>
                </>
            ))}
          </TableBody>
          </Table>
          </TableContainer>
          
        </>
    )
}

export default ClaimDetails;