import {Add_Name, Delete_Name, Select_Name, Deselect_Name, Fetch_Failure, Fetch_Sucess} from './actionTypes';
import {FetchSuccess, FetchFailure, FetchSuccessWaterRoles} from './names';
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
              dispatch(FetchSuccess(responseJson));
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
              dispatch(FetchSuccessWaterRoles(responseJson.data));
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