import React,{Component} from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import { UserBalanceHistory, UserParticipationInfo } from './../../store/actions/index';
import { LineChart } from 'react-native-chart-kit'
import { Dimensions } from 'react-native'

const screenWidth = Dimensions.get('window').width
const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientTo: '#08130D',
  color: (opacity = 1) => `rgba(30, 146, 255, ${opacity})`
}

let data = []

class Home extends Component{
    constructor(props){
      super(props);
      Navigation.events().bindComponent(this);
      this.state = {
          labels: [],
          datasets: [],
      }
      this.renderChart = this.renderChart.bind(this);
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
          // in order to view only the last 5 balance history
          for( var j=0 ; j< 5 ; j++ ){
            innerData.labels.push(this.props.balanceHistory[i]['history'][j]['DATCLC'].substring(3))
            innerData.datasets[0].data.push(this.props.balanceHistory[i]['history'][j]['SUMMOUNT'])
            if(j === 4){
              data.push(innerData);
            }
          }
        }
      }
      console.log(data)

    }

    renderChart(){
      if(data.length > 0){
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
      }else{
        return (
          <Text>Loading...</Text>
        )
      }
      
    }

    render(){
      return (
        <View>
          <ScrollView>
             {
              this.renderChart()
             }
          </ScrollView>
        </View>
      )
    }
}

const mapStateToProps = state => {
    return {
      balanceHistory : state.enquiry.balanceHistory,
      error : state.enquiry.error,
      particpationInfo : state.names.particpationInfo,
      userAccounts : state.names.userAccounts 
    };
  };
  

const mapDispatchToProps = dispatch => {
    return {
        onGetUserHistory : ( userData ) => dispatch(UserBalanceHistory(userData)),
        onGetParticipationInfo: (userID) => dispatch(UserParticipationInfo(userID))
    };
};
  
  
export default connect(mapStateToProps,mapDispatchToProps,null, {"withRef" : true})(Home);