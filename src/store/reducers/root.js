import {Add_Name, Delete_Name, Select_Name, Deselect_Name, Fetch_Sucess, Fetch_Failure, Fetch_Sucess_Water_Role} from '../actions/actionTypes';

const initiaState ={
    names: [],
    waterRole: "",
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
        }
        default : 
            return state;
    }
};

export default reducer;