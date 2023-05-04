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
import { Alert, AlertTitle, Box, CircularProgress, FormHelperText } from '@mui/material';
import { login } from '../Service/loginService';
import { useNavigate } from 'react-router';

const useStyles = makeStyles((theme) => ({
  root: {
    '&.MuiCircularProgress-root': {
      backgroundColor: 'transparent',
    },
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
    marginBottom: theme.spacing(2),
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
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
  registerLink: {
    display: 'block',
    marginTop: theme.spacing(2),
    textAlign: 'center',
  },
}));

export default function Login(props) {
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
 const navigate = useNavigate();
  const classes = useStyles();

  const loginValidation = yup.object({
    email: yup.string().email().required("required !!"),
    password: yup.string().required("required !!").min(4, "Password must be at least 4 characters long."),
    loginAs: yup.string().oneOf(['hospital', 'agency', 'organisation','employee']).required("required !!")
  })
  const loginFormik = useFormik(
    {
         initialValues:{
           email:"",
           password:"",
           loginAs:""

         },
         validationSchema:loginValidation,
         onSubmit:async(values)=>{
          try{
            setLoading(true);
           const data =   await login(values);
            if(parseInt(data.data.HttpStatus)===parseInt(200)){
            localStorage.setItem("auth_token",data.data.data.auth_token)  
            localStorage.setItem('isLoggedIn',"true");
             setErrorMessage(null);
            //  console.log(data.data.data.email);
            if(values.loginAs==='organisation'){
              localStorage.setItem("type",'org');
             navigate('/company/dashboard',{ state: { email: data.data.data.email } });
            }
            else if(values.loginAs==='employee'){
              localStorage.setItem("type",'employee');
            navigate('/employee/dashboard',{ state: { email: data.data.data.email } });
            }
            else if(values.loginAs==='agency'){
              localStorage.setItem("type",'agency');
            navigate('/agency/dashboard',{ state: { email: data.data.data.email } });
            }
            else if(values.loginAs==='hospital'){
              localStorage.setItem("type",'hospital');
            navigate('/hospital/dashboard',{ state: { email: data.data.data.email } });
              
            }
            props.loginPopUpAfterLogin(false)  
           }else{
             setErrorMessage(data.data.message);
           }

          //  console.log(data);
          }catch(error){

          }finally{
            setLoading(false)
          }
          //  console.log(values);
           loginFormik.resetForm();
         }
    }

)


  const handleOpenRegisterDialog = () => {
    // setRegisterDialog(true);
    props.loginPopUp(false)
  };

  return (
   <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5" component="h2" className={classes.title}>
            Log In
          </Typography>
          <form className={classes.form} onSubmit={loginFormik.handleSubmit}>
          {errorMessage && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {errorMessage}
        </Alert>
      )}
      {loading && <div className={classes.overlay} />}
      {loading && 
    
          <CircularProgress  className={classes.circularProgress}></CircularProgress>

      }
            <TextField label="Email" type="email" name='email' value={loginFormik.values.email} error={loginFormik.touched.email && Boolean(!loginFormik.errors.email)} onChange={loginFormik.handleChange}  />
            <FormHelperText error>{loginFormik.errors.email}</FormHelperText>
            <TextField label="Password" type="password" name='password' value={loginFormik.values.password} error={loginFormik.touched.password && Boolean(!loginFormik.errors.password)} onChange={loginFormik.handleChange} />
            <FormHelperText error>{loginFormik.errors.password}</FormHelperText>
            <TextField
              label="Login As"
              select
              name="loginAs"
              value ={loginFormik.values.loginAs} error={loginFormik.touched.loginAs && Boolean(!loginFormik.errors.loginAs)} onChange={loginFormik.handleChange}
             variant="standard"
             required
            >
            <MenuItem value="hospital">Hospital Admin</MenuItem>
              <MenuItem value="agency">Insurance Agency Admin</MenuItem>
              <MenuItem value="employee">Employee</MenuItem>
              <MenuItem value="organisation">Employer</MenuItem>
            </TextField>
            <Button variant="contained" color="primary" type="submit">
              Log In
            </Button>
          </form>
          <Link className={classes.registerLink} onClick={handleOpenRegisterDialog}>
            Don't have an account? Register
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

