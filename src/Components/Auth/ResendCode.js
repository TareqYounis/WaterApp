import React from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from "react-native-modal";


class ResendCode extends React.Component {
    constructor(props){
        super(props);
        this.state={
            visibleModal: false,
            user_id : this.props.user_id,
            phonenumber: ''
        }; 
        this.handleResendCode = this.handleResendCode.bind(this);
    }
    
    handleResendCode(){
        this.props.onhandleResendCode(this.state);
    }
    
    render(){
        return(
            <View>
                    <TouchableOpacity onPress={() => {
                                this.setState({visibleModal : !this.state.visibleModal});
                            }}>
                        <View style={styles.button}>
                            <Text>Didn't receive code? ResendCode</Text>
                        </View>
                    </TouchableOpacity>
                    <Modal
                        isVisible={this.state.visibleModal}
                        onSwipe={() => this.setState({ visibleModal: false })}
                        swipeDirection="left"
                    >
                        <View style={styles.modalContent}>
                            <TextInput 
                                    style={{height: 40, width:300}}
                                    placeholder={"enter your phone number"}
                                    onChangeText= {( phonenumber ) => this.setState({ phonenumber })}
                            />
                            <TouchableOpacity onPress= {() => this.handleResendCode()}>
                                <View style={styles.button}>
                                    <Text>Submit</Text>
                                </View>
                            </TouchableOpacity>
                            <Text>{this.props.resendCodeMsg}</Text>
                            <Text>{this.props.resendCodeFailMsg}</Text>
                            <TouchableOpacity onPress= {() => this.setState({ visibleModal: false })}>
                                <View style={styles.button}>
                                    <Text> Close</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </Modal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    button: {
      backgroundColor: "lightblue",
      padding: 12,
      margin: 16,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 4,
      borderColor: "rgba(0, 0, 0, 0.1)"
    },
    modalContent: {
      backgroundColor: "white",
      padding: 22,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 4,
      borderColor: "rgba(0, 0, 0, 0.1)"
    }
});
  

export default ResendCode;