import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import { UserAddAccount, GetOrganizations } from './../../store/actions/index';
import AddAccount from './../../Components/Auth/AddAccount';
import { getItem } from '../../StorageData';

let userID=0;

class AddUserAccount extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            isLoading: false
        }
        this.handleAddingAccount = this.handleAddingAccount.bind(this);
    }
    //load all water companies before rendering. 
    componentWillMount() {
        console.log(this.props.rootTag)
        //get userID and save it locally.
        getItem('userId')
        .then(userid => {
           userID = Number(userid);
        })
        this.props.onGetOrganizations();
    }

    componentWillReceiveProps(props){
        // needs to be fixed by removing the props data
        if(props.messageAddAccount){
            alert(props.messageAddAccount)
            //Navigate to the user profile screen
            Navigation.pop(props.componentId);
        }
        //stop running the activity monitor when recieving message
        if(this.props.messageFailAddAccount){
            this.setState({
                isLoading: !this.state.isLoading
            })
        }
    }

    async handleAddingAccount(userAccountData){
        // send userID convery it to number
        this.setState({
            isLoading: !this.state.isLoading
        })
        userAccountData.user_id = userID;
        await this.props.onAddingUserAccount(userAccountData);        
    }

    render(){
        return(
            <View style={styles.container}>
                <AddAccount organizations={this.props.data} onAddingAccount={this.handleAddingAccount}/>
                {this.state.isLoading && (
                    <View style={styles.activityIndicator}>
                        <ActivityIndicator color='#1493ff' />
                    </View>
                )}
                {this.props.messageFailAddAccount && (
                    <Text>Error Adding account, Please try again.{"\n"} {this.props.messageFailAddAccount}</Text>
                )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    inputContainer: {
      marginTop: 20
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 40
    },
    errorMessage: {
        fontFamily: 'Lato-Regular',
        fontSize: 12,
        marginTop: 10,
        color: 'transparent'
    },
    activityIndicator: {
        transform: [{scale: 1.00}],
        marginTop: 3.5,
        marginLeft: 5
    }
})

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