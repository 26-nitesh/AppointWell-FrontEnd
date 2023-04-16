import axios from "axios";


export const  register = async(values)=>{

    let input = {};
    let uri ='';
  if (values.registerAs === "hospital") {
    input = { hospitalName: values.name, hospitalEmail: values.email, hospitalPassword: values.password };
  } else if (values.registerAs === "agency") {
    input = { agencyName: values.name, agencyEmail: values.email, agencyPassword: values.password };
  } else if (values.registerAs === "organisation") {
   uri='http://localhost:9596/organisation/api/addOrg';
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

