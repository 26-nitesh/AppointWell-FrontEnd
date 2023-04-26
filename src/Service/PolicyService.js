import axios from "axios"
import { BASE_URI_POLICY } from "./commonService"
import { Policy } from "@mui/icons-material";

export const getPolicyByOrg = async(orgEmail) =>{

// http://localhost:9597/policy/api/get-all-policy/55%4055
const policyO = await axios.get(BASE_URI_POLICY+'/get-all-policy/'+orgEmail);
if(policyO.data.HttpStatus===200){
return policyO.data.data;
    // console.log(policyO.data.data);
    // for(let policy of policyO){

    // }
}
else{
    return null
}
}

export const createPolicy = async(values) =>{
    console.log("coming");
    let policyNameI = values.policyName;
    if(policyNameI==='other'){
        policyNameI=values.otherOption;
    }

    let input = {orgEmail:values.orgEmail,policyName: policyNameI ,value:values.value,frequency:values.frequency}
    // console.log(values);
 try{
    const policy = await axios.post(BASE_URI_POLICY+'/create-policy',input)
    // console.log(policy);
return policy;
 }catch(err){
    // console.log(err);
    return err.response
 }   
}

export const DeletePolicy =async (policyId) =>{
 
try{
    const res = await axios.delete(BASE_URI_POLICY+'/deleteById/'+policyId);
    return res;
}catch(err){
    return err.response
}
}