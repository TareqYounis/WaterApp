import React,{Component} from 'react';
import {View, Text} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';

class WaterBill extends Component{
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
                <Text>Waiting for ArabicCell Response</Text>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
      names: state.names.names,
      data : state.enquiry.data,
      waterRole : state.enquiry.waterRole 
    };
};
  
  
export default connect(mapStateToProps,null,null, {"withRef" : true})(WaterBill);