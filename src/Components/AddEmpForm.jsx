import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Button, TextField, Typography, FormHelperText } from '@material-ui/core';

import { useFormik } from 'formik';
import * as yup from 'yup';
const useStyles = makeStyles((theme) => ({
    root: {
      margin: theme.spacing(-10),
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
      height: '100%',
      backgroundImage: 'url("https://images.unsplash.com/photo-1527613426441-4da17471b66d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=852&q=80")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      filter: 'blur(5px)',
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
  
  function AddEmployeeForm() {
    const classes = useStyles();

    const ValidateAddEmp = yup.object({
      name: yup.string().required("required !!"),
      email: yup.string().email().required("required !!"),
      password: yup.string().required("required !!").min(4, "Password must be at least 4 characters long."),
    })
    const addEmployeeFormik = useFormik(
      {
           initialValues:{
            name:"",
             email:"",
             password:"",
  
           },
           validationSchema:ValidateAddEmp,
           onSubmit:async(values)=>{
               
                
                console.log(values);
                addEmployeeFormik.resetForm();
           }
      }
  
  )
  
    return (
      <div className={classes.root}>
        <div className={classes.background}></div>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h5" component="h2" className={classes.title}>
              Add Employee
            </Typography>
            <form className={classes.form} onSubmit={addEmployeeFormik.handleSubmit}>
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
                 <FormHelperText error placement="start">{addEmployeeFormik.errors.password}</FormHelperText>
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
    );
  }
  
  export default AddEmployeeForm;
  