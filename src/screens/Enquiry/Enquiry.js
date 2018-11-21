import React,{Component} from 'react';
import {View, Text} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import WaterRoles from '../../Components/Enquiry/WaterRoles'
import  {GetOrganizations} from '../../store/actions/index';

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

    componentWillMount() {
        this.props.onGetOrganizations();
    }

    handleWaterRoles(org,userAccount){
        console.log('handling',org,userAccount)
    }
    
    render(){
        return (
            <View>
                <Text>This is Enquiry page</Text>
                <WaterRoles organizations={this.props.data} onSubmission={this.handleWaterRoles}/>
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
        onGetOrganizations: () => dispatch(GetOrganizations()),
    };
};
  
  
export default connect(mapStateToProps,mapDispatchToProps,null, {"withRef" : true})(Enquiry);