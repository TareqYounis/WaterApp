import React from 'react';
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux'

import AuthScreen from './src/screens/AuthTest/Auth';
import SideDrawer from './src/screens/SideDrawer/SideDrawer';
import StartMainTabs from './src/screens/MainTabs/StartMainTabs';
import Statistics from './src/screens/Statistics/Statistics';

import EnquiryHome  from './src/screens/Enquiry/EnquiryHome';
import WaterRoles from './src/screens/Enquiry/WaterRoles';
import WaterBill from './src/screens/Enquiry/WaterBills';
import CalculateWaterInvoice from './src/screens/Enquiry/CalculateWaterInvoice';

import Complaint  from './src/screens/Complaint/Complaint';
import ObjectionService from './src/screens/Complaint/ObjectionService';
import locationPicker from './src/screens/Complaint/locationPicker';
import Accounts from './src/screens/Auth/Accounts';
import SignUp from './src/screens/Auth/SignUp';
import Login from './src/screens/Auth/Login';
import AddUserAccount from './src/screens/Auth/AddUserAccount';
import ConfirmRegister from './src/screens/Auth/ConfirmRegister';

import MainApplication from './src/screens/Applications/MainApplication';
import ApplyApplication from './src/screens/Applications/ApplyApplication';

import Language from './src/screens/StartUp/Language';
import WaterCompany from './src/screens/StartUp/WaterCompany'
import Splach from './src/screens/StartUp/Splach';

import Settings from './src/screens/Settings/Settings';

import configureStore from './src/store/configureStore';

const store = configureStore();

function reduxStoreWrapper (MyComponent, store) {
  return () => {
      return class StoreWrapper extends React.Component {
          render () {
              return (
                  <Provider store={store}>
                      {/* in order to pass the initail props, we have to pass the component Id */}
                      <MyComponent {...this.props} />
                  </Provider>
              );
          }
      };
  };
}
//All screens here are visible to all the app. 
//Regester screens, takes two arguments, one is a unqiue ID, the other is a function
// a function that RN will excute when to load the screen
//using reduxStoreWrapper in order for the store to be visibile for all the componenets. 
Navigation.registerComponent("water-app.AuthScreen",
  // () => AuthScreen, store, Provider);
  reduxStoreWrapper(AuthScreen, store))

Navigation.registerComponent("water-app.SideDrawerScreen", 
  //()=> SideDrawer, store, Provider );
  reduxStoreWrapper(SideDrawer, store))

Navigation.registerComponent('water-app.startMainTapScreen', 
  //() => StartMainTabs, store, Provider);
  reduxStoreWrapper(StartMainTabs, store))

Navigation.registerComponent('water-app.statisticsScreen', 
  //() => StartMainTabs, store, Provider);
  reduxStoreWrapper( Statistics, store))

Navigation.registerComponent("water-app.ComplaintScreen", 
  //() => Complaint, store, Provider);
  reduxStoreWrapper(Complaint, store))

  Navigation.registerComponent("water-app.LocationPicker", 
  //() => Complaint, store, Provider);
  reduxStoreWrapper(locationPicker, store))

Navigation.registerComponent('water-app.ObjectionService', 
  // () => Enquiry, store, Provider );
  reduxStoreWrapper( ObjectionService, store))

Navigation.registerComponent('water-app.EnqiryHomeScreen', 
  // () => Enquiry, store, Provider );
  reduxStoreWrapper(EnquiryHome, store))

Navigation.registerComponent('water-app.WaterRolesScreen', 
  // () => Enquiry, store, Provider );
  reduxStoreWrapper(WaterRoles, store))

Navigation.registerComponent('water-app.WaterBillScreen', 
  // () => Enquiry, store, Provider );
  reduxStoreWrapper(WaterBill, store))

Navigation.registerComponent('water-app.CalculateWaterScreen', 
  // () => Enquiry, store, Provider );
  reduxStoreWrapper(CalculateWaterInvoice, store))
  
Navigation.registerComponent('water-app.UserAccountsScreen', 
  // () => Enquiry, store, Provider );
  reduxStoreWrapper(Accounts, store))

Navigation.registerComponent('water-app.SignUpScreen', 
  // () => Enquiry, store, Provider );
  reduxStoreWrapper(SignUp, store))

Navigation.registerComponent('water-app.LoginScreen', 
  // () => Enquiry, store, Provider );
  reduxStoreWrapper(Login, store))

Navigation.registerComponent('water-app.AddUserAccountScreen', 
  // () => Enquiry, store, Provider );
  reduxStoreWrapper(AddUserAccount, store))


Navigation.registerComponent('water-app.ConfirmRegisterScreen', 
  // () => Enquiry, store, Provider );
  reduxStoreWrapper(ConfirmRegister, store))

  
Navigation.registerComponent('water-app.MainApplicationScreen', 
  // () => Enquiry, store, Provider );
  reduxStoreWrapper(MainApplication, store))

Navigation.registerComponent('water-app.ApplyApplicationScreen', 
  // () => Enquiry, store, Provider );
  reduxStoreWrapper(ApplyApplication, store))

Navigation.registerComponent('water-app.LanguageScreen', 
  // () => Enquiry, store, Provider );
  reduxStoreWrapper(Language, store))

Navigation.registerComponent('water-app.WaterCompanyScreen', 
  // () => Enquiry, store, Provider );
  reduxStoreWrapper(WaterCompany, store))

Navigation.registerComponent('water-app.SplachScreen', 
  // () => Enquiry, store, Provider );
  reduxStoreWrapper(Splach, store))
  
  
Navigation.registerComponent('water-app.SettingsScreen', 
  // () => Enquiry, store, Provider );
  reduxStoreWrapper(Settings, store))

  

//start a App 
Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [{
          component: {
            name: 'water-app.SplachScreen',
            passProps: {
              text: 'stack with one child'
            }
          }
        }],
        options: {
          topBar: {
            title: {
              text: 'Welcome screen'
            },
            visible: false,
          },
          layout: { 
            backgroundColor: 'white',
            direction: 'ltr' 
          }
        }
      }
    }
  })
})