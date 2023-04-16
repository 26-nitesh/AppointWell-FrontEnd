import React, { useState } from 'react';
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
  const classes = useStyles();


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
          <form className={classes.form}>
            <TextField label="Email" type="email" required />
            <TextField label="Password" type="password" required />
            <TextField
              label="Login As"
              select
              value="v"
              variant="standard"
              required
            >
            <MenuItem value="hospital">Hospital Admin</MenuItem>
              <MenuItem value="agency">Insurance Agency Admin</MenuItem>
              <MenuItem value="employee">Employee</MenuItem>
              <MenuItem value="org">Employer</MenuItem>
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

