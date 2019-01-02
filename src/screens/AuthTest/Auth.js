import React, { Component} from 'react';
import { connect } from 'react-redux';
import { View, Text, Button, Dimensions } from 'react-native';
import StartMainTabs from '../MainTabs/StartMainTabs';
//import NameInput from '../../Components/NameInput/NameInput';
import {AddName} from '../../store/actions/index'
import  { GetOrganizations, GetWaterRoles, UserBalanceHistory, UserParticipationInfo} from '../../store/actions/index';

class AuthScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            counter : 0
        }
        this.getIndividualeAccountsHistory = this.getIndividualeAccountsHistory.bind(this);
    }
    loginHandler = () => {
        StartMainTabs();
    }
    nameAddedHandler = name => {
        this.props.onAddName(name);
    };

    componentWillMount(){
         const userData = {
            "user_id" :18,
            "account" : 554131
        }
        this.props.onGetParticipationInfo(18);
    }

    componentWillReceiveProps(props){
        console.log(props.particpationInfo)
        // bring every account history individully by calling the same API with differnt account number
        // in order to avoid overwriting the sent parameteres to the same API, a counter was used to check the length of the array of accounts
        // and send individule requests until user accounts data are all brought
        if(this.state.counter !== props.userAccounts.length){
            this.getIndividualeAccountsHistory(props.userAccounts[this.state.counter]);
        }
        // increase the counter by one to get closer to the counter length
        this.setState( { 
            counter : this.state.counter+1
        })
    }
    getIndividualeAccountsHistory ( accountNumb ){
        const userData = {
            "user_id" :18,
            "account" : accountNumb
        }        
        this.props.onGetUserHistory(userData);   
    }
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
                {/* <NameInput onNameAdded={this.nameAddedHandler} /> */}
                <Button title="login" onPress={this.loginHandler}/>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
      names: state.names.names,
      data : state.enquiry.data,
      particpationInfo : state.names.particpationInfo,
      userAccounts : state.names.userAccounts,
      balanceHistory : state.names.balanceHistory, 
    };
  };
  

const mapDispatchToProps = dispatch => {
    return {
        onAddName: (name,key) => dispatch(AddName(name,key)),
        onDisplayOrganization: () => dispatch(GetOrganizations()),
        onGettingWaterRoles: () => dispatch(GetWaterRoles(1,98310)),
        onGetUserHistory : ( userData ) => dispatch(UserBalanceHistory(userData)),
        onGetParticipationInfo: (userID) => dispatch(UserParticipationInfo(userID))
    };
};
  
  
export default connect(mapStateToProps,mapDispatchToProps, null,{"withRef" : true})(AuthScreen);