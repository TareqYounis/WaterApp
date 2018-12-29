import React from 'react';
import { View,Text } from 'react-native'
import { connect } from 'react-redux';
import ConfirmSignUp from '../../Components/Auth/ConfirmSignUp';
import { UserRegisterConfirm,UserResendCode } from '../../store/actions/index';
import ResendCode from '../../Components/Auth/ResendCode';
import { Navigation}  from 'react-native-navigation';

class ConfirmRegister extends React.Component {
    constructor(props){
        super(props);
        this.handleConfirmSignUp = this.handleConfirmSignUp.bind(this);
        this.handleResendCode = this.handleResendCode.bind(this);
    }
    componentWillReceiveProps(props){
        if( (props.user_id !== "" || props.user_id !== "undefined" ) && props.registConfirmMsg ){
                alert("Your account been create successfully")
                Navigation.push(this.props.componentId,{
                    component:{
                        name: 'water-app.homeScreen'
                    } 
            })
        }
    }

    handleConfirmSignUp (userData){
        userData.user_id = this.props.user_id;
        console.log("im testing you",userData)
        this.props.onConfirmRegisteration(userData);
    }

    handleResendCode(props){
        console.log('im sending data',props)
        this.props.onResendCode(props);
    }

    render(){
        return (
            <View>
                <ConfirmSignUp onConfirmSignUp = {this.handleConfirmSignUp}/>
                <Text>{this.props.registConfirmFailMsg}</Text>
                <Text>{this.props.registConfirmMsg}</Text>
                <ResendCode  onhandleResendCode = {this.handleResendCode} resendCodeMsg={this.props.resendCodeMsg} resendCodeFailMsg={this.props.resendCodeFailMsg}/>
            </View>             
        )
    }
}

const mapStateToProps = state => {
    return {
      user_id : state.names.user_id,
      error : state.names.error,
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


export default connect(mapStateToProps,mapDispatchToProps,null, {"withRef" : true})(ConfirmRegister);