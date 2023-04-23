import axios from "axios"
import { BASE_URI_APPOINTMENT, BASE_URI_EMPLOYEE, getOrg } from "./commonService"

export const  getClaimRecords = async(agencyEmail)=>{
    let appoitments = [];
  const response =  await axios.get(BASE_URI_APPOINTMENT+'/');
  if(response.data.HttpStatus===200){
    const appArr = response.data.data;
    for(let app of appArr){
    //    console.log(app.employeeEmail);
   const employee =   await axios.get(BASE_URI_EMPLOYEE+'/'+app.employeeEmail);
     if(employee.data.HttpStatus===200){
  const organisation = await  getOrg(employee.data.data.orgEmail);
        // console.log(employee.data.data.orgEmail);
        if(organisation.data.HttpStatus===200){
            // console.log(organisation.data.data.insuranceAgencyEmail);
          if(organisation.data.data.insuranceAgencyEmail===agencyEmail){
            appoitments.push(app);
            // console.log(app);
          }
        }
     }
    }
    // console.log(appArr);
//     let list = Object.values(appArr)
//    console.log(list);
  }
  return appoitments;
}