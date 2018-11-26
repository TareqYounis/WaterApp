import {FetchFailure, FetchSuccessUserRegister, FetchSuccessUserLogin} from './actions';
import { sha256 } from 'react-native-sha256';

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