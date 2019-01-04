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