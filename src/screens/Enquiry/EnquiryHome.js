import React,{Component} from 'react';
import {View, Button, Text} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import { SaveTabID } from './../../store/actions/index';

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

    // componentWillMount(){
    //     console.log('called once')
    //     this.props.onSavingTapID(this.props.componentId);
    // }

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
                <Button title="Calculate Water Invoice" onPress={() => this.handleScreenNavigation('water-app.CalculateWaterScreen')}/>
                {/* <Text>{this.props.Tab_ID}</Text> */}
            </View>
        )
    }
}
     
const mapStateToProps = state => {
    return {
      Tab_ID : state.names.Tab_ID 
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSavingTapID: (tabId) => dispatch(SaveTabID(tabId))
    };
};
  
  
export default connect(mapStateToProps,mapDispatchToProps,null, {"withRef" : true})(EnquiryHome);