import React from 'react';
import {Text, View,TouchableOpacity} from 'react-native';
import {Navigation} from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

class Profile extends React.Component {
    constructor(props){
        super(props);
        this.addingUserAccount = this.addingUserAccount.bind(this);
    }

    addingUserAccount () {
        console.log('im being clicked')
        Navigation.push(this.props.componentId,{
            component:{
                name: 'water-app.UserAccountScreen'
            } 
        })
    }
    render(){
        return(
            <View>
              <TouchableOpacity onPress={this.addingUserAccount}>
                <Icon name="md-add-circle-outline" size={50}/>
              </TouchableOpacity>
              <Text>Its me texting over here</Text>
            </View>
        )
    }
}

export default Profile;