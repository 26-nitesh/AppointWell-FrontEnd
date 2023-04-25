import axios from "axios"
import { BASE_URI_APPOINTMENT, BASE_URI_COMPANY, BASE_URI_EMPLOYEE, BASE_URI_REPORT, getEmp, getHosp, getOrg } from "./commonService";

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

export const findHospitalByEmail =async (email)=>{

  const hosp =  await getHosp(email);
  if(hosp.data.HttpStatus===200){
    return hosp.data.data;
  }else{
    return null
  }
};

export const getAddInfoDetailsToViewHospital = async(email) =>{
const addInfo = {};
  const empO = await getEmp(email);
  // console.log(emp);
if(empO.data.HttpStatus===200){
 const emp = empO.data.data;
  addInfo.empName=emp.empName;
  addInfo.dateOfJoining=emp.dateOfJoining;
  addInfo.hazardousExposure=emp.hazardousExposure;
  addInfo.lastCheckupDate=emp.lastCheckupDate;
  addInfo.addLine1=emp.addLine1
addInfo.city=emp.city
addInfo.zip=emp.zip;
  // console.log(emp.data.data);
 const orgO = await getOrg(emp.orgEmail);
 if(orgO.data.HttpStatus===200){
  const org = orgO.data.data;
  addInfo.insuranceAgencyEmail=org.insuranceAgencyEmail;
addInfo.organisationName = org.organisationName;
addInfo.organisationEmail=org.organisationEmail;
 }
  // console.log(addInfo);
  return addInfo;
}else{
  return null;
}
}