import {Add_Name, Delete_Name, Select_Name, Deselect_Name} from './actionTypes';

export const AddName = (name) => {
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