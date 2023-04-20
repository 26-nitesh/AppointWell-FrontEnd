import axios from "axios";
import { login } from "./loginService";
const RESPONSE = {
  status: '',
  message:'',
};
const BASE_URI_COMPANY = 'http://localhost:9596/organisation/api';
const BASE_URI_EMPLOYEE = 'http://localhost:9595/employee/api';
const BASE_URI_INSURANCE_AGENCY = 'http://localhost:9599/agency/api';
const BASE_URI_HOSPITAL = 'http://localhost:9600/hospital/api';


export const addNewEmployee = async (values,orgemail)=>{
    try {
     let   uri = BASE_URI_EMPLOYEE+'/create-new-employee';
     const input = { empName: values.name, empEmail: values.email, password: values.password,orgEmail:orgemail };
        const response = await axios.post(uri, input);
        return response;
      } catch (error) {
        return error.response;
      }

}
export const getOrg = async (values)=>{
  try{
  let  uri = BASE_URI_COMPANY+'/org/'+values;
 return   await axios.get(uri);
  }catch(error){
    
  }
}
export const getEmp = async (values)=>{
  try{
  let  uri = BASE_URI_EMPLOYEE+'/'+values;
 return   await axios.get(uri);
  }catch(error){
    
  }
}

export const getHosp = async (values)=>{
  try{
  let  uri = BASE_URI_HOSPITAL+'/'+values;
 return   await axios.get(uri);
  }catch(error){
    
  }
}

export const getAgency = async (values)=>{
  try{
  let  uri = BASE_URI_INSURANCE_AGENCY+'/'+values;
 return   await axios.get(uri);
  }catch(error){
    
  }
}

export const updateOrg = async (values)=>{
  try{
  let  uri = BASE_URI_COMPANY+'/update-org';
  const input = { organisationName: values.name, organisationEmail: values.email, password: values.password,addLine1:values.addLine1,city:values.city,zip:values.zip };
 return   await axios.put(uri,input);
  }catch(error){
    
  }
}

export const updateAgency = async (values)=>{
  try{
  let  uri = BASE_URI_INSURANCE_AGENCY+'/update-agency';
  const input = { agencyName: values.name, agencyEmail: values.email, password: values.password,addLine1:values.addLine1,city:values.city,zip:values.zip };
 return   await axios.put(uri,input);
  }catch(error){
    
  }
}

//updateHospital


export const updateHospital = async (values)=>{
  try{
  let  uri = BASE_URI_HOSPITAL+'/update-hosp';
  const input = { hospitalName: values.name, hospitalEmail: values.email, password: values.password,addLine1:values.addLine1,city:values.city,zip:values.zip };
 return   await axios.put(uri,input);
  }catch(error){
    
  }
}//updateHospital
export const updateEmp = async (values)=>{
  try{
  let  uri = BASE_URI_EMPLOYEE+'/update-employee';
  const input = { empName: values.name, empEmail: values.email, password: values.password,addLine1:values.addLine1,city:values.city,zip:values.zip };
 return   await axios.put(uri,input);
  }catch(error){
    
  }
}

export const changePassword = async (values,user)=>{
  let res;
  let uri;
  let input;
  // console.log("coming");
  try{
    switch(user){
      case "organisation":
        uri = BASE_URI_COMPANY+'/changePassword'
         input = {email:values.email,password:values.password,loginAs:"organisation"};
        res = await login(input);
        break;
      case "employee":
        uri = BASE_URI_EMPLOYEE+'/changePassword'
         input = {email:values.email,password:values.password,loginAs:"employee"};
        res = await login(input);
        break;
      case "agency":
        uri = BASE_URI_INSURANCE_AGENCY+'/changePassword'
        input = {email:values.email,password:values.password,loginAs:"agency"};
       res = await login(input);
        break;
        case "hospital":
          uri = BASE_URI_HOSPITAL+'/changePassword'
           input = {email:values.email,password:values.password,loginAs:"hospital"};
          res = await login(input);
          break;
      default:
        break;
    } 
 
    console.log(res);
    if(res.data.HttpStatus==200){
      // console.log(uri);
         const updatePass = await axios.put(uri,values);
         if(updatePass.data.HttpStatus==200){
          RESPONSE.status='200'
          RESPONSE.message=updatePass.data.message;
          return RESPONSE;
         }
        //  console.log(updatePass);
    }else  if(res.data.HttpStatus==401) {
      RESPONSE.status='500'
      RESPONSE.message='Paassword did not match';
      return RESPONSE;
    }
    
  }catch(err){

  }
}

// "orgId": 0,
// "insuranceAgencyEmail": "string",
// "organisationName": "string",
// "organisationEmail": "string",
// "password": "string",
// "addLine1": "string",
// "city": "string",
// "zip": "string"
