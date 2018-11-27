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
    handleAddingAccount(userAccount){
        this.props.onAddingUserAccount(userAccount);
    }
    //load all water companies before rendering. 
    componentWillMount() {
        this.props.onGetOrganizations();
    }
    
    render(){
        return(
            <View>
                <AddAccount organizations={this.props.data} userID= {this.props.user_id} onAddingAccount={this.handleAddingAccount}/>
                <Text>Add user account screen</Text>
                <Text>{this.props.messageAddAccount}</Text>
                <Text>{this.props.error}</Text>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
      names: state.names.names,
      data : state.enquiry.data,
      waterRole : state.enquiry.waterRole,
      user_id : state.names.user_id,
      error : state.names.error,
      messageAddAccount : state.names.messageAddAccount
    };
  };
  

const mapDispatchToProps = dispatch => {
    return {
        onAddingUserAccount: (accountData) => dispatch(UserAddAccount(accountData)),
        onGetOrganizations: () => dispatch(GetOrganizations())
    };
};
  
  
export default connect(mapStateToProps,mapDispatchToProps,null, {"withRef" : true})(AddUserAccount);