import { TableHead } from "@material-ui/core";
import { Button, ButtonBase, Dialog, DialogActions, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from "react";
import { getAppointMentByHospital } from "../Service/commonService";


const useStyles = makeStyles({
    table: {
        minWidth: 750,
        '& tbody tr:hover': {
          backgroundColor: '#f6fff2',
        },
      },
      tableHead: {
        backgroundColor: '#f6fff2',
        fontWeight: 'bold',
        fontSize: '24px',
      },
      listContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: '50px',
      },
      listTitle: {
        fontWeight: 'bold',
        fontSize: '32px',
        marginBottom: '20px',
      },
     
});

const ProcessReport  = (props) =>{
    const classes = useStyles();
    const [reload, setReload] = React.useState(false)
    const [appList, setAppList] = React.useState([])

    React.useEffect(()=>{
        async function fetchData() {
          const response = await  getAppointMentByHospital(props.hospEmail,false);
            if(response!=null){
                setAppList(response)
                setReload(false)
               }
               console.log(response);
        }
        fetchData();
      }, [reload]);
    return(
        <>
        <div className={classes.listContainer}>
    <Typography variant="subtitle1" className={classes.listTitle} style={{fontSize:'32px'}}>
      List of Appointments
    </Typography>
  </div>
  <TableContainer component={Paper} style={{ marginTop: '30px', width: '80%' ,margin: 'auto' }}>
    <Table className={classes.table}>
      <TableHead>
        <TableRow className={classes.tableHead}>
          <TableCell sx={{ fontWeight: 'bold' ,fontSize: '20px' }}>Employee Email</TableCell>
          <TableCell sx={{ fontWeight: 'bold' ,fontSize: '20px' }}>Date Of AppointMent</TableCell>
          <TableCell sx={{ fontWeight: 'bold' ,fontSize: '20px' }}>Applied Date</TableCell>
          <TableCell sx={{ fontWeight: 'bold' ,fontSize: '20px' }}>Status</TableCell>
          <TableCell></TableCell>    <TableCell></TableCell> <TableCell></TableCell>
        </TableRow>
      </TableHead>
      </Table>
      </TableContainer>
      </>
    )
}


export default ProcessReport;