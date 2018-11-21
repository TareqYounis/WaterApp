import React,{Component} from 'react';
import {View, Text} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import WaterRoles from '../../Components/Enquiry/WaterRoles'
import { GetOrganizations, GetWaterRoles } from '../../store/actions/index';

class Enquiry extends Component{
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
                <Text>This is Enquiry page</Text>
                <WaterRoles organizations={this.props.data} onSubmission={this.handleWaterRoles}/>
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
        onGettingWaterRoles: (userAccount , orgID) => dispatch(GetWaterRoles(userAccount,orgID))
    };
};
  
  
export default connect(mapStateToProps,mapDispatchToProps,null, {"withRef" : true})(Enquiry);