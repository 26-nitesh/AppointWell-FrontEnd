import React, { useState } from 'react';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Paper } from '@material-ui/core';
import { Card, Dialog, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { getPolicyByOrg } from '../Service/PolicyService';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@mui/icons-material/Delete';

function PolicyHome(props) {
  const [selectedOption, setSelectedOption] = useState('review');
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
 
const changesetSelectedOption = (data) =>{
   setSelectedOption('review')
}
  return (
    <div>
      <Typography>
        <h2>Select an Action</h2>
      </Typography>
      <FormControl component="fieldset">
        {/* <FormLabel component="legend">Select an option:</FormLabel> */}
        <RadioGroup aria-label="policyOption" name="policyOption" value={selectedOption} onChange={handleOptionChange}>
          <FormControlLabel value="review" control={<Radio />} label="Review Policy" />
          <FormControlLabel value="create" control={<Radio />} label="Create New Policy" />
        </RadioGroup>
      </FormControl>
      {selectedOption === 'review' && <ReviewPolicy orgEmail={props.orgEmail}/>}
      {selectedOption === 'create' && <CreatePolicy  orgEmail={props.orgEmail}  changesetSelectedOption={changesetSelectedOption}/>}
    </div>
  );
}

const useStyles = makeStyles({
    table: {
        // minWidth: 900,
        
        '& tbody tr:hover': {
          backgroundColor: '#f6fff2',
        },
      },
      tableHead: {
        backgroundColor: '#f6fff2',
        fontWeight: 'bold',
        fontSize: '18px',
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
        // fontSize: '32px',
        // marginBottom: '20px',
      },
     
});

function ReviewPolicy(props) {
    const classes = useStyles();
    const [policyList, setpolicyList] = useState([]);

    React.useEffect(() => {
        async function fetchData() {
   const policies = await getPolicyByOrg(props.orgEmail);
        // console.log(props.orgEmail);
        setpolicyList(policies)
        }
        fetchData();
      }, [props.orgEmail]);
  return (
    <div>
           <TableContainer component={Paper} style={{ marginTop: '30px', width: '60%' ,margin: 'auto' }}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow className={classes.tableHead}>
              <TableCell sx={{ fontWeight: 'bold' ,fontSize: '15px' }}>Policy Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' ,fontSize: '15px' }}>Value</TableCell>
              <TableCell sx={{ fontWeight: 'bold' ,fontSize: '15px' }}>Min gap between 2 checkups</TableCell>
              <TableCell></TableCell>
              </TableRow>
              </TableHead>
          <TableBody>
          {policyList.map((policy)=>(
        <>
        <TableRow key={policy.policyId} style={{height:'5px', whiteSpace: 'nowrap'}}>
                <TableCell style={{ fontWeight: 'bold', fontSize: '15px'}}>{policy.policyName}</TableCell>
                <TableCell style={{  fontSize: '15px' }}>{policy.value}</TableCell>
                <TableCell style={{  fontSize: '15px' }}>{policy.frequency}</TableCell>
                <TableCell> <DeleteIcon sx={{ color: 'red' }} /></TableCell>
                </TableRow>
                </>
          ))}
          </TableBody>
              </Table>
              </TableContainer>
  </div>
  )
}

function CreatePolicy(props) {
  const [openDialog, setOpenDialog] = React.useState(true)
  const handleDialogClose = ()=>{
    setOpenDialog(false)
    props.changesetSelectedOption('review');
  }
  return <div>
    <Dialog open={openDialog} onClose={handleDialogClose}>
      <Card>
        card on dialog
      </Card>
    </Dialog>
  </div>;
}
export default PolicyHome;