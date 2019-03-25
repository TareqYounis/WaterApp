import React from 'react';
import { View, Picker, Image, StyleSheet, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { fonts, colors } from './../../assets/Theme';
import * as data from './../../assets/lang.json';

class AddAccount extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            company_id: 1,
            user_id: this.props.user_id,
            account: 0,
            iron_number: 0,
            account_name: '',
            isLoading: false
        }
    }

    // deactivate activity indicator whenever there is any response from the API
    componentWillReceiveProps(props){
        this.setState({
            isLoading: false
        })
    }
    handleAddAccount = () => {
        // run activity indicator
        this.setState({
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
                <View style={styles.picker}>
                    <Picker
                        selectedValue={this.state.company_id}
                        style={{height: 35, width: 270}} 
                        onValueChange={(company_id) => this.setState({company_id})}>
                        <Picker.Item label={data[this.props.lang]['pickerMsg']} value='0' />
                        {this.props.data.map((item, index) => {
                            return (<Picker.Item label={item.name_en} value={item.id} key={index} />) 
                        })}
                    </Picker>
                </View>
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
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.LightBlue,
        overflow: 'hidden',
        marginBottom: 15
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