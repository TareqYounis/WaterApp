import React, { Component} from 'react';
import { View, Text, Button } from 'react-native';
import StartMainTabs from '../MainTabs/StartMainTabs';

class AuthScreen extends Component {
    loginHandler = () => {
        StartMainTabs();
    }
    render(){
        return (
            <View>
                <Text>Auth AuthScreen</Text>
                <Button title="login" onPress={this.loginHandler}/>
            </View>
        )
    }
}

export default AuthScreen;