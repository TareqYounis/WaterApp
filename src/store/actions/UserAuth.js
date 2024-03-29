import {FetchFailure, SavingUserLanguage, SavingUserID, ResetUserState, FetchSuccessUserRegister, FetchFailureUserRegister, FetchSuccessUserLogin, FetchFailureUserLogin, FetchSuccessAddAccount, FetchFailureAddAccount, SavingTabID, FetchSuccessBalanceHistory, FetchFailureBalanceHistory, FetchSuccessRegisterConfirm, FetchFailureRegisterConfirm, FetchSuccessResendCode, FetchFailureResendCode, FetchSuccessParticipationInfo, FetchFailureParticipationInfo } from './actions';
import { sha256 } from 'react-native-sha256';

export const SaveUserLanguage = (lang) => {
  return dispatch => {
     dispatch(SavingUserLanguage(lang));
  }
}

export const SaveUserID = (id) => {
  return dispatch => {
     dispatch(SavingUserID(id));
  }
}

export const ResetState = () => {
  return dispatch => {
    dispatch(ResetUserState());
  }
}
//Register a new user (POST).
export const UserSignsUp = (userData) => {
  // generate form data from an object
  var userFormData = new FormData();
  for ( var key in userData){
    userFormData.append( key , userData[key] )
  }
  return dispatch => {
    var ts = Math.round(new Date().getTime()/1000);
    return sha256( ts + ':sK8DkvuyKGeb19b437g4Cv33GXV49c9Q:miyahunaAdmin!@#123').then( hash => {
            hashValue= 'ts=' + ts + ',response=' + hash;
            fetch('http://miyahunaportal.arabiacell.biz/api/user/register' ,{
              method: 'POST',
              headers: {
                Authorization: 'ts=' + ts + ',response=' + hash
              },
              body: userFormData
           })
            .then((response) => response.json())
            .then((responseJson) => {      
              if(!responseJson.status){
                dispatch(FetchFailureUserRegister(responseJson.message || responseJson.data));
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

//User Login (POST)
export const UserLogsIn = (userData) => {
  // generate form data from an object
  var userFormData = new FormData();
  for ( var key in userData){
    userFormData.append( key , userData[key] )
  }
  return dispatch => {
    var ts = Math.round(new Date().getTime()/1000);
    return sha256( ts + ':sK8DkvuyKGeb19b437g4Cv33GXV49c9Q:miyahunaAdmin!@#123').then( hash => {
            hashValue= 'ts=' + ts + ',response=' + hash;
            fetch('http://miyahunaportal.arabiacell.biz/api/user/login' ,{
              method: 'POST',
              headers: {
                Authorization: 'ts=' + ts + ',response=' + hash
              },
              body: userFormData
           })
            .then((response) => response.json())
            .then((responseJson) => {
              console.log(responseJson)  
              if(responseJson.profile){
                dispatch(FetchSuccessUserLogin(responseJson.profile));
              }else{
                dispatch(FetchFailureUserLogin(responseJson.message));
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

//Add Account (POST)
export const UserAddAccount = (userData) => {
  // generate form data from an object
  var userFormData = new FormData();
  for ( var key in userData){
    userFormData.append( key , userData[key] )
  }
  return dispatch => {
    var ts = Math.round(new Date().getTime()/1000);
    return sha256( ts + ':sK8DkvuyKGeb19b437g4Cv33GXV49c9Q:miyahunaAdmin!@#123').then( hash => {
            hashValue= 'ts=' + ts + ',response=' + hash;
            fetch('http://miyahunaportal.arabiacell.biz/api/user/add_account' ,{
              method: 'POST',
              headers: {
                Authorization: 'ts=' + ts + ',response=' + hash
              },
              body: userFormData
           })
            .then((response) => response.json())
            .then((responseJson) => {
              if(!responseJson.status){
                dispatch(FetchFailureAddAccount(responseJson.message || responseJson.data));
              }else{
                dispatch(FetchSuccessAddAccount(responseJson.message));
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

//Register Confirm (POST):
export const UserRegisterConfirm = ( userData ) => {
  // generate form data from an object
  var userFormData = new FormData();
  for ( var key in userData){
    userFormData.append( key , userData[key] )
  }
  return dispatch => {
    var ts = Math.round(new Date().getTime()/1000);
    return sha256( ts + ':sK8DkvuyKGeb19b437g4Cv33GXV49c9Q:miyahunaAdmin!@#123').then( hash => {
            hashValue= 'ts=' + ts + ',response=' + hash;
            fetch('http://miyahunaportal.arabiacell.biz/api/user/register_confirm',{
              method: 'POST',
              headers: {
                Authorization: 'ts=' + ts + ',response=' + hash
              },
              body: userFormData
           })
            .then((response) => response.json())
            .then((responseJson) => {  
              if(!responseJson.status){
                dispatch(FetchFailureRegisterConfirm(responseJson.msg || responseJson.message));
              }else{
                dispatch(FetchSuccessRegisterConfirm(responseJson));
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

//Resend Pin Code (POST):
export const UserResendCode = ( userData ) => {
  // generate form data from an object
  var userFormData = new FormData();
  for ( var key in userData){
    userFormData.append( key , userData[key] )
  }
  return dispatch => {
    var ts = Math.round(new Date().getTime()/1000);
    return sha256( ts + ':sK8DkvuyKGeb19b437g4Cv33GXV49c9Q:miyahunaAdmin!@#123').then( hash => {
            hashValue= 'ts=' + ts + ',response=' + hash;
            fetch('http://miyahunaportal.arabiacell.biz/api/user/resend_pin_code',{
              method: 'POST',
              headers: {
                Authorization: 'ts=' + ts + ',response=' + hash
              },
              body: userFormData
           })
            .then((response) => response.json())
            .then((responseJson) => { 
              if(!responseJson.status){
                dispatch(FetchFailureResendCode(responseJson.message));
              }else{
                dispatch(FetchSuccessResendCode(responseJson));
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

export const UserBalanceHistory = ( userData) => {
  return dispatch => {
    var ts = Math.round(new Date().getTime()/1000);
    return sha256( ts + ':sK8DkvuyKGeb19b437g4Cv33GXV49c9Q:miyahunaAdmin!@#123').then( hash => {
            hashValue= 'ts=' + ts + ',response=' + hash;
            fetch('http://miyahunaportal.arabiacell.biz/api/user/balance_history?user_id=' + userData.user_id + '&account=' + userData.account ,{
              method: 'GET',
              headers: {
                Authorization: 'ts=' + ts + ',response=' + hash
              }
           })
            .then((response) => response.json())
            .then((responseJson) => { 
              if(!responseJson.status){
                dispatch(FetchFailureBalanceHistory(responseJson.message));
              }else{
                dispatch(FetchSuccessBalanceHistory(userData.account, responseJson.data));
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

//Participation (GET):
export const UserParticipationInfo = ( userID ) => {
  return dispatch => {
    var ts = Math.round(new Date().getTime()/1000);
    return sha256( ts + ':sK8DkvuyKGeb19b437g4Cv33GXV49c9Q:miyahunaAdmin!@#123').then( hash => {
            hashValue= 'ts=' + ts + ',response=' + hash;
            fetch('http://miyahunaportal.arabiacell.biz/api/user/participant_info?user_id=' + userID ,{
              method: 'GET',
              headers: {
                Authorization: 'ts=' + ts + ',response=' + hash
              }
           })
            .then((response) => response.json())
            .then((responseJson) => {  
              if(responseJson.status === false ){
                dispatch(FetchFailureParticipationInfo(responseJson.message));
              }else{
                // collect all user counter accounts and save it
                const accounts= [];
                responseJson.forEach(element => {
                  accounts.push({account: element['account'], accountHolder: element['info']['name']})
                });
                dispatch(FetchSuccessParticipationInfo(responseJson, accounts));
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

// to keep track of sidedrawer components
export const SaveTabID = (tabID) => {
  return dispatch => {
    dispatch(SavingTabID(tabID));
  }
}