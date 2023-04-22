import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import Drawer from '@material-ui/core/Drawer';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import UpdateIcon from '@material-ui/icons/Update';
import AddEmployeeForm from './AddEmpForm';
import InfoUpdate from './InfoUpdate';
import ChangePassword from './ChangePassword';
import { useLocation } from 'react-router-dom';
import { getEmp, getOrg } from '../Service/commonService';
import ProcessAppointment from './ProcessAppointment';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginTop: theme.spacing(8),
    minHeight: '90vh',
    backgroundColor:'#f2f2f2'
    // minHeight: `calc(100vh - ${theme.spacing(8)}px - ${theme.mixins.toolbar.minHeight}px - ${theme.spacing(2)}px)`,

  },
  drawer: {
     marginTop: theme.spacing(8),
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    marginTop: theme.spacing(7),
    width: drawerWidth,
    zIndex:800,
    backgroundColor: '#2c3e50',
    color: 'white',

  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  icon: {
    color: 'white',
    
    marginRight: theme.spacing(1),
  },
  listItem: {
    // '&:hover': {
    //   color: '#333',
    //   backgroundColor: '#f2f2f2',
    // },
    '&:hover': {
      color: 'black',
      fontWeight: 'bold',
      backgroundColor: '#f2f2f2',
      '& $icon': {
        color: 'black',
      },
    },
  },
  listItemText: {
    fontSize: '1.2rem',
    // color: '#333',
  },
  info:{
    fontSize: '4rem',
    fontWeight:'bold',
    color:'black',
    backgroundColor: '#f2f2f2',
    marginTop:'0',
    padding:'13px',
  },
}));

function EmpDashBoard(props) {
  const classes = useStyles();
  const location = useLocation();
  const emailOP = location.state.email;
  const [openUpdateInfo,setOpenUpdateInfo] = React.useState(false);
  const [openProcessAppointMent,setOpenProcessAppointMent] = React.useState(false);
  const [changePassword,setchangePassword] = React.useState(false);//handleChangePassword
//   const [orgDetails,setOrgDetails] = React.useState({});
  const [name, setName] = useState('');
  const [compEmail, setCompEmail] = useState('');
  const handleNameChange = (newName) => {
    setName(newName);
  };

      React.useEffect(()=>{
          async function fetchData() {
            const response = await getEmp(emailOP);
              // setOrgDetails(response.data.data)
              setName(response.data.data.empName);//orgEmail
              setCompEmail(response.data.data.orgEmail);
          }
          fetchData();
        }, []);
      //   try{
      //     const response = await getOrg(props.email);
      //     console.log(response);
      //     setEmpDetails(response);
      //   }catch(err){

      //   }
    
      // },[empDetails]);

  const handleOrgInfoUpdate = () =>{
    setOpenProcessAppointMent(false);
    setOpenUpdateInfo(true)
    setchangePassword(false);
  }
  const handleChangePassword = () =>{
    setOpenProcessAppointMent(false);
    setOpenUpdateInfo(false)
    setchangePassword(true);
  }
  const handleProcessAppointment = ()=>{
    setOpenUpdateInfo(false)
    setchangePassword(false);
    setOpenProcessAppointMent(true);
   
  }
  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
                <List>
                <ListItem className={classes.info}>
               <ListItemText primary={`Welcome ${name}`} onNameChange={handleNameChange}/>
             </ListItem>
             <Divider style={{ backgroundColor: 'white' }} />
             <ListItem button className={classes.listItem} onClick={handleProcessAppointment}>
               <ListItemIcon className={classes.icon}><AddIcon /></ListItemIcon>
               <ListItemText primary="Book Appointment" />
             </ListItem>
             <ListItem button className={classes.listItem}  onClick={handleOrgInfoUpdate}>
               <ListItemIcon className={classes.icon}><UpdateIcon /></ListItemIcon>
               <ListItemText  primary="Update Info" />
             </ListItem>
              <ListItem button className={classes.listItem}  onClick={handleChangePassword}>
               <ListItemIcon className={classes.icon}><UpdateIcon /></ListItemIcon>
               <ListItemText  primary="Change Pssword" />
             </ListItem>
           </List>
      </Drawer>
      <main className={classes.content}>
       {openUpdateInfo?  <InfoUpdate type="employee" nameChange ={handleNameChange}  email={emailOP}/> 
       :changePassword? <ChangePassword type="employee" email={emailOP}/>
       : openProcessAppointMent?<ProcessAppointment email={emailOP} comapnyEmail = {compEmail}/>: <>OKKK</>}
        {/* Your main content goes here */}
      </main>
    </div>
  );
}

export default EmpDashBoard;
