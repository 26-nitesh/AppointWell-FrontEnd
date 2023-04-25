import { TableHead } from "@material-ui/core";
import { Button, ButtonBase, Dialog, DialogActions, DialogTitle, Paper,TablePagination, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography, CircularProgress } from "@mui/material";
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from "react";
import { getAppointMentByHospital, updateAppointmnet } from "../Service/commonService";
import ProcessReport from "./ProcessReport";
import { updateClaimAmount } from "../Service/reportService";
import { updateLastAppDateForEmployee } from "../Service/EmployeeService";

const useStyles = makeStyles({
    table: {
        // minWidth: 900,
        
        '& tbody tr:hover': {
          backgroundColor: '#f6fff2',
        },
      },
      tableHead: {
        backgroundColor: '#f6fff2',
        fontWeight: 'bold',
        fontSize: '18px',
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
        // fontSize: '32px',
        // marginBottom: '20px',
      },
     
});


const AppointMentList = (props) =>{
    const classes = useStyles();
    const [openDialog, setopenDialog] = useState(false)
    const [openReportDialog, setOpenReportDialog] = useState(false)//setOpenReportDialog
    const [openClaimDialog, setOpenClaimDialog] = useState(false)
   const[selectedEmp, setSelectedEmp]= useState(null);//setSelectedEmpForReject
   const[selectedEmpForReject, setSelectedEmpForReject]= useState(null)
    // console.log(props.data);
    const [showApproveButton, setShowApproveButton] = useState(true);
    const [appList, setAppList] = React.useState([])
    const [reload, setReload] = React.useState(false)
    const [inactive,setInactive] = React.useState(false);
    const [enteredStatus, SetEnteredStatus] = useState(null);
    const [enteredRemarks, SetEnteredRemarks] = useState(null);
    const [createReportForSelectedEmployee, setCreateReportForSelectedEmployee] = useState(null);//createReportForSelectedEmployee
    const [OpenDialogForReject,SetOpenDialogForReject] = useState(false);
    const[selectedEmpNew, setSelectedEmpNew]= useState(null);
    const[selectedEmpForClaim, setSelectedEmpForClaim]= useState(null);
    const[enteredAmount, setEnteredAmount]= useState(null);//enteredAmount
    const[appIdForClaim,setAppIdForClaim] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const[isLoading, setLoading] = useState(false);
    React.useEffect(()=>{
        async function fetchData() {
          const response = await  getAppointMentByHospital(props.data,false);
            if(response!=null){
                setAppList(response)
                setReload(false)
               }
               console.log(response==undefined);
        }
        fetchData();
      }, [reload]);

      const handleCreateClaim = async(empEmail,appId) =>{
        console.log(empEmail);
        console.log(appId);
        setAppIdForClaim(appId);
        setSelectedEmpForClaim(empEmail)
        setOpenClaimDialog(true)
        setReload(true)
      }
    const approveAppointment = async(empEmail) =>{//
      setSelectedEmpNew(empEmail)
      setLoading(true)
   const updated =  await updateAppointmnet(empEmail,props.data,false,true,'appointment approved','valid');
        setShowApproveButton(false) 
        setReload(true)
        setInactive(true);

        // update Last AppointMent Date by EmpEmail
        const empUpdate = await updateLastAppDateForEmployee(empEmail);
        setLoading(false)
    }
    const rejectAppointMent = async() =>{//rejectAppointMent
        setSelectedEmpNew(selectedEmpForReject)
        const updated =  await updateAppointmnet(selectedEmpForReject,props.data,false,false,'rejected',enteredRemarks);
             setReload(true)
             setInactive(true)
             SetOpenDialogForReject(false)
         }


         const handleOpenDialog = (empEmail) =>{
            setSelectedEmpForReject(empEmail)
            setSelectedEmp(empEmail)
            setReload(true)
            setopenDialog(true)
         }
         const handleOpenDialogForReject = (empEmail) =>{//handleOpenDialogForReject
            setSelectedEmpForReject(empEmail)
            setReload(true)
            setopenDialog(false)
            SetOpenDialogForReject(true);
            setSelectedEmpNew(empEmail)
            setReload(true)
         }
   const handleUpdateRemarks = async() =>{
    
    const updated =  await updateAppointmnet(selectedEmp,props.data,false,true,'appointment approved',enteredRemarks);
    console.log('updated');
    setReload(true)
   setopenDialog(false);
   console.log('dialog false');
   } 
   const handleDialogClose = ()=>{
    setReload(true)
    setInactive(true)
    setopenDialog(false)
    SetOpenDialogForReject(false)
    // setReload(false)
    setOpenReportDialog(false);
    setOpenClaimDialog(false)
    // setReload(true)
}
const handleCreateReport = (empEmail) =>{
  setOpenReportDialog(true);
  setCreateReportForSelectedEmployee(empEmail);
}
   
const handleStatusChange = (event) => {
    SetEnteredStatus(event.target.value);
    setReload(true)
  };

  const handleRemarkssChange = (event) => {
    SetEnteredRemarks(event.target.value);
    setReload(true)
  };

const handleClaimAmount = (event) =>{
  setEnteredAmount(event.target.value)
  setReload(true)
}

const handleClaimSubmit = async() =>{
const res = await updateClaimAmount(enteredAmount,appIdForClaim);
setOpenClaimDialog(false);
setReload(true)
}
    return(
      isLoading? <div className={classes.listContainer}>
      <CircularProgress />
  </div>:
        <>
            <div className={classes.listContainer}>
        <Typography variant="subtitle1" className={classes.listTitle} style={{fontSize:'32px'}}>
          List of Appointments
        </Typography>
      </div>
      <TableContainer component={Paper} style={{ marginTop: '30px', width: '100%' ,margin: 'auto' }}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow className={classes.tableHead}>
              <TableCell sx={{ fontWeight: 'bold' ,fontSize: '15px' }}>Employee Email</TableCell>
              <TableCell sx={{ fontWeight: 'bold' ,fontSize: '15px' }}>Date Of AppointMent</TableCell>
              <TableCell sx={{ fontWeight: 'bold' ,fontSize: '15px' }}>Applied Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold' ,fontSize: '15px' }}>Status</TableCell>
              <TableCell></TableCell>    <TableCell></TableCell> <TableCell></TableCell><TableCell></TableCell><TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {appList.map((appointment)=>(
        <>
        <TableRow key={appointment.appintmentId} style={{height:'5px', whiteSpace: 'nowrap'}}>
                <TableCell style={{ fontWeight: 'bold', fontSize: '15px'}}><Button variant="text"  sx={{ textTransform: 'none' }}>{appointment.employeeEmail}</Button></TableCell>
                <TableCell style={{  fontSize: '15px' }}>{appointment.appointmentDate}</TableCell>
                <TableCell style={{ fontSize: '15px'}}>{appointment.bookingDate}</TableCell>
                <TableCell style={{  fontSize: '15px'}}>{appointment.status}</TableCell>
              <TableCell>   <Button
          variant="text"
          disabled={appointment.status==='claim submitted'||appointment.status === 'report submitted'||appointment.status === 'appointment approved'|| (appointment.status === 'appointment approved' || appointment.status === 'rejected' ) && selectedEmpNew===appointment.employeeEmail}
          style={{ textTransform: 'none' }}
          onClick={() => approveAppointment(appointment.employeeEmail)}
        >
          approve
        </Button></TableCell>
              <TableCell style={{  fontSize: '15px' }}><Button variant="text"
                disabled={appointment.status==='claim submitted'||appointment.status === 'report submitted'|| appointment.status === 'appointment approved' || (appointment.status === 'appointment approved' || appointment.status === 'rejected' ) && selectedEmpNew===appointment.employeeEmail}
               style={{textTransform:'none',color:'red'}} 
                onClick={() => handleOpenDialogForReject(appointment.employeeEmail)}//rejectAppointMent
                >
                reject</Button>
                </TableCell>

                <TableCell style={{  fontSize: '15px' }}><Button variant="text"
                disabled={appointment.status==='claim submitted'||appointment.status === 'report submitted' || appointment.status === 'rejected' && selectedEmpNew===appointment.employeeEmail}
               style={{textTransform:'none'}} 
                onClick={() => handleOpenDialog(appointment.employeeEmail)}
                >
                update</Button>
                </TableCell>
                <TableCell style={{  fontSize: '15px' }}><Button variant="contained"
                // disabled={(appointment.status !== 'appointment approved')}
                disabled={appointment.status !== 'appointment approved' && appointment.status !== 'report submitted'}
                onClick={() => handleCreateReport(appointment.employeeEmail)}
                style={{textTransform:'none'}}>
                submit report</Button>
                </TableCell>
                <TableCell style={{  fontSize: '15px' }}><Button variant="contained"
                // disabled={(appointment.status !== 'appointment approved')}
                // disabled={(appointment.status !== 'report submitted' || appointment.status==='claim submitted') || appointment.status!=='claim submitted'}
                disabled={appointment.status !== 'report submitted'}
                onClick={() => handleCreateClaim(appointment.employeeEmail,appointment.appintmentId)}
                style={{textTransform:'none'}}>
                Claim</Button>
                </TableCell>
                
              </TableRow>
          
              {selectedEmpForClaim ===appointment.employeeEmail && <Dialog open={openClaimDialog} onClose={handleDialogClose}>
              <DialogTitle>Enter Claim Amount</DialogTitle>
        {/* <DialogContent> */}
          <div style={{margin: 'auto'}}>
          <TextField
  label="Enter Amount"
  type="number"

  value={enteredAmount}
  onChange={handleClaimAmount}
  InputLabelProps={{
    shrink: true,
  }}
  style={{padding:'5px' }} 
/>
          </div>
        {/* </DialogContent> */}
        <DialogActions>
          <Button onClick={handleDialogClose} >Cancel</Button>
          <Button onClick={handleClaimSubmit}>Confirm</Button>
        </DialogActions>                
              </Dialog>}


              {createReportForSelectedEmployee === appointment.employeeEmail && <Dialog open={openReportDialog} onClose={handleDialogClose}>
             <ProcessReport data = {appointment}></ProcessReport>
              </Dialog>}

              {selectedEmp=== appointment.employeeEmail && <Dialog open={openDialog} onClose={handleDialogClose}>
           <DialogTitle>Update remarks</DialogTitle>
          <div style={{margin: 'auto'}}>
<TextField
  label="remarks"
  value={enteredRemarks}
  onChange={handleRemarkssChange}
  InputLabelProps={{
    shrink: true,
  }}
  style={{padding:'5px' }} // Add this style property
/>
          </div>
        <DialogActions>
          <Button onClick={handleDialogClose} >Cancel</Button>
          <Button onClick={handleUpdateRemarks}>Confirm</Button>
        </DialogActions>
              </Dialog>}

              {selectedEmpForReject=== appointment.employeeEmail && <Dialog open={OpenDialogForReject} onClose={handleDialogClose}>
           <DialogTitle>Update remarks</DialogTitle>
        {/* <DialogContent> */}
          <div style={{margin: 'auto'}}>
<TextField
  label="remarks"
  value={enteredRemarks}
  onChange={handleRemarkssChange}
  InputLabelProps={{
    shrink: true,
  }}
  style={{padding:'5px' }}
/>
          </div>
        {/* </DialogContent> */}
        <DialogActions>
          <Button onClick={handleDialogClose} >Cancel</Button>
          <Button onClick={rejectAppointMent}>Confirm</Button>
        </DialogActions>
              </Dialog>}
        </>
          ))}
          </TableBody>
          
          </Table>
          <TablePagination
  rowsPerPageOptions={[5, 10, 25]}
  component="div"
  count={appList.length}
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
export default AppointMentList;