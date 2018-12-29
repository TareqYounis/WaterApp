import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import { UserAddAccount, GetOrganizations } from './../../store/actions/index';
import AddAccount from './../../Components/Auth/AddAccount';

class AddUserAccount extends React.Component {
    constructor(props){
        super(props);
        this.handleAddingAccount = this.handleAddingAccount.bind(this);
    }
    //load all water companies before rendering. 
    componentWillMount() {
        this.props.onGetOrganizations();
    }

    componentWillReceiveProps(props){
        if(props.messageAddAccount){
            alert(props.messageAddAccount)
            //Navigate to the user profile screen
            Navigation.popToRoot(props.componentId);
        }
    }

    handleAddingAccount(userAccount){
        // send userID convery it to number
        userAccount.user_id = parseInt(this.props.user_id, 10);
        this.props.onAddingUserAccount(userAccount);
    }

    render(){
        return(
            <View>
                <Text>Add user account screen</Text>
                <AddAccount organizations={this.props.data} onAddingAccount={this.handleAddingAccount}/>
                <Text>{this.props.messageFailAddAccount}</Text>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
      data : state.enquiry.data,
      user_id : state.names.user_id,
      messageAddAccount : state.names.messageAddAccount,
      messageFailAddAccount : state.names.messageFailAddAccount
    };
  };
  

const mapDispatchToProps = dispatch => {
    return {
        onAddingUserAccount: (accountData) => dispatch(UserAddAccount(accountData)),
        onGetOrganizations: () => dispatch(GetOrganizations())
    };
};
  
  
export default connect(mapStateToProps,mapDispatchToProps,null, {"withRef" : true})(AddUserAccount);