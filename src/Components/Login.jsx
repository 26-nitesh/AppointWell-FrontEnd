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
import { login } from '../Service/loginService';
import { useNavigate } from 'react-router';

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

export default function Login(props) {
  const [errorMessage, setErrorMessage] = useState(null);
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
           const data =   await login(values);
           if(parseInt(data.data.HttpStatus)===parseInt(200)){
             setErrorMessage(null);
            //  console.log(data.data.data.email);
            if(values.loginAs==='organisation')
             navigate('/company/dashboard',{ state: { email: data.data.data.email } });
            else if(values.loginAs==='employee')
            navigate('/employee/dashboard',{ state: { email: data.data.data.email } });
            else if(values.loginAs==='agency')
            navigate('/agency/dashboard',{ state: { email: data.data.data.email } });
            else if(values.loginAs==='agency')
            navigate('/hospital/dashboard',{ state: { email: data.data.data.email } });
                 props.loginPopUpAfterLogin(false)
                 
           }else{
             setErrorMessage(data.data.message);
           }

          //  console.log(data);
          }catch(error){

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

