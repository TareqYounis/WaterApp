import React from 'react';
import { View, StyleSheet, Text, Image, Dimensions, ImageBackground, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import ResendCode from '../Auth/ResendCode';
import { fonts, colors } from './../../assets/Theme';
import * as data from './../../assets/lang.json';

const deviceWidth = Dimensions.get("window").width;
const deviceHeight= Dimensions.get("window").height;

class ConfirmSignUp extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            code : '',
            user_id: '',
            isLoadingSendCode: false,
            showReSendModel : false
        }
    }
    
    componentWillReceiveProps(props){
        console.log(props);
        //activate activityindicator only if there is sending code messages ( to solve conflict that happens when resend code)
        if( props.registConfirmFailMsg || props.registConfirmMsg ){
            this.setState({
                isLoadingSendCode : false
            })
        }
    }

    onChangeText = (key, value) => {
        this.setState({
          [key]: value
        })
    }

    confirm = () => {
        this.setState({
            isLoadingSendCode : true,
            user_id: this.props.user_id
        })
        this.props.onConfirmRegisteration(this.state);
    }
    
    showReSendModel = ()=> {
        this.setState({
            showReSendModel : !this.state.showReSendModel
        })
    }

    paddingLeft = () => {
        return this.props.lang === 'English' ? 10 : 150
    }

    paddingRight = () => {
        return this.props.lang === 'English' ? 150 : 10
    }

    textAlign = ()=> {
        return this.props.lang  === 'English' ? 'left' : 'right'     
    }

    render(){
        return(
            <View style={styles.container}>
            <View style={styles.half1}>
                <Image source={require('./../../assets/images/logo_inner_page.png')} />
                <Text style={styles.logoText}>{data[this.props.lang]['checkPhone']}</Text>
            </View>
            <View style={styles.half2}>
                <ImageBackground source={require('./../../assets/images/background_blue.png')} style={{width: deviceWidth, height: deviceHeight}} >
                    <View style={[styles.inputs]}>
                        <TextInput
                            value={this.state.code}
                            placeholder={data[this.props.lang]['enterCode']}
                            onChangeText= {value => this.onChangeText('code', value)}
                            style= {[styles.textInput,{paddingLeft: this.paddingLeft()},{paddingRight: this.paddingRight()}, {textAlign: this.textAlign()}]}
                            keyboardType='numeric'
                        />
                        <TouchableOpacity onPress={()=> this.confirm()} style={{marginBottom: 20}}>
                            <Image source={require('./../../assets/images/dark_blue_button.png')} />
                                <Text style={styles.buttonText}>{data[this.props.lang]['submitCode']}</Text>
                        </TouchableOpacity>
                        {
                            this.state.isLoadingSendCode && (
                            <View style={styles.activityIndicator}>
                                <ActivityIndicator color={colors.LightBlue} />
                            </View>
                            )
                        }
                        <TouchableOpacity onPress={()=> this.showReSendModel()} style={{marginBottom: 20}}>
                            <Image source={require('./../../assets/images/blue_button.png')} />
                                <Text style={styles.buttonText}>{data[this.props.lang]['reSendCode']}</Text>
                        </TouchableOpacity>
                        {this.props.registConfirmMsg && (
                            <Text style={[styles.text, { color: 'green' }]}>{this.props.registConfirmMsg}</Text>
                        )}
                        {this.props.registConfirmFailMsg && (
                            <Text style={[styles.text, { color: 'red' }]}>{this.props.registConfirmFailMsg}</Text>
                        )}
                        {this.state.showReSendModel && (
                            <ResendCode {...this.props}/>
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
        marginBottom: 25,
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
        fontSize: 18,
        fontFamily: fonts.TunisiaLt
    },
    activityIndicator: {
        transform: [{scale: 0.70}],
        marginTop: 3.5,
        marginLeft: 5
    }
});

export default ConfirmSignUp;