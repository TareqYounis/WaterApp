// import React, { Component } from 'react';
// import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
// import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
 
// export default class UserProfile extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       tableHead: ['Head', 'Head2', 'Head3', 'Head4'],
//       tableData: [
//         ['1', '2', '3', '4'],
//         ['a', 'b', 'c', 'd'],
//         ['1', '2', '3', '4'],
//         ['a', 'b', 'c', 'd']
//       ]
//     }
//   }
 
//   _alertIndex(index) {
//     Alert.alert(`This is row ${index + 1}`);
//   }
 
//   render() {
//     const state = this.state;
//     const element = (data, index) => (
//       <TouchableOpacity onPress={() => this._alertIndex(index)}>
//         <View style={styles.btn}>
//           <Text style={styles.btnText}>button</Text>
//         </View>
//       </TouchableOpacity>
//     );
 
//     return (
//       <View style={styles.container}>
//         <Table borderStyle={{borderColor: 'transparent'}}>
//           <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
//           {
//             state.tableData.map((rowData, index) => (
//               <TableWrapper key={index} style={styles.row}>
//                 {
//                   rowData.map((cellData, cellIndex) => (
//                     <Cell key={cellIndex} data={cellIndex === 3 ? element(cellData, index) : cellData} textStyle={styles.text}/>
//                   ))
//                 }
//               </TableWrapper>
//             ))
//           }
//         </Table>
//       </View>
//     )
//   }
// }
 
// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
//   head: { height: 40, backgroundColor: '#808B97' },
//   text: { margin: 6 },
//   row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
//   btn: { width: 58, height: 18, backgroundColor: '#78B7BB',  borderRadius: 2 },
//   btnText: { textAlign: 'center', color: '#fff' }
// });
import React from 'react';
import {View,TouchableOpacity, StyleSheet, Text, Alert} from 'react-native';
import { Navigation } from 'react-native-navigation';
import Ionicon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux';
import UserProfile from '../../Components/Auth/UserProfile';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';

class Profile extends React.Component {
    constructor(props){
        super(props);
        this.signingUp = this.signingUp.bind(this);
        this.loggingIn = this.loggingIn.bind(this);
        this.addingUserAccount = this.addingUserAccount.bind(this);
        Navigation.events().bindComponent(this);
        this.state = {
            tableHead: ['Name', 'Address', 'counter', 'Phone','Balance'],
            tableData: [
              ['1', '2', '3', '4'],
              ['a', 'b', 'c', 'd'],
              ['1', '2', '3', '4'],
              ['a', 'b', 'c', 'd']
            ]
          }
    }
    _alertIndex(index) {
        Alert.alert(`This is row ${index + 1}`);
    }
    //show sidemenu when menu button is clicked.
    navigationButtonPressed({ buttonId }) {
        Navigation.mergeOptions(this.props.componentId, {
            sideMenu: {
              left: {
                visible: true,
              },
            },
        });        
    } 
    
    signingUp () {
        Navigation.push(this.props.componentId,{
            component:{
                name: 'water-app.SignUpScreen'
            } 
        })
    }
    
    loggingIn() {
        Navigation.push(this.props.componentId,{
            component:{
                name: 'water-app.LoginScreen'
            }
        })
    }

    addingUserAccount () {
        if(!this.props.user_id){
            alert('you need to signin first');
            Navigation.push(this.props.componentId,{
                component :{
                    name: 'water-app.LoginScreen'
                }
            })
        }else{
            Navigation.push(this.props.componentId,{
                component:{
                    name: 'water-app.AddUserAccountScreen'
                }
            })
        }
    }
    render(){
        const state = this.state;
        const element = (data, index) => (
          <TouchableOpacity onPress={() => this._alertIndex(index)}>
            <View style={styles.btn}>
              <Text style={styles.btnText}>button</Text>
            </View>
          </TouchableOpacity>
        );
     
        return (
          <View style={styles.container}>
            <Table borderStyle={{borderColor: 'transparent'}}>
              <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
              {
                state.tableData.map((rowData, index) => (
                  <TableWrapper key={index} style={styles.row}>
                    {
                      rowData.map((cellData, cellIndex) => (
                        <Cell key={cellIndex} data={cellIndex === 3 ? element(cellData, index) : cellData} textStyle={styles.text}/>
                      ))
                    }
                  </TableWrapper>
                ))
              }
            </Table>
          </View>
        )
      }
        // return(
            // <View>
              /* <TouchableOpacity onPress={this.signingUp} style={styles.Item}>
                <Ionicon name="md-person-add" size={30}  style={styles.ItemIcon}/>
                <Text>SignUp</Text>
              </TouchableOpacity>
              
              <TouchableOpacity onPress={this.loggingIn} style={styles.Item}>
                <Ionicon name="md-log-in" size={30} style={styles.ItemIcon}/>
                <Text>LogIn</Text>
              </TouchableOpacity>
              
              <TouchableOpacity onPress={this.addingUserAccount} style={styles.Item}>
                <AntDesign name="addfile" size={30} style={styles.ItemIcon}/>
                <Text>Add New Account</Text>
              </TouchableOpacity> */}
            //  / <UserProfile />
            // </View>
        // )
    // }


// const styles = StyleSheet.create({
//     container: {
//         alignItems: "center",
//     },
//     Item: {
//         flexDirection: "row",
//         alignItems: "center",
//         padding: 10,
//     },
//     ItemIcon: {
//         marginRight: 10
//     }
// });

const mapStateToProps = state => {
    return {
      user_id : state.names.user_id,
      userProfile : state.names.userProfile,
      particpationInfo : state.names.userProfile 
    };
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#808B97' },
    text: { margin: 6 },
    row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
    btn: { width: 58, height: 18, backgroundColor: '#78B7BB',  borderRadius: 2 },
    btnText: { textAlign: 'center', color: '#fff' }
  });
  
export default connect(mapStateToProps,null,null, {"withRef" : true})(Profile);