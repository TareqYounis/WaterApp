import React from 'react';
import { View, StyleSheet, Modal, ImageBackground, TouchableOpacity, Image, Text } from 'react-native';
import {connect} from 'react-redux';
import UserLogin from '../../Components/Auth/UserLogin';
import { UserLogsIn, SaveUserID, ResetState, UserParticipationInfo } from '../../store/actions/index';
import StartMainTabs from '../MainTabs/StartMainTabs';
import { saveUserId, saveUserData, saveParticipationInfo, saveUserAccounts } from '../../StorageData';
import { fonts } from './../../assets/Theme';
import * as data from './../../assets/lang.json';

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state={
            modalVisible: false
        }
    }

    async componentWillReceiveProps(props){
        // check it user success logged in, and save his data in storage
        if(props.user_id && props.particpationInfo.length === 0 ){
            this.setState({ modalVisible: true});
            // save userID and detailes in the device storage and in the store
            saveUserId(props.user_id);
            this.props.onSavingUserId(props.user_id);
            saveUserData(props.userProfile); 
            this.props.onGetParticipationInfo(props.user_id)
        } 
        // after success logIn, bring user accounts data and save it
        if(props.particpationInfo.length > 0 || props.particpFailMsg){
            const partInfo = [props.particpationInfo, props.particpFailMsg];
            await saveParticipationInfo(partInfo);
            await saveUserAccounts(props.userAccounts);
        }    
    }

    // reset all data to avoid duplicants
    componentWillUnmount(){
        this.props.onResetState();
    }

    render(){
        return(
            <View style={{flex:1}}>
                <UserLogin {...this.props}/>  
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
                                    <Text style={styles.modelText}>{data[this.props.lang]['successLog']}</Text>
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
        loginFailMsg : state.names.loginFailMsg,
        userProfile : state.names.userProfile,
        particpationInfo : state.names.particpationInfo,
        userAccounts : state.names.userAccounts,
        particpFailMsg : state.names.particpFailMsg 
    };
};
  

const mapDispatchToProps = dispatch => {
    return {
        onLoggingIn: (userData) => dispatch(UserLogsIn(userData)),
        onSavingUserId: ( userID ) => dispatch(SaveUserID(userID)),
        onResetState: () => dispatch(ResetState()),
        onGetParticipationInfo: (userID) => dispatch(UserParticipationInfo(userID))
    };
};
  
export default connect(mapStateToProps,mapDispatchToProps,null, {"withRef" : true})(Login);