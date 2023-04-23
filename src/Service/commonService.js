import axios from "axios";
import { login } from "./loginService";
const RESPONSE = {
  status: '',
  message:'',
};
export const BASE_URI_COMPANY = 'http://localhost:9596/organisation/api';
export const BASE_URI_EMPLOYEE = 'http://localhost:9595/employee/api';
export const BASE_URI_INSURANCE_AGENCY = 'http://localhost:9599/agency/api';
export const BASE_URI_HOSPITAL = 'http://localhost:9600/hospital/api';
export const BASE_URI_APPOINTMENT = 'http://localhost:9598/appointment/api';
export const BASE_URI_REPORT = "http://localhost:9601/report/api";

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
  // console.log(uri);
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

export const updateOrgWithAgency = async (values)=>{//updateOrgWithAgency
  try{
    // console.log(values);
  let  uri = BASE_URI_COMPANY+'/update-org';
 return   await axios.put(uri,values);
  }catch(error){
    
  }
}

export const updateHospWithAgency = async (values)=>{
  try{
    // console.log(values);
  let  uri = BASE_URI_HOSPITAL+'/update-hosp';
 return   await axios.put(uri,values);
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

export const getAllAgencies = async()=>{

 try{
  const response = await axios.get(BASE_URI_INSURANCE_AGENCY+'/all');
  return response.data.data;
 }catch(err){
    return null;
 }
}

export const findAgencyByEmail = async(email) =>{

  try{
    const response = await axios.get(BASE_URI_INSURANCE_AGENCY+'/'+email);
    return response.data.data;
   }catch(err){
      return null;
   }
}

export const getAllHospitalsForOrg = async(orgEmail) =>{
  try{
       const org = await   getOrg(orgEmail);
      //  console.log(org.data.data.insuranceAgencyEmail);

     const hospitals =  await  axios.get(BASE_URI_HOSPITAL+'/agency/'+org.data.data.insuranceAgencyEmail);
         if(hospitals.data.HttpStatus==200){
          return hospitals.data.data;
         }else{
          return null;
         }

    //  console.log();
  }catch(err){
    return null;
  }
}

export const createAppointMent = async(email,selectedHosp,selectedDate) => {
let input = {employeeEmail:email,hospitalEmail:selectedHosp,appointmentDate:selectedDate};
    try{
      const res = await axios.post(BASE_URI_APPOINTMENT+'/create-new-appointment',input);
         if(res.data.HttpStatus===201){
          RESPONSE.message= "Appointment Booked Sucess ";
          RESPONSE.status="200";
          return RESPONSE;
         }
         else {
          RESPONSE.message= "Failed";
          RESPONSE.status="500"
          return RESPONSE
         }
      // return res.data.data.message;
    }catch(err){
// console.log(err.response.data.message);
RESPONSE.message= err.response.data.message;
RESPONSE.status="500"
 return RESPONSE;
    }
}

export const getAppointMentByHospital = async(emailOP,archived) => {
  // http://localhost:9598/appointment/api/getByHospital/hosp@hosp1?archived=false
         let input = BASE_URI_APPOINTMENT+`/getByHospital/${emailOP}?archived=${archived}`;
        //  console.log(input);
 try{
  const response = await axios.get(input)
  if(response.data.HttpStatus===200){
    return response.data.data;
  }
  else {
    return null
  }
 }catch(err){

 }
}
export const   updateAppointmnet = async(empEmail,hospEmail,archived,verified,status,remarks) =>{

  let input = {employeeEmail:empEmail,hospitalEmail:hospEmail,isArchived:archived,verified:verified,status:status,remarks:remarks};
 const response =  await  axios.put(BASE_URI_APPOINTMENT+'/updateAppointmnet',input);
 console.log(response);
}

// export const   updateAppointmnetForReject = async(empEmail,hospEmail,archived,verified,status,remarks) =>{

//   let input = {employeeEmail:empEmail,hospitalEmail:hospEmail,isArchived:archived,verified:verified,status:status,remarks:remarks};
//  const response =  await  axios.put(BASE_URI_APPOINTMENT+'/updateAppointmnet',input);
//  console.log(response);
// }


export const addAgecy = async(hospEmail,agencyEmail) =>{
  try{
    //http://localhost:9600/hospital/api/add-agency?hospEmail=string1&agencyEmail=rrrr
const response = await axios.get(BASE_URI_HOSPITAL+'/add-agency?hospEmail='+hospEmail+'&agencyEmail='+agencyEmail);
console.log(response);
return response;
  }catch(err){

  }
}


