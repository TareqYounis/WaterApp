import React from 'react';
import { View, Text } from 'react-native';
import {connect} from 'react-redux';
import UserLogin from '../../Components/Auth/UserLogin';
import { UserLogsIn } from '../../store/actions/index';

class Login extends React.Component {
    constructor(props){
        super(props);
        this.handleLoggingIn = this.handleLoggingIn.bind(this);
    }

    handleLoggingIn (data){
        this.props.onLoggingIn(data);
    }
    render(){
        return(
            <View>
                <Text>Login screen</Text>
                <UserLogin onLoggingIn= {this.handleLoggingIn}/>
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
        onLoggingIn: (userData) => dispatch(UserLogsIn(userData))
    };
};
  
  
export default connect(mapStateToProps,mapDispatchToProps,null, {"withRef" : true})(Login);