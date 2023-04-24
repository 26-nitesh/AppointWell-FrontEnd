import axios, { Axios } from "axios"
import { BASE_URI_APPOINTMENT, BASE_URI_REPORT } from "./commonService"

export const  createNewReport = async (values) =>{

    try{
const report = await axios.post(BASE_URI_REPORT+'/create-report',values);
return report;
    }catch(err){
  return err.response;
    }
}//
export const  updateReport = async (values) =>{

    try{
const report = await axios.put(BASE_URI_REPORT+'/update-report',values);
return report;
    }catch(err){
  return err.response;
    }
}
export const updateAppointmnetByStatus = async(appintmentId,status)=>{//
 return await axios.get(BASE_URI_APPOINTMENT+`/updateAppointmnet/${appintmentId}?status=${status}`)
}
export const  updateClaimAmount = async(enteredAmount,appId)=>{
  let status='claim submitted'
  // await Axios.get
  const response = await axios.get(BASE_URI_APPOINTMENT+`/updateAppointmnet/${appId}?status=${status}&amount=${parseFloat(enteredAmount)}`)
  console.log(response.data.HttpStatus);
};