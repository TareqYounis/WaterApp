import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Platform, Picker, ActivityIndicator} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import { UserParticipationInfo } from '../../store/actions/index';
import Icon from 'react-native-vector-icons/Ionicons';
import { getItem } from '../../StorageData';

class Accounts extends React.Component {
    constructor(props){
        super(props);
        Navigation.events().bindComponent(this);
        this.state = {
            isLoading: true,
            account: null,
            accountData: null,
            particpationInfo:null,
            particpFailMsg: null
        }
        this.addUserAccount = this.addUserAccount.bind(this);
        this.displayAccountData = this.displayAccountData.bind(this);
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
        // get particpationInfo from local storage to render it
        getItem('particInfo')
        .then( results => {
            if(results !== 'none'){
                this.setState({
                    particpationInfo: JSON.parse(results)[0],
                    particpFailMsg: JSON.parse(results)[1]
                })
                // an initial render for the first account data
                this.displayAccountData(this.state.particpationInfo[0]['account']);
            }
        })
    }

    displayAccountData(account){
        this.setState({
            account : account,
            isLoading: true
        })
         // Extract certain values from returned API data and assigin it to the the state.
         for ( var i = 0; i < this.state.particpationInfo.length; i++) {
             if(this.state.particpationInfo[i]['account'] === this.state.account){
                    this.setState({
                        accountData : {
                            name : this.state.particpationInfo[i]['info']['name'],
                            account : this.state.particpationInfo[i]['account'],
                            ironNum : this.state.particpationInfo[i]['info']['counter'],
                            balance : this.state.particpationInfo[i]['info']['balance'],
                            address : this.state.particpationInfo[i]['info']['address'],
                            phone : this.state.particpationInfo[i]['info']['phone']  
                        }
                        ,isLoading : false
                    })
                }
            }
    }

    addUserAccount(){
        Navigation.push(this.props.componentId,{
            component:{
                name: 'water-app.AddUserAccountScreen'
            }
        })
    }

    render(){
        const accountData = this.state.accountData;
        return (
            <View style={styles.container}>
                {this.state.particpationInfo !== null && (
                    <Picker
                        selectedValue={this.state.account}
                        itemStyle={styles.picker}
                        onValueChange={(account) => this.displayAccountData(account)}>
                        <Picker.Item label='Please select an option...' value='0' color="#1493ff" />
                        {this.state.particpationInfo.map((item, index) => {
                            return (<Picker.Item label={item['info']['name']} value={item['account']} key={index}/>) 
                        })}
                    </Picker>
                )}
                {this.state.isLoading !== false && (
                    <View style={styles.activityIndicator}><ActivityIndicator color='#1493ff' /></View>
                )}
                {this.state.accountData !== null && (
                    Object.keys(accountData).map(function(element,key){
                        return (
                            <Text>{element}: {accountData[element]}</Text>
                        )
                    })
                )}
               <TouchableOpacity onPress={this.addUserAccount} style={styles.TouchableOpacityStyle}>                   
                        <Icon name={Platform.OS === "android" ? "md-add-circle-outline" : "ios-add-circle-outline"} size={40}/>
                </TouchableOpacity>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#f1f8ff'},
    text: { margin: 6, fontFamily :'Lato-Light'},
    row: { flexDirection: 'row' },
    TouchableOpacityStyle: {
        position:'absolute',
        alignSelf:'flex-end',
        width: 50,
        height: 50,
        right: 30,
        bottom: 30,
    },
    activityIndicator: {
        transform: [{scale: 1.00}],
        marginTop: 3.5,
        marginLeft: 5
    }
});

const mapStateToProps = state => {
    return {
      user_id : state.names.user_id,
      userProfile : state.names.userProfile,
      particpationInfo : state.names.particpationInfo,
      particpFailMsg : state.names.particpFailMsg,
      userAccounts : state.names.userAccounts
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetParticipationInfo: (userID) => dispatch(UserParticipationInfo(userID))
    };
};
  
export default connect(mapStateToProps,mapDispatchToProps,null, {"withRef" : true})(Accounts);