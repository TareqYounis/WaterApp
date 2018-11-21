// Actions are payloads of information that send data from the application to the store
import {Add_Name, Delete_Name, Select_Name, Deselect_Name, Fetch_Failure, Fetch_Sucess} from './actionTypes';

export const AddName = (name,key) => {
    return {
        type: Add_Name,
        name : name
    }
};

export const DeleteName = () => {
    return {
        type: Delete_Name
    }
};

export const SelectName = (key) => {
    return {
        type: Select_Name,
        nameKey: key
    }
}

export const DeselectName = () => {
    return {
        type: Deselect_Name
    }
}

export const FetchSuccess = data => {
    console.log('here is fetch',data)
    return {
        type: Fetch_Sucess,
        payload: { data }
    }
};

export const FetchFailure = error => {
    return {
        type: Fetch_Failure,
        payload: { error }
    }
}