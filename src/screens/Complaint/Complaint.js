import React,{Component} from 'react';
import {View, Text} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {connect} from 'react-redux';
import  {GetOrganizations} from '../../store/actions/index';

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

    renderingArray() {
        return this.props.data.map(function(element,key){
            return (
                <View key={key}>
                    <Text>{element},{key}</Text>
                </View>
            )
        })
    }

    renderingObject(){
        return Object.keys(this.props.data).map(function(element,key){
            return (
                <View key={key}>
                    <Text>{element},{key}</Text>
                </View>
            )
        })
    }
    render(){
        return (
            <View>
                <Text>This is Complaint page</Text>
                {/* {this.renderingArray()} */}
            </View>
            
        )
    }
}

const mapStateToProps = state => {
    return {
      names: state.names.names,
      data : state.enquiry.data 
    };
  };
  

const mapDispatchToProps = dispatch => {
    return {
        onAddName: (name,key) => dispatch(AddName(name,key)),
        onDisplayOrganization: () => dispatch(GetOrganizations())
    };
};
  
  
export default connect(mapStateToProps,mapDispatchToProps,null, {"withRef" : true})(Complaint);