// Actions are payloads of information that send data from the application to the store
import { Fetch_Failure, Fetch_Sucess , Fetch_Sucess_Water_Role, Fetch_Sucess_User_Register, Fetch_Sucess_User_Add_Account, Fetch_Failure_User_Add_Account, Fetch_Failure_User_Register, Fetch_Sucess_User_Login, Fetch_Failure_User_Login, Fetch_Sucess_Invoice_Calculation, Fetch_Sucess_Usage_Type, Tab_ID, Fetch_Success_Complaint_Type, Fetch_Sucess_Subscription_Type, Fetch_Success_Villages, Fetch_Success_Blooks, Fetch_Success_Sectors, Fetch_Success_Parcles, Fetch_Success_Application_Request, Fetch_Success_Objection_Service, Fetch_Success_Balance_History, Fetch_Success_Return_Counter, Fetch_Success_Register_Confirm, Fetch_Failure_Register_Confirm, Fetch_Success_Resend_Code, Fetch_Failure_Resend_Code, Fetch_Failure_Participation_Info, Fetch_Success_Participation_Info } from './actionTypes';


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

export const FetchSuccessUserRegister = data => {
    return {
        type : Fetch_Sucess_User_Register,
        payload: { data }
    }
}

export const FetchFailureUserRegister = data => {
    return {
        type: Fetch_Failure_User_Register,
        payload: { data }
    }
}

export const FetchSuccessUserLogin = data => {
    return {
        type: Fetch_Sucess_User_Login,
        payload: { userID : data.id , email: data.email, username: data.username, phone:data.phone, role_name : data.role_name }
    }
}

export const FetchFailureUserLogin = data => {
    return {
        type: Fetch_Failure_User_Login,
        payload : { data }
    }
}
export const FetchSuccessAddAccount = message => {
    return {
        type: Fetch_Sucess_User_Add_Account,
        payload: { message }
    }
}

export const FetchFailureAddAccount = message => {
    return {
        type: Fetch_Failure_User_Add_Account,
        payload: { message}
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

export const FetchSucessBlooksGIS = ( blooksGIS ) => {
    return {
        type: Fetch_Success_Blooks,
        payload : { blooksGIS }
    }
}

export const FetchSuccessSectorsGIS = ( sectorsGIS ) => {
    return {
        type: Fetch_Success_Sectors,
        payload : { sectorsGIS }
    }
}

export const FetchSuccessParclesGIS = ( parclesGIS ) => {
    return {
        type: Fetch_Success_Parcles,
        payload : { parclesGIS }
    }
}

export const FetchSuccessRequestApplication = ( application ) => {
    return {
        type: Fetch_Success_Application_Request,
        payload: { application }
    }
}

export const FetchSuccessObjectionService = ( objection ) => {
    return {
        type: Fetch_Success_Objection_Service, 
        payload: { objection }
    }
}

export const FetchSuccessBalanceHistory = ( account , history ) => {
    return {
        type : Fetch_Success_Balance_History,
        payload : { account : account, history : history }
    }
}

export const FetchSuccessReturnCounter = ( returnCounter ) => {
    return {
        type: Fetch_Success_Return_Counter,
        payload: { returnCounter }
    }
}

export const FetchSuccessRegisterConfirm = ( data ) => {
    return {
        type: Fetch_Success_Register_Confirm,
        payload: { msg: data.msg , userID: data.data}
    }
}

export const FetchFailureRegisterConfirm = ( msg ) => {
    return {
        type: Fetch_Failure_Register_Confirm,
        payload : { msg }
    }
}

export const FetchSuccessResendCode = ( data ) => {
    return {
        type: Fetch_Success_Resend_Code,
        payload: { msg: data.msg , userID: data.data }
    }
}

export const FetchFailureResendCode = ( data ) => {
    return {
        type: Fetch_Failure_Resend_Code,
        payload : { msg: data.msg }
    }
}

export const FetchFailureParticipationInfo = ( message ) => {
    return {
        type: Fetch_Failure_Participation_Info,
        payload: { message }
    }
}

export const FetchSuccessParticipationInfo = ( userData, accounts ) => {
    return {
        type: Fetch_Success_Participation_Info,
        payload : { userData: userData, accounts: accounts }
    }
}