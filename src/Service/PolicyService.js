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

}