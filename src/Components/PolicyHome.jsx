import React, { useState } from 'react';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Paper } from '@material-ui/core';
import { Alert, AlertTitle, Button, Card, CardContent, Dialog, FormHelperText, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { getPolicyByOrg } from '../Service/PolicyService';
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
  const classes = useStyles();

  const [openDialog, setOpenDialog] = React.useState(true)
  const handleDialogClose = ()=>{
    setOpenDialog(false)
    props.changesetSelectedOption('review');
  }
  const [errorMessage, setErrorMessage] = useState(null);
  const [sucessMessage, setSucessMessage] = useState(null);

  const PolicyValidation = yup.object({
    orgEmail: yup.string().email().required("required !!"),
    policyName: yup.string().required("required !!"),
    value: yup.string().required("required !!"),
    frequency: yup.string().required("required !!")
  })
  const policyFormik = useFormik(
    {
         initialValues:{
          orgEmail:props.orgEmail,
          policyName:"",
           value:"",
           frequency:""

         },
         validationSchema:PolicyValidation,
         onSubmit: async (values)=>{
          console.log(values);
          policyFormik.resetForm();

         }
    }

)

  return <div>
    <Dialog open={openDialog} onClose={handleDialogClose}>
      <Card className={classes.card}>
       <CardContent>
       <Typography variant="h5" component="h2" style={{marginBottom:'12px'}} className={classes.title}>
            Add your policies
          </Typography>
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
          <TextField label="policy Name" type="text" name='policyName' value={policyFormik.values.policyName} error={policyFormik.touched.policyName && Boolean(!policyFormik.errors.policyName)} onChange={policyFormik.handleChange}  />
          <FormHelperText error>{policyFormik.errors.policyName}</FormHelperText>
            <TextField label="Policy Value" type="text" name='value' value={policyFormik.values.value} error={policyFormik.touched.value && Boolean(!policyFormik.errors.value)} onChange={policyFormik.handleChange} />
            <FormHelperText error>{policyFormik.errors.value}</FormHelperText>
            <TextField label="Interval between two Checkup" type="text" name='frequency' value={policyFormik.values.frequency} error={policyFormik.touched.frequency && Boolean(!policyFormik.errors.frequency)} onChange={policyFormik.handleChange} />
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