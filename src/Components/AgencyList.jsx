import React, { useState } from "react";
import {  getOrg, findAgencyByEmail, getAllAgencies, updateOrg, updateOrgWithAgency, getHosp, updateHospWithAgency, addAgecy } from "../Service/commonService";
import { Alert, AlertTitle, Button, Card, Dialog, DialogActions, DialogContent, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import { makeStyles } from '@material-ui/core/styles';
import { checkAddAgencyAllowed } from "../Service/AgencyService";

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
        '& tbody tr:hover': {
          backgroundColor: '#f6fff2',
        },
      },
      card: {
        minWidth: 300,
        maxWidth: 700,
        // minHeight:400,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[4],
        [theme.breakpoints.up('md')]: {
          padding: theme.spacing(4),
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
     
}));

const AgencyList = (props) => {
  const [agencies, setAgencies] = useState([]);
  const [agencyByEmail, setAgency] = useState({});
  const [openDialog, setopenDialog] = useState(false)
  const[selectedEmail, setSelectedEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [sucessMessage, setSucessMessage] = useState(null);
  const [page, setPage] = useState(0);
  const [errMsgNotAllowed,setErrMsgNotAllowed] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const classes = useStyles();
  React.useEffect(() => {
    async function fetchData() {
      const response = await getAllAgencies();
    //   console.log(response);
      if (response != null)
        setAgencies(response);
    }
    fetchData();
  }, []);

  const handleAgencyClick = async(email) =>{
    if(selectedEmail===email){
      setSelectedEmail(null)
    }
   else{
    const agency = await findAgencyByEmail(email);
    if(agency!=null){
        setSelectedEmail(email);
        setAgency(agency)
    }
   }
    // console.log(agency);
  }

  const handleAddAgency = async(email) =>{
    if(props.type==='org'){
    const confirmed = window.confirm("atmost one agency is allowed to affiliate older agency wil be updated with new one. Click ok to confirm")
    if (confirmed) {
          const empRes =  await getOrg(props.orgEmail);
          //    console.log(empRes.data.data);
          // check here if with the existing agency is there transaction pending return true if eligible
        const flag =   await checkAddAgencyAllowed(empRes.data.data);
        if(flag){
          let json =  empRes.data.data
          json.insuranceAgencyEmail=email;
              const res = await updateOrgWithAgency(json);
              setopenDialog(true);
              if(res.data.HttpStatus==200){
               setSucessMessage("Agency Added SueesFully");
              }else{
                   setErrorMessage(res.data.message);
              }
           //    console.log(res)
        }else{
          setopenDialog(true)
          setErrMsgNotAllowed("Changing agency is not allowed at this moment as there are some ongoing transactions")
          // alert("Changing agency is not allowed at this moment because there are some ongoing transactions")
        }
        }
      }else if(props.type==='hospital'){
         try{
          const hospRes =  await getHosp(props.orgEmail);
          console.log(hospRes.data.data);
     //  let json =  hospRes.data.data
      // json.agencyEmail=email;
          const res = await addAgecy(props.orgEmail,email);
          setopenDialog(true);
          if(res.data.HttpStatus==200){
           setSucessMessage(res.data.message);
          }else{
               setErrorMessage(res.data.message);
          }
         }catch(err){
          setErrorMessage("request Failed");
         }
        }
      
  }
 const handleCloseDialog = () =>{
    setopenDialog(false)
 }
  return (
    <>
  <Dialog open={openDialog} onClose={handleCloseDialog}>
<Card className={classes.card}>
{errorMessage && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {errorMessage}
        </Alert>
      )}
      {errMsgNotAllowed && (
        <>
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
        </Alert>
        <DialogContent>{errMsgNotAllowed}</DialogContent>
        </>
      )}
      {sucessMessage && (
        <Alert severity="success">
          <AlertTitle>success</AlertTitle>
          {sucessMessage}
        </Alert>
      )}
      <DialogActions>
      <Button variant="contained" style={{textTransform:'none'}} onClick={handleCloseDialog}>OK</Button>
      </DialogActions>
</Card>
  </Dialog>
      <div className={classes.listContainer}>
        <Typography variant="subtitle1" className={classes.listTitle} style={{fontSize:'32px'}}>
          List of Available Agencies
        </Typography>
      </div>
      <TableContainer component={Paper} style={{ marginTop: '30px', width: '80%' ,margin: 'auto' }}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow className={classes.tableHead}>
              <TableCell sx={{ fontWeight: 'bold' ,fontSize: '20px' }}>Agency Email</TableCell>
              <TableCell sx={{ fontWeight: 'bold' ,fontSize: '20px' }}>Agency Name</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {  (rowsPerPage > 0
                    ? agencies.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : agencies
                ).map((agency) => (
            <>
            <TableRow key={agency.id}>
                <TableCell style={{ fontWeight: 'bold', fontSize: '15px' }}><Button variant="text"  sx={{ textTransform: 'none' }} onClick={() => handleAgencyClick(agency['Agency Email'])} >{agency['Agency Email']}</Button></TableCell>
                <TableCell style={{ fontWeight: 'bold', fontSize: '15px' }}>{agency['Agency Name']}</TableCell>
                <TableCell><Button variant="contained" onClick={() => handleAddAgency(agency['Agency Email'])}>add</Button></TableCell>
              </TableRow>
                   {selectedEmail && selectedEmail ===agency['Agency Email'] && <TableRow> 
    <TableCell colSpan={3}>
      <div style={{ paddingLeft: '32px' }}>
        <Typography variant="subtitle1" style={{ color: '#666666' }}>
          <strong>Name:</strong> {agencyByEmail.agencyName}
        </Typography>
        <Typography variant="subtitle1" style={{ color: '#666666', marginTop: '8px' }}>
          <strong>Address:</strong> {agencyByEmail.addLine1}  {agencyByEmail.city}  {agencyByEmail.zip}
        </Typography>
      </div>
    </TableCell>
    </TableRow>}
            </>
            ))}
          </TableBody>
        </Table>
        <TablePagination
  rowsPerPageOptions={[5, 10, 25]}
  component="div"
  count={agencies.length}
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
export default AgencyList;

