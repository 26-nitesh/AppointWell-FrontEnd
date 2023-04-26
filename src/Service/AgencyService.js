import axios from "axios";
import { BASE_URI_APPOINTMENT, getEmp } from "./commonService"

export const checkAddAgencyAllowed = async(org) => {//company 
    console.log("checking");
let flag = true;
const currentOrgEmail = org.organisationEmail;
   const AllApps = await axios.get(BASE_URI_APPOINTMENT+'/');
   if(AllApps.data.HttpStatus===200){

    for(let app of AllApps.data.data){
        if(!app.isArchived){
      let empEmail = app.employeeEmail
    const empD=  await getEmp(empEmail);
    if(empD.data.HttpStatus===200){
         if(empD.data.data.orgEmail===currentOrgEmail){
            flag=false;
         }
        // console.log(app);
    }

    // console.log(empD);
    }
}
    // console.log(AllApps.data.data);
   }
   return flag;


}