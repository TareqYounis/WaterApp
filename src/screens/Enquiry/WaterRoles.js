import React,{Component} from 'react';
import {View, StyleSheet} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import WaterRole from '../../Components/Enquiry/WaterRole'
import { GetOrganizations, GetWaterRoles } from '../../store/actions/index';

class WaterRoles extends Component{
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
    
    //load all water companies before rendering. 
    componentWillMount() {
        this.props.onGetOrganizations();
    }
    
    render(){
        return (
            <View style={styles.container}>
                <WaterRole {...this.props}/>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1
    }
})

const mapStateToProps = state => {
    return {
      lang: state.enquiry.lang,
      data : state.enquiry.data,
      waterRole : state.enquiry.waterRole,
      waterRoleFail : state.enquiry.waterRoleFail
    };
};
  

const mapDispatchToProps = dispatch => {
    return {
        onAddName: (name,key) => dispatch(AddName(name,key)),
        onGetOrganizations: () => dispatch(GetOrganizations()),
        onGettingWaterRoles: ( data ) => dispatch(GetWaterRoles(data))
    };
};
  
  
export default connect(mapStateToProps,mapDispatchToProps,null, {"withRef" : true})(WaterRoles);