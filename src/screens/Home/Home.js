import React,{Component} from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import { UserBalanceHistory, UserParticipationInfo } from './../../store/actions/index';
import { LineChart } from 'react-native-chart-kit'
import { Dimensions } from 'react-native'
import { getItem } from '../../StorageData';

const screenWidth = Dimensions.get('window').width
const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientTo: '#08130D',
  color: (opacity = 1) => `rgba(30, 146, 255, ${opacity})`
}

let data = []
let userID = 0;

class Home extends Component{
    constructor(props){
      super(props);
      Navigation.events().bindComponent(this);
      this.state = {
          gotData: true,
          isLoading: true
      }
      this.renderChart = this.renderChart.bind(this);
      this.getAccountsData = this.getAccountsData.bind(this);
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
      getItem('userId').then(userid => {
         userID = Number(userid)
         this.props.onGetParticipationInfo(userID);
      })
    }
   
    async componentWillReceiveProps(props){
      // make sure to bring data only once, therefor check the state
      if(this.state.gotData){
        for ( var i=0; i< props.userAccounts.length ; i++){
          const userData = {
            "user_id" : userID,
            "account" : Number(props.userAccounts[i])
          }
          await this.props.onGetUserHistory(userData);   
        }
      }
      this.getAccountsData();
      this.setState({
        gotData: false
      })
    }

    getAccountsData() {
      // loop through userbalance history and extract all account number, dates, and amount values to render it
      if(this.props.balanceHistory.length > 0){
        for( var i=0 ; i< this.props.balanceHistory.length ; i++){
          const innerData = {
            labels :[],
            datasets: [{
              data: []
            }],
            account: 0
          };
          innerData.account=this.props.balanceHistory[i]['account'];
          // view only the last 5 balance history
          for( var j=0 ; j< 5 ; j++ ){
            innerData.labels.push(this.props.balanceHistory[i]['history'][j]['DATCLC'].substring(3))
            innerData.datasets[0].data.push(this.props.balanceHistory[i]['history'][j]['SUMMOUNT'])
            if(j === 4){
              data.push(innerData);
            }
          }
        }
        this.setState({
          isLoading : !this.state.isLoading
        })
      }
      console.log(this.props.balanceHistory.length, data.length)
      this.renderChart();

    }

    renderChart(){
        return (
          data.map((rowData, index) => ([
              <Text>Account Number: {rowData['account']}</Text>,
              <LineChart
                data={rowData}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
                backgroundColor="transparent"
                key={index}
                bezier
              />
          ]))
        )     
    }

    render(){
      return (
        <View>
          <ScrollView>
            { this.props.balanceHistoryFailMsg && (
                <Text>Please add an account to display data</Text>
            )}
            { this.props.particpFailMsg && (
                <Text>Please add an account to display data</Text>
            )}
            { this.state.isLoading && (
              <View style={styles.activityIndicator}>
                  <ActivityIndicator color='#1493ff' />
              </View>
            )}
            {this.renderChart()}
          </ScrollView>
        </View>
      )
    }
}

const mapStateToProps = state => {
    return {
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
  activityIndicator: {
    transform: [{scale: 1.00}],
    marginTop: 3.5,
    marginLeft: 5
  }
})
  
export default connect(mapStateToProps,mapDispatchToProps,null, {"withRef" : true})(Home);