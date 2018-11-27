import { FetchSuccess, FetchFailure, FetchSuccessWaterRoles, FetchSucessInvoiceCalculation, FetchSuccessUsageType } from './actions';
import { sha256 } from 'react-native-sha256';

//asynchrounous calls are being handled in here
//List Organizations Lookups(GET)
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

//List Pricing Category Lookups(GET)
export const GetUsageType = () => {
  return dispatch => {
  var ts = Math.round(new Date().getTime()/1000);
  return sha256( ts + ':sK8DkvuyKGeb19b437g4Cv33GXV49c9Q:miyahunaAdmin!@#123').then( hash => {
          hashValue= 'ts=' + ts + ',response=' + hash;
          fetch('http://miyahunaportal.arabiacell.biz/api/info/usage_type',{
            headers: {
              Authorization: 'ts=' + ts + ',response=' + hash
            }
         })
          .then((response) => response.json())
          .then((responseJson) => {           
              dispatch(FetchSuccessUsageType(responseJson));
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