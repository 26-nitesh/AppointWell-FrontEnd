
import React, { useState } from "react";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { getClaimHistory, getClaimRecords, updateRejectStatus } from "../Service/ClaimService";
import { Alert, AlertTitle, Button, Dialog, DialogActions, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, IconButton, InputLabel, ListItemSecondaryAction, MenuItem, Select } from "@material-ui/core";
import { updateAppointmnetByStatus } from "../Service/reportService";
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

const ClaimHstory = (props) =>{
    const [claims, setClaims] = useState([]);
    const classes = useStyles();
    const [reload, setReload] = React.useState(false)
    React.useEffect(()=>{
        async function fetchData() {
      const claims =   await getClaimHistory(props.agencyEmail);
      setClaims(claims);
        }
        fetchData();
      }, [reload]);


    return(
        <>
          <div className={classes.listContainer}>
        <Typography variant="subtitle1" className={classes.listTitle} style={{fontSize:'32px'}}>
          Claim History
        </Typography>
      </div>
      <TableContainer component={Paper} style={{ marginTop: '30px' ,margin: 'auto', }}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow className={classes.tableHead} style={{whiteSpace: 'nowrap'}}>
              <TableCell sx={{ fontWeight: 'bold' ,fontSize: '18px' }}>hospital</TableCell>
              <TableCell sx={{ fontWeight: 'bold' ,fontSize: '18px' }}>employee Email</TableCell>
              <TableCell sx={{ fontWeight: 'bold' ,fontSize: '18px' }}>company</TableCell>
              <TableCell sx={{ fontWeight: 'bold' ,fontSize: '18px' }}>claim date</TableCell>
              {/* <TableCell sx={{ fontWeight: 'bold' ,fontSize: '20px' }}>status</TableCell> */}
              <TableCell sx={{ fontWeight: 'bold' ,fontSize: '18px' }}>
  status
    </TableCell>

              <TableCell sx={{ fontWeight: 'bold' ,fontSize: '18px' }}>Claim Amount</TableCell>
     
            </TableRow>
          </TableHead>
          <TableBody>
            {claims.map((claim)=>(
                <>
                <TableRow key={claim.appintmentId} style={{height:'5px', whiteSpace: 'nowrap'}}>
                <TableCell style={{ fontWeight: 'bold', fontSize: '15px'}}><Button variant="text"  sx={{ textTransform: 'none' }} >{claim.hospitalEmail}</Button></TableCell>
                <TableCell style={{ fontSize: '15px'}}>{claim.employeeEmail}</TableCell>
                <TableCell style={{ fontWeight: 'bold', fontSize: '15px'}}>{claim.companyEmail}</TableCell>
                <TableCell style={{  fontSize: '15px'}}>{claim.claimDate}</TableCell> 
                <TableCell style={{  fontSize: '15px'}}>{claim.status}</TableCell> 
                <TableCell style={{ fontWeight: 'bold', fontSize: '15px'}}>₹ {claim.amount}</TableCell>
                </TableRow>
                </>
            ))}
          </TableBody>
          </Table>
          </TableContainer>
        </>
    )
}

export default ClaimHstory;