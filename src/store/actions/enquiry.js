import { FetchSuccess, FetchFailure, FetchSuccessWaterRoles, FetchSuccessUserRegister, FetchSuccessUserLogin, FetchSucessInvoiceCalculation } from './actions';
import { sha256 } from 'react-native-sha256';

//asynchrounous calls are being handled in here
// List Organizations Lookups(GET)
export const GetOrganizations = () => {
    return dispatch => {
    var ts = Math.round(new Date().getTime()/1000);
    return sha256( ts + ':sK8DkvuyKGeb19b437g4Cv33GXV49c9Q:miyahunaAdmin!@#123').then( hash => {
            hashValue= 'ts=' + ts + ',response=' + hash;
            fetch('http://miyahunaportal.arabiacell.biz/api/info/orginizations',{
              headers: {
                Authorization: 'ts=' + ts + ',response=' + hash
              }
           })
            .then((response) => response.json())
            .then((responseJson) => {      
              if(responseJson.status === false){
                dispatch(FetchFailure(responseJson.message));
              }else{     
                dispatch(FetchSuccess(responseJson));
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

//Water Roles Service (GET)
export const GetWaterRoles = (companyID, userAccount) => {
  return dispatch => {
    var ts = Math.round(new Date().getTime()/1000);
    return sha256( ts + ':sK8DkvuyKGeb19b437g4Cv33GXV49c9Q:miyahunaAdmin!@#123').then( hash => {
            hashValue= 'ts=' + ts + ',response=' + hash;
            fetch('http://miyahunaportal.arabiacell.biz/api/services/water_role/?company_id='+ companyID +'&account='+ userAccount,{
              headers: {
                Authorization: 'ts=' + ts + ',response=' + hash
              }
           })
            .then((response) => response.json())
            .then((responseJson) => {
              if(responseJson.status === false){
                dispatch(FetchFailure(responseJson.message));
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

//Register a new user (POST).
export const RegisterUser = (userData) => {
  return dispatch => {
    var ts = Math.round(new Date().getTime()/1000);
    return sha256( ts + ':sK8DkvuyKGeb19b437g4Cv33GXV49c9Q:miyahunaAdmin!@#123').then( hash => {
            hashValue= 'ts=' + ts + ',response=' + hash;
            fetch('http://miyahunaportal.arabiacell.biz/api/user/register' ,{
              method: 'POST',
              headers: {
                Authorization: 'ts=' + ts + ',response=' + hash
              },
              body: JSON.stringify (userData)
           })
            .then((response) => response.json())
            .then((responseJson) => {      
              if(responseJson.status === false){
                dispatch(FetchFailure(responseJson.data));
              }else{
                dispatch(FetchSuccessUserRegister(responseJson.data));
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

//Login (POST)
export const UserLogsIn = (userData) => {
  return dispatch => {
    var ts = Math.round(new Date().getTime()/1000);
    return sha256( ts + ':sK8DkvuyKGeb19b437g4Cv33GXV49c9Q:miyahunaAdmin!@#123').then( hash => {
            hashValue= 'ts=' + ts + ',response=' + hash;
            fetch('http://miyahunaportal.arabiacell.biz/api/user/login' ,{
              method: 'POST',
              headers: {
                Authorization: 'ts=' + ts + ',response=' + hash
              },
              body: JSON.stringify (userData)
           })
            .then((response) => response.json())
            .then((responseJson) => {      
              if(responseJson.status === false){
                dispatch(FetchFailure(responseJson.message));
              }else{
                dispatch(FetchSuccessUserLogin(responseJson.data));
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
            fetch('http://miyahunaportal.arabiacell.biz/api/services/invoice_calculation_service?company_id='+ userData.company_id+'&usage_type='+ userData.usage_type +'&quantity='+ userData.quantity +'&sewage_served=' + userData.sewage_served ,{
              method: 'GET',
              headers: {
                Authorization: 'ts=' + ts + ',response=' + hash
              }
           })
            .then((response) => response.json())
            .then((responseJson) => {      
              if(responseJson.status === false){
                dispatch(FetchFailure(responseJson.message));
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