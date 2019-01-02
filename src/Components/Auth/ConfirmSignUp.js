import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import ResendCode from '../Auth/ResendCode';
import Input from '../Styles/Input'
import Button from '../Styles/Button'

class ConfirmSignUp extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            code : '',
            user_id: '',
            isLoadingSendCode: false,
            isLoadingResendCode: false,
            showReSendModel : false
        }
        this.onChangeText = this.onChangeText.bind(this);
        this.confirm = this.confirm.bind(this);
        this.showReSendModel = this.showReSendModel.bind(this);
        this.handleResendCode = this.handleResendCode.bind(this);
    }
    
    onChangeText = (key, value) => {
        this.setState({
          [key]: value
        })
    }

    confirm(){
        this.setState({
            isLoadingSendCode : !this.state.isLoadingSendCode
        })
        this.props.onConfirmSignUp(this.state);
    }
    
    showReSendModel(){
        this.setState({
            isLoadingResendCode : !this.state.isLoadingResendCode,
            showReSendModel : !this.state.showReSendModel
        })
    }
    
    handleResendCode(){
        this.props.onResendCodef(this.state)
    }

    render(){
        return(
            <View >
            <View style={styles.heading}>
                <Image
                    source={require('../../assets/miyahuna.png')}
                    style={styles.headingImage}
                    resizeMode="contain"
                />
            </View>
            <Text style={styles.greeting2}>
                Check your Phone
            </Text>
            <View style={styles.inputContainer}>
                <Input
                    value={this.state.code}
                    placeholder="Enter Code"
                    type='code'
                    onChangeText={this.onChangeText}
                />
            </View>
                <Button
                    title='Send Code'
                    onPress={this.confirm.bind(this)}
                    isLoading={this.state.isLoadingSendCode}
                />
                <Text style={[styles.errorMessage,{ color: 'black' }]}>{this.props.registConfirmMsg}</Text>
                        { this.props.registConfirmFailMsg && (
                            <Text style={[styles.errorMessage,{ color: 'black' }]}>Error. Please try again. {"\n"} {this.props.registConfirmFailMsg}</Text>
                        )}
                <Button
                    title='Didnt recieve code? Re-Send Code'
                    onPress={this.showReSendModel.bind(this)}
                    isLoading={this.state.isLoadingResendCode}
                />
                {
                    this.state.showReSendModel && (
                        <ResendCode onhandleResendCode={this.handleResendCode} {...this.props}/>
                    )
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({

    inputContainer: {
      marginTop: 20
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 40
    },
    greeting2: {
      fontFamily: fonts.light,
      color: '#666',
      fontSize: 24,
      marginTop: 5
    },
    heading: {
      flexDirection: 'row'
    },
    headingImage: {
      width: 38,
      height: 38
    },
    errorMessage: {
      fontFamily: fonts.base,
      fontSize: 12,
      marginTop: 10,
      color: 'transparent'
    }
});

export default ConfirmSignUp;