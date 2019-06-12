import React from 'react';
import { StyleSheet, Image, Text, View, ScrollView, Dimensions, TouchableOpacity, ImageBackground, TextInput, ActivityIndicator} from 'react-native';
import { fonts, colors } from './../../assets/Theme';
import * as data from './../../assets/lang.json';

const deviceWidth = Dimensions.get("window").width;
const deviceHeight= Dimensions.get("window").height;

class UserSignUp extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            full_name: null,
            username: null,
            email: null,
            phone: 0,
            password: null,
            pass_confirm: null,
            passwordFail: false,
            emailFail: false,
            phoneFail: false,
            nameValidation: true,
            userValidation: true,
            emailValidation: true,
            phoneValidation: true,
            passValidation: true,
            confirmPassValidation: true,
            done: false,
            isAuthenticating: false
        }
    }
    
    componentWillReceiveProps(props){
        this.setState({
            isAuthenticating: !this.state.isAuthenticating
        })
    }

    // a function to check validaty of user email input
    // resource: https://stackoverflow.com/questions/43676695/email-validation-react-native-returning-the-result-as-invalid-for-all-the-e
    validate = (text) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        if(reg.test(text) === false)
        {
            return false
        }
        else {
            this.setState({
                email: text
            })
          return true
        }
    }
    
    formValidation = () => {
        // check if the user enterd all form fields
        // check email validaty after user input
        // check if user have correct phone number length 
        // check if user has matched password input
        this.setState({
            nameValidation : this.state.full_name === null ? false : true,
            userValidation: this.state.username === null ? false : true,
            phoneValidation : this.state.phone === 0 ? false : true,
            emailValidation: this.state.email === null ? false : true,
            passValidation : this.state.password === null ? false : true,
            confirmPassValidation : this.state.pass_confirm === null ? false : true,
            phoneFail: this.state.phone.toString().length < 10 ? true : false,
            emailFail: !this.validate(this.state.email) ? true : false,
            passwordFail: this.state.password !== this.state.pass_confirm ? true : false

        }, () => {
            // eventully, check if all fileds are filled correctly to in order to send request to submit to the server
            if( this.state.nameValidation && this.state.phoneValidation && this.state.userValidation && this.state.emailValidation && this.state.passValidation && this.state.confirmPassValidation && !this.state.phoneFail && !this.state.passwordFail && !this.state.emailFail ){
                this.setState({
                    done: true
                }, () => {  
                    this.signingUp()
                })
            }else{
                this.setState({
                    done: false
                })
            }
        }) 
        
    }
    signingUp = () => {
        // done makes sure that user have valid form data input
        if (this.state.done) {
            this.setState({
                isAuthenticating: !this.state.isAuthenticating
            })
            this.props.onSigningUp(this.state);
        }
    }

    onChangeText = (key, value) => {
        this.setState({
          [key]: value
        })
    }

    textAlign = ()=> {
        return this.props.lang  === 'English' ? 'left' : 'right'     
    }

    render(){
        return (
            <View style={styles.container}>
            <View style={styles.half1}>
                <Image source={require('./../../assets/images/logo_inner_page.png')} />
                <Text style={styles.logoText}>{data[this.props.lang]['welcome']}</Text>
                <Text style={styles.logoText}>{data[this.props.lang]['signInRequest']}</Text>
            </View>
                
            <View style={styles.half2}>
                <ImageBackground source={require('./../../assets/images/background_blue.png')} style={{width: deviceWidth, height: deviceHeight}} >
                    <View style={[styles.inputs]}>
                        <TextInput
                            value={this.state.full_name}
                            onChangeText= {value => this.onChangeText('full_name', value)}
                            placeholder={data[this.props.lang]['fullName']}
                            style= {[styles.textInput, !this.state.nameValidation ? styles.error : null]}
                        />
                        <TextInput
                            value={this.state.username}
                            onChangeText= {value => this.onChangeText('username', value)}
                            placeholder={data[this.props.lang]['userName']}
                            style= {[styles.textInput, !this.state.userValidation ? styles.error : null]}
                        />
                        <TextInput
                            value={this.state.email}
                            onChangeText= {value => this.onChangeText('email', value)}
                            placeholder={data[this.props.lang]['email']}
                            style= {[styles.textInput, !this.state.emailValidation || this.state.emailFail ? styles.error : null]}
                        />
                         { ( this.state.emailFail && this.state.emailValidation ) && (
                            <Text style={[styles.text, { color: 'red' }]}> {data[this.props.lang]['emailValidationErr']}</Text>
                        )}
                        <TextInput
                            value={this.state.phone}
                            onChangeText= {value => this.onChangeText('phone', value)}
                            placeholder={data[this.props.lang]['phoneNum']}
                            keyboardType = 'numeric'
                            style= {[styles.textInput, !this.state.phoneValidation || this.state.phoneFail ? styles.error : null]}
                        />
                        { ( this.state.phoneFail  && this.state.phoneValidation ) && (
                            <Text style={[styles.text, { color: 'red' }]}> {data[this.props.lang]['phoneValidationErr']}</Text>
                        )}
                        <TextInput
                            value={this.state.password}
                            onChangeText= {value => this.onChangeText('password', value)}
                            placeholder={data[this.props.lang]['passWord']}
                            style= {[styles.textInput,{textAlign: this.textAlign()}, !this.state.passValidation || this.state.passwordFail ? styles.error : null ]}
                            secureTextEntry
                        />
                        <TextInput
                            value={this.state.pass_confirm}
                            onChangeText= {value => this.onChangeText('pass_confirm', value)}
                            placeholder={data[this.props.lang]['confirmPass']}
                            style= {[styles.textInput,{textAlign: this.textAlign()}, !this.state.confirmPassValidation || this.state.passwordFail ? styles.error : null]}
                            secureTextEntry
                        />
                        { this.state.passwordFail && (
                            <Text style={[styles.text, { color: 'red' }]}> {data[this.props.lang]['passValidationErr']}</Text>
                        )}
                        <TouchableOpacity onPress={()=> this.formValidation()} style={{marginBottom: 20}}>
                            <Image source={require('./../../assets/images/dark_blue_button.png')} />
                                <Text style={styles.buttonText}>{data[this.props.lang]['signup']}</Text>
                        </TouchableOpacity>
                        { this.state.isAuthenticating && (
                            <View style={styles.activityIndicator}>
                                <ActivityIndicator color={colors.LightBlue} />
                            </View>
                        )}                        
                        { this.props.signupFailMsg && (
                            <Text style={[styles.text, { color: 'red' }]}> {this.props.signupFailMsg}</Text>
                        )}
                    </View>
                </ImageBackground>
            </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    half1: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    half2:{
        flex: 2,
    },
    logoText:{
        color: colors.DarkBlue,
        fontSize: 25,
        fontFamily: fonts.bold
    },
    inputs:{
        flex: 0.7,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text:{
        fontSize: 18,
        fontFamily: fonts.TunisiaLt,
        color: colors.LightBlue
    },
    textInput: {
        fontSize: 18,
        fontFamily: fonts.TunisiaLt,
        marginBottom: 10,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 20,
        width: 280,
        height: 35,
        backgroundColor: 'white'
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
    error: {
        borderWidth: 3, 
        borderColor: 'red' 
    }
});

export default UserSignUp;