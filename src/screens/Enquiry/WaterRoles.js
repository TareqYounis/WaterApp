import React,{Component} from 'react';
import {View, Text} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import WaterRole from '../../Components/Enquiry/WaterRole'
import { GetOrganizations, GetWaterRoles } from '../../store/actions/index';

class WaterRoles extends Component{
    constructor(props){
        super(props);
        Navigation.events().bindComponent(this);
        this.handleWaterRoles = this.handleWaterRoles.bind(this);
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
    
    //load all water companies before rendering. 
    componentWillMount() {
        this.props.onGetOrganizations();
    }

    //get water Roles according to user's input
    handleWaterRoles(orgID,userAccount){
        this.props.onGettingWaterRoles(orgID,userAccount);
    }
    
    render(){
        return (
            <View>
                <WaterRole organizations={this.props.data} onSubmission={this.handleWaterRoles}/>
                <Text>{this.props.waterRole}</Text>
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
  

const mapDispatchToProps = dispatch => {
    return {
        onAddName: (name,key) => dispatch(AddName(name,key)),
        onGetOrganizations: () => dispatch(GetOrganizations()),
        onGettingWaterRoles: (orgID, userAccount) => dispatch(GetWaterRoles(orgID, userAccount))
    };
};
  
  
export default connect(mapStateToProps,mapDispatchToProps,null, {"withRef" : true})(WaterRoles);