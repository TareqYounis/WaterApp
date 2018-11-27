import React from 'react';
import {Text, View,TouchableOpacity} from 'react-native';
import {Navigation} from 'react-native-navigation';
import Ionicon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

class Profile extends React.Component {
    constructor(props){
        super(props);
        this.signingUp = this.signingUp.bind(this);
        this.loggingIn = this.loggingIn.bind(this);
        this.addingUserAccount = this.addingUserAccount.bind(this);
        Navigation.events().bindComponent(this);
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
        return(
            <View>
              <TouchableOpacity onPress={this.signingUp}>
                <Ionicon name="md-person-add" size={30}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.loggingIn}>
                <Ionicon name="md-log-in" size={30}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.addingUserAccount}>
                <AntDesign name="addfile" size={30}/>
              </TouchableOpacity>
              
            </View>
        )
    }
}

export default Profile;