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
            full_name: '',
            username: '',
            email: '',
            phone: '',
            password: '',
            pass_confirm: '',
            passwordFail: false,
            emailFail: false,
            nameValidation: true,
            userValidation: true,
            emailValidation: true,
            phoneValidation: true,
            passValidation: true,
            confirmPassValidation: true,
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
        console.log(text);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        if(reg.test(text) === false)
        {
            console.log("Email is Not Correct", this.state);
            return false
        }
        else {
            this.setState({
                email: text
            })
          console.log("Email is Correct");
          return true
        }
    }
    
    signingUp = () => {
        // check if user enterd all form fields
        this.setState({
            nameValidation : this.state.full_name === '' ? false : true,
            userValidation: this.state.username === '' ? false : true,
            phoneValidation : this.state.phone === '' ? false : true,
            emailValidation: this.state.email === '' ? false : true,
            passValidation : this.state.password === '' ? false : true,
            confirmPassValidation : this.state.pass_confirm === '' ? false : true,
        }) 
      
        //check email validaty if the user made an input
        if( this.state.emailValidation ){
                console.warn(this.state.emailValidation, this.validate(this.state.email))
                this.setState({
                    emailFail: !this.validate(this.state.email)  ? true : false
                })
        }

        // check if user has matched password input
        if(this.state.password !== this.state.pass_confirm){
            this.setState({
                passwordFail: true
            })
        }else{
            this.setState({
                passwordFail : false
            })
        }
 
        // this.setState({
        //     isAuthenticating: !this.state.isAuthenticating
        // })
        // this.props.onSigningUp(this.state);
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
                        <TextInput
                            value={this.state.phone}
                            onChangeText= {value => this.onChangeText('phone', value)}
                            placeholder={data[this.props.lang]['phoneNum']}
                            keyboardType = 'numeric'
                            style= {[styles.textInput, !this.state.phoneValidation ? styles.error : null]}
                        />
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
                        <TouchableOpacity onPress={()=> this.signingUp()} style={{marginBottom: 20}}>
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
                        { this.state.passwordFail && (
                            <Text style={[styles.text, { color: 'red' }]}> please make sure of your password</Text>
                        )}
                        { this.state.emailFail && (
                            <Text style={[styles.text, { color: 'red' }]}> please make sure you enter the correct email address</Text>
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