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
import { getAppointMentByHospital, getHosp, getOrg } from '../Service/commonService';
import Soon from './Soon'
import AgencyList from './AgencyList';
import AppointMentList from './AppointMentList';
import ProcessReport from './ProcessReport';
import HomeIcon from '@material-ui/icons/Home';
import HospitalHome from './HospitalHome';
import TrackClaims from './TrackClaims';
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

function HospitalDashboard(props) {
  const classes = useStyles();
  const location = useLocation();
  const emailOP = location.state.email;
  const [openUpdateInfo,setOpenUpdateInfo] = React.useState(false);
  const [changePassword,setchangePassword] = React.useState(false);//handleChangePassword
  const [openAgencyList, setOpenAgencyList] = React.useState(false);
  const [openAppointmentList, setOpenAppointmentList] = React.useState(false);//
  const [openApprovedAppointMents,  setOpenApprovedAppointMents] = React.useState(false)
  const [appList, setAppList] = React.useState([])
  const [openTrackClaims, setOpenTrackClaims] = React.useState(false)
//   const [orgDetails,setOrgDetails] = React.useState({});
  const [name, setName] = useState('');

  const handleNameChange = (newName) => {
    setName(newName);
  };

      React.useEffect(()=>{
          async function fetchData() {
            console.log(emailOP);
            const response = await getHosp(emailOP);
               console.log(response.data.data);
              setName(response.data.data.hospitalName);
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
    setOpenUpdateInfo(true)
    setchangePassword(false);
    // setOpenApprovedAppointMents(false);
    setOpenApprovedAppointMents(false);
    setOpenAgencyList(false)
    setOpenAppointmentList(false);
    setOpenTrackClaims(false);

  }
  const handleChangePassword = () =>{
    setOpenUpdateInfo(false)
    setchangePassword(true);
    setOpenApprovedAppointMents(false);
    setOpenAgencyList(false)
    setOpenAppointmentList(false);
    setOpenTrackClaims(false);


  }
  const handelAllAgency = () =>{
    setOpenAgencyList(true)
    setOpenUpdateInfo(false)
    setchangePassword(false);
    setOpenApprovedAppointMents(false);
    setOpenAppointmentList(false);
    setOpenTrackClaims(false);

   }

 const handelCreateReport = () =>{
  console.log("onclick happenning");
  setOpenApprovedAppointMents(true);
  console.log(openApprovedAppointMents);
  setOpenAgencyList(false)
  setOpenUpdateInfo(false)
  setchangePassword(false); 
  setOpenAppointmentList(false);
  setOpenTrackClaims(false);

 }  
   const handleProcessAppointment = async() =>{
    setOpenAgencyList(false)
    setOpenUpdateInfo(false)
    setchangePassword(false); 
    setOpenAppointmentList(true);
 setOpenApprovedAppointMents(false);
 setOpenTrackClaims(false);

     const response = await  getAppointMentByHospital(emailOP,false);
     console.log(response);
  //    setOpenAgencyList(false)
  //    setOpenUpdateInfo(false)
  //    setchangePassword(false); 
  //    setOpenAppointmentList(true);
  // setOpenApprovedAppointMents(false);

     if(response!=null){
      setAppList(response)
     }
   }

const handleHomeView = ()=>{
  setOpenAgencyList(false)
  setOpenUpdateInfo(false)
  setchangePassword(false); 
  setOpenAppointmentList(false);
setOpenApprovedAppointMents(false);
setOpenTrackClaims(false);
}   

const handleTrackClaims = ()=>{
  setOpenTrackClaims(true);
  setOpenAgencyList(false)
  setOpenUpdateInfo(false)
  setchangePassword(false); 
  setOpenAppointmentList(false);
setOpenApprovedAppointMents(false);
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
                {/* <ListItem className={classes.info}>
               <ListItemText primary={`Welcome ${name}`} onNameChange={handleNameChange}/>
             </ListItem> */}
             <ListItem button className={classes.listItem} onClick={handleHomeView}>
               <ListItemIcon className={classes.icon}><HomeIcon /></ListItemIcon>
               <ListItemText primary="Home" />
             </ListItem>
             <Divider style={{ backgroundColor: 'white' }} />
             <ListItem button className={classes.listItem}  onClick={handelAllAgency}>
               <ListItemIcon className={classes.icon}><AddIcon /></ListItemIcon>
               <ListItemText primary="Affiliate With Agency" />
             </ListItem>
             <ListItem button className={classes.listItem}  onClick={handleProcessAppointment}>
               <ListItemIcon className={classes.icon}><AddIcon /></ListItemIcon>
               <ListItemText primary="Process Appointments" />
             </ListItem>
             <ListItem button className={classes.listItem}  onClick={handleTrackClaims}>
               <ListItemIcon className={classes.icon}><AddIcon /></ListItemIcon>
               <ListItemText primary="Track Claims" />
             </ListItem>
             {/* <ListItem button className={classes.listItem}  onClick={handelCreateReport}>
               <ListItemIcon className={classes.icon}><AddIcon /></ListItemIcon>
               <ListItemText primary="Create Report" />
             </ListItem> */}
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
       {openUpdateInfo?  <InfoUpdate type="hospital" nameChange ={handleNameChange}  email={emailOP}/> 
       :changePassword? <ChangePassword type="hospital" email={emailOP}/>
       :openAgencyList? <AgencyList orgEmail={emailOP} type="hospital"></AgencyList>
       :openApprovedAppointMents?<ProcessReport hospEmail={emailOP}></ProcessReport>
       :openAppointmentList?<AppointMentList data=  {emailOP}></AppointMentList>
      :openTrackClaims?<TrackClaims hospEmail={emailOP}></TrackClaims>
      :<HospitalHome hospEmail={emailOP}></HospitalHome>}
        {/* Your main content goes here */}
      </main>
    </div>
  );
}

export default HospitalDashboard;
