import React, { useState } from "react";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { getClaimRecords, updateRejectStatus } from "../Service/ClaimService";
import { Alert, AlertTitle, Button, Dialog, DialogActions, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, IconButton, InputLabel, ListItemSecondaryAction, MenuItem, Select } from "@material-ui/core";
import { updateAppointmnetByStatus } from "../Service/reportService";
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
    const [statusFilter,setStatusFilter] = useState("");
    const[selectedAppIdForReject, setSelectedAppIdForReject] = useState(null);
    const[selectedAppIdForApprove, setSelectedAppIdForApprove] = useState(null);
    const[openRemarksDialog, setOpenRemarksDialog] = useState(null);
    const[remarksValue,setRemarksValue] = useState(null)
    const [reload, setReload] = React.useState(false)
    React.useEffect(()=>{
        async function fetchData() {
      const claims =   await getClaimRecords(props.agencyEmail);
      setClaims(claims);
        }
        fetchData();
      }, [reload]);


      const handleRejectClaim = (appId) =>{
        console.log(appId);
          setSelectedAppIdForReject(appId);
          setOpenRemarksDialog(true)
      }
      const handleApproveClaim = async(appId) =>{
        console.log(appId);
        setSelectedAppIdForApprove(appId);
      const res =  await updateAppointmnetByStatus(appId,'claim approved');
      setReload(true)
    }
    const handleDialogClose = () =>{
      setOpenRemarksDialog(false)
      setReload(true)
    }

    const handleRemarksChamge = (event) =>{
      setRemarksValue(event.target.value)
    }

    const handleRejectSubmit = async()=>{
      // console.log(remarksValue);
      // console.log(selectedAppIdForReject);
      setReload(false);
      await updateRejectStatus(selectedAppIdForReject,remarksValue);
      setReload(true);
      setOpenRemarksDialog(false);
    }
    return(
        <>
          <div className={classes.listContainer}>
        <Typography variant="subtitle1" className={classes.listTitle} style={{fontSize:'32px'}}>
          Appointment And their Claims
        </Typography>
      </div>
      <TableContainer component={Paper} style={{ marginTop: '30px', width: '100%' ,margin: 'auto', }}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow className={classes.tableHead} style={{whiteSpace: 'nowrap'}}>
              <TableCell sx={{ fontWeight: 'bold' ,fontSize: '18px' }}>hospital</TableCell>
              <TableCell sx={{ fontWeight: 'bold' ,fontSize: '18px' }}>employee Email</TableCell>
              <TableCell sx={{ fontWeight: 'bold' ,fontSize: '18px' }}>company</TableCell>
              <TableCell sx={{ fontWeight: 'bold' ,fontSize: '18px' }}>claim date</TableCell>
              {/* <TableCell sx={{ fontWeight: 'bold' ,fontSize: '20px' }}>status</TableCell> */}
              <TableCell sx={{ fontWeight: 'bold' ,fontSize: '18px' }}>
      <FormControl sx={{ minWidth: 180 }}>
        <InputLabel style={{ fontWeight: 'bold' ,fontSize: '18px',color:'black' }} >Status</InputLabel>
        <Select
          value={statusFilter}
          endIcon={<ArrowDropDownIcon />}
          // onChange={(e) => setStatusFilter(e.target.value)}
        >
          {/* <MenuItem value="" >All</MenuItem> */}
          <MenuItem value="claim submitted">Claim Submitted</MenuItem>
          <MenuItem value="approved">Claim Approved</MenuItem>
          <MenuItem value="rejected">Claim Rejected</MenuItem>
        </Select>
      </FormControl>
    </TableCell>

              <TableCell sx={{ fontWeight: 'bold' ,fontSize: '18px' }}>Claim Amount</TableCell>
              <TableCell></TableCell><TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {claims.map((claim)=>(
                <>
                <TableRow key={claim.appintmentId} style={{height:'5px', whiteSpace: 'nowrap'}}>
                <TableCell style={{ fontWeight: 'bold', fontSize: '15px'}}><Button variant="text"  sx={{ textTransform: 'none' }} >{claim.hospitalEmail}</Button></TableCell>
                <TableCell style={{ fontSize: '15px'}}>{claim.employeeEmail}</TableCell>
                <TableCell style={{ fontWeight: 'bold', fontSize: '15px'}}>company Email</TableCell>
                <TableCell style={{  fontSize: '15px'}}>{claim.claimDate}</TableCell> 
                <TableCell style={{  fontSize: '15px'}}>{claim.status}</TableCell> 
                <TableCell style={{ fontWeight: 'bold', fontSize: '15px'}}>{claim.amount}</TableCell>
                <TableCell style={{  fontSize: '15px' }}><Button variant="text"
                disabled={claim.status !== 'claim submitted'}
                onClick={() => handleApproveClaim(claim.appintmentId)}
                style={{textTransform:'none'}}>
               Approve</Button>
                </TableCell>
                <TableCell style={{  fontSize: '15px' }}><Button variant="text"
                disabled={claim.status !== 'claim submitted'}
                onClick={() => handleRejectClaim(claim.appintmentId)}
                style={{textTransform:'none',color:'red'}}>
               Reject</Button>
                </TableCell>
                </TableRow>
                </>
            ))}
          </TableBody>
          </Table>
          </TableContainer>
          {selectedAppIdForReject && <Dialog open={openRemarksDialog} onClose={handleDialogClose}>
          <DialogTitle>Remarks</DialogTitle>
        {/* <DialogContent> */}
          <div style={{margin: 'auto'}}>
          <TextField
  label="Remarks"
  type="text"

  value={remarksValue}
  onChange={handleRemarksChamge}
  InputLabelProps={{
    shrink: true,
  }}
  style={{padding:'5px' }} 
/>
          </div>
        {/* </DialogContent> */}
        <DialogActions>
          <Button onClick={handleDialogClose} >Cancel</Button>
          <Button onClick={handleRejectSubmit}>Confirm</Button>
        </DialogActions>     
          </Dialog>
          }
        </>
    )
}

export default ClaimDetails;