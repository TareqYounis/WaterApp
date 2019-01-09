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
    let test = '';
    try {
        test = await AsyncStorage.setItem('userId', userId);
    } catch (error) {
        console.log(error.message);
    }
    return test
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