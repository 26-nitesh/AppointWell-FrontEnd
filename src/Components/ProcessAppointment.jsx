import React, { useEffect, useState } from 'react';
import { getAllHospitalsForOrg } from '../Service/commonService';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
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

})


const ProcessAppointment = (props) =>{
    const classes = useStyles();
    const [hospitals, sethospitals] = useState([]);
    React.useEffect(()=>{
        async function getAllHospitals() {

            // console.log(props.comapnyEmail);
            const response = await getAllHospitalsForOrg(props.comapnyEmail);
            if(response!=null){
                sethospitals(response)
            }
            console.log(response);
        //   const response = await getEmp(compEmail);
        //     // setOrgDetails(response.data.data)
        //     setName(response.data.data.empName);
        }
        getAllHospitals();
      }, []);

const handleAddappointment = (hospialEmail)=>{

    
}
    return(
        <>
          <div className={classes.listContainer}>
        <Typography variant="subtitle1" className={classes.listTitle} style={{fontSize:'32px'}}>
          List of Available Hospitals
        </Typography>
      </div>
          <TableContainer component={Paper} style={{ marginTop: '30px', width: '80%' ,margin: 'auto' }}>
          <Table className={classes.table}>
          <TableHead>
            <TableRow className={classes.tableHead}>
            <TableCell sx={{ fontWeight: 'bold' ,fontSize: '20px' }}>hospial Email</TableCell>
              <TableCell sx={{ fontWeight: 'bold' ,fontSize: '20px' }}>hospital Name</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {hospitals.map((hospital) =>(
                <>
                <TableRow key={hospital.hospitalId}>
                <TableCell style={{ fontWeight: 'bold', fontSize: '15px' }}><Button variant="text"  sx={{ textTransform: 'none' }} >{hospital.hospitalEmail}</Button></TableCell>
                <TableCell style={{ fontWeight: 'bold', fontSize: '15px' }}>{hospital.hospitalName}</TableCell>
                <TableCell><Button variant="contained" onClick={() => handleAddappointment(hospital.hospitalEmail)}>Book</Button></TableCell>
              </TableRow>
                </>
            ))}
          </TableBody>
         </Table>
          </TableContainer>
        </>
    )
}

export default ProcessAppointment;