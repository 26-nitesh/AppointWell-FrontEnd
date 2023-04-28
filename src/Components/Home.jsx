import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography } from '@material-ui/core';
import logo from '../logo.png';

const useStyles = makeStyles((theme) => ({
  logo: {
    marginRight: theme.spacing(2),
    height: 70, 
    // width: 80,
    // borderRadius: '100%', 
    objectFit: 'cover',
  },
  bulletPoint: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
  },
  bullet: {
    content: '""',
    display: 'inline-block',
    width: '8px',
    height: '8px',
    backgroundColor: theme.palette.text.primary,
    borderRadius: '50%',
    marginRight: theme.spacing(1),
  },
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    marginTop: theme.spacing(8),
    backgroundColor: '#f2f2f2'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  image: {
    maxWidth: '100%',
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <Typography variant="h4" gutterBottom>
              Welcome to AppointWell
              <Typography variant='subtitle2'>A node that binds Hospitals, Insurance Agencies And Companies</Typography>
            </Typography>
            <br></br>
            <Typography variant="body1" gutterBottom>
            </Typography>
            <Typography variant="body1" gutterBottom>
            <strong>AppointWell is the all-in-one platform that Simplifies the Appointment Management and Coordination for Companies, Insurance Agencies, and Hospitals</strong>
            </Typography>
        
            <Typography variant="body1">
            <strong>AppointWell fosters collaboration between companies, insurance agencies, and hospitals. Companies can establish partnerships with insurance agencies, ensuring their employees have access to a network of trusted hospitals. Insurance agencies, in turn, maintain partnerships with hospitals to provide quality healthcare services.</strong>
         </Typography><br/>
            <Typography variant="body1" gutterBottom><strong>
            Experience the convenience and efficiency of AppointWell today. Simplify appointment management, enhance healthcare coordination, and ensure a seamless experience for companies, insurance agencies, hospitals, and employees. Join AppointWell and unlock a new level of efficiency and collaboration in healthcare management.</strong>
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <img src="https://images.unsplash.com/photo-1527613426441-4da17471b66d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=852&q=80" alt="random" className={classes.image} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <img src="https://images.unsplash.com/photo-1536064479547-7ee40b74b807?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="random" className={classes.image} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
          <img src={logo} alt="Logo" className={classes.logo} />
    <div>
      <Typography variant="h4" gutterBottom>
        Why AppointWell?
      </Typography><br/>
      <ul>
        <li className={classes.bulletPoint}>
          <span className={classes.bullet}></span>
          <Typography variant="body1">
            <strong>Single and Efficient Platform for Multiple Users</strong>
          </Typography>
        </li>
        <li className={classes.bulletPoint}>
          <span className={classes.bullet}></span>
          <Typography variant="subtitle1" gutterBottom>
            <strong>Easy and Convenient</strong>
          </Typography>
        </li>
        <li className={classes.bulletPoint}>
          <span className={classes.bullet}></span>
          <Typography variant="body1" gutterBottom>
            <strong>Transparent Claim System</strong>
          </Typography>
        </li>
        <li className={classes.bulletPoint}>
          <span className={classes.bullet}></span>
          <Typography variant="body1" gutterBottom>
          <strong> Seamless Appointment Scheduling</strong>
          </Typography>
        </li>
        <li className={classes.bulletPoint}>
          <span className={classes.bullet}></span>
          <Typography variant="body1" gutterBottom>
          <strong>  Streamlined Coordination</strong>
          </Typography>
        </li>
        <li className={classes.bulletPoint}>
          <span className={classes.bullet}></span>
          <Typography variant="body1" gutterBottom>
           <strong> Enhanced Productivity</strong>
          </Typography>
        </li>
        <li className={classes.bulletPoint}>
          <span className={classes.bullet}></span>
          <Typography variant="body1" gutterBottom>
           <strong> Data Security and Privacy</strong>
          </Typography>
        </li>
      </ul>
      </div>
        
          </Paper>
        </Grid>
      </Grid>
      
    </div>
  );
}

