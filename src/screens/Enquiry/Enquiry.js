import React,{Component} from 'react';
import {View, Text} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';

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

const mapStateToProps = state => {
    return {
      names: state.names.names
    };
  };
  

const mapDispatchToProps = dispatch => {
    return {
        onAddName: (name,key) => dispatch(AddName(name,key))
    };
};
  
  
export default connect(mapStateToProps,mapDispatchToProps,null, {"withRef" : true})(Enquiry);






//export default Enquiry;