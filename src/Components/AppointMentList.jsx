import { TableHead } from "@material-ui/core";
import { Button, ButtonBase, Dialog, DialogActions, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from "react";
import { getAppointMentByHospital, updateAppointmnet } from "../Service/commonService";

const useStyles = makeStyles({
    table: {
        minWidth: 750,
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
    const [openDialog, setopenDialog] = useState(false)
   const[selectedEmp, setSelectedEmp]= useState(null);//setSelectedEmpForReject
   const[selectedEmpForReject, setSelectedEmpForReject]= useState(null)
    // console.log(props.data);
    const [showApproveButton, setShowApproveButton] = useState(true);
    const [appList, setAppList] = React.useState([])
    const [reload, setReload] = React.useState(false)
    const [inactive,setInactive] = React.useState(false);
    const [enteredStatus, SetEnteredStatus] = useState(null);
    const [enteredRemarks, SetEnteredRemarks] = useState(null);
    const [OpenDialogForReject,SetOpenDialogForReject] = useState(false);
    const[selectedEmpNew, setSelectedEmpNew]= useState(null);
    React.useEffect(()=>{
        async function fetchData() {
          const response = await  getAppointMentByHospital(props.data,false);
            if(response!=null){
                setAppList(response)
                setReload(false)
               }
               console.log(response);
        }
        fetchData();
      }, [reload]);
    const approveAppointment = async(empEmail) =>{//
      setSelectedEmpNew(empEmail)
   const updated =  await updateAppointmnet(empEmail,props.data,false,true,'appointment approved','valid');
        setShowApproveButton(false) 
        setReload(true)
        setInactive(true);
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
    
}
   
const handleStatusChange = (event) => {
    SetEnteredStatus(event.target.value);
    setReload(true)
  };

  const handleRemarkssChange = (event) => {
    SetEnteredRemarks(event.target.value);
    setReload(true)
  };


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
              <TableCell sx={{ fontWeight: 'bold' ,fontSize: '20px' }}>Applied Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold' ,fontSize: '20px' }}>Status</TableCell>
              <TableCell></TableCell>    <TableCell></TableCell> <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {appList.map((appointment)=>(
        <>
        <TableRow key={appointment.appointmentId}>
                <TableCell style={{ fontWeight: 'bold', fontSize: '15px' }}><Button variant="text"  sx={{ textTransform: 'none' }}>{appointment.employeeEmail}</Button></TableCell>
                <TableCell style={{  fontSize: '15px' }}>{appointment.appointmentDate}</TableCell>
                <TableCell style={{ fontSize: '15px' }}>{appointment.bookingDate}</TableCell>
                <TableCell style={{  fontSize: '15px' }}>{appointment.status}</TableCell>
              <TableCell>   <Button
          variant="text"
          disabled={appointment.status === 'appointment approved'|| (appointment.status === 'appointment approved' || appointment.status === 'rejected' ||inactive ) && selectedEmpNew===appointment.employeeEmail}
          style={{ textTransform: 'none' }}
          onClick={() => approveAppointment(appointment.employeeEmail)}
        >
          approve
        </Button></TableCell>
              <TableCell style={{  fontSize: '15px' }}><Button variant="text"
                disabled={appointment.status === 'appointment approved' || (appointment.status === 'appointment approved' || appointment.status === 'rejected' || inactive) && selectedEmpNew===appointment.employeeEmail}
               style={{textTransform:'none',color:'red'}} 
                onClick={() => handleOpenDialogForReject(appointment.employeeEmail)}//rejectAppointMent
                >
                reject</Button></TableCell>

                <TableCell style={{  fontSize: '15px' }}><Button variant="text"
                disabled={appointment.status === 'rejected' && selectedEmpNew===appointment.employeeEmail}
               style={{textTransform:'none'}} 
                onClick={() => handleOpenDialog(appointment.employeeEmail)}
                >
                update</Button></TableCell>
              </TableRow>
              {selectedEmp=== appointment.employeeEmail && <Dialog open={openDialog} onClose={handleDialogClose}>
           <DialogTitle>Update remarks</DialogTitle>
        {/* <DialogContent> */}
          <div style={{margin: 'auto'}}>
          {/* <TextField
  label="status"
  value={enteredStatus}
  onChange={handleStatusChange}
  InputLabelProps={{
    shrink: true,
  }}
  style={{padding:'5px' }} // Add this style property
/><br/><br/> */}
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
        {/* </DialogContent> */}
        <DialogActions>
          <Button onClick={handleDialogClose} >Cancel</Button>
          <Button onClick={handleUpdateRemarks}>Confirm</Button>
        </DialogActions>
              </Dialog>}

              {selectedEmpForReject=== appointment.employeeEmail && <Dialog open={OpenDialogForReject} onClose={handleDialogClose}>
           <DialogTitle>Update remarks</DialogTitle>
        {/* <DialogContent> */}
          <div style={{margin: 'auto'}}>
          {/* <TextField
  label="status"
  value={enteredStatus}
  onChange={handleStatusChange}
  InputLabelProps={{
    shrink: true,
  }}
  style={{padding:'5px' }} // Add this style property
/><br/><br/> */}
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
          </TableContainer>
        </>
    )

}
export default AppointMentList;