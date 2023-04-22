import React, { useEffect, useState } from 'react';
import { getAllHospitalsForOrg } from '../Service/commonService';

const ProcessAppointment = (props) =>{
    const [hospitals, sethospitals] = useState([]);
    React.useEffect(()=>{
        async function getAllHospitals() {

            // console.log(props.comapnyEmail);
            const response = await getAllHospitalsForOrg(props.comapnyEmail);
            if(response!=null){
                sethospitals(response)
            }
            console.log(response);
        //   const response = await getEmp(compEmail);
        //     // setOrgDetails(response.data.data)
        //     setName(response.data.data.empName);
        }
        getAllHospitals();
      }, []);

    return(
        <>
            OKKKKKKKKKKKKKKK
        </>
    )
}

export default ProcessAppointment;