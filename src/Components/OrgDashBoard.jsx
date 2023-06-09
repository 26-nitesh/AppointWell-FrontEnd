import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import Drawer from '@material-ui/core/Drawer';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
import { Button, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import UpdateIcon from '@material-ui/icons/Update';
import AddEmployeeForm from './AddEmpForm';
import ChangePassword from './ChangePassword';
import { useLocation } from 'react-router-dom';
import { getOrg } from '../Service/commonService';
import InfoUpdate from './InfoUpdate';
import OrgHome from './OrgHome';
import AgencyList from './AgencyList';
import HomeIcon from '@material-ui/icons/Home';
import EmployeeList from './EmployeeList';
import PolicyHome from './PolicyHome';
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
    width:100,
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

function OrgDashboard(props) {
  const classes = useStyles();
  const location = useLocation();
  const emailOP = location.state.email;
  const [openAddEmp, setAddEmp] = React.useState(false);
  const [openUpdateInfo,setOpenUpdateInfo] = React.useState(false);
  const [changePassword,setchangePassword] = React.useState(false);//handleChangePassword
  const [orgDetails,setOrgDetails] = React.useState({});
  const [name, setName] = useState('');
const [openAgencyList, setOpenAgencyList] = React.useState(false);
const [openManageEmployee,setOpenManageEmployee] = React.useState(false);
const [openPolicyManagement,setOpenPolicyManagement] =  React.useState(false);


  const handleNameChange = (newName) => {
    setName(newName);
  };

      React.useEffect(()=>{
          async function fetchData() {
            console.log(emailOP);
            const response = await getOrg(emailOP);
               console.log(response.data.data);
              setOrgDetails(response.data.data)
              setName(response.data.data.organisationName);
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
  const handleAddEmployee = () => {
    setAddEmp(true);
    setOpenUpdateInfo(false)
    setchangePassword(false);
    setOpenManageEmployee(false)
    setOpenPolicyManagement(false)

    setOpenAgencyList(false)
  };
  const handleOrgInfoUpdate = () =>{
    setOpenUpdateInfo(true)
    setAddEmp(false);
    setchangePassword(false);
    setOpenManageEmployee(false)
    setOpenPolicyManagement(false)

    setOpenAgencyList(false)
  }
  const handleChangePassword = () =>{
    setOpenUpdateInfo(false)
    setAddEmp(false);
    setchangePassword(true);
    setOpenManageEmployee(false)
    setOpenAgencyList(false)
    setOpenPolicyManagement(false)


  }
  const handleButtonClick = (event) => {
    // handle button click event
    setOpenUpdateInfo(false)
    setAddEmp(false);
    setOpenAgencyList(false);
    setOpenPolicyManagement(false)

    setchangePassword(false);
    event.preventDefault();
  };
  const handelAllAgency = () =>{
   setOpenAgencyList(true)
   setAddEmp(false)
   setOpenUpdateInfo(false)
   setchangePassword(false);
   setOpenManageEmployee(false)
   setOpenPolicyManagement(false)

  }
  
  const handleHomeView = () =>{
    setOpenAgencyList(false)
    setAddEmp(false)
    setOpenUpdateInfo(false)
    setchangePassword(false);
    setOpenManageEmployee(false)
    setOpenPolicyManagement(false)

  }
  const handleManageEmployee = () =>{
    setOpenAgencyList(false)
    setAddEmp(false)
    setOpenUpdateInfo(false)
    setchangePassword(false);
    setOpenManageEmployee(true);
    setOpenPolicyManagement(false)

  }

const hanadlePolicyManagement = () =>{
  // console.log('clicked');
  setOpenAgencyList(false)
  setAddEmp(false)
  setOpenUpdateInfo(false)
  setchangePassword(false);
  setOpenManageEmployee(false)
  setOpenPolicyManagement(true)


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
                {/* <a href='#' onClick={handleButtonClick}>
                <ListItem className={classes.info}>
              <ListItemText primary={`Welcome ${name}`} onNameChange={handleNameChange} style={{ fontWeight: 'bold', textDecoration: 'none' }}/>
             </ListItem></a> */}
             <ListItem button className={classes.listItem} onClick={handleHomeView}>
               <ListItemIcon className={classes.icon}><HomeIcon /></ListItemIcon>
               <ListItemText primary="Home" />
             </ListItem>
             <Divider style={{ backgroundColor: 'white' }} />
             <ListItem button className={classes.listItem} onClick={handleAddEmployee}>
               <ListItemIcon className={classes.icon}><AddIcon /></ListItemIcon>
               <ListItemText primary="Add Employee" />
             </ListItem>
             <ListItem button className={classes.listItem}  onClick={handelAllAgency}>
               <ListItemIcon className={classes.icon}><AddIcon /></ListItemIcon>
               <ListItemText primary="Affiliate With Agency" />
             </ListItem>
             <ListItem button className={classes.listItem} onClick={hanadlePolicyManagement}>
               <ListItemIcon className={classes.icon}><AddIcon /></ListItemIcon>
               <ListItemText primary="Policy Management" />
             </ListItem>
             <ListItem button className={classes.listItem}  onClick={handleOrgInfoUpdate}>
               <ListItemIcon className={classes.icon}><UpdateIcon /></ListItemIcon>
               <ListItemText  primary="Update Info" />
             </ListItem>
              <ListItem button className={classes.listItem}  onClick={handleChangePassword}>
               <ListItemIcon className={classes.icon}><UpdateIcon /></ListItemIcon>
               <ListItemText  primary="Change Pssword" />
             </ListItem>
             <ListItem button className={classes.listItem} onClick={handleManageEmployee}>
               <ListItemIcon className={classes.icon}><UpdateIcon /></ListItemIcon>
               <ListItemText primary="Manage Employee" />
             </ListItem>
           </List>
      </Drawer>
      <main className={classes.content}>
       {openAddEmp ? 
       <AddEmployeeForm email={emailOP}/>
                    :openUpdateInfo? <InfoUpdate type="organisation" nameChange ={handleNameChange}  email={emailOP}/> 
                    :changePassword? <ChangePassword type="organisation" email={emailOP}/>
                    :openAgencyList? <AgencyList orgEmail={emailOP} type= "org"></AgencyList>
                    :openManageEmployee? <EmployeeList  orgEmail={emailOP}></EmployeeList>
                    :openPolicyManagement?<PolicyHome orgEmail={emailOP}></PolicyHome>
                    : <OrgHome orgEmail = {emailOP}></OrgHome>}
       
      </main>
    </div>
  );
}

export default OrgDashboard;
