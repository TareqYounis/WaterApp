import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Picker, ActivityIndicator, Image} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import { UserParticipationInfo } from '../../store/actions/index';
import { getItem } from '../../StorageData';
import { fonts, colors } from './../../assets/Theme';
import * as data from './../../assets/lang.json';

class Accounts extends React.Component {
    constructor(props){
        super(props);
        Navigation.events().bindComponent(this);
        this.state = {
            isLoading: false,
            account: null,
            accountData: null,
            particpationInfo:null,
        }
    }
    //show sidemenu when menu button is clicked.
    navigationButtonPressed({ buttonId }) {
        Navigation.mergeOptions(this.props.componentId, {
            sideMenu: {
              left: {
                visible: true,
              }
            },
        });        
    } 
    
    componentWillMount() {
        // get particpationInfo that contains all user accounts from local storage to render it
        getItem('particInfo')
        .then( results => {
            if(results !== 'none'){
                this.setState({
                    particpationInfo: JSON.parse(results)[0],
                    isLoading: true
                })
                // an initial render for the first account data
                this.displayAccountData(this.state.particpationInfo[0]['account']);
            }
        })
    }

    displayAccountData = (account) => {
        this.setState({
            account : account
        })
         // Extract certain values from returned API data and assigin it to the the state.
         for ( var i = 0; i < this.state.particpationInfo.length; i++) {
             if(this.state.particpationInfo[i]['account'] === this.state.account){
                    this.setState({
                        accountData : {
                            [data[this.props.lang]['waterTableName']] : this.state.particpationInfo[i]['info']['name'],
                            [data[this.props.lang]['waterTableAccount']] : this.state.particpationInfo[i]['account'],
                            [data[this.props.lang]['waterTableIron']] : this.state.particpationInfo[i]['info']['counter'],
                            [data[this.props.lang]['waterTableBalanc']] : this.state.particpationInfo[i]['info']['balance'],
                            [data[this.props.lang]['waterTableAddres']] : this.state.particpationInfo[i]['info']['address'],
                            [data[this.props.lang]['waterTablePhone']] : this.state.particpationInfo[i]['info']['phone']  
                        }
                        ,isLoading : false
                    })
                }
            }
    }

    addUserAccount = () => {
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
            {this.state.particpationInfo === null && (
                <View style={styles.quarter1}>
                    <Text style={styles.headText}>{data[this.props.lang]['waterSubsFillMessg']}</Text>
                </View>
            )}
            {this.state.particpationInfo !== null && (
                <View style={styles.half2}>
                    {this.state.isLoading !== false && (
                        <View style={styles.activityIndicator}>
                            <ActivityIndicator color={colors.LightBlue} />
                        </View>
                    )}
                    <Picker
                        selectedValue={this.state.account}
                        itemStyle={styles.picker}
                        onValueChange={(account) => this.displayAccountData(account)}>
                        <Picker.Item label='Please select an option...' value='0' color="#1493ff" />
                        {this.state.particpationInfo.map((item, index) => {
                            return (<Picker.Item label={item['info']['name']} value={item['account']} key={index}/>) 
                        })}
                    </Picker>                    
                    {this.state.accountData !== null && (
                        Object.keys(accountData).map(function(element,key){
                            return (
                                <TouchableOpacity>
                                    <Image source={require('./../../assets/images/table_names.png')} />
                                    <Text style={styles.tabelTextRight}>{element}</Text>
                                    <Text style={styles.tabelTextLeft}>{accountData[element]}</Text>
                                </TouchableOpacity> 
                            )
                        })
                    )} 
                </View>
            )}
            <View style={styles.addIcon}>
                <TouchableOpacity onPress={this.addUserAccount}>                   
                    <Image source={require('./../../assets/images/add_account.png')} />
                </TouchableOpacity>
            </View>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    quarter1: {
        flex: 0.2,
        backgroundColor: colors.LightBlue
    },
    headText:{
        color: 'white',
        fontSize: 22,
        fontFamily: fonts.bold
    },
    half2:{
        flex: 0.8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    tabelTextRight:{
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute', 
        alignSelf: 'flex-end',
        paddingRight: 7,
        color: 'white',
        fontSize: 20,
        fontFamily: fonts.TunisiaLt
    },
    tabelTextLeft:{
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute', 
        alignSelf: 'flex-start',
        paddingLeft: 20,
        fontSize: 20,
        fontFamily: fonts.TunisiaLt
    },
    addIcon:{
        flex: 0.1,
        right: 30,
        position:'absolute',
        bottom: 30,
        alignSelf:'flex-end'
    },
    activityIndicator: {
        transform: [{scale: 1.00}],
        marginTop: 3.5,
        marginLeft: 5
    }
});

const mapStateToProps = state => {
    return {
        lang: state.names.lang,
        user_id : state.names.user_id,
        userProfile : state.names.userProfile,
        particpationInfo : state.names.particpationInfo,
        userAccounts : state.names.userAccounts
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetParticipationInfo: (userID) => dispatch(UserParticipationInfo(userID))
    };
};
  
export default connect(mapStateToProps,mapDispatchToProps,null, {"withRef" : true})(Accounts);