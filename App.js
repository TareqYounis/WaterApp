 import React from 'react';
import { Navigation } from 'react-native-navigation';
import {Provider} from 'react-redux'

import AuthScreen from './src/screens/Auth/Auth';
import SideDrawer from './src/screens/SideDrawer/SideDrawer';
import StartMainTabs from './src/screens/MainTabs/StartMainTabs';
import EnquiryHome  from './src/screens/Enquiry/EnquiryHome';
import WaterRoles from './src/screens/Enquiry/WaterRoles';
import Complaint  from './src/screens/Complaint/Complaint';
import configureStore from './src/store/configureStore';
import WaterBill from './src/screens/Enquiry/WaterBill';

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

Navigation.registerComponent("water-app.ComplaintScreen", 
  //() => Complaint, store, Provider);
  reduxStoreWrapper(Complaint, store))


Navigation.registerComponent('water-app.EnqiryHomeScreen', 
  // () => Enquiry, store, Provider );
  reduxStoreWrapper(EnquiryHome, store))

Navigation.registerComponent('water-app.WaterRolesScreen', 
  // () => Enquiry, store, Provider );
  reduxStoreWrapper(WaterRoles, store))

Navigation.registerComponent('water-app.WaterBillScreen', 
  // () => Enquiry, store, Provider );
  reduxStoreWrapper(WaterBill, store))


//start a App 
Navigation.setRoot({
  root: {
    stack: {
      children: [{
        component: {
          name: 'water-app.AuthScreen',
          passProps: {
            text: 'stack with one child'
          }
        }
      }],
      options: {
        topBar: {
          title: {
            text: 'Welcome screen'
          }
        }
      }
    }
  }
});