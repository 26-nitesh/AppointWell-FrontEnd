import { TableHead } from "@material-ui/core";
import { Button, ButtonBase, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { getAppointMentByHospital } from "../Service/commonService";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';

import {
  Card,
  CardContent,
  MenuItem,
  Link,
} from '@material-ui/core';
import { Alert, AlertTitle, FormHelperText } from '@mui/material';
import { createNewReport, updateReport } from "../Service/reportService";
import ConfirmationDialog from "./ConfirmationDialog";

const useStyles = makeStyles((theme) => ({
  root: {
  
  },
  card: {
    minWidth: 400,
    maxWidth: 700,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[4],
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(4),
    },
  },
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing(4),
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
  registerLink: {
    display: 'block',
    marginTop: theme.spacing(2),
    textAlign: 'center',
  },
}));

const ProcessReport  = (props) =>{
  const classes = useStyles();
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [dataToUpdate, setDataToUpdate] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [sucessMessage, setSucessMessage] = useState(null);

function handleConfirmDialog() {
  setShowConfirmationDialog(!showConfirmationDialog);
}
const handleDialogClose = ()=>{
  setShowConfirmationDialog(false)
}
const handleUpdateAppointment = async() =>{
  const updatedResponse = await updateReport(dataToUpdate)
  if(updatedResponse.data.HttpStatus===200){
    // alert(updatedResponse.data.message);
    setSucessMessage(updatedResponse.data.message);

    setShowConfirmationDialog(false)
    
  }
  console.log(updatedResponse);
}
  const reportValidation = yup.object({
    appointmentId: yup.number().required("required !!"),
    reportDetails: yup.string().required("required !!"),
    appointmentDate: yup.date(),
    remarks: yup.string(),
  })
  const reportFormik = useFormik(
    {
         initialValues:{
          appointmentId:props.data.appintmentId,
          reportDetails:"",
          appointmentDate:props.data.appointmentDate,
          remarks:""

         },
         validationSchema:reportValidation,
         onSubmit: async (values)=>{
           console.log(values);
      const report =  await   createNewReport(values);
         if(report.data.HttpStatus===201){
          // alert('report created sucessfully');
          setSucessMessage('report created');
         }else if(report.data.HttpStatus===409){
          handleConfirmDialog();
          setDataToUpdate(values);
          // confirm('Report Already Found for this appointment. Click OK to confirm if You want it to override');
        //  const response = await updateExistingReport(values);
         }
           reportFormik.resetForm();
         }
    }

)

    return(
        <>
       <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5" component="h2" className={classes.title}>
            Submit Report
          </Typography>
          <form className={classes.form} onSubmit={reportFormik.handleSubmit}>
          {errorMessage && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {errorMessage}
        </Alert>
      )}
      {sucessMessage && (
        <Alert severity="success">
          <AlertTitle>success</AlertTitle>
          {sucessMessage}
        </Alert>
      )}
          <TextField label="Appointment Id" type="number" name='appointmentId' value={reportFormik.values.appointmentId}  readonly />
            <TextField label="Details" type="text" multiline
  rows={5}
   name='reportDetails' value={reportFormik.values.reportDetails} error={reportFormik.touched.reportDetails && Boolean(!reportFormik.errors.reportDetails)} onChange={reportFormik.handleChange} />
            <FormHelperText error>{reportFormik.errors.reportDetails}</FormHelperText>

            <TextField label="appointment Date" type="date" name='appointmentDate' value={reportFormik.values.appointmentDate}/>
            <TextField label="Remarks" type="text" name='remarks' value={reportFormik.values.remarks} error={reportFormik.touched.remarks && Boolean(!reportFormik.errors.remarks)} onChange={reportFormik.handleChange} />
           
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </form>
          {/* <Link className={classes.registerLink} onClick={handleOpenSignUP}>
           Already have an account? Sign in
          </Link> */}
        </CardContent>
      </Card>
    </div>
    {showConfirmationDialog && <Dialog open={showConfirmationDialog} onClose={handleDialogClose}>
     <DialogContent>
     Report Already Found for this appointment. Click OK to confirm if You want it to override
     </DialogContent>
     <DialogActions>
          <Button onClick={handleDialogClose} >Cancel</Button>
          <Button onClick={handleUpdateAppointment}>OK</Button>
        </DialogActions>
    </Dialog>}

      </>
    )
}


export default ProcessReport;