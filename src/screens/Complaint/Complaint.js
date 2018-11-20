import React,{Component} from 'react';
import {View, Text} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {connect} from 'react-redux';

class Complaint extends Component{
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
        console.log("props are here",this.props.names)
        return (
            <View>
                <Text>This is Complaint page</Text>
                {/* <Text>Here are the names {this.props}</Text> */}
                <Text>Here are the props</Text>
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
  
  
export default connect(mapStateToProps,mapDispatchToProps,null, {"withRef" : true})(Complaint);