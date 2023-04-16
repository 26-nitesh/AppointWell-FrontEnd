import axios from "axios";

export const login = async(values) =>{

    console.log(values);
    let input = {email:values.email,password:values.password};
    let uri ='';
  if (values.loginAs === "hospital") {

  } else if (values.loginAs === "agency") {

  } else if (values.loginAs === "organisation") {
   uri='http://localhost:9596/organisation/api/login';
   
  }

  try {
    const response = await axios.post(uri, input);
    return response;
  } catch (error) {
    return error.response;
  }

}