import React from 'react';
import { View } from 'react-native';
import UserSignUp from '../../Components/Auth/UserSignUp';
import { UserSignsUp, ResetState } from '../../store/actions/index';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';

class SignUp extends React.Component {
    constructor(props){
        super(props);
    }

    componentWillReceiveProps(props){
        // check if user first signup step is sucess, send him to send phone code
        if(props.signUpUser_id){
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
      signUpUser_id : state.names.signUpUser_id,
      signupFailMsg : state.names.signupFailMsg 
    };
  };
  

const mapDispatchToProps = dispatch => {
    return {
        onSigningUp: (userData) => dispatch(UserSignsUp(userData)),
        onResetState: () => dispatch(ResetState())
    };
};

export default connect(mapStateToProps,mapDispatchToProps,null, {"withRef" : true})(SignUp);