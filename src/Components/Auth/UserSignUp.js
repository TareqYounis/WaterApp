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
            username: '',
            email: '',
            phone: '',
            password: '',
            pass_confirm: '',
            full_name: '',
            isAuthenticating: false
        }
    }
    
    componentWillReceiveProps(props){
        console.log(props);
        this.setState({
            isAuthenticating: !this.state.isAuthenticating
        })
    }
    
    signingUp = () => {
        console.log('signingup')
        this.setState({
            isAuthenticating: !this.state.isAuthenticating
        })
        this.props.onSigningUp(this.state);
    }

    onChangeText = (key, value) => {
        this.setState({
          [key]: value
        })
    }

    paddingLeft = () => {
        return this.props.lang === 'English' ? 10 : 150
    }

    paddingRight = () => {
        return this.props.lang === 'English' ? 150 : 10
    }

    inputDirectionRight = () => {
        return this.props.lang  === 'English' ? 10 : 150 
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
                
            <ScrollView style={styles.half2}>
                <ImageBackground source={require('./../../assets/images/background_blue.png')} style={{width: deviceWidth, height: deviceHeight}} >
                    <View style={[styles.inputs]}>
                        <TextInput
                            value={this.state.full_name}
                            onChangeText= {value => this.onChangeText('full_name', value)}
                            placeholder={data[this.props.lang]['fullName']}
                            style= {[styles.textInput,{paddingLeft: this.paddingLeft()},{paddingRight: this.paddingRight()},{textAlign: this.textAlign()}]}
                        />
                        <TextInput
                            value={this.state.username}
                            onChangeText= {value => this.onChangeText('username', value)}
                            placeholder={data[this.props.lang]['userName']}
                            style= {[styles.textInput,{paddingLeft: this.paddingLeft()},{paddingRight: this.paddingRight()},{textAlign: this.textAlign()}]}
                        />
                        <TextInput
                            value={this.state.email}
                            onChangeText= {value => this.onChangeText('email', value)}
                            placeholder={data[this.props.lang]['email']}
                            style= {[styles.textInput,{paddingLeft: this.paddingLeft()},{paddingRight: this.paddingRight()},{textAlign: this.textAlign()}]}
                        />
                        <TextInput
                            value={this.state.phone}
                            onChangeText= {value => this.onChangeText('phone', value)}
                            placeholder={data[this.props.lang]['phoneNum']}
                            style= {[styles.textInput,{paddingLeft: this.paddingLeft()},{paddingRight: this.paddingRight()},{textAlign: this.textAlign()}]}
                        />
                        <TextInput
                            value={this.state.password}
                            onChangeText= {value => this.onChangeText('password', value)}
                            placeholder={data[this.props.lang]['passWord']}
                            style= {[styles.textInput,{paddingLeft: this.paddingLeft()},{paddingRight: this.paddingRight()},{textAlign: this.textAlign()}]}
                            secureTextEntry
                        />
                        <TextInput
                            value={this.state.pass_confirm}
                            onChangeText= {value => this.onChangeText('pass_confirm', value)}
                            placeholder={data[this.props.lang]['confirmPass']}
                            style= {[styles.textInput,{paddingLeft: this.paddingLeft()},{paddingRight: this.paddingRight()},{textAlign: this.textAlign()}]}
                            secureTextEntry
                        />
                        <TouchableOpacity onPress={()=> this.signingUp()} style={{marginBottom: 20}}>
                            <Image source={require('./../../assets/images/dark_blue_button.png')} />
                                <Text style={styles.buttonText}>{data[this.props.lang]['signup']}</Text>
                        </TouchableOpacity>
                        {
                            this.state.isAuthenticating && (
                            <View style={styles.activityIndicator}>
                                <ActivityIndicator color={colors.LightBlue} />
                            </View>
                            )
                        }
                        {this.props.signupFailMsg && (
                            <Text style={[styles.text, { color: 'red' }]}> {this.props.signupFailMsg}</Text>
                        )}
                    </View>
                </ImageBackground>
            </ScrollView>
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
    }
});

export default UserSignUp;