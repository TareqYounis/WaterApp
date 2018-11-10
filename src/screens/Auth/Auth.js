import React, { Component} from 'react';
import { View, Text, Button } from 'react-native';

class AuthScreen extends Component {
    render(){
        return (
            <View>
                <Text>Auth AuthScreen</Text>
                <Button title="login"/>
            </View>
        )
    }
}

export default AuthScreen;