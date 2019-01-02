import React from 'react';
import { View, StyleSheet, Alert } from 'react-native'
import ConfirmSignUp from '../../Components/Auth/ConfirmSignUp';
import { connect } from 'react-redux';
import { UserRegisterConfirm, UserResendCode } from '../../store/actions/index';
import StartMainTabs from '../MainTabs/StartMainTabs';

class ConfirmRegister extends React.Component {
    constructor(props){
        super(props);
        this.handleConfirmSignUp = this.handleConfirmSignUp.bind(this);
        this.handleResendCode = this.handleResendCode.bind(this);
    }
   
    componentWillReceiveProps(props){
        if( (props.user_id !== "" || props.user_id !== "undefined" ) && props.registConfirmMsg ){
                Alert.alert("Your account been create successfully")
                StartMainTabs();
        }
    }

    handleConfirmSignUp (userData){
        userData.user_id = this.props.user_id;
        this.props.onConfirmRegisteration(userData);
    }

    handleResendCode(props){
        props.user_id = this.props.user_id;
        this.props.onResendCode(props);
    }

    render(){
        return (
            <View style={styles.container}>
                <ConfirmSignUp onConfirmSignUp= {this.handleConfirmSignUp} onResendCodef= {this.handleResendCode} {...this.props}/>   
            </View>             
        )
    }
}

const mapStateToProps = state => {
    return {
      user_id : state.names.user_id,
      registConfirmMsg : state.names.registConfirmMsg,
      registConfirmFailMsg : state.names.registConfirmFailMsg,
      resendCodeMsg : state.names.resendCodeMsg,
      resendCodeFailMsg : state.names.resendCodeFailMsg
    };
  };
  

const mapDispatchToProps = dispatch => {
    return {
        onConfirmRegisteration: (userData) => dispatch(UserRegisterConfirm(userData)),
        onResendCode: (userData) => dispatch(UserResendCode(userData))
    };
};

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
    }
})
export default connect(mapStateToProps,mapDispatchToProps,null, {"withRef" : true})(ConfirmRegister);