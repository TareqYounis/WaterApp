import {Add_Name, Delete_Name, Select_Name, Deselect_Name} from '../actions/actionTypes';

const initiaState ={
    names: [],
    selectedName: null
}
const reducer = (state = initiaState, action ) => {
    switch (action.type){
        case Add_Name:
        return{
            ...state,
            names: state.names.concat({
                key: Math.random(),
                name: action.name,
                image: {  
                  uri:
                    "https://c1.staticflickr.com/5/4096/4744241983_34023bf303_b.jpg"
                }
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
        default : 
            return state;
    }
};

export default reducer;