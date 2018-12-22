import {FetchFailure, FetchSuccessRequestApplication, FetchSuccessReturnCounter } from './actions';
import { sha256 } from 'react-native-sha256';

export const RequestApplication = ( application ) => {
    return dispatch => {
        var ts = Math.round(new Date().getTime()/1000);
        return sha256( ts + ':sK8DkvuyKGeb19b437g4Cv33GXV49c9Q:miyahunaAdmin!@#123').then( hash => {
                hashValue= 'ts=' + ts + ',response=' + hash;
                fetch('http://miyahunaportal.arabiacell.biz/api/request/send' ,{
                  method: 'POST',  
                  headers: {
                    Authorization: 'ts=' + ts + ',response=' + hash
                  },
                  body: JSON.stringify(application)
               })
                .then((response) => response.json())
                .then((responseJson) => {           
                    dispatch(FetchSuccessRequestApplication(responseJson.data));
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

//Return Blocked Counter Service
export const ReturnBlockCounter = ( userData ) => {
    return dispatch => {
        var ts = Math.round(new Date().getTime()/1000);
        return sha256( ts + ':sK8DkvuyKGeb19b437g4Cv33GXV49c9Q:miyahunaAdmin!@#123').then( hash => {
                hashValue= 'ts=' + ts + ',response=' + hash;
                fetch('http://miyahunaportal.arabiacell.biz/api/services/return_block_counter?company_id=' + userData.company_id + '&account=' + userData.account,{
                  method: 'GET',  
                  headers: {
                    Authorization: 'ts=' + ts + ',response=' + hash
                  }
               })
                .then((response) => response.json())
                .then((responseJson) => {           
                    if(responseJson.status){
                        dispatch(FetchSuccessReturnCounter(responseJson.data));
                    }else{
                        dispatch(FetchFailure(responseJson.message))
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