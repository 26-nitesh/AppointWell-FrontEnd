import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Button, TextField, Typography, FormHelperText } from '@material-ui/core';
import { addNewEmployee } from '../Service/commonService';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Alert, AlertTitle, CircularProgress, MenuItem } from '@mui/material';
const useStyles = makeStyles((theme) => ({
    root: {
      // margin: theme.spacing(-10),
      marginTop:'50px',
      marginBottom:'120px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      height: '100vh',
    },
    background: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '940px',
      backgroundImage: 'url("https://images.unsplash.com/photo-1527613426441-4da17471b66d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=852&q=80")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      filter: 'blur(5px)',
    },
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      // backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 5000,
    },
  
    circularProgress: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 6000,
    },
    // card: {
    //   width: '80%',
    //   maxWidth: 500,
    //   margin: theme.spacing(2),
    //   [theme.breakpoints.up('md')]: {
    //     marginTop: theme.spacing(8),
    //   },
    // },
    card: {
  position: 'relative',
  zIndex: 1,
  width: '80%',
  maxWidth: 500,
  margin: theme.spacing(1),
  [theme.breakpoints.up('md')]: {
    marginTop: theme.spacing(8),
  },
},
    title: {
      textAlign: 'center',
      marginBottom: theme.spacing(2),
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
    textField: {
      width: '100%',
      margin: theme.spacing(2, 0),
    },
    button: {
      width: '100%',
      marginTop: theme.spacing(2),
    },
  }));
  
  function AddEmployeeForm(props) {
    const classes = useStyles();
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const [sucessMessage, setSucessMessage] = useState(null);
    const ValidateAddEmp = yup.object({
      name: yup.string().required("required !!"),
      email: yup.string().email().required("required !!"),
      password: yup.string().required("required !!").min(4, "Password must be at least 4 characters long."),
      designation: yup.string().required("required !!"),
      dob: yup.date().required("required !!"),
      doj: yup.date().required("required !!"),
      exposureType: yup.string().oneOf(['hazardous', 'normal']).required("required !!"),
    })
    const addEmployeeFormik = useFormik(
      {
           initialValues:{
            name:"",
             email:"",
             password:"",
             designation:"",
             dob:"",
             doj:"",
             exposureType:"",
  
           },
           validationSchema:ValidateAddEmp,
           onSubmit:async(values)=>{
            console.log(values);
            try{
              setLoading(true)
              const res = await addNewEmployee(values,props.email);
              if(res.data.HttpStatus===201){
                  setSucessMessage("employee Added Sucessfully");
                  setErrorMessage(null)
              }else if(res.data.HttpStatus===409){
                setErrorMessage(res.data.message);
                setSucessMessage(null)
              }
              console.log(res);
              // console.log(values);
              addEmployeeFormik.resetForm();
            }catch(err){

            }finally{
              setLoading(false)
            }
           }
      }
  
  )
  
    return (
      <>
        <div className={classes.background}></div>
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h5" component="h2" className={classes.title}>
              Add Employee
            </Typography>
            <form className={classes.form} onSubmit={addEmployeeFormik.handleSubmit}>
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
      {loading && <div className={classes.overlay} />}
      {loading && 
    
          <CircularProgress  className={classes.circularProgress}></CircularProgress>

      }
              <TextField
                className={classes.textField}
                label="Name"
                variant="outlined"
                name="name"
                value={addEmployeeFormik.values.name} error={addEmployeeFormik.touched.name
                 && Boolean(!addEmployeeFormik.errors.name)} onChange={addEmployeeFormik.handleChange}
              />
              <FormHelperText error placement="start">{addEmployeeFormik.errors.name}</FormHelperText>
              <TextField
                className={classes.textField}
                label="Email"
                variant="outlined"
                type="email"
                name="email"
                value={addEmployeeFormik.values.email} error={addEmployeeFormik.touched.email
                 && Boolean(!addEmployeeFormik.errors.email)} onChange={addEmployeeFormik.handleChange}
              />
              <FormHelperText error placement="start">{addEmployeeFormik.errors.email}</FormHelperText>
              <TextField
                className={classes.textField}
                label="Password"
                variant="outlined"
                type="password"
                name="password"
                value={addEmployeeFormik.values.password} error={addEmployeeFormik.touched.password
                 && Boolean(!addEmployeeFormik.errors.password)} onChange={addEmployeeFormik.handleChange}
              />
               <TextField
                className={classes.textField}
                label="Designation"
                variant="outlined"
                name="designation"
                value={addEmployeeFormik.values.designation} error={addEmployeeFormik.touched.designation
                 && Boolean(!addEmployeeFormik.errors.designation)} onChange={addEmployeeFormik.handleChange}
              />
              <FormHelperText error placement="start">{addEmployeeFormik.errors.name}</FormHelperText>
              {/* <TextField
                className={classes.textField}
                label="Date of Birth"
                variant="outlined"
                type='date'
                name="dob"
                value={addEmployeeFormik.values.dob} error={addEmployeeFormik.touched.dob
                 && Boolean(!addEmployeeFormik.errors.dob)} onChange={addEmployeeFormik.handleChange}
              /> */}
              <TextField
  className={classes.textField}
  label="Date of Birth"
  variant="outlined"
  type="date"
  name="dob"
  InputLabelProps={{ shrink: true }}

  value={addEmployeeFormik.values.dob}
  error={addEmployeeFormik.touched.dob && Boolean(!addEmployeeFormik.errors.dob)}
  onChange={addEmployeeFormik.handleChange}
  inputProps={{ max: new Date().toISOString().split("T")[0] }}
/>
              <FormHelperText error placement="start">{addEmployeeFormik.errors.doj}</FormHelperText>
              <TextField
                className={classes.textField}
                label="Date of Joining"
                variant="outlined"
                name="doj"
                type='date'
                InputLabelProps={{ shrink: true }}
                value={addEmployeeFormik.values.doj} error={addEmployeeFormik.touched.doj
                 && Boolean(!addEmployeeFormik.errors.doj)} onChange={addEmployeeFormik.handleChange}
              />
              <FormHelperText error placement="start">{addEmployeeFormik.errors.doj}</FormHelperText>
              <TextField
               className={classes.textField}
               label="Exposure Type"
               variant="outlined"
              select
              name="exposureType"
              value={addEmployeeFormik.values.exposureType} error={addEmployeeFormik.touched.exposureType
                 && Boolean(!addEmployeeFormik.errors.exposureType)} onChange={addEmployeeFormik.handleChange}
             required
            >
            <MenuItem value="hazardous">Hazardous</MenuItem>
              <MenuItem value="normal">Normal</MenuItem>
            </TextField>
              {/* <TextField
                className={classes.textField}
                label="Exposure Type"
                variant="outlined"
                name="exposureType"
                value={addEmployeeFormik.values.exposureType} error={addEmployeeFormik.touched.exposureType
                 && Boolean(!addEmployeeFormik.errors.exposureType)} onChange={addEmployeeFormik.handleChange}
              /> */}
              {/* <FormHelperText error placement="start">{addEmployeeFormik.errors.name}</FormHelperText>
                 <FormHelperText error placement="start">{addEmployeeFormik.errors.password}</FormHelperText> */}
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                type="submit"
              >
                Add Employee
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      </>
    );
  }
  
  export default AddEmployeeForm;
  