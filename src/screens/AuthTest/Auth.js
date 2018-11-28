import React, { Component} from 'react';
import { connect } from 'react-redux';
import { View, Text, Button, Dimensions } from 'react-native';
import StartMainTabs from '../MainTabs/StartMainTabs';
import NameInput from '../../Components/NameInput/NameInput';
import {AddName} from '../../store/actions/index'
import  { GetOrganizations, GetWaterRoles} from '../../store/actions/index';

class AuthScreen extends Component {
    constructor(props){
        super(props);
    }
    loginHandler = () => {
        StartMainTabs();
    }
    nameAddedHandler = name => {
        this.props.onAddName(name);
    };

    // componentWillMount() {
    //     this.props.onDisplayOrganization();
    // }

    // renderingArray() {
    //     return this.props.data.map(function(element,key){
    //         return (
    //             <View key={key}>
    //                 <Text>{element},{key}</Text>
    //             </View>
    //         )
    //     })
    // }

    // renderingObject(){
    //     return Object.keys(this.props.data).map(function(element,key){
    //         return (
    //             <View key={key}>
    //                 <Text>{element},{key}</Text>
    //             </View>
    //         )
    //     })
    // }

    render(){
        return (
            // set the width of the side drawer to open for a certain scale, works only for android
            <View style={{width: Dimensions.get("window").width * 0.8}}>
                <Text>Auth AuthScreen</Text>
                <NameInput onNameAdded={this.nameAddedHandler} />
                <Button title="login" onPress={this.loginHandler}/>
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
        onDisplayOrganization: () => dispatch(GetOrganizations()),
        onGettingWaterRoles: () => dispatch(GetWaterRoles(1,98310))
    };
};
  
  
export default connect(mapStateToProps,mapDispatchToProps, null,{"withRef" : true})(AuthScreen);