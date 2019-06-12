import React from 'react';
import { View, StyleSheet, Text, Image, Dimensions, ImageBackground, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { fonts, colors } from './../../assets/Theme';
import * as data from './../../assets/lang.json';

const deviceWidth = Dimensions.get("window").width;
const deviceHeight= Dimensions.get("window").height;

class UserLogin extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            username : '',
            password: ''
        }
    }

    textAlign = ()=> {
        return this.props.lang  === 'English' ? 'left' : 'right'     
    }
    
    componentWillReceiveProps(props){
        this.setState({
            isLoading: false
        })
    }

    onChangeText = (key, value) => {
        this.setState({
          [key]: value
        })
    }

    loggingIn = () => {
        // activate activityindicator
        this.setState({
            isLoading: true
        })
        // Delete all old state data and messgaes, to avoid infinte loops, before sending a new request.
        this.props.onResetState();
        // send a request to logIn
        this.props.onLoggingIn(this.state);
    }

    signingUp = () => {
        // Delete all old state data and messgaes, to avoid having same screen view again before navigating.
        this.props.onResetState();
        Navigation.push(this.props.componentId,{
            component:{
                name: 'water-app.SignUpScreen'
            } 
        })
    }

    render(){
        return(
            <View style={styles.container}>
            <View style={styles.half1}>
                <Image source={require('./../../assets/images/logo_inner_page.png')} />
                <Text style={styles.logoText}>{data[this.props.lang]['logInRequest']}</Text>
            </View>
            <View style={styles.half2}>
                <ImageBackground source={require('./../../assets/images/background_blue.png')} style={{width: deviceWidth, height: deviceHeight}} >
                    <View style={[styles.inputs]}>
                        <TextInput
                            value={this.state.username}
                            placeholder={data[this.props.lang]['userName']}
                            onChangeText= {value => this.onChangeText('username', value)}
                            style= {[styles.textInput]}
                        />
                        <TextInput
                            value={this.state.password}
                            onChangeText= {value => this.onChangeText('password', value)}
                            placeholder={data[this.props.lang]['passWord']}
                            style= {[styles.textInput,{textAlign: this.textAlign()}]}
                            secureTextEntry
                        />
                        <TouchableOpacity onPress={()=> this.loggingIn()} style={{marginBottom: 20}}>
                            <Image source={require('./../../assets/images/blue_button.png')} />
                                <Text style={styles.buttonText}>{data[this.props.lang]['login']}</Text>
                        </TouchableOpacity>
                        {this.state.isLoading !== false && (
                            <View style={styles.activityIndicator}>
                                <ActivityIndicator color={colors.LightBlue} />
                            </View>
                        )}
                        <TouchableOpacity onPress={()=> this.signingUp()} style={{marginBottom: 15}}>
                            <Text style={styles.text}>{data[this.props.lang]['signup']}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> alert('لا يوجد')} style={{marginBottom: 15}}>
                            <Text style={styles.text}>{data[this.props.lang]['forgetPassword']}</Text>
                        </TouchableOpacity>
                        {this.props.loginFailMsg && (
                            <Text style={[styles.text, { color: 'red' }]}>{this.props.loginFailMsg}</Text>
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
        flex: 1,
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
        flex: 0.6,
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
        marginBottom: 15,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 20,
        backgroundColor: 'white',
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
});
export default UserLogin;