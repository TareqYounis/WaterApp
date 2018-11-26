import React from 'react';
import { View, TextInput, Button } from 'react-native';

class UserLogin extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username : '',
            password: ''
        }
        this.loggingIn = this.loggingIn.bind(this);
    }
    loggingIn (){
        this.props.onLoggingIn(this.state);
    }
    render(){
        return(
            <View>
                <TextInput 
                style={{height: 40, width:300}}
                placeholder={"enter your username"}
                onChangeText= {(username) => this.setState({username})}
                />
                <TextInput 
                style={{height: 40, width:300}}
                placeholder={"enter your password"}
                onChangeText= {(password) => this.setState({password})}
                />
                <Button title="LogIn" onPress={this.loggingIn}/>
            </View>
        )
    }
}

export default UserLogin;