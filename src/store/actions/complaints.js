import { FetchFailure, FetchSuccessObjectionService } from './actions';
import { sha256 } from 'react-native-sha256';

// Objection Service on a waterBill (GET):
export const Objection = ( objectionData ) => {
    return dispatch => {
        var ts = Math.round(new Date().getTime()/1000);
        return sha256( ts + ':sK8DkvuyKGeb19b437g4Cv33GXV49c9Q:miyahunaAdmin!@#123').then( hash => {
                hashValue= 'ts=' + ts + ',response=' + hash;
                fetch('http://miyahunaportal.arabiacell.biz/api/services/objection_water_bill?company_id='+ objectionData.company_id + '&account=' + objectionData.account + '&bill_id=' + objectionData.bill_id,{
                  headers: {
                    Authorization: 'ts=' + ts + ',response=' + hash
                  }
               })
                .then((response) => response.json())
                .then((responseJson) => {
                  if(responseJson.status === false){
                    dispatch(FetchFailure(responseJson.message));
                  }else{     
                    dispatch(FetchSuccessObjectionService(responseJson.data));
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