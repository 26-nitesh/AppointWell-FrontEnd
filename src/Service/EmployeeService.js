import axios from "axios"
import { BASE_URI_APPOINTMENT, BASE_URI_COMPANY, BASE_URI_EMPLOYEE, BASE_URI_REPORT, getEmp, getHosp, getOrg } from "./commonService";
import { getPolicyByOrg } from "./PolicyService";

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
  addInfo.dob=emp.dob;
  addInfo.age=await getAge(emp.dob);
  addInfo.dateOfJoining=emp.dateOfJoining;
  addInfo.totalServiceMonths = await getMonthOfService(emp.dateOfJoining)
  if(emp.hazardousExposure){
    addInfo.hazardousExposure='Hazardous';
  }else{
    addInfo.hazardousExposure='Normal';
  }
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
 const policyO = await getPolicyByOrg(emp.orgEmail);

 if(policyO!=null){
  addInfo.policies=policyO
 }
//  console.log(addInfo);
  return addInfo;
}else{
  return null;
}
}

export const  deleteEmpByEmail = async(empEmail)=>{
  try{
    const res =   axios.delete(BASE_URI_EMPLOYEE+'/delete/'+empEmail);
    return res;
  }catch(err){
    return err.response
  }
};

export const getAge = async (dob1)=>{

  const dob = new Date(dob1);

const today = new Date();

let age = today.getFullYear() - dob.getFullYear();

let monthDiff = today.getMonth() - dob.getMonth();
let dayDiff = today.getDate() - dob.getDate();

if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
    monthDiff += 12;
    if (dayDiff < 0) {
        monthDiff--;
        dayDiff += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
}

return   `${age} years, ${monthDiff} months, ${dayDiff} days`; // Output: 28 years, 3 months, 18 days

  // return '45';
}

export const getMonthDiff = async (dob1)=>{

  const dob = new Date(dob1);

const today = new Date();

let age = today.getFullYear() - dob.getFullYear();

let monthDiff = today.getMonth() - dob.getMonth();
let dayDiff = today.getDate() - dob.getDate();

if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
    monthDiff += 12;
    if (dayDiff < 0) {
        monthDiff--;
        dayDiff += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
}

return   `${age} years, ${monthDiff} months`; 
}

export const getMonthOfService= async(doj1)=>{

const dob = new Date(doj1);

const today = new Date();
let age = (today.getMonth() - dob.getMonth()) + 
          ((today.getFullYear() - dob.getFullYear()) * 12);
if (today.getDate() < dob.getDate()) {
    age--;
}

return `${age} months`; 

}
export const getFinalResponseCheckingAfetrEmployeeExistOrNot = async(responseO) =>{

  // console.log("checking");
let response=[];
  for(let app of responseO ){
     const emp = await getEmp( app.employeeEmail);
       if(emp.data.HttpStatus===200){
        response.push(app);
       }
       else if(emp.data.HttpStatus===404){
        // deleteA
      await  axios.delete(BASE_URI_APPOINTMENT+'/deleteByEmp/'+app.employeeEmail);
        // BASE_URI_APPOINTMENT
       }
  }
  // console.log(responseO);

  return response;

}