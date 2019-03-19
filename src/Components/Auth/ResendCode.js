import React from 'react';
import { View, StyleSheet, Text, Image, Modal, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { fonts, colors } from './../../assets/Theme';
import * as data from './../../assets/lang.json';   

class ResendCode extends React.Component {
    constructor(props){
        super(props);
        this.state={
            modalVisible: true,
            user_id: this.props.user_id,
            phonenumber: '',
            isLoading: false
        };
    }

    componentWillReceiveProps(props){
        //activate activityindicator only if there is resending code messages ( to solve conflict that happens when send code)
        if( props.resendCodeFailMsg || props.resendCodeMsg ){
            this.setState({
                isLoading: false
            })
        }
    }
    
    onChangeText = (key, value) => {
        this.setState({
          [key]: value
        })
    }

    handleResendCode = () => {
        this.setState({
            isLoading: true
        })
        this.props.onResendCode(this.state);
    }

    closeModel = () => {
        this.setState({
            modalVisible : false
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
            <View style={{flex:1}}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        console.log('Modal has been closed.');
                    }}>
                    <View style={styles.modal}>
                        <Text style={[styles.logoText,{marginBottom: 30}]}>{data[this.props.lang]['checkPhone']}</Text>
                        <TextInput
                            value={this.state.phonenumber}
                            placeholder={data[this.props.lang]['phoneNum']}
                            onChangeText= {value => this.onChangeText('phonenumber', value)}
                            style= {[styles.textInput,{paddingLeft: this.paddingLeft()},{paddingRight: this.paddingRight()}, {textAlign: this.textAlign()}]}
                            keyboardType='numeric'
                        />           
                        <TouchableOpacity onPress={()=> this.handleResendCode()} style={{marginBottom: 20}}>
                            <Image source={require('./../../assets/images/green_button.png')} />
                                <Text style={styles.buttonText}>{data[this.props.lang]['reSendCode']}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> this.closeModel()} style={{marginBottom: 20}}>
                            <Image source={require('./../../assets/images/blue_button.png')} />
                                <Text style={styles.buttonText}>{data[this.props.lang]['close']}</Text>
                        </TouchableOpacity>
                        {this.state.isLoading && (
                            <View style={styles.activityIndicator}>
                                <ActivityIndicator color={colors.LightBlue} />
                            </View>
                        )}
                        {this.props.resendCodeMsg && (
                            <Text style={[styles.text, { color: 'green' }]}>{this.props.resendCodeMsg}</Text>
                        )}
                        {this.props.resendCodeFailMsg && (
                            <Text style={[styles.text, { color: 'red' }]}>{this.props.resendCodeFailMsg}</Text>
                        )}
                    </View>
                </Modal> 
            </View>
        )
    }
}

const styles = StyleSheet.create({
    logoText:{
        color: colors.DarkBlue,
        fontSize: 25,
        fontFamily: fonts.bold
    },
    text:{
        fontSize: 18,
        fontFamily: fonts.TunisiaLt,
        color: colors.LightBlue
    },
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'rgba(0,0,0,0.9)'
    },
    modalCotent:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modelText:{
        flex: 0.5,
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontSize: 20,
        fontFamily: fonts.Hacen
    },
    textInput: {
        fontSize: 18,
        fontFamily: fonts.TunisiaLt,
        marginBottom: 25,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 20,
        backgroundColor: 'white',
        width: 280,
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
})
  
export default ResendCode;