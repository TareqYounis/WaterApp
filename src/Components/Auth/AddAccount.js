import React from 'react';
import { View, TextInput, Button, Picker } from 'react-native';

class AddAccount extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user_id: this.props.user_id,
            company_id: 1,
            account: 0,
            iron_number: '',
            account_name: ''
        }
        this.handleAddAccount = this.handleAddAccount.bind(this);
    }

    handleAddAccount (){
        this.props.onAddingAccount(this.state);
    }
    
    render(){
        return(
            <View>
                <Picker
                    selectedValue={this.state.company_id}
                    style={{ height: 50, width: 100 }}
                    onValueChange={(company_id) => this.setState({company_id})}>
                    {this.props.organizations.map((item, index) => {
                        return (<Picker.Item label={item.name_ar} value={item.id} key={index}/>) 
                    })}
                </Picker> 
                <TextInput 
                style={{height: 40, width:300}}
                placeholder={"enter your account"}
                onChangeText= {(account) => this.setState({account})}
                />
                <TextInput 
                style={{height: 40, width:300}}
                placeholder={"enter your iron_number"}
                onChangeText= {(iron_number) => this.setState({iron_number})}
                />
                <TextInput 
                style={{height: 40, width:300}}
                placeholder={"enter your account_name"}
                onChangeText= {(account_name) => this.setState({account_name})}
                />
                <Button title="Add Account" onPress={this.handleAddAccount}/>
            </View>
        )
    }
}

export default AddAccount;