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

export default function Register(props) {
  const classes = useStyles();
  const [errorMessage, setErrorMessage] = useState(null);
  const [sucessMessage, setSucessMessage] = useState(null);

  const signupValidation = yup.object({
    name: yup.string().required("required !!"),
    email: yup.string().email().required("required !!"),
    password: yup.string().required("required !!").min(4, "Password must be at least 4 characters long."),
    registerAs: yup.string().oneOf(['hospital', 'agency', 'organisation']).required("required !!")
  })
  const signupFormik = useFormik(
    {
         initialValues:{
           name:"",
           email:"",
           password:"",
           registerAs:""

         },
         validationSchema:signupValidation,
         onSubmit: async (values)=>{

          try {
            const data = await register(values);
            if(parseInt(data.data.HttpStatus)===parseInt(201)){
              // console.log("coming");
              setSucessMessage("registred sucessfully please login now !");
              setErrorMessage(null)
              // console.log("jello");
              signupFormik.resetForm();
            }else{
              setErrorMessage(data.data.message);
              setSucessMessage(null)
            }
            // console.log(data.HttpStatus);
            // signupFormik.resetForm();
          } catch (error) {
            setErrorMessage(error.data?.data?.message || "Something went wrong!");
            console.log(error.data?.data?.message);
            signupFormik.resetForm();
            console.log("bye");
          }
         }
    }

)

  const handleOpenSignUP = () => {
    // setRegisterDialog(true);
    props.regPopUp(false)
  };


  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5" component="h2" className={classes.title}>
            Sign Up
          </Typography>
          <form className={classes.form} onSubmit={signupFormik.handleSubmit}>
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
          <TextField label="Name" type="text" name='name' value={signupFormik.values.name} error={signupFormik.touched.name && Boolean(!signupFormik.errors.name)} onChange={signupFormik.handleChange}  />
          <FormHelperText error>{signupFormik.errors.name}</FormHelperText>
            <TextField label="Email" type="email" name='email' value={signupFormik.values.email} error={signupFormik.touched.email && Boolean(!signupFormik.errors.email)} onChange={signupFormik.handleChange} />
            <FormHelperText error>{signupFormik.errors.email}</FormHelperText>
            <TextField label="Password" type="password" name='password' value={signupFormik.values.password} error={signupFormik.touched.password && Boolean(!signupFormik.errors.password)} onChange={signupFormik.handleChange} />
            <FormHelperText error>{signupFormik.errors.password}</FormHelperText>
            <TextField
              label="register As"
              select
              name="registerAs"
              value ={signupFormik.values.registerAs} error={signupFormik.touched.registerAs && Boolean(!signupFormik.errors.registerAs)} onChange={signupFormik.handleChange}
             variant="standard"
             required
            // onChange={(event) => setRegisterAs(event.target.value)}
            >
            <MenuItem value="hospital">Hospital Admin</MenuItem>
              <MenuItem value="agency">Insurance Agency Admin</MenuItem>
              <MenuItem value="organisation">Employer</MenuItem>
            </TextField>
            <Button variant="contained" color="primary" type="submit">
              Register
            </Button>
          </form>
          <Link className={classes.registerLink} onClick={handleOpenSignUP}>
           Already have an account? Sign in
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

