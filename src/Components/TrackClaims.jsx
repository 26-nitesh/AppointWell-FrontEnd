import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { trackClaimRecords } from "../Service/ClaimService";
import { Alert, AlertTitle, Button, Dialog, Paper, Table, TableBody,TablePagination, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";

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


const TrackClaims = (props)=>{
    const [claims, setClaims] = useState([]);
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    React.useEffect(()=>{
        async function fetchData() {
      const claims =   await trackClaimRecords(props.hospEmail);
      setClaims(claims);
        }
        fetchData();
      }, []);  
    return(
        <>
              <div className={classes.listContainer}>
        <Typography variant="subtitle1" className={classes.listTitle} style={{fontSize:'32px'}}>
         All Claims
        </Typography>
      </div>
      <TableContainer component={Paper} style={{ marginTop: '30px', width: '100%'  }}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow className={classes.tableHead} style={{whiteSpace: 'nowrap'}}>
            <TableCell sx={{ fontWeight: 'bold' ,fontSize: '18px' }}>appointment Id</TableCell>
              <TableCell sx={{ fontWeight: 'bold' ,fontSize: '18px' }}>agency Email</TableCell>
              <TableCell sx={{ fontWeight: 'bold' ,fontSize: '18px' }}>employee Email</TableCell>
              <TableCell sx={{ fontWeight: 'bold' ,fontSize: '18px' }}>claim date</TableCell>
              <TableCell sx={{ fontWeight: 'bold' ,fontSize: '18px' }}>status</TableCell>
              <TableCell>Amount</TableCell> <TableCell></TableCell>
              </TableRow>
              </TableHead>
              <TableBody>
              {  (rowsPerPage > 0
                    ? claims.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : claims
                ).map((claim)=>(
                <>
                <TableRow key={claim.appintmentId} style={{height:'5px', whiteSpace: 'nowrap'}}>
                <TableCell style={{ fontSize: '15px'}}>{claim.appintmentId}</TableCell>
                <TableCell style={{ fontWeight: 'bold', fontSize: '15px'}}><Button variant="text"  sx={{ textTransform: 'none' }} >{claim.agencyEmail}</Button></TableCell>
                <TableCell style={{ fontWeight: 'bold', fontSize: '15px'}}>{claim.employeeEmail}</TableCell>
                <TableCell style={{  fontSize: '15px'}}>{claim.claimDate}</TableCell> 
                <TableCell style={{  fontSize: '15px'}}>{claim.status}</TableCell> 
                <TableCell style={{ fontWeight: 'bold', fontSize: '15px'}}>₹ {claim.amount}</TableCell>
                <TableCell>   <Button
          variant="text"
          disabled={!(claim.status==='claim rejected')}
          style={{ textTransform: 'none' }}
          // onClick={() => approveAppointment(appointment.employeeEmail)}
        >
          Re-Claim
        </Button></TableCell>
                </TableRow>
                </>
                ))}
              </TableBody>
              </Table>
              <TablePagination
  rowsPerPageOptions={[5, 10, 25]}
  component="div"
  count={claims.length}
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

export default TrackClaims;