import axios, { Axios } from "axios"  // data.append('name', formData.name);
    // data.append('description', formData.description);
import { BASE_URI_APPOINTMENT, BASE_URI_REPORT } from "./commonService"

export const  createNewReport = async (values) =>{

    try{
      const data = new FormData();
    data.append('file', values.file);
    data.append('appointmentId',values.appointmentId)
    data.append('reportDetails',values.reportDetails);
    data.append('appointmentDate',values.appointmentDate);
    data.append('remarks',values.remarks);

  

// const report = await axios.post(BASE_URI_REPORT+'/create-report',values);
const report = await axios.post(BASE_URI_REPORT+'/create-report', data, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
return report;
    }catch(err){
  return err.response;
    }
}//
export const  updateReport = async (values) =>{

    try{
      const data = new FormData();
      data.append('file', values.file);
      data.append('appointmentId',values.appointmentId)
      data.append('reportDetails',values.reportDetails);
      data.append('appointmentDate',values.appointmentDate);
      data.append('remarks',values.remarks);
// const report = await axios.put(BASE_URI_REPORT+'/update-report',values);
const report = await axios.put(BASE_URI_REPORT+'/update-report', data, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
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
  // console.log(response.data.HttpStatus);
};

export const  getReportById = async(appId) =>{
  
try{
  const report = await axios.get(BASE_URI_REPORT+'/get/'+appId);
  const app= await axios.get(BASE_URI_APPOINTMENT+'/getById/'+appId)
report.data.data.appData=app.data.data;
// console.log(app.data.data);
// console.log(report.data.data);
  return report.data
}catch(err){
  return err.response
}

 

}