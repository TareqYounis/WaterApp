// import React, {Component} from 'react';
// import { StyleSheet, Text, View, TextInput, Button} from 'react-native';
// import { connect } from "react-redux";

// import NameInput from './src/Components/NameInput/NameInput';
// import NameList from './src/Components/NameList/NameList';
// import NameDetail from './src/Components/NameDetail/NameDetail';

// import {
//   AddName,
//   DeleteName,
//   SelectName,
//   DeselectName
// } from "./src/store/actions/index";

// class App extends Component {
//   nameAddedHandler = name => {
//     this.props.onAddName(name);
//   };

//   nameDeletedHandler = () => {
//     this.props.onDeleteName();
//   };

//   modalClosedHandler = () => {
//     this.props.onDeselectName();
//   };

//   nameSelectedHandler = key => {
//     this.props.onSelectName(key);
//   };

  
//   render() {
//     return (
//       <View style={styles.container}>
//       <NameDetail
//           selectedName={this.props.selectedName}
//           onItemDeleted={this.nameDeletedHandler}
//           onModalClosed={this.modalClosedHandler}
//         />
//         <NameInput onNameAdded={this.nameAddedHandler} />
//         <NameList
//           names={this.props.names}
//           onItemSelected={this.nameSelectedHandler}
//         />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 30,
//     justifyContent: 'flex-start',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   }
// });

// const mapStateToProps = state => {
//   return {
//     names: state.names.names,
//     selectedName: state.names.selectedName
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     onAddName: (name,key) => dispatch(AddName(name,key)),
//     onDeleteName: () => dispatch(DeleteName()),
//     onSelectName: key => dispatch(SelectName(key)),
//     onDeselectName: () => dispatch(DeselectName())
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(App);

import { Navigation } from 'react-native-navigation';
import {Provider} from 'redux'

import AuthScreen from './src/screens/Auth/Auth';
import SideDrawer from './src/screens/SideDrawer/SideDrawer';
import StartMainTabs from './src/screens/MainTabs/StartMainTabs';
import Enquiry  from './src/screens/Enquiry/Enquiry';
import Complaint  from './src/screens/Complaint/Complaint';


import configureStore from './src/store/configureStore';
const store = configureStore();

//All screens here are visible to all the app. 
//Regester screens, takes two arguments, one is a unqiue ID, the other is a function
// a function that RN will excute when to load the screen
Navigation.registerComponent("water-app.AuthScreen",
  () => AuthScreen, store, Provider);

Navigation.registerComponent("water-app.SideDrawerScreen", 
  ()=> SideDrawer, store, Provider );

Navigation.registerComponent('water-app.startMainTapScreen', 
  () => StartMainTabs, store, Provider);

Navigation.registerComponent("water-app.ComplaintScreen", 
  () => Complaint, store, Provider);

Navigation.registerComponent('water-app.EnqiryScreen', 
  () => Enquiry, store, Provider );



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


// Navigation.setRoot({
//   root: {
//     sideMenu: {
//       left: {
//         component: {
//           name: 'water-app.SideDrawerScreen',
//           passProps: {
//             text: 'This is a left side menu screen'
//           }
//         }
//       },
//       center: {
//         component: {
//           name: 'water-app.AuthScreen'
//         }
//       }
//       }
//     }
// });