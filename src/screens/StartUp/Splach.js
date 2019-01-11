import React from 'react';
import { Navigation } from 'react-native-navigation';
import { getItem } from '../../StorageData';
import SplashScreen from 'react-native-splash-screen'
import StartMainTabs from '../MainTabs/StartMainTabs';

class Splach extends React.Component {
    constructor(props){
        super(props);
        this.handleNavigation= this.handleNavigation.bind(this);
    }

    componentWillMount(){
        // check if this is the user has an account
        getItem('userId')
       .then(results => {
            if(results !== 'none') {
                // The user is signed In, navigate to start using the app;
                SplashScreen.hide();
                StartMainTabs();
            }else{
                // check if this is the first time the user uses the app
                getItem('language')
                .then(results => {
                    // if there were a langauge, means the user has used the app from before, so navigate to sign in.
                    if(results !== 'none') {
                        this.handleNavigation('water-app.LoginScreen');
                    // otherwise, means the user has not used the app from before, so navigate to pick the langague.
                    }else{
                        this.handleNavigation('water-app.LanguageScreen');
                    }
                })
            }
       })
    }

    handleNavigation(screen){
        SplashScreen.hide();
            Navigation.push(this.props.componentId,{
                component:{
                    name: screen
                } 
            })
    }

    render(){
        return null;
    }
}


export default Splach;