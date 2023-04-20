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
import { updateAgency, updateEmp, updateHospital, updateOrg } from '../Service/commonService';
import { login } from '../Service/loginService';

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

export default function InfoUpdate(props) {
  const classes = useStyles();
  const [errorMessage, setErrorMessage] = useState(null);
  const [sucessMessage, setSucessMessage] = useState(null);

  const updateValidation = yup.object({
    name: yup.string().required("required !!"),
      email: yup.string().email().required("required !!"),
      password: yup.string().required("required !!").min(4, "Password must be at least 4 characters long."),
  
  })
  const UpdateInfoFormik = useFormik(
    {
         initialValues:{
          name: "",
          email: props.email,
          password: "",
          addLine1: "",
          city: "",
          zip: "",

         },
         validationSchema:updateValidation,
         onSubmit: async (values)=>{

          let input = {email:values.email,password:values.password,loginAs:props.type};
         
          try{
            const res = await login(input);
            if(res.data.HttpStatus===200){
              console.log(res);
              let result;
              switch(props.type){
                
                case 'organisation':
                  result = await updateOrg(values);
                  setSucessMessage(result.data.message)
                  setErrorMessage(null)
                  props.nameChange(result.data.data.organisationName)
                  break;
                case 'employee':
                  result = await updateEmp(values);
                  // console.log(result.data.data);
                  setSucessMessage(result.data.message)
                  setErrorMessage(null)
                  props.nameChange(result.data.data.empName)
                break;
                case 'hospital':
                  result = await updateHospital(values);
                  // console.log(result.data.data);
                  setSucessMessage(result.data.message)
                  setErrorMessage(null)
                  props.nameChange(result.data.data.hospitalName)
                break;
                case 'agency':
                  result = await updateAgency(values);
                  console.log(result.data.data);
                  setSucessMessage(result.data.message)
                  setErrorMessage(null)
                  props.nameChange(result.data.data.agencyName)
                break;
              }
            }else if(res.data.HttpStatus===401){
              setErrorMessage(res.data.message)
              setSucessMessage(null)
            }
          }catch(errr){

          }
        //    try{


        // const res = await updateOrg(values);
        // if(res.data.HttpStatus===200){
        //   setSucessMessage(res.data.message)
        //   props.nameChange(res.data.data.organisationName)
        // }else{
        //   let input = {email:values.email,password:values.password,loginAs:"organisation"};
        //   try{
        //     const res = await login(input);
        //     console.log(res);
        //   }catch(errr){

        //   }
        // }
        //    }catch(err){

        //    }

        // //  console.log(values);
         
         UpdateInfoFormik.resetForm();
           
      
         }
    }

)



  return (
    <div className={classes.root}>
    <div className={classes.background}></div>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5" component="h2" className={classes.title}>
            Update Info
          </Typography>
          <form className={classes.form} onSubmit={UpdateInfoFormik.handleSubmit}>
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
          <TextField label="Name" type="text" name='name' value={UpdateInfoFormik.values.name} error={UpdateInfoFormik.touched.name && Boolean(!UpdateInfoFormik.errors.name)} onChange={UpdateInfoFormik.handleChange}  />
          <FormHelperText error>{UpdateInfoFormik.errors.name}</FormHelperText>
            <TextField label="Email" type="email" name='email'  value={UpdateInfoFormik.values.email}
         readonly/>
            <TextField label="Password" type="password" name='password' value={UpdateInfoFormik.values.password} error={UpdateInfoFormik.touched.password && Boolean(!UpdateInfoFormik.errors.password)} onChange={UpdateInfoFormik.handleChange} />
            <FormHelperText error>{UpdateInfoFormik.errors.password}</FormHelperText>
            <TextField label="Address line 1" type="text" name='addLine1' value={UpdateInfoFormik.values.addLine1} error={UpdateInfoFormik.touched.addLine1 && Boolean(!UpdateInfoFormik.errors.addLine1)} onChange={UpdateInfoFormik.handleChange}  />
            <TextField label="City" type="text" name='city' value={UpdateInfoFormik.values.city} error={UpdateInfoFormik.touched.city && Boolean(!UpdateInfoFormik.errors.city)} onChange={UpdateInfoFormik.handleChange}  />
            <TextField label="Zip" type="text" name='zip' value={UpdateInfoFormik.values.zip} error={UpdateInfoFormik.touched.zip && Boolean(!UpdateInfoFormik.errors.zip)} onChange={UpdateInfoFormik.handleChange}  />

            
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

