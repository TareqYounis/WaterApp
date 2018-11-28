import React from 'react';
import {View, Text} from 'react-native';
import UserSignUp from '../../Components/Auth/UserSignUp';
import { UserSignsUp } from '../../store/actions/index';
import { connect } from 'react-redux';

class SignUp extends React.Component {
    constructor(props){
        super(props);
        this.handleSigningUp = this.handleSigningUp.bind(this);
    }

    handleSigningUp(userData){
        this.props.onSigningUp(userData)
    }

    render() {
        return (
            <View>
               <UserSignUp onSignup={this.handleSigningUp}/>
               <Text>{this.props.error}</Text>
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
      error : state.names.error 
    };
  };
  

const mapDispatchToProps = dispatch => {
    return {
        onSigningUp: (userData) => dispatch(UserSignsUp(userData))
    };
};
  
  
export default connect(mapStateToProps,mapDispatchToProps,null, {"withRef" : true})(SignUp);