import React from 'react';
import { View, Picker, Image, StyleSheet, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { fonts, colors } from './../../assets/Theme';
import * as data from './../../assets/lang.json';

class AddAccount extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            company_id: 1,
            account: '',
            iron_number: '',
            account_name: '',
            isLoading: false
        }
    }

    handleAddAccount = () => {
        //convert string values to numbers and send it
        this.setState({
            iron_number: Number(this.state.iron_number),
            account : Number(this.state.account),
            user_id: this.props.user_id,
            isLoading: true
        })
        this.props.onAddingUserAccount(this.state);
    }
    
    onChangeText = (key, value) => {
        this.setState({
          [key]: value
        })
    }
    
    render(){
        return(
            <View style={styles.container}>
            <View style={styles.half1}>
                <Picker
                    selectedValue={this.state.company_id}
                    itemStyle={styles.picker}
                    onValueChange={(company_id) => this.setState({company_id})}>
                    <Picker.Item label={data[this.props.lang]['waterRolesOrgz#']} value='0' color="#1493ff" />
                    {this.props.data.map((item, index) => {
                        return (<Picker.Item label={item.name_en} value={item.id} key={index} color="#1493ff"/>) 
                    })}
                </Picker>
                <TextInput
                    value={this.state.account_name}
                    placeholder={data[this.props.lang]['waterTableName']}
                    onChangeText= {value => this.onChangeText('account_name', value)}
                    style= {[styles.textInput]}
                />
                <TextInput
                    value={this.state.account}
                    placeholder={data[this.props.lang]['waterTableAccount']}
                    onChangeText= {value => this.onChangeText('account', value)}
                    style= {[styles.textInput]}
                    keyboardType='numeric'
                />
                <TextInput
                    value={this.state.iron_number}
                    placeholder={data[this.props.lang]['waterTableIron#']}
                    onChangeText= {value => this.onChangeText('iron_number', value)}
                    style= {[styles.textInput]}
                    keyboardType='numeric'
                />
                </View>
                <View style={styles.half2}>
                    <TouchableOpacity onPress={()=> this.handleAddAccount()}>
                        <Image source={require('./../../assets/images/blue_button.png')} />
                        <Text style={styles.buttonText}>{data[this.props.lang]['addAccount']}</Text>
                    </TouchableOpacity>
                    {this.state.isLoading && (
                        <View style={styles.activityIndicator}>
                            <ActivityIndicator color={colors.LightBlue} />
                        </View>
                    )}
                    {this.props.messageFailAddAccount && (
                        <Text style={[styles.text, {color:'red'}]}>{this.props.messageFailAddAccount}</Text>
                    )}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    half1:{
        flex: 0.6,
        justifyContent: 'center',
        alignItems: 'center'
    },
    half2:{
        flex: 0.4,
        alignItems: 'center'
    },
    picker: {
        height: 45,
        width: 150,
        marginBottom: 15,
        borderBottomWidth: 1.5,
        fontSize: 16,
        borderBottomColor: '#1493ff',
        fontFamily: 'Lato-Light'
    },
    textInput: {
        fontSize: 18,
        fontFamily: fonts.TunisiaLt,
        marginBottom: 15,
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
        fontSize: 18,
        fontFamily: fonts.TunisiaLt,
        color: colors.LightBlue
    },
});

export default AddAccount;