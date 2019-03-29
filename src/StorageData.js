import {AsyncStorage} from 'react-native';

export const getItem = async (key) => {
    let itemValue = '';
    try {
      itemValue = await AsyncStorage.getItem(key) || 'none';
    } catch (error) {
      console.log(error.message);
    }
    return itemValue;
}

export const saveUserId = async userId => {
    let value = '';
    try {
        value = await AsyncStorage.setItem('userId', userId);
    } catch (error) {
        console.log(error.message);
    }
    return value
};

export const saveLangauge = async lang  => {
    await AsyncStorage.setItem('language', lang )
    .then(()=>{
        console.log("It was saved successfully")
    })
    .catch(()=>{
        console.log("There was an error saving")
    })
};

export const saveUserData = async info  => {
    await AsyncStorage.setItem('userData', JSON.stringify(info) )
    .then(()=>{
        console.log("It was saved successfully")
    })
    .catch(()=>{
        console.log("There was an error saving")
    })
};


export const saveUserAccounts = async info  => {
    await AsyncStorage.setItem('userAccounts', JSON.stringify(info) )
    .then(()=>{
        console.log("It was saved successfully")
    })
    .catch(()=>{
        console.log("There was an error saving")
    })
};

export const saveParticipationInfo = async info  => {
    await AsyncStorage.setItem('particInfo', JSON.stringify(info) )
    .then(()=>{
        console.log("It was saved successfully")
    })
    .catch(()=>{
        console.log("There was an error saving")
    })
};

export const removeItemValue = async key => {
    try {
        await AsyncStorage.removeItem(key);
        console.log("It was removed successfully")
    }
    catch(exception) {
        console.log("remove error")
    }
}