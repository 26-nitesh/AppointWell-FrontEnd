import axios from "axios"
import { BASE_URI_APPOINTMENT, BASE_URI_COMPANY, BASE_URI_EMPLOYEE, BASE_URI_REPORT, getEmp } from "./commonService";

export const getAppointmentsByEmployee = async(email) =>{
    // http://localhost:9598/appointment/api/getByEmp/ww
   const apps = await axios.get(BASE_URI_APPOINTMENT+'/getByEmp/'+email);
  console.log(apps.data.HttpStatus);
  if(apps.data.HttpStatus===200){
    for(let app of apps.data.data){
       if(app.status==='claim submitted'||app.status==='claim approved' || app.status === 'claim rejected'){
        app.status='completed'
       }

    }
    return apps.data.data;
  }
  return null;
 
}

export const getEmpForOrg = async(orgEmail) =>{
  console.log(orgEmail);
const emps = await axios.get(BASE_URI_EMPLOYEE+'/org/'+orgEmail);
// http://localhost:9595/employee/api/org/55%4055
if(emps.data.HttpStatus===200){
  return emps.data.data

}
// console.log(emps.data.data);
else {return null;}
}


export const  updateLastAppDateForEmployee = async(empEmail) =>{
  // http://localhost:9598/appointment/api/getByEmp/f

const appLst = await axios.get(BASE_URI_APPOINTMENT+'/getByEmp/'+empEmail);

if(appLst.data.HttpStatus===200){
  const appLstArr = appLst.data.data;
  const app = appLstArr[0];
  // console.log("this is ,.......");
  // console.log(app.appointmentDate);
  // http://localhost:9595/employee/api/updateLastCheckupDate/a%40a?lastAppDate=2023-04-25
 await axios.put(BASE_URI_EMPLOYEE+`/updateLastCheckupDate/${empEmail}?lastAppDate=${app.appointmentDate}`);
}

      // const emp = getEmp(empEmail);
}