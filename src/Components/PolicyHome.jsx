import React, { useState } from 'react';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Paper, Select } from '@material-ui/core';
import { Alert, AlertTitle, Button, Card, CardContent, Dialog, FormHelperText, InputLabel, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { createPolicy, getPolicyByOrg } from '../Service/PolicyService';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import { useFormik } from 'formik';
import * as yup from 'yup';
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

const useStyles = makeStyles((theme) => ({
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
      title: {
        textAlign: 'center',
        marginBottom: theme.spacing(4),
      },
      listTitle: {
        fontWeight: 'bold',
        // fontSize: '32px',
        // marginBottom: '20px',
      },
      form: {
        marginTop:12,
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(2),
      },
      card: {
        minWidth: 400,
        maxWidth: 700,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[4],
        [theme.breakpoints.up('md')]: {
          padding: theme.spacing(4),
        },
      },
     
}));

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

      const handleDeletePolicy = (policy)=>{
        console.log("delete");
      }
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
                <TableCell> <Button onClick={()=>{handleDeletePolicy(policy)}}><DeleteIcon sx={{ color: 'red' }} /></Button></TableCell>
                {/* <TableCell>{policy.policyId}</TableCell> */}
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
  const classes = useStyles();

  const [openDialog, setOpenDialog] = React.useState(true)
  const handleDialogClose = ()=>{
    setOpenDialog(false)
    props.changesetSelectedOption('review');
  }
  const [errorMessage, setErrorMessage] = useState(null);
  const [sucessMessage, setSucessMessage] = useState(null);
  const PolicyValidation = yup.object().shape({
    orgEmail: yup.string().email().required("Required!"),
    policyName: yup.string().required("Required!"),
    otherOption: yup.string().when(["policyName", "other"], {
      is: (policyName, other) => policyName === "other" && other,
      then: yup.string().required("Required!"),
    }),
    value: yup.string().required("Required!"),
    frequency: yup.string().required("Required!"),
  });
const [formValues, setFormValues] = useState(null);
const policyFormik = useFormik({
  initialValues: {
    orgEmail: props.orgEmail,
    policyName: "",
    otherOption: "",
    value: "",
    frequency: "",
  },
  validationSchema: PolicyValidation,
  onSubmit: async(values) => {

    const policyResponse = await createPolicy(values);
    if(policyResponse.data.HttpStatus===400){
      setSucessMessage(null)
      setErrorMessage(policyResponse.data.message)
      policyFormik.resetForm();

    }else  if(policyResponse.data.HttpStatus===201){
      setSucessMessage("Policy added suscessfully")
      setErrorMessage(null);
    }else{
      setSucessMessage(null)
      setErrorMessage("Error occured")
    }
    // console.log(policyResponse);
    setFormValues(values);
  },
});
const [selectedOptionForPolicyType, setSelectedOptionForPolicyType] = useState('');
const [otherOption, setOtherOption] = useState('');

const handleOptionChangeForPolicyType = (event) => {
  const selected = event.target.value;
  console.log(selected);
  setSelectedOptionForPolicyType(selected);
  if (selected === "other") {
    setOtherOption("");
  }
};

const handleOtherOptionChange = (event) => {
  setOtherOption(event.target.value);
};


  return <div>
    <Dialog open={openDialog} onClose={handleDialogClose}>
      <Card className={classes.card} style={{minHeight:680}}>
       <CardContent>
       <Typography variant="h5" component="h2" style={{marginBottom:'12px'}} className={classes.title}>
            Add your policies
          </Typography><br/>
       <form className={classes.form} onSubmit={policyFormik.handleSubmit}>
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
     
      <TextField label="Organisation Email" type="email" name='orgEmail' value={policyFormik.values.orgEmail} />
      <FormControl fullWidth>
        <InputLabel>Policy Name *</InputLabel>
        <Select  name="policyName" value={policyFormik.values.policyName} onChange={
    policyFormik.handleChange}
  //   handleOptionChangeForPolicyType(event);
  //   // call your function to handle the action
  //   // handleDropdownSelection(event.target.value);
  // }}
   >
          <MenuItem value="minAge">Minimum Age</MenuItem>
          <MenuItem value="minServiceMonth">Minimum Service Months</MenuItem>
          <MenuItem value="AgeGreaterThan">Age Greater Than Policy</MenuItem>
          <MenuItem value="Default">Default (Applicable to All)</MenuItem>
          <MenuItem value="other">Other</MenuItem>
        </Select>
      </FormControl>
      {policyFormik.values.policyName === "other" && (
          <>
          <TextField label="Other Name *"
           type="text" name='otherOption' 
           value={policyFormik.values.otherOption}
              onChange={policyFormik.handleChange}
          />
           {policyFormik.errors.otherOption &&
              policyFormik.touched.otherOption && (
                <FormHelperText error>{policyFormik.errors.otherOption}</FormHelperText>
              )}
          </>
        )}

            <TextField label="Policy Value *" type="text" name='value' value={policyFormik.values.value} error={policyFormik.touched.value && Boolean(!policyFormik.errors.value)} onChange={policyFormik.handleChange} />
            <FormHelperText error>{policyFormik.errors.value}</FormHelperText>
            <TextField label="Interval between two Checkup *" type="text" name='frequency' value={policyFormik.values.frequency} error={policyFormik.touched.frequency && Boolean(!policyFormik.errors.frequency)} onChange={policyFormik.handleChange} />
            <FormHelperText error>{policyFormik.errors.frequency}</FormHelperText>
            <Button variant="contained" color="primary" type="submit">
              Add
            </Button>
          </form>
       </CardContent>
      </Card>
    </Dialog>
  </div>;
}
export default PolicyHome;