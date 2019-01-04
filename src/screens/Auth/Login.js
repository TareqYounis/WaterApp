import React from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import {connect} from 'react-redux';
import UserLogin from '../../Components/Auth/UserLogin';
import { UserLogsIn } from '../../store/actions/index';
import StartMainTabs from '../MainTabs/StartMainTabs';
import { saveUserId } from '../../StorageData';

class Login extends React.Component {
    constructor(props){
        super(props);
        this.handleLoggingIn = this.handleLoggingIn.bind(this);
    }

    async componentWillReceiveProps(props){
        if(props.user_id){
            Alert.alert('you have signed in Successfully')
            // save userID in the device data
            saveUserId(props.user_id);
            StartMainTabs();
        }
          
    }
    handleLoggingIn (data){
        this.props.onLoggingIn(data);
    }
    render(){
        return(
            <View style={styles.container}>
                <UserLogin onLoggingIn= {this.handleLoggingIn} {...this.props}/>     
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

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 40
    },
})
  
export default connect(mapStateToProps,mapDispatchToProps,null, {"withRef" : true})(Login);