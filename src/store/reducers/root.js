import { Save_Lang, Save_Id, Reset_State, Fetch_Sucess, Fetch_Failure, Fetch_Sucess_Water_Role, Fetch_Failure_Water_Roles, Fetch_Sucess_User_Register, Fetch_Failure_User_Register, Fetch_Sucess_User_Login, Fetch_Failure_User_Login, Fetch_Sucess_User_Add_Account, Fetch_Success_Complaint_Service, Fetch_Failure_Complaint_Service, Fetch_Success_Balance_History, Fetch_Failure_User_Add_Account, Fetch_Sucess_Invoice_Calculation, Fetch_Failure_Invoice_Calculation, Fetch_Sucess_Usage_Type, Tab_ID, Fetch_Success_Complaint_Type, Fetch_Sucess_Subscription_Type, Fetch_Success_Villages, Fetch_Success_Blooks, Fetch_Success_Sectors, Fetch_Success_Parcles, Fetch_Success_Application_Request, Fetch_Success_Objection_Service, Fetch_Failure_Objection_Service, Fetch_Failure_Balance_History, Fetch_Success_Return_Counter, Fetch_Failure_Return_Counter, Fetch_Success_Register_Confirm,  Fetch_Failure_Register_Confirm, Fetch_Success_Resend_Code, Fetch_Failure_Resend_Code, Fetch_Failure_Participation_Info, Fetch_Success_Participation_Info  } from '../actions/actionTypes';

