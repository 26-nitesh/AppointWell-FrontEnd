import axios from "axios"
import { BASE_URI_APPOINTMENT, BASE_URI_REPORT } from "./commonService";

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