import { FetchFailure, FetchSuccessWaterRoles, FetchFailureWaterRoles, FetchSucessInvoiceCalculation, FetchFailureInvoiceCalculation, FetchSuccessComplaintType } from './actions';
import { sha256 } from 'react-native-sha256';

//asynchrounous calls are being handled in here
//Water Roles Service (GET)
export const GetWaterRoles = ( data ) => {
  return dispatch => {
    var ts = Math.round(new Date().getTime()/1000);
    return sha256( ts + ':sK8DkvuyKGeb19b437g4Cv33GXV49c9Q:miyahunaAdmin!@#123').then( hash => {
            hashValue= 'ts=' + ts + ',response=' + hash;
            fetch('http://miyahunaportal.arabiacell.biz/api/services/water_role/?company_id='+ data.organizationID +'&account='+ data.userAccount,{
              headers: {
                Authorization: 'ts=' + ts + ',response=' + hash
              }
           })
            .then((response) => response.json())
            .then((responseJson) => {
              if(responseJson.status === false){
                dispatch(FetchFailureWaterRoles(responseJson.message));
              }else{     
                dispatch(FetchSuccessWaterRoles(responseJson.data));
              }
            })
            .catch((error)=> {
              dispatch(FetchFailure(error));
            })
        })
        .catch((error)=> {
            dispatch(FetchFailure(error));
        })
    }
}

//Water Calculation Service (GET)
export const invoiceCalculation = (userData) => {
  return dispatch => {
    var ts = Math.round(new Date().getTime()/1000);
    return sha256( ts + ':sK8DkvuyKGeb19b437g4Cv33GXV49c9Q:miyahunaAdmin!@#123').then( hash => {
            hashValue= 'ts=' + ts + ',response=' + hash;
            fetch('http://miyahunaportal.arabiacell.biz/api/services/invoice_calculation_service?company_id='+ userData.company_id+'&usage_type='+ userData.usage_type +'&quantity='+ userData.quantity +'&sewage_served=' + userData.sewage_served.toString().toUpperCase() ,{
              method: 'GET',
              headers: {
                Authorization: 'ts=' + ts + ',response=' + hash
              }
           })
            .then((response) => response.json())
            .then((responseJson) => {  
              if(responseJson.status === false){
                dispatch(FetchFailureInvoiceCalculation(responseJson.message || responseJson.data));
              }else{
                dispatch(FetchSucessInvoiceCalculation(responseJson.data));
              }
            })
            .catch((error)=> {
              dispatch(FetchFailure(error));
            })
        })
        .catch((error)=> {
            dispatch(FetchFailure(error));
        })
    }
}

export const GetComplaintTypes = () => {
  return dispatch => {
    var ts = Math.round(new Date().getTime()/1000);
    return sha256( ts + ':sK8DkvuyKGeb19b437g4Cv33GXV49c9Q:miyahunaAdmin!@#123').then( hash => {
            hashValue= 'ts=' + ts + ',response=' + hash;
            fetch('http://miyahunaportal.arabiacell.biz/api/info/complaint_type',{
              headers: {
                Authorization: 'ts=' + ts + ',response=' + hash
              }
           })
            .then((response) => response.json())
            .then((responseJson) => {          
                dispatch(FetchSuccessComplaintType(responseJson));
            })
            .catch((error)=> {
              dispatch(FetchFailure(error));
            })
        })
        .catch((error)=> {
            dispatch(FetchFailure(error));
        })
    }
}