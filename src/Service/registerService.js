import axios from "axios";
import { BASE_URI_COMPANY, BASE_URI_HOSPITAL, BASE_URI_INSURANCE_AGENCY } from "./commonService";
// const BASE_URI_COMPANY = 'http://localhost:9596/organisation/api';
// const BASE_URI_EMPLOYEE = 'http://localhost:9595/employee/api';
// const BASE_URI_INSURANCE_AGENCY = 'http://localhost:9599/agency/api';
// const BASE_URI_HOSPITAL = 'http://localhost:9600/hospital/api';

export const  register = async(values)=>{

    let input = {};
    let uri ='';
  if (values.registerAs === "hospital") {
   uri = BASE_URI_HOSPITAL+'/add-hospital';
    input = { hospitalName: values.name, hospitalEmail: values.email, password: values.password };
  } else if (values.registerAs === "agency") {
    uri=BASE_URI_INSURANCE_AGENCY+'/create';
    input = { agencyName: values.name, agencyEmail: values.email, password: values.password };
  } else if (values.registerAs === "organisation") {
   uri=BASE_URI_COMPANY+'/addOrg';
   input = { organisationName: values.name, organisationEmail: values.email, password: values.password };
  }
   
    
//    console.log(input);
//    console.log(uri);
    // await axios.post(uri,input).then((data)=>{
    //     return data.data;
    // //    console.log(data.data);
    // }).catch((err)=>{
    // //   console.log(err.response);
    //   return err.response;
    // });
    try {
        const response = await axios.post(uri, input);
        return response;
      } catch (error) {
        return error.response;
      }

}

