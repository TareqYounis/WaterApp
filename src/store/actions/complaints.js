import { FetchFailure, FetchFailureObjectionService, FetchSuccessObjectionService, FetchFailureComplaintService, FetchSuccessComplaintService } from './actions';
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
                  console.log(responseJson)
                  if(responseJson.status === false){
                    dispatch(FetchFailureObjectionService(responseJson.message || responseJson.data));
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

// complain


export const Complain = ( complainData ) => {
  // generate form data from an object
  var userFormData = new FormData();
  for ( var key in complainData){
    if(key === 'image' && complainData['image']['uri'] !== undefined ){
      userFormData.append('image', complainData['image']['uri']); 
      console.log(userFormData);
    }else{
      userFormData.append( key , complainData[key] )
    }
  }
  return dispatch => {
      var ts = Math.round(new Date().getTime()/1000);
      return sha256( ts + ':sK8DkvuyKGeb19b437g4Cv33GXV49c9Q:miyahunaAdmin!@#123').then( hash => {
              hashValue= 'ts=' + ts + ',response=' + hash;
              fetch('http://miyahunaportal.arabiacell.biz/api/services/complaint',{
                method: 'POST',
                headers: {
                  Authorization: 'ts=' + ts + ',response=' + hash
                },
                body: userFormData
             })
              .then((response) => response.json())
              .then((responseJson) => {
                console.log(responseJson)
                if(responseJson.status === false){
                  dispatch(FetchFailureComplaintService(responseJson.data || responseJson.message));
                }else{     
                  dispatch(FetchSuccessComplaintService(responseJson.message));
                }
              })
              .catch((error)=> {
                console.log(error)
                dispatch(FetchFailure(error));
              })
          })
      .catch((error)=> {
        console.log(error)
          dispatch(FetchFailure(error));
      })
  }
}