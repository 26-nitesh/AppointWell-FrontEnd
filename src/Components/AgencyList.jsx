import React, { useState } from "react";
import {  getOrg, findAgencyByEmail, getAllAgencies, updateOrg, updateOrgWithAgency } from "../Service/commonService";
import { Alert, AlertTitle, Button, Dialog, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { makeStyles } from '@material-ui/core/styles';

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

const AgencyList = (props) => {
  const [agencies, setAgencies] = useState([]);
  const [agencyByEmail, setAgency] = useState({});
  const [openDialog, setopenDialog] = useState(false)
  const[selectedEmail, setSelectedEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [sucessMessage, setSucessMessage] = useState(null);
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
    const agency = await findAgencyByEmail(email);
    if(agency!=null){
        setSelectedEmail(email);
        setAgency(agency)
    }
    // console.log(agency);
  }

  const handleAddAgency = async(email) =>{
    const confirmed = window.confirm("atmost one agency is allowed to affiliate older agency wil be updated with new one. Click ok to confirm")
    if (confirmed) {
       const empRes =  await getOrg(props.orgEmail);
    //    console.log(empRes.data.data);
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
      }
  }
 const handleCloseDialog = () =>{
    setopenDialog(false)
 }
  return (
    <>
  <Dialog open={openDialog} onClose={handleCloseDialog}>
  {errorMessage && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {errorMessage}
        </Alert>
      )}
      {sucessMessage && (
        <Alert severity="success">
          <AlertTitle>success</AlertTitle>
          {sucessMessage}
        </Alert>
      )}
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
            {agencies.map((agency) => (
            <>
            <TableRow key={agency.id}>
                <TableCell style={{ fontWeight: 'bold', fontSize: '15px' }}><Button variant="text"  sx={{ textTransform: 'none' }} onClick={() => handleAgencyClick(agency['Agency Email'])} >{agency['Agency Email']}</Button></TableCell>
                <TableCell style={{ fontWeight: 'bold', fontSize: '15px' }}>{agency['Agency Name']}</TableCell>
                <TableCell><Button variant="contained" onClick={() => handleAddAgency(agency['Agency Email'])}>add</Button></TableCell>
              </TableRow>
                   {selectedEmail && selectedEmail ===agency['Agency Email'] && <TableRow> 
                   {/* <div>
      <Typography variant="subtitle1">
        <strong>Name: </strong>{agencyByEmail.agencyName} <strong>Address: </strong> {agencyByEmail.addLine1}  <strong>City: </strong>{agencyByEmail.city}   <strong>Zip: </strong>{agencyByEmail.zip}
      </Typography>
    </div> */}
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
      </TableContainer>


    </>
  )
}
export default AgencyList;

