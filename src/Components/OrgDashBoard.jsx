import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import Drawer from '@material-ui/core/Drawer';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import UpdateIcon from '@material-ui/icons/Update';
import AddEmployeeForm from './AddEmpForm';
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

function OrgDashboard(props) {
  const classes = useStyles();
  const [openAddEmp, setAddEmp] = React.useState(false);

  const handleAddEmployee = () => {
    setAddEmp(!openAddEmp);
  };
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
               <ListItemText primary="Welcome company"/>
             </ListItem>
             <Divider style={{ backgroundColor: 'white' }} />
             <ListItem button className={classes.listItem} onClick={handleAddEmployee}>
               <ListItemIcon className={classes.icon}><AddIcon /></ListItemIcon>
               <ListItemText primary="Add Employee" />
             </ListItem>
             <ListItem button className={classes.listItem}>
               <ListItemIcon className={classes.icon}><AddIcon /></ListItemIcon>
               <ListItemText primary="Affiliate With Agency" />
             </ListItem>
             <ListItem button className={classes.listItem}>
               <ListItemIcon className={classes.icon}><AddIcon /></ListItemIcon>
               <ListItemText primary="Add policy" />
             </ListItem>
             <ListItem button className={classes.listItem}>
               <ListItemIcon className={classes.icon}><UpdateIcon /></ListItemIcon>
               <ListItemText  primary="Update Info" />
             </ListItem>
              <ListItem button className={classes.listItem}>
               <ListItemIcon className={classes.icon}><UpdateIcon /></ListItemIcon>
               <ListItemText  primary="Change Pssword" />
             </ListItem>
             <ListItem button className={classes.listItem}>
               <ListItemIcon className={classes.icon}><UpdateIcon /></ListItemIcon>
               <ListItemText primary="Manage Employee" />
             </ListItem>
           </List>
      </Drawer>
      <main className={classes.content}>
       {openAddEmp ? 
       <AddEmployeeForm/>:<>view</>}
        {/* Your main content goes here */}
      </main>
    </div>
  );
}

export default OrgDashboard;
