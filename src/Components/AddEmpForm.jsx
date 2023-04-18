import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Button, TextField, Typography } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
      marginTop: theme.spacing(4),
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
      alignItems: 'center',
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
  
    return (
      <div className={classes.root}>
        <div className={classes.background}></div>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h5" component="h2" className={classes.title}>
              Add Employee
            </Typography>
            <form className={classes.form}>
              <TextField
                className={classes.textField}
                label="Name"
                variant="outlined"
                required
              />
              <TextField
                className={classes.textField}
                label="Email"
                variant="outlined"
                type="email"
                required
              />
              <TextField
                className={classes.textField}
                label="password"
                variant="outlined"
                type="password"
                required
              />
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
  