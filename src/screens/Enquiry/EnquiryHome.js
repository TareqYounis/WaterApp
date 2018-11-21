import React,{Component} from 'react';
import {View, Button} from 'react-native';
import { Navigation } from 'react-native-navigation';

class EnquiryHome extends Component{
    constructor(props){
        super(props);
        Navigation.events().bindComponent(this);        
        this.handleScreenNavigation = this.handleScreenNavigation.bind(this);
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

    handleScreenNavigation(screen){
        Navigation.push(this.props.componentId,{
            component:{
                name: screen
            }
        })
    }

    render(){
        return (
            <View>
                <Button title="Water Roles" onPress= {() => this.handleScreenNavigation('water-app.WaterRolesScreen')}/>
                <Button title="Water Bill" onPress={() => this.handleScreenNavigation('water-app.WaterBillScreen')}/>
            </View>
        )
    }
}
     
export default EnquiryHome;