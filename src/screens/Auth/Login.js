import React from 'react';
import { View, Text } from 'react-native';
import {connect} from 'react-redux';
import UserLogin from '../../Components/Auth/UserLogin';
import { UserLogsIn } from '../../store/actions/index';
import { Navigation } from 'react-native-navigation';

class Login extends React.Component {
    constructor(props){
        super(props);
        this.handleLoggingIn = this.handleLoggingIn.bind(this);
    }

    componentWillReceiveProps(props){
        if(props.user_id){
            alert('you have signed in Successfully')
            Navigation.push(this.props.componentId,{
                component:{
                    name: 'water-app.homeScreen'
                } 
            })
        }
    }
    handleLoggingIn (data){
        this.props.onLoggingIn(data);
    }
    render(){
        return(
            <View>
                <UserLogin onLoggingIn= {this.handleLoggingIn}/>
                <Text>{this.props.loginFailMsg}</Text>
                <Text>{this.props.user_id}</Text>
               
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
      loginFailMsg : state.names.loginFailMsg,
      userProfile : state.names.userProfile 
    };
  };
  

const mapDispatchToProps = dispatch => {
    return {
        onLoggingIn: (userData) => dispatch(UserLogsIn(userData))
    };
};
  
  
export default connect(mapStateToProps,mapDispatchToProps,null, {"withRef" : true})(Login);