import { Add_Name, Delete_Name, Select_Name, Deselect_Name, Fetch_Sucess, Fetch_Failure, Fetch_Sucess_Water_Role, Fetch_Sucess_User_Register, Fetch_Sucess_User_Login, Fetch_Sucess_User_Add_Account, Fetch_Sucess_Invoice_Calculation, Fetch_Sucess_Usage_Type, Tab_ID, Fetch_Success_Complaint_Type, Fetch_Sucess_Subscription_Type, Fetch_Success_Villages, Fetch_Success_Blooks, Fetch_Success_Sectors, Fetch_Success_Parcles, Fetch_Success_Application_Request } from '../actions/actionTypes';

const initiaState ={
    names: [],
    waterRole: '',
    user_id: null,
    messageAddAccount: '',
    invoice_value : null,
    usage_type: [],
    complaintType: [],
    subscriptionType : [],
    villagesGIS: [],
    blooksGIS: [],
    sectorsGIS : [],
    parclesGIS : [],
    requestApplication : '',
    error: null,
    Tab_ID: '',
    data: [],
    selectedName: null
}

//reducer is the function that takes old state and the action and returns the new state.
const reducer = (state = initiaState, action ) => {
    //console.log('im looking here', action.type)
    switch (action.type){
        case Add_Name:
        return{
            ...state,
            names: state.names.concat({
                key: Math.random(),
                name: action.name
                // image: {  
                //   uri:
                //     "https://c1.staticflickr.com/5/4096/4744241983_34023bf303_b.jpg"
                // }
            })
        };
        case Delete_Name:
        return {
            ...state,
            names: state.names.filter(name => {
                return name.key !== state.selectedName.key;
            }),
            selectedName: null
        };
        case Select_Name:
        return {
          ...state,
          selectedName: state.names.find(name => {
            return name.key === action.nameKey;
          })
        };
        case Deselect_Name:
        return {
          ...state,
          selectedName: null
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
        case Fetch_Sucess_User_Register:
        return {
            ...state,
            user_id : action.payload.data
        };
        case Fetch_Sucess_User_Login:
        return {
            ...state,
            user_id: action.payload.data
        };
        case Fetch_Sucess_User_Add_Account:
        return {
            ...state,
            messageAddAccount: action.payload.message
        };
        case Fetch_Sucess_Invoice_Calculation:
        return {
            ...state,
            invoice_value: action.payload.value
        }
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
        }
        default : 
            return state;
    }
};

export default reducer;