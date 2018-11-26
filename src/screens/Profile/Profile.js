import React from 'react';
import {Text, View,TouchableOpacity} from 'react-native';
import {Navigation} from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

class Profile extends React.Component {
    constructor(props){
        super(props);
        this.addingUserProfile = this.addingUserProfile.bind(this);
    }

    addingUserProfile () {
        Navigation.push(this.props.componentId,{
            component:{
                name: 'water-app.AddUserAccount'
            } 
        })
    }
    render(){
        return(
            <View>
              <TouchableOpacity onPress={this.addingUserProfile}>
                <Icon name="md-person-add" size={50}/>
              </TouchableOpacity>
              <Text>Its me texting over here</Text>
            </View>
        )
    }
}

export default Profile;