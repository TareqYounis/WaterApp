import React from 'react';
import { View, Picker, Image, StyleSheet, Text } from 'react-native';
import Input from '../Styles/Input'
import Button from '../Styles/Button'

class AddAccount extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            company_id: 1,
            account: '',
            iron_number: '',
            account_name: ''
        }
        this.handleAddAccount = this.handleAddAccount.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
    }

    handleAddAccount (){
        //convert string values to numbers
        this.state.iron_number = parseInt(this.state.iron_number, 10)
        this.state.account = parseInt(this.state.account, 10)
        this.props.onAddingAccount(this.state);
    }
    
    onChangeText = (key, value) => {
        this.setState({
          [key]: value
        })
    }
    
    render(){
        return(
            <View>
                <View style={styles.inputContainer}>
                    <Picker
                        selectedValue={this.state.company_id}
                        itemStyle={styles.picker}
                        onValueChange={(company_id) => this.setState({company_id})}>
                        <Picker.Item label='Please select an option...' value='0' color="#1493ff" />
                        {this.props.organizations.map((item, index) => {
                            return (<Picker.Item label={item.name_en} value={item.id} key={index} color="#1493ff"/>) 
                        })}
                    </Picker>
                    <Input
                        value={this.state.account}
                        placeholder="Account Number"
                        type='account'
                        onChangeText={this.onChangeText}
                    />
                    <Input
                        value={this.state.iron_number}
                        placeholder="Iron Number"
                        type='iron_number'
                        onChangeText={this.onChangeText}
                    />
                    <Input
                        value={this.state.account_name}
                        placeholder="Account Name Holder"
                        type='account_name'
                        onChangeText={this.onChangeText}
                    />
            </View>
            <Button
                title='Add Account'
                onPress={this.handleAddAccount.bind(this)}
                isLoading={this.state.isAuthenticating}
            />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    inputContainer: {
      marginTop: 20
    },
    picker: {
        height: 45,
        width: 150,
        marginBottom: 15,
        borderBottomWidth: 1.5,
        fontSize: 16,
        borderBottomColor: '#1493ff',
        fontFamily: 'Lato-Light'
    }
});

export default AddAccount;