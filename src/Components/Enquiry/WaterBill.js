import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ActivityIndicator } from 'react-native';
import { fonts, colors } from './../../assets/Theme';
import * as data from './../../assets/lang.json';

class WaterBill extends React.Component {
    constructor(props){
        super(props)
        this.state={
            isLoading: false,
            account : null,
            balance: null,
            accountFailMsg : false       
        }
    }

    handleCheckBill = () => {
        // rest old data in store and state before continue, and then make a request
        this.props.onResetState();
        this.setState({
            isLoading: true,
            balance: null,
            accountFailMsg : false 
        })

        let index= false;
        this.props.userAccounts.forEach(element => {
            if(element['account'] === this.state.account){
                return index = true
            }
        });
        //check if the element exist in users account database.
        if( index ){
            this.props.particpationInfo.forEach(element => {
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

    handleAddAccount = () => {
        this.setState({
            accountFailMsg: false
        })
        this.props.onHandleAddAccount();
    }

    render (){
        return (
            <View style={styles.container}>
            <View style={styles.quarter1}>
                <Text style={styles.headText}>{data[this.props.lang]['waterBillFillMessg']}</Text>
            </View>
            <View style={styles.half2}>
                <TextInput
                    value={this.state.account}
                    placeholder={data[this.props.lang]['waterRoleAccount#']}
                    onChangeText= {value => this.onChangeText('account', value)}
                    style= {[styles.textInput]}
                    keyboardType='numeric'
                /> 
                <TouchableOpacity onPress={()=> this.handleCheckBill()}>
                    <Image source={require('./../../assets/images/blue_button.png')} />
                        <Text style={styles.buttonText}>{data[this.props.lang]['send']}</Text>
                </TouchableOpacity>
                {this.state.isLoading && (
                    <View style={styles.activityIndicator}>
                        <ActivityIndicator color={colors.LightBlue} />
                    </View>
                )} 
                {this.state.balance && (  
                    <View>
                        <Image source={require('./../../assets/images/notification_pop_up.png')} />
                        <Text style={styles.buttonText}>{data[this.props.lang]['waterBillRespMessg']} {"\n"} {this.state.balance} {data[this.props.lang]['balanceJD']}</Text>
                    </View>
                )}                   
            </View>
            {this.state.accountFailMsg && (
                <View style={[styles.response]}>
                    <Text style={styles.text}> {data[this.props.lang]['waterBillErrRespMessg']}</Text>
                    <TouchableOpacity onPress={()=> this.handleAddAccount()}>
                    <Image source={require('./../../assets/images/green_button.png')} />
                        <Text style={styles.buttonText}>{data[this.props.lang]['addAccount']}</Text>
                    </TouchableOpacity>
                </View>
            )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    quarter1: {
        flex: 0.15,
        backgroundColor: colors.LightBlue
    },
    half2:{
        flex: 0.65,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    headText:{
        color: 'white',
        fontSize: 22,
        fontFamily: fonts.bold
    },
    textInput: {
        fontSize: 18,
        fontFamily: fonts.TunisiaLt,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 20,
        backgroundColor: 'white',
        borderColor: colors.LightBlue,
        borderWidth:1,
        width: 270,
        height: 35
    },
    buttonText:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute', 
        alignSelf: 'center',
        color: 'white',
        fontSize: 20,
        fontFamily: fonts.TunisiaLt
    },    
    activityIndicator: {
        transform: [{scale: 0.70}],
        marginTop: 3.5,
        marginLeft: 5
    },
    text:{
        fontSize: 20,
        fontFamily: fonts.bold,
        color: 'white'
    },
    response:{
        flex:0.20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.DarkBlue
    }
});

export default WaterBill;