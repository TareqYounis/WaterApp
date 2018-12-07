// Actions are payloads of information that send data from the application to the store
import { Fetch_Failure, Fetch_Sucess , Fetch_Sucess_Water_Role, Fetch_Sucess_User_Register, Fetch_Sucess_User_Login, Fetch_Sucess_Invoice_Calculation, Fetch_Sucess_Usage_Type, Tab_ID, Fetch_Success_Complaint_Type, Fetch_Sucess_Subscription_Type, Fetch_Success_Villages, Fetch_Success_Blooks } from './actionTypes';


export const FetchFailure = error => {
    return {
        type: Fetch_Failure,
        payload: { error }
    }
}

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
};

export const FetchSuccessUsageType = usageType => {
    return {
        type: Fetch_Sucess_Usage_Type,
        payload : { usageType }
    }
};

export const SavingTabID = tabId => {
    return {
        type: Tab_ID,
        payload: { tabId }
    }
};

export const FetchSuccessComplaintType = (complaintType) => {
    return {
        type: Fetch_Success_Complaint_Type,
        payload: { complaintType }
    }
}

export const FetchSuccessSubscriptionType = ( subscriptionType ) => {
    return {
        type: Fetch_Sucess_Subscription_Type,
        payload : { subscriptionType }
    }
}

export const FetchSuccessVillagesGIS = ( villagesGIS ) => {
    return {
        type : Fetch_Success_Villages,
        payload: { villagesGIS }
    }
}

export const FetchSucessGetBlooksGIS = ( blooksGIS ) => {
    return {
        type: Fetch_Success_Blooks,
        payload : { blooksGIS }
    }
}