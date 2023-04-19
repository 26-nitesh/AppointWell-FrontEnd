import axios from "axios";

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

export const updateOrg = async (values)=>{
  try{
  let  uri = BASE_URI_COMPANY+'/update-org';
  const input = { organisationName: values.name, organisationEmail: values.email, password: values.password,addLine1:values.addLine1,city:values.city,zip:values.zip };
 return   await axios.put(uri,input);
  }catch(error){
    
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
