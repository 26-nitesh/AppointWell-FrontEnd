import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle, Button, Dialog, Paper, Table, TableBody,TablePagination, TableCell, TableContainer, TableHead, TableRow, Typography, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { getEmpForOrg } from '../Service/EmployeeService';
import DeleteIcon from '@mui/icons-material/Delete';

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
       
  });

const EmployeeList  =  (props) =>{
    const [employees, setEmps] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [reload, setReload] = useState(false);
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    React.useEffect(()=>{
        async function fetchData() {
    const emps = await getEmpForOrg(props.orgEmail);
    console.log(emps);
    if(emps!=null){
            setEmps(emps);
            setIsLoading(false);
    }
        }
        fetchData();
      }, [reload]);  


   if(isLoading){
   return(
    <div className={classes.listContainer}>
                    <CircularProgress />
                </div>
   )
   }else{
    return(

        <>
                   <div className={classes.listContainer}>
              <Typography variant="subtitle1" className={classes.listTitle} style={{fontSize:'32px'}}>
              Employee List
              </Typography>
            </div>
            <TableContainer component={Paper} style={{ marginTop: '30px', width: '100%'  }}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow className={classes.tableHead} style={{whiteSpace: 'nowrap'}}>
                  <TableCell sx={{ fontWeight: 'bold' ,fontSize: '18px' }}> #Id</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' ,fontSize: '18px' }}> Name</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' ,fontSize: '18px' }}> Email</TableCell>
                    {/* <TableCell sx={{ fontWeight: 'bold' ,fontSize: '18px' }}>claim date</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' ,fontSize: '18px' }}>status</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' ,fontSize: '18px' }}>remarks</TableCell> */}
                    <TableCell  sx={{ fontWeight: 'bold' ,fontSize: '18px' }}>Last Checkup date</TableCell>
                     <TableCell  sx={{ fontWeight: 'bold' ,fontSize: '18px' }}>Date of Birth</TableCell>
                     <TableCell  sx={{ fontWeight: 'bold' ,fontSize: '18px' }}>Address</TableCell>
                     <TableCell></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {  (rowsPerPage > 0
                          ? employees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          : employees
                      ).map((employee)=>(
                      <>
                      <TableRow key={employee.employeeId} style={{height:'5px', whiteSpace: 'nowrap'}}>
                      <TableCell style={{ fontSize: '15px'}}>{employee.employeeId}</TableCell>
                      <TableCell style={{ fontSize: '15px'}}>{employee.empName}</TableCell>
                      <TableCell style={{fontSize: '15px'}}>{employee.empEmail}</TableCell>
                      <TableCell style={{fontSize: '15px'}}>{employee.lastCheckupDate}</TableCell>
                      <TableCell style={{fontSize: '15px'}}>{employee.dob}</TableCell>
                      <TableCell style={{fontSize: '15px',wordWrap: 'break-word'}}>{employee.addLine1} <br/>{employee.city} {employee.zip}</TableCell>
                      <TableCell> <Button ><DeleteIcon sx={{ color: 'red' }} /></Button></TableCell>

                      {/* <TableCell style={{  fontSize: '15px'}}>{claim.claimDate}</TableCell> 
                      <TableCell style={{  fontSize: '15px'}}>{claim.status}</TableCell>  */}
                      </TableRow>
                      </>
                      ))}
                      </TableBody>
                      </Table>
                      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={employees.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => {
          setPage(newPage);
        }}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
        }}
      />
                      </TableContainer>
      
        </>
          )
   }
}


export default EmployeeList;