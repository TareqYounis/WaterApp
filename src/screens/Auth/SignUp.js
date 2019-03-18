import React from 'react';
import { View } from 'react-native';
import UserSignUp from '../../Components/Auth/UserSignUp';
import { UserSignsUp } from '../../store/actions/index';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';

class SignUp extends React.Component {
    constructor(props){
        super(props);
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
    
    render() {
        return (
            <View style={{flex:1}}>
                <UserSignUp {...this.props}/>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
      lang: state.names.lang,
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