import React from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import {connect} from 'react-redux';
import UserLogin from '../../Components/Auth/UserLogin';
import { UserLogsIn } from '../../store/actions/index';
import StartMainTabs from '../MainTabs/StartMainTabs';
import { saveUserId, saveUserData } from '../../StorageData';

class Login extends React.Component {
    constructor(props){
        super(props);
    }

    async componentWillReceiveProps(props){
        if(props.user_id){
            Alert.alert('you have signed in Successfully')
            // save userID and detailes in the device storage
            saveUserId(props.user_id);
            saveUserData(props.userProfile); 
            StartMainTabs();
        }
          
    }

    render(){
        return(
            <View style={{flex:1}}>
                <UserLogin {...this.props}/>     
            </View>
        )
    }   
}

const mapStateToProps = state => {
    return {
        lang: state.names.lang,
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