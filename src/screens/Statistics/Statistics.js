import React,{Component} from 'react';
import { View, StyleSheet, Dimensions, ActivityIndicator, Picker, Text } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import { UserBalanceHistory, UserParticipationInfo } from '../../store/actions/index';
import { LineChart } from 'react-native-chart-kit'
import { getItem } from '../../StorageData';
import { fonts, colors } from './../../assets/Theme';
import * as dataLang from './../../assets/lang.json';

const screenWidth = Dimensions.get('window').width
const chartConfig = {
  backgroundGradientFrom: '#1493ff',
  backgroundGradientTo: '#08130D',
  color: (opacity = 1) => `rgba( 255, 255,255, ${opacity})`,
  style: {
    borderRadius: 16
  }
}

let data = []

class Statistics extends Component{
    constructor(props){
      super(props);
      Navigation.events().bindComponent(this);
      this.state = {
          isLoading: false,
          userAccounts: null,
          userID: null,
          particpFailMsg: null,
          account: null
      }
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
      // get particpationInfo from local storage to render it
      getItem('particInfo')
      .then( results => {
          if(results !== 'none'){
              this.setState({
                  particpFailMsg: JSON.parse(results)[1]
              })
          }
      })

      // get UserID
      getItem('userId')
      .then( results => {
          this.setState({
            userID: Number(results)
          })
      })

      // get particpationInfo from local storage to render it
      getItem('userAccounts')
      .then( results => {
        console.log(results)
        if(results !== 'none'){
            this.setState({
                userAccounts: JSON.parse(results)                
            })
            // bring first account history detailes to be rendered
            this.getAccountData(this.state.userAccounts[0]['account'])
          }
      })
    }
   
    componentWillReceiveProps(props){
      // loop through userbalance history and extract all account number, dates, and amount values to render it
      for( var i=0 ; i< props.balanceHistory.length ; i++){
        const innerData = {
          labels :[],
          datasets: [{
            data: []
          }],
          account: 0
        };
        innerData.account=props.balanceHistory[i]['account'];
        // view only the last 5 balance history
        for( var j=4 ; j >= 0 ; j-- ){
          innerData.labels.push(props.balanceHistory[i]['history'][j]['DATCLC'].substring(3))
          innerData.datasets[0].data.push(props.balanceHistory[i]['history'][j]['SUMMOUNT'])
          if(j === 0){
            data.push(innerData);
          }
        }
      }
      this.setState({
        isLoading : false
      })
      this.renderChart();
    }

    getAccountData = (account) => {
      this.setState({
        account: account,
        isLoading: true
      })
      const userData = {
        "user_id" : this.state.userID,
        "account" : account
      }
      this.props.onGetUserHistory(userData);   
    }

    renderChart = () => {
      if(data.length > 0){
        return (
          <LineChart
            data={data[0]}
            width={screenWidth}
            height={220}
            chartConfig={chartConfig}
            backgroundColor="transparent"                
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
          />
        )
      }
    }

    render(){
      return (
        <View style={styles.container}>
        {this.props.balanceHistoryFailMsg !== null && (
            <View style={styles.quarter1}>
              <Text style={styles.headText}>{dataLang[this.props.lang]['addAccountMsg']}</Text>
            </View>
         )}
        {this.state.userAccounts !== null && (
            <View style={styles.picker}>
              <Picker
                selectedValue={this.state.account}
                style={{height: 35, width: 200}}
                onValueChange={(account) => this.getAccountData(account)}>
                <Picker.Item label={dataLang[this.props.lang]['pickerMsg']} value='0' />
                  {this.state.userAccounts.map((item, index) => {
                    return (<Picker.Item label={item['accountHolder']} value={item['account']} key={index}/>) 
                  })}
              </Picker>
            </View>
        )}
        {this.state.isLoading !== false && (
          <View style={styles.activityIndicator}><ActivityIndicator color='#1493ff' /></View>
        )}
        {this.renderChart()}
        </View>
      )
    }
}

const mapStateToProps = state => {
    return {
      lang : state.enquiry.lang,
      balanceHistory : state.enquiry.balanceHistory,
      balanceHistoryFailMsg : state.names.balanceHistoryFailMsg,
      particpationInfo : state.names.particpationInfo,
      userAccounts : state.names.userAccounts,
      particpFailMsg : state.names.particpFailMsg
    };
  };
  

const mapDispatchToProps = dispatch => {
    return {
        onGetUserHistory : ( userData ) => dispatch(UserBalanceHistory(userData)),
        onGetParticipationInfo: (userID) => dispatch(UserParticipationInfo(userID))
    };
};
  
const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
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
  activityIndicator: {
    transform: [{scale: 1.00}],
    marginTop: 3.5,
    marginLeft: 5
  },
  picker: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.LightBlue,
    overflow: 'hidden',
    marginBottom: 25
  }
})
  
export default connect(mapStateToProps,mapDispatchToProps,null, {"withRef" : true})(Statistics);