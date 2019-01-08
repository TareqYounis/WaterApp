import React,{Component} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import WaterBill from '../../Components/Enquiry/WaterBill';
import { UserParticipationInfo } from '../../store/actions/index';
import { getItem } from '../../StorageData';
import Button from '../../Components/Styles/Button';

class WaterBills extends Component{
    constructor(props){
        super(props);
        this.state= {
            isLoading: false
        }
        Navigation.events().bindComponent(this);
        this.handleAddAccount = this.handleAddAccount.bind(this);
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

    componentWillMount(){
        getItem('userId')
        .then(userID => {
            this.props.onGetParticipationInfo(Number(userID));        
        })
    }

    handleAddAccount(){
        //Navigate to the add account page when user asks to add an account
        Navigation.push(this.props.componentId,{
            component:{
                name: 'water-app.AddUserAccountScreen'
            } 
        })
    }

    render(){
        return (
            <View style={styles.container}>
                { this.props.particpationInfo.length > 0 ? (
                    <WaterBill accounts= {this.props.userAccounts} info={this.props.particpationInfo} onHandleAddAccount= {this.handleAddAccount}/>
                ) : 
                <View style={styles.activityIndicator}>
                    <ActivityIndicator color={'#1493ff'} />
                </View>
                }
                { this.props.particpFailMsg !== null && (
                    <View>
                        <Text style={[styles.greeting]}>You don't have any regested account, please add one firt, click below</Text>
                            <Button
                            title='Add Account'
                            onPress={this.handleAddAccount.bind(this)}
                            isLoading={this.state.isLoading}
                            />
                     </View>
                )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    //   justifyContent: 'center',
      paddingHorizontal: 30
    },
    greeting: {
        fontFamily: 'Lato-Light',
        color: '#666',
        fontSize: 20,
        marginTop: 5
    },
    activityIndicator: {
        transform: [{scale: 0.70}],
        marginTop: 3.5,
        marginLeft: 5
    },
    errorMessage: {
        fontFamily: 'Lato-Regular',
        fontSize: 12,
        marginTop: 10,
        color: 'transparent'
    }
})

const mapStateToProps = state => {
    return {
      particpationInfo : state.names.particpationInfo,
      userAccounts : state.names.userAccounts,
      particpFailMsg : state.names.particpFailMsg
    };
};
  
const mapDispatchToProps = dispatch => {
    return {
        onGetParticipationInfo: (userID) => dispatch(UserParticipationInfo(userID))
    };
};
    
export default connect(mapStateToProps,mapDispatchToProps,null, {"withRef" : true})(WaterBills);