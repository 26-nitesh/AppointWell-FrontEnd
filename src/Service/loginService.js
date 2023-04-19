import axios from "axios";
const BASE_URI_COMPANY = 'http://localhost:9596/organisation/api';
const BASE_URI_EMPLOYEE = 'http://localhost:9595/employee/api';
const BASE_URI_INSURANCE_AGENCY = 'http://localhost:9599/agency/api';
const BASE_URI_HOSPITAL = 'http://localhost:9600/hospital/api';

export const login = async(values) =>{

    // console.log(values);
    let input = {email:values.email,password:values.password};
    let uri ='';
  if (values.loginAs === "hospital") {
    uri = BASE_URI_HOSPITAL+'/login';
  } else if (values.loginAs === "agency") {
   uri = BASE_URI_INSURANCE_AGENCY+'/login';

  } else if (values.loginAs === "organisation") {
   uri=BASE_URI_COMPANY+'/login';
   
  }else if(values.loginAs === 'employee'){
    uri= BASE_URI_EMPLOYEE+'/login';
  }
console.log(uri);
  try {
    const response = await axios.post(uri, input);
    return response;
  } catch (error) {
    return error.response;
  }

}