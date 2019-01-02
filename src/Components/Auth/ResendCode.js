import React from 'react';
import { View, Alert, Text, StyleSheet, Modal } from 'react-native';
import Input from '../Styles/Input'
import Button from '../Styles/Button'

class ResendCode extends React.Component {
    constructor(props){
        super(props);
        this.state={
            modalVisible: true,
            phonenumber: ''
        }; 
        this.onChangeText = this.onChangeText.bind(this);
        this.closeModel = this.closeModel.bind(this);
        this.handleResendCode = this.handleResendCode.bind(this);
    }
    onChangeText = (key, value) => {
        this.setState({
          [key]: value
        })
    }

    handleResendCode(){
        this.props.onhandleResendCode(this.state);
    }

    closeModel(){
        this.setState({
            modalVisible : false
        })
    }
    
    render(){
        return(
            <View>
                <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}>
                    <View style={styles.modal}>
                        <Input
                        placeholder="Enter Phone number"
                        type='phonenumber'
                        keyboardType='numeric'
                        onChangeText={this.onChangeText}
                        value={this.state.phonenumber}
                        keyboardType='numeric'
                        />
                        <Button
                        title='Confirm'
                        onPress= {this.handleResendCode.bind(this)}
                        isLoading={this.state.isAuthenticating}
                        />
                        <Text style={[styles.errorMessage,{ color: 'black' }]}>{this.props.resendCodeMsg}</Text>
                        { this.props.resendCodeFailMsg && (
                            <Text style={[styles.errorMessage,{ color: 'black' }]}>Error. Please try again. {"\n"} {this.props.resendCodeFailMsg}</Text>
                        )}
                        <Button
                            title='Close'
                            onPress= {this.closeModel.bind(this)}
                            isLoading={this.state.isAuthenticating}
                        />
                    </View>
                </Modal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 40
      },
      modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
})
  
export default ResendCode;