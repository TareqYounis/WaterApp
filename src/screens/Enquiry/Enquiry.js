import React,{Component} from 'react';
import {View, Text} from 'react-native';
import { Navigation } from 'react-native-navigation';

class Enquiry extends Component{
    constructor(props){
        super(props);
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
    
    render(){
        return (
            <View>
                <Text>This is Enquiry page</Text>
            </View>
        )
    }
}

export default Enquiry;