import React, { Component} from 'react';
import { connect } from 'react-redux';
import { View, Text, Button, Dimensions } from 'react-native';
import StartMainTabs from '../MainTabs/StartMainTabs';
import NameInput from '../../Components/NameInput/NameInput';
import {AddName} from '../../store/actions/index'

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
      names: state.names.names
    };
  };
  

const mapDispatchToProps = dispatch => {
    return {
        onAddName: (name,key) => dispatch(AddName(name,key))
    };
};
  
  
export default connect(mapStateToProps,mapDispatchToProps, null,{"withRef" : true})(AuthScreen);