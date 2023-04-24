import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button, Link, Dialog, DialogTitle, DialogContent, TextField, FormControl, InputLabel, Select, MenuItem, DialogActions } from '@material-ui/core';
import Login from './Login';
import Register from './Register';
import { Route, Routes, useNavigate } from 'react-router';
import Soon from './Soon';
import { BrowserRouter } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: '10',
    width: '100%',
    overflow: 'hidden'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    position: 'fixed',
    top: 0,
    zIndex: theme.zIndex.appBar,
    background: `linear-gradient(to right, #1565c0, #1565c0)`
    // background:'#c4d6ff',
  },
  navButton: {
    fontWeight: 'bold',
    color: 'inherit',
    '&:hover': {
      backgroundColor: '#fff',
      color: '#000',
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  }
}));

export default function NavBar() {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialog2, setOpenDialog2] = useState(false);
  const [loginType, setLoginType] = useState('');
  const [isLogedIn, setIsLogedIn] = useState(false);
 const navigate = useNavigate();
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

 const handleCloseDialog = () => {
    setOpenDialog(false);
    setOpenDialog2(false)
  };
  const updateloginPopUp = (data) =>{
    setOpenDialog(data);
    setOpenDialog2(true)
    
  };
  const updatePopup = (data) =>{
    setOpenDialog(data);
    if(data==false){
      setIsLogedIn(true)
    }
  };
  const updateregPopUp = (data) =>{
    setOpenDialog2(data);
    setOpenDialog(true)
    
  };
  const handleLoginTypeChange = (event) => {
    setLoginType(event.target.value);
  };
const handleLogOut = ()=>{

  setIsLogedIn(false);
  navigate('/');
}

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Ford Health Checkup
          </Typography>
          {/* <Button className={classes.navButton} color="inherit">
            Want to know more?
          </Button> */}
          {
            isLogedIn ? <Button className={classes.navButton} color="inherit" onClick={handleLogOut}>
            LogOut
          </Button>
          :
          <Button className={classes.navButton} color="inherit" onClick={handleOpenDialog}>
            Login
          </Button>
          }
          {/* <Button className={classes.navButton} color="inherit" onClick={handleOpenDialog}>
            Login
          </Button> */}
        </Toolbar>
      </AppBar>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <Login loginPopUp={updateloginPopUp} loginPopUpAfterLogin = {updatePopup}></Login>
      </Dialog>
      <Dialog open={openDialog2} onClose={handleCloseDialog}>
        <Register regPopUp={updateregPopUp}></Register>
      </Dialog>
    </div>
  );
}