const initiaState ={
    lang: '',
    user_id: null,
    signUpUser_id: null,
    waterRole: null,
    waterRoleFail: null,
    signupFailMsg: null,
    loginFailMsg: null,
    userProfile: [],
    userAccounts: [],
    messageAddAccount: null,
    messageFailAddAccount: null,
    invoice_value : null,
    invoiceFailMsg: null,
    usage_type: [],
    complaintType: [],
    subscriptionType : [],
    villagesGIS: [],
    blooksGIS: [],
    sectorsGIS : [],
    parclesGIS : [],
    complaint: null,
    complaintFailMsg: null,
    requestApplication : '',
    objectionResults : [],
    objectionFailResults: null,
    balanceHistory: [],
    balanceHistoryFailMsg: null,
    particpationInfo: [],
    returnCounter: [],
    failReturnCounter: null,
    resendCodeMsg: null,
    registConfirmMsg: null,
    registConfirmFailMsg: null,
    resendCodeFailMsg: null,
    particpFailMsg: null,
    error: null,
    Tab_ID: '',
    data: []
}
//reducer is the function that takes old state and the action and returns the new state.
const reducer = (state = initiaState, action ) => {
    switch (action.type){
        case Reset_State:
        return {
                ...state,
            waterRole: null,
            waterRoleFail: null,
            signupFailMsg: null,
            loginFailMsg: null,
            messageAddAccount: null,
            messageFailAddAccount: null,
            invoice_value : null,
            invoiceFailMsg: null,
            complaint: null,
            complaintFailMsg: null,
            failReturnCounter: null,
            objectionFailResults: null,
            objectionResults: [],
            balanceHistoryFailMsg: null,
            resendCodeMsg: null,
            registConfirmMsg: null,
            registConfirmFailMsg: null,
            resendCodeFailMsg: null,
            particpFailMsg: null,
            error: null       
        }
        case Save_Lang:
        return {
            ...state,
            lang: action.payload.lang
        };
        case Save_Id:
        return {
            ...state,
            user_id: action.payload.id
        };        
        case  Fetch_Failure:
        return{
            ...state,
            error: action.payload.error
        };
        case Fetch_Sucess:
        return {
            ...state,
            data : action.payload.data
        };
        case Fetch_Sucess_Water_Role:
        return {
            ...state,
            waterRole: action.payload.data
        };
        case Fetch_Failure_Water_Roles:
        return {
            ...state,
            waterRoleFail: action.payload.data
        }
        case Fetch_Sucess_User_Register:
        return {
            ...state,
            signUpUser_id : action.payload.data
        };
        case Fetch_Failure_User_Register:
        return {
            ...state,
            signupFailMsg: action.payload.data
        }
        case Fetch_Sucess_User_Login:
        return {
            ...state,
            user_id: action.payload.userID,
            userProfile: state.userProfile.concat({
                user_id: action.payload.userID,
                email: action.payload.email,
                phone: action.payload.phone,
                role_name: action.payload.role_name,
                username:  action.payload.username,
                language : action.payload.language,
                display_name: action.payload.display_name
            })
        };
        case Fetch_Failure_User_Login:
        return {
            ...state,
            loginFailMsg : action.payload.data
        }
        case Fetch_Sucess_User_Add_Account:
        return {
            ...state,
            messageAddAccount: action.payload.message
        };
        case Fetch_Failure_User_Add_Account:
        return {
            ...state,
            messageFailAddAccount : action.payload.message
        }
        case Fetch_Sucess_Invoice_Calculation:
        return {
            ...state,
            invoice_value: action.payload.value
        };
        case Fetch_Failure_Invoice_Calculation:
        return {
            ...state,
            invoiceFailMsg: action.payload.value
        };
        case Fetch_Sucess_Usage_Type:
        return {
            ...state,
            usage_type: action.payload.usageType
        }
        case Tab_ID:
        return {
            ...state,
            Tab_ID : action.payload.tabId
        };
        case Fetch_Success_Complaint_Type:
        return {
            ...state,
            complaintType : action.payload.complaintType
        };
        case  Fetch_Success_Complaint_Service:
        return {
            ...state,
            complaint: action.payload.data
        };
        case Fetch_Failure_Complaint_Service:
        return {
            ...state,
            complaintFailMsg : action.payload.data
        }; 
        case Fetch_Sucess_Subscription_Type:
        return {
            ...state,
            subscriptionType : action.payload.subscriptionType
        };
        case Fetch_Success_Villages:
        return {
            ...state,
            villagesGIS : action.payload.villagesGIS
        };
        case Fetch_Success_Blooks:
        return {
            ...state,
            blooksGIS : action.payload.blooksGIS
        };
        case Fetch_Success_Sectors:
        return {
            ...state,
            sectorsGIS: action.payload.sectorsGIS
        };
        case Fetch_Success_Parcles:
        return {
            ...state,
            parclesGIS: action.payload.parclesGIS
        };
        case Fetch_Success_Application_Request:
        return {
            ...state,
            requestApplication: action.payload.application
        };
        case Fetch_Success_Objection_Service:
        return {
            ...state,
            objectionResults : action.payload.objection
        };
        case Fetch_Failure_Objection_Service:
        return {
            ...state,
            objectionFailResults : action.payload.objectionFail
        };
        case Fetch_Success_Balance_History:
        return {
            ...state,
            balanceHistory: state.balanceHistory.concat({
                account : action.payload.account,
                history : action.payload.history
            })
        };
        case Fetch_Failure_Balance_History:
        return {
            ...state,
            balanceHistoryFailMsg : action.payload.message
        }
        case Fetch_Success_Return_Counter:
        return {
            ...state,
            returnCounter : action.payload.returnCounter
        };
        case Fetch_Failure_Return_Counter:
        return {
            ...state,
            failReturnCounter : action.payload.failReturnCounter
        }
        case Fetch_Success_Register_Confirm:
        return {
            ...state,
            user_id: action.payload.userID,
            registConfirmMsg : action.payload.msg
        };
        case Fetch_Failure_Register_Confirm:
        return {
            ...state,
            registConfirmFailMsg : action.payload.msg
        }
        case Fetch_Success_Resend_Code:
        return {
            ...state,
            user_id : action.payload.userID,
            resendCodeMsg : action.payload.msg            
        };
        case Fetch_Failure_Resend_Code :
        return {
            ...state,
            resendCodeFailMsg: action.payload.data
        };
        case Fetch_Failure_Participation_Info: 
        return {
            ...state,
            particpFailMsg : action.payload.message
        };
        case Fetch_Success_Participation_Info:
        return {
            ...state,
            particpationInfo : action.payload.userData,
            userAccounts : action.payload.accounts
        };
        default : 
            return state;
    }
};

export default reducer;