// Actions are payloads of information that send data from the application to the store
import {Fetch_Failure, Fetch_Sucess , Fetch_Sucess_Water_Role, Fetch_Sucess_User_Register, Fetch_Sucess_User_Login} from './actionTypes';

export const FetchSuccess = data => {
    return {
        type: Fetch_Sucess,
        payload: { data }
    }
};

export const FetchSuccessWaterRoles = data => {
    return {
        type: Fetch_Sucess_Water_Role,
        payload: { data }
    }
};

export const FetchSuccessUserRegister = data =>{
    return {
        type : Fetch_Sucess_User_Register,
        payload: { data }
    }
}

export const FetchFailure = error => {
    return {
        type: Fetch_Failure,
        payload: { error }
    }
}

export const FetchSuccessUserLogin = data => {
    return {
        type: Fetch_Sucess_User_Login,
        payload: {data}
    }
}