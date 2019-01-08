import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Input from '../Styles/Input'
import Button from '../Styles/Button'
import { Navigation } from 'react-native-navigation/lib/dist/Navigation';

class WaterBill extends React.Component {
    constructor(props){
        super(props)
        this.state={
            isLoading: false,
            account : null,
            balance: null,
            accountFailMsg : false       
        }
        this.handleCheckBill = this.handleCheckBill.bind(this);
        this.handleAddAccount = this.handleAddAccount.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
    }

    handleCheckBill(){
        this.setState({
            isLoading: true,
            accountFailMsg : false
        })
        const index =this.props.accounts.indexOf(this.state.account);
        //check if the element exist in users account database.
        if( index > -1){
            this.props.info.forEach(element => {
                if(element['account'] === this.state.account){
                    this.setState({
                        balance: element['info']['balance'],
                        isLoading : false
                    })
                }
            })
        }else{
            // if the account doesnt exist, ask the user to add a new one
            this.setState({
                accountFailMsg: true,
                isLoading : false
            })
        }
    }

    onChangeText = (key, value) => {
        this.setState({
          [key]: value
        })
    }

    handleAddAccount (){
        this.setState({
            accountFailMsg: false
        })
        this.props.onHandleAddAccount();
    }

    render (){
        return (
                <View>
                    <Text style={styles.greeting}>
                    Please Enter your Account Number to Check
                    </Text>
                    <View style={styles.inputContainer}>
                        <Input
                            value={this.state.account}
                            placeholder="Account Number"
                            type='account'
                            keyboardType='numeric'
                            onChangeText={this.onChangeText}
                        />
                    </View>
                    <Button
                        title='Get Bill'
                        onPress={this.handleCheckBill.bind(this)}
                        isLoading={this.state.isLoading}
                    />
                    {this.state.balance && (
                        <Text style={[styles.Balancetext]}>Your Balance is: {this.state.balance}</Text>
                    )}
                    {this.state.accountFailMsg && (
                        <View>
                            <Text style={[styles.errorMessage, {color: 'black'}]}>This account is not regestered in your profile, please add it first, click below</Text>
                            <Button
                            title='Add Account'
                            onPress={this.handleAddAccount.bind(this)}
                            isLoading={this.state.isLoading}
                            />
                        </View>
                    )}
                </View>
        )
    }
}

const styles = StyleSheet.create({
    inputContainer: {
      marginTop: 20
    },
    greeting: {
      fontFamily: 'Lato-Light',
      color: '#666',
      fontSize: 20,
      marginTop: 5
    },
    errorMessage: {
        fontFamily: 'Lato-Regular',
        fontSize: 12,
        marginTop: 10,
        color: 'transparent'
    },
    Balancetext: {
        color:  '#1493ff',
        fontFamily:  'Lato-Light',
        fontSize: 25,
        letterSpacing: 0.5
    }
});

export default WaterBill;