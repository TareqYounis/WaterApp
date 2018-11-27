// Actions are payloads of information that send data from the application to the store
import {Fetch_Failure, Fetch_Sucess , Fetch_Sucess_Water_Role, Fetch_Sucess_User_Register, Fetch_Sucess_User_Login, Fetch_Sucess_Invoice_Calculation} from './actionTypes';

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
        payload: { data }
    }
}

export const FetchSuccessAddAccount = message => {
    return {
        type: Fetch_Sucess_User_Add_Account,
        payload: { message }
    }
}

export const FetchSucessInvoiceCalculation = value => {
    return {
        type : Fetch_Sucess_Invoice_Calculation,
        payload: { value }
    }
}