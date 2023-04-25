import axios from "axios"
import { BASE_URI_APPOINTMENT, BASE_URI_EMPLOYEE, getEmp, getOrg } from "./commonService"

export const  getClaimRecords = async(agencyEmail)=>{
    let appoitments = [];
  const response =  await axios.get(BASE_URI_APPOINTMENT+'/');
  if(response.data.HttpStatus===200){
    const appArr = response.data.data;
    for(let app of appArr){
      if(app.agencyArchived === false){
    //    console.log(app.employeeEmail);
   const employee =   await axios.get(BASE_URI_EMPLOYEE+'/'+app.employeeEmail);
     if(employee.data.HttpStatus===200){
  const organisation = await  getOrg(employee.data.data.orgEmail);
        // console.log(employee.data.data.orgEmail);
        if(organisation.data.HttpStatus===200){
            // console.log(organisation.data.data.insuranceAgencyEmail);
          if(organisation.data.data.insuranceAgencyEmail===agencyEmail){
            if(app.status==='claim submitted'||app.status==='claim approved' || app.status ==='claim rejected'){
              appoitments.push(app);
            }
            // console.log(app);
          }
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


export const trackClaimRecords = async(hospEmail)=>{

  let response = [];

  const apps  = await axios.get(BASE_URI_APPOINTMENT+'/findAllByHosp/'+hospEmail);
  // console.log(apps.data.data);
  if(apps.data.HttpStatus===200){
    for(let app of apps.data.data){
        if(app.status==='claim submitted'||app.status==='claim approved' || app.status==='claim rejected'){
         const emp =  await getEmp(app.employeeEmail)
         if(emp.data.HttpStatus===200){
// console.log(emp.data);
       const org =  await getOrg(emp.data.data.orgEmail);
       if(org.data.HttpStatus===200){
        // console.log(org.data);
        app.agencyEmail=org.data.data.insuranceAgencyEmail;        ;
       }
         }
          response.push(app);
        }
    }
  }
  // console.log(response);
  return response;
};

export const updateRejectStatus = async(appintmentId,remarksValue) =>{
let status='claim rejected'
  return await axios.get(BASE_URI_APPOINTMENT+`/updateAppointmnet/${appintmentId}?status=${status}&claimRemarks=${remarksValue}`)
}
//http://localhost:9598/appointment/api/updateAppointmnet/2?status=ref&claimRemarks=222
// approveClaimById(appId)