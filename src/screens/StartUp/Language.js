import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Animated,
    Dimensions
  } from 'react-native';
  
import { Navigation } from 'react-native-navigation';
import { colors, fonts } from '../../Components/Styles/Theme'
// import Input from '../../Components/Styles/Input'
import Button from '../../Components/Styles/Button'
import {AsyncStorage} from 'react-native';

const getUserId = async (key) => {
  let userId = '';
  try {
    userId = await AsyncStorage.getItem(key) || 'none';
  } catch (error) {
    // Error retrieving data
    console.log(error.message);
  }
  return userId;
}

class Language extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isAuthenticating: false,
            Language: 'English'
        }
        this.selectLangague= this.selectLangague.bind(this);
    }
    componentWillMount(){
       getUserId('userId')
       .then(results => {
           console.log(results)
       })
    }
    selectLangague(lang){
        this.setState({
            Language : lang
        })
        Navigation.push(this.props.componentId,{
            component:{
                name: 'water-app.WaterCompanyScreen'
            } 
        })
    }
    render(){
        return (
            <View style={styles.container}>
                <Button
                    title='Arabic'
                    onPress = {this.selectLangague.bind(this,'Arabic')}
                    isLoading={this.state.isAuthenticating}
                    />
                <Button
                    title='English'
                    onPress = {this.selectLangague.bind(this,'Arabic')}
                    isLoading={this.state.isAuthenticating}
                />
          </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
      }
});

export default Language;