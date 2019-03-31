import React,{Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import WaterBill from '../../Components/Enquiry/WaterBill';
import { UserParticipationInfo, ResetState } from '../../store/actions/index';
import { getItem } from '../../StorageData';
import { fonts, colors } from './../../assets/Theme';
import * as data from './../../assets/lang.json';

class WaterBills extends Component{
    constructor(props){
        super(props);
        this.state= {
            isLoading: false,
            userAccounts:null,
            particpationInfo: null,
            particpFailMsg: null
        }
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

    componentWillMount(){
        // from UserId get his accounts, and accounts info detailes to check his balance
        getItem('userId')
        .then(userID => {
            if(userID !== 'none'){
                getItem('particInfo')
                .then(parInfo => {
                    if(parInfo !== 'none'){
                        this.setState({
                            particpationInfo: JSON.parse(parInfo)[0],
                            particpFailMsg: JSON.parse(parInfo)[1]
                        })
                    }else{
                        this.props.onGetParticipationInfo(Number(userID));        
                    }
                })
                getItem('userAccounts')
                .then(userAccount => {
                    if(userAccount !== 'none'){
                        this.setState({
                            userAccounts: JSON.parse(userAccount)
                        })
                    }
                })
                
            }
        })
    }

    // reset all data to avoid duplicants
    componentWillUnmount(){
        this.props.onResetState();
    }
 
    handleAddAccount = () => {
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
                { this.props.particpationInfo.length > 0 && (
                    <WaterBill {...this.props} userAccounts={this.state.userAccounts || this.props.userAccounts} particpationInfo={this.state.particpationInfo || this.props.particpationInfo} onHandleAddAccount= {this.handleAddAccount}/>
                )}
                { (this.props.particpFailMsg || this.state.particpFailMsg ) && ( 
                    <View>
                        <View style={[styles.response]}>
                            <Text style={styles.text}> {data[this.props.lang]['waterBillAddAccountMsg']}</Text>
                            <TouchableOpacity onPress={()=> this.handleAddAccount()}>
                                <Image source={require('./../../assets/images/green_button.png')} />
                                <Text style={styles.buttonText}>{data[this.props.lang]['addAccount']}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    buttonText:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute', 
        alignSelf: 'center',
        color: 'white',
        fontSize: 18,
        fontFamily: fonts.TunisiaLt
    },
    text:{
        fontSize: 18,
        fontFamily: fonts.bold,
        color: 'white'
    },
    response:{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.DarkBlue
    }
})

const mapStateToProps = state => {
    return {
        lang: state.names.lang,
        particpationInfo : state.names.particpationInfo,
        userAccounts : state.names.userAccounts,
        particpFailMsg : state.names.particpFailMsg
    };
};
  
const mapDispatchToProps = dispatch => {
    return {
        onGetParticipationInfo: (userID) => dispatch(UserParticipationInfo(userID)),
        onResetState: () => dispatch(ResetState())
    };
};
    
export default connect(mapStateToProps,mapDispatchToProps,null, {"withRef" : true})(WaterBills);