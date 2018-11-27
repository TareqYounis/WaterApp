import {Add_Name, Delete_Name, Select_Name, Deselect_Name, Fetch_Sucess, Fetch_Failure, Fetch_Sucess_Water_Role, Fetch_Sucess_User_Register, Fetch_Sucess_User_Login, Fetch_Sucess_User_Add_Account } from '../actions/actionTypes';

const initiaState ={
    names: [],
    waterRole: '',
    user_id: null,
    messageAddAccount: '',
    error: null,
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
        console.log("Im in action payload",action.payload.error)
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
        console.log("Im in action payload",action.payload.data)
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
        default : 
            return state;
    }
};

export default reducer;