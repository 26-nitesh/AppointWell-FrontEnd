import axios from "axios"
import { BASE_URI_REPORT } from "./commonService"

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