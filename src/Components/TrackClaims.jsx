import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { trackClaimRecords } from "../Service/ClaimService";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { Alert, AlertTitle, Button, Dialog, Paper, Table, TableBody,TablePagination, TableCell, TableContainer, TableHead, TableRow, Typography, Select, MenuItem, Menu, CircularProgress } from "@mui/material";

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
  const [isLoading, setIsLoading] = useState(true);
    const [claims, setClaims] = useState([]);
    const [filteredClaims, setFilteredClaims] = useState([]);
    const [statusFilter, setStatusFilter] = useState(""); // State variable for selected claim status filter
    const [anchorEl, setAnchorEl] = useState(null); //
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    React.useEffect(()=>{
        async function fetchData() {
      const claims =   await trackClaimRecords(props.hospEmail);
      setClaims(claims);
      setFilteredClaims(claims);
      setIsLoading(false)
        }
        fetchData();
      }, []);  

        // Function to handle opening the menu
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Function to handle closing the menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Function to handle selecting a filter option
  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    handleMenuClose(); // Close the menu after selecting an option

    if (status === "") {
      setFilteredClaims(claims); // If no status is selected, show all claims
    } else {
      const filtered = claims.filter((claim) => claim.status === status); // Filter claims based on selected status
      setFilteredClaims(filtered);
    }

    setPage(0); // Reset the page when applying a filter
  };

  if(isLoading){
    setTimeout(() => {
      setIsLoading(false);
    }, 5000); 
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
         All Claims
        </Typography>
      </div>
      <TableContainer component={Paper} style={{ marginTop: '30px', width: '100%'  }}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow className={classes.tableHead} style={{whiteSpace: 'nowrap'}}>
            <TableCell sx={{ fontWeight: 'bold' ,fontSize: '18px' }}>#Id</TableCell>
              <TableCell sx={{ fontWeight: 'bold' ,fontSize: '18px' }}>Agency</TableCell>
              <TableCell sx={{ fontWeight: 'bold' ,fontSize: '18px' }}>Employee Email</TableCell>
              <TableCell sx={{ fontWeight: 'bold' ,fontSize: '18px' }}>Claim date</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '18px' }}>
                Status
                <Button
                  aria-controls="status-menu"
                  aria-haspopup="true"
                  onClick={handleMenuOpen}
                  endIcon={<ArrowDropDownIcon />}
                >
                  
                </Button>
                <Menu
                  id="status-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={() => handleStatusFilter("")}>All</MenuItem>
                  <MenuItem onClick={() => handleStatusFilter("claim submitted")}>Claim submitted</MenuItem>
                  <MenuItem onClick={() => handleStatusFilter("claim approved")}>Claim Approved</MenuItem>
                  <MenuItem onClick={() => handleStatusFilter("claim rejected")}>Claim Rejected</MenuItem>
                </Menu>
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' ,fontSize: '18px' }}>Remarks</TableCell>
              <TableCell sx={{ fontWeight: 'bold' ,fontSize: '18px'}}>Amount</TableCell> <TableCell></TableCell>
              </TableRow>
              </TableHead>
              <TableBody>
              {  (rowsPerPage > 0
                    ? filteredClaims.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : filteredClaims
                ).map((claim)=>(
                <>
                <TableRow key={claim.appintmentId} style={{height:'5px', whiteSpace: 'nowrap'}}>
                <TableCell style={{ fontSize: '15px'}}>{claim.appintmentId}</TableCell>
                <TableCell style={{ fontWeight: 'bold', fontSize: '15px'}}><Button variant="text"  sx={{ textTransform: 'none' }} >{claim.agencyEmail}</Button></TableCell>
                <TableCell style={{ fontWeight: 'bold', fontSize: '15px'}}>{claim.employeeEmail}</TableCell>
                <TableCell style={{  fontSize: '15px'}}>{claim.claimDate}</TableCell> 
                <TableCell style={{  fontSize: '15px',fontWeight:'bold',color: claim.status === 'claim approved' ? 'green' : claim.status === 'claim rejected' ? 'red' : 'black' }}>{claim.status}</TableCell> 
                <TableCell style={{  fontSize: '15px'}}>{claim.claimRemarks}</TableCell> 
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
    )}
}

export default TrackClaims;