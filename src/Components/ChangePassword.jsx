import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  MenuItem,
  Link,
  Dialog,
} from '@material-ui/core';
import { Alert, AlertTitle, FormHelperText } from '@mui/material';
import { register } from '../Service/registerService';
import { changePassword } from '../Service/commonService';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(-2),
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
  card: {
    zIndex: 1,
    minWidth: 400,
    maxWidth: 700,
    // backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[4],
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(4),
    },
  },
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing(2),
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

export default function ChangePassword(props) {
  const classes = useStyles();
  const [errorMessage, setErrorMessage] = useState(null);
  const [sucessMessage, setSucessMessage] = useState(null);

  const validateChangePassword = yup.object({
    email: yup.string().email().required("required !!"),
    password: yup.string().required("required !!").min(4, "Password must be at least 4 characters long."),
    newPassword: yup.string().required("required !!").min(4, "Password must be at least 4 characters long."),
  })
  const ChangePasswordFormik = useFormik(
    {
         initialValues:{
           email:props.email,
           password:"",
           newPassword:""

         },
         validationSchema:validateChangePassword,
         onSubmit: async (values)=>{
        const res = await changePassword(values,props.type);
        if(res.status==200){
          setSucessMessage(res.message);
          setErrorMessage(null)
        }else if(res.status==500){
          setErrorMessage(res.message);
          setSucessMessage(null);
        }
          //  console.log(values);
            ChangePasswordFormik.resetForm();
           
          }
         
    }

)

  const handleOpenSignUP = () => {
    // setRegisterDialog(true);
    props.regPopUp(false)
  };


  return (
    <div className={classes.root}>
    <div className={classes.background}></div>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5" component="h2" className={classes.title}>
            Update Password
          </Typography>
          <form className={classes.form} onSubmit={ChangePasswordFormik.handleSubmit}>
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
         
            <TextField label="Email" type="email" name='email' value={ChangePasswordFormik.values.email} readonly />
            <FormHelperText error>{ChangePasswordFormik.errors.email}</FormHelperText>
            <TextField label="Password" type="password" name='password' value={ChangePasswordFormik.values.password} error={ChangePasswordFormik.touched.password && Boolean(!ChangePasswordFormik.errors.password)} onChange={ChangePasswordFormik.handleChange} />
            <FormHelperText error>{ChangePasswordFormik.errors.password}</FormHelperText>
            <TextField label="New Password" type="password" name='newPassword' value={ChangePasswordFormik.values.newPassword} error={ChangePasswordFormik.touched.newPassword && Boolean(!ChangePasswordFormik.errors.newPassword)} onChange={ChangePasswordFormik.handleChange} />
            <FormHelperText error>{ChangePasswordFormik.errors.newPassword}</FormHelperText>
           
            
            <Button variant="contained" color="primary" type="submit">
              Update
            </Button>
          </form>
          {/* <Link className={classes.registerLink} onClick={handleOpenSignUP}>
           Already have an account? Sign in
          </Link> */}
        </CardContent>
      </Card>
    </div>
  );
}

