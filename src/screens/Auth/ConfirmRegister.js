import React from 'react';
import { View, StyleSheet, Modal, ImageBackground, TouchableOpacity, Image, Text } from 'react-native';
import ConfirmSignUp from '../../Components/Auth/ConfirmSignUp';
import { connect } from 'react-redux';
import { UserRegisterConfirm, UserResendCode, SaveUserID } from '../../store/actions/index';
import StartMainTabs from '../MainTabs/StartMainTabs';
import { saveUserId } from '../../StorageData';
import { fonts } from './../../assets/Theme';
import * as data from './../../assets/lang.json';

class ConfirmRegister extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            modalVisible: false
        }
    }
   
    componentWillReceiveProps(props){
        // if signed up success, and recieved a confirm messages, save userID in local storage and in the state and navigate
        if( (props.user_id !== "" || props.user_id !== "undefined" ) && props.registConfirmMsg ){
            this.setState({
                modalVisible: true
            })
            saveUserId(props.user_id);
            this.props.onSavingUserId(props.user_id);
        }
    }

    render(){
        return (
            <View style={{flex:1}}>
                <ConfirmSignUp  {...this.props}/>   
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        console.log('Modal has been closed.');
                    }}>
                    <View style={styles.modal}>            
                        <TouchableOpacity onPress={()=> {this.setState({ modalVisible : false }); StartMainTabs() }}>
                            <ImageBackground source={require('./../../assets/images/pop_up.png')} style={{width: 250, height: 158}} >
                                <View style={styles.modalCotent}>
                                    <Image source={require('./../../assets/images/right_icon.png')} style={{marginBottom: 20}} />
                                    <Text style={styles.modelText}>{data[this.props.lang]['successSign']}</Text>
                                </View>
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>
                </Modal> 
            </View>             
        )
    }
}
  
const styles = StyleSheet.create({
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'rgba(0,0,0,0.7)'
    },
    modalCotent:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modelText:{
        flex: 0.5,
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontSize: 20,
        fontFamily: fonts.Hacen
    }
})

const mapStateToProps = state => {
    return {
      lang: state.names.lang,
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
        onResendCode: (userData) => dispatch(UserResendCode(userData)),
        onSavingUserId: ( userID ) => dispatch(SaveUserID(userID))
    };
};

export default connect(mapStateToProps,mapDispatchToProps,null, {"withRef" : true})(ConfirmRegister);