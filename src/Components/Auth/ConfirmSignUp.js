import React from 'react';
import { View, TextInput, Button, Text } from 'react-native';

class ConfirmSignUp extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            code : '',
            user_id: ''
        }
        this.confirm = this.confirm.bind(this);
    }
    
    confirm(){
        this.props.onConfirmSignUp(this.state);
    }

    render(){
        return(
            <View>
                <TextInput 
                style={{height: 40, width:300}}
                placeholder={"enter your code"}
                onChangeText= {( code ) => this.setState({ code })}
                />
                <Button title="Submit" onPress={this.confirm}/>
            </View>
        )
    }
}

export default ConfirmSignUp;