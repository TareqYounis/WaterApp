import React from 'react';
import { Navigation } from 'react-native-navigation';
import { getItem, saveParticipationInfo, saveUserAccounts } from '../../StorageData';
import SplashScreen from 'react-native-splash-screen'
import StartMainTabs from '../MainTabs/StartMainTabs';
import { connect } from 'react-redux';
import { UserParticipationInfo, SaveUserLanguage, SaveUserID } from './../../store/actions/index';

class Splach extends React.Component {
    constructor(props){
        super(props);
    }

    componentWillMount(){
        // check if this is the user has an account
        getItem('userId')
       .then(results => {
            if(results !== 'none') {
                // The user is signed In, navigate to start using the app;
                this.loadData(results);
            }else{
                // check if this is the first time the user uses the app
                getItem('language')
                .then(results => {
                    // if there were a langauge, means the user has used the app from before, so navigate to sign in.
                    if(results !== 'none') {
                        this.props.onSavingLanguage(results);
                        this.handleNavigation('water-app.LoginScreen');
                    // otherwise, means the user has not used the app before, so navigate to pick the langague.
                    }else{
                        this.handleNavigation('water-app.LanguageScreen');
                    }
                })
            }
       })
    }

    handleNavigation = (screen) => {
        SplashScreen.hide();
        Navigation.push(this.props.componentId,{
            component:{
                name: screen
            } 
        })
    }

    loadData = (userID) => {
        //save userId in the state
        this.props.onSavingUserId(userID);
        // load all user profile data in here
        this.props.onGetParticipationInfo(userID);
        //save lang in the state, or save default Arabic
        getItem('language')
        .then(results => {
            if(results !== 'none'){
                this.props.onSavingLanguage(results);
            }else{
                this.props.onSavingLanguage('Arabic');
            }
        })
    }

    componentWillReceiveProps(props){
        const partInfo = [props.particpationInfo, props.particpFailMsg];
        // save user info (contains all his water accounts and its detailes) and accounts in phone storage
        saveParticipationInfo(partInfo);
        saveUserAccounts(props.userAccounts);
        SplashScreen.hide();
        StartMainTabs();
    }

    render(){
        return null;
    }
}

const mapStateToProps = state => {
    return {
      particpationInfo : state.names.particpationInfo,
      userAccounts : state.names.userAccounts,
      particpFailMsg : state.names.particpFailMsg
    };
  };
  

const mapDispatchToProps = dispatch => {
    return {
        onGetParticipationInfo: (userID) => dispatch(UserParticipationInfo(userID)),
        onSavingLanguage: ( lang ) => dispatch(SaveUserLanguage(lang)),
        onSavingUserId: ( userID ) => dispatch(SaveUserID(userID))
    };
};

export default connect(mapStateToProps,mapDispatchToProps,null, {"withRef" : true})(Splach);