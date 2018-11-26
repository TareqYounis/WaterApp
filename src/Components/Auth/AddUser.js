import React from 'react';
import { TextInput, View, Button} from 'react-native';

class AddUser extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            username: '',
            email: '',
            phone: 0,
            password: '',
            pass_confirm: '',
            full_name: ''
        }
        this.AdduserAccount = this.AdduserAccount.bind(this);
    }
    AdduserAccount () {
        this.props.onAddingUser(this.state);
    }

    render(){
        return (
            <View>
                 <TextInput 
                style={{height: 40, width:300}}
                placeholder={"enter your Full name"}
                onChangeText= {(full_name) => this.setState({full_name})}
                />
                <TextInput 
                style={{height: 40, width:300}}
                placeholder={"enter your username"}
                onChangeText= {(username) => this.setState({username})}
                />
                <TextInput 
                style={{height: 40, width:300}}
                placeholder={"enter your email"}
                onChangeText= {(email) => this.setState({email})}
                />
                <TextInput 
                style={{height: 40, width:300}}
                placeholder={"enter your phone number"}
                onChangeText= {(phone) => this.setState({phone})}
                />
                <TextInput 
                style={{height: 40, width:300}}
                placeholder={"enter your password"}
                onChangeText= {(password) => this.setState({password})}
                />
                <TextInput 
                style={{height: 40, width:300}}
                placeholder={"enter your password confirmation"}
                onChangeText= {(pass_confirm) => this.setState({pass_confirm})}
                />
                 
                <Button title= "submit" onPress={this.AdduserAccount}/>
            </View>
        )
    }
}

export default AddUser;