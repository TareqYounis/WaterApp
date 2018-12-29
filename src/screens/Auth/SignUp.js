import React from 'react';
import {View, Text } from 'react-native';
import UserSignUp from '../../Components/Auth/UserSignUp';
import { UserSignsUp } from '../../store/actions/index';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';


class SignUp extends React.Component {
    constructor(props){
        super(props);
        this.handleSigningUp = this.handleSigningUp.bind(this);
    }

    componentWillReceiveProps(props){
        if(props.user_id){
            Navigation.push(this.props.componentId,{
                component:{
                    name: 'water-app.ConfirmRegisterScreen'
                } 
            })
        }
    }
    handleSigningUp(userData){
        this.props.onSigningUp(userData)
    }
   
    render() {
        return (
            <View>
               <UserSignUp onSignup={this.handleSigningUp}/>
               <Text>{this.props.signupFailMsg}</Text>
            </View>
        )
    }
}
const mapStateToProps = state => {
    return {
      names: state.names.names,
      data : state.enquiry.data,
      waterRole : state.enquiry.waterRole,
      user_id : state.names.user_id,
      signupFailMsg : state.names.signupFailMsg 
    };
  };
  

const mapDispatchToProps = dispatch => {
    return {
        onSigningUp: (userData) => dispatch(UserSignsUp(userData))
    };
};

export default connect(mapStateToProps,mapDispatchToProps,null, {"withRef" : true})(SignUp);