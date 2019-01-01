import React,{Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import { UserBalanceHistory, UserParticipationInfo } from './../../store/actions/index';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryStack, VictoryAxis } from "victory-native"

const data2012 = [
    {quarter: 1, earnings: 13000},
    {quarter: 2, earnings: 16500},
    {quarter: 3, earnings: 14250},
    {quarter: 4, earnings: 19000}
  ];
  
  const data2013 = [
    {quarter: 1, earnings: 15000},
    {quarter: 2, earnings: 12500},
    {quarter: 3, earnings: 19500},
    {quarter: 4, earnings: 13000}
  ];
  
  const data2014 = [
    {quarter: 1, earnings: 11500},
    {quarter: 2, earnings: 13250},
    {quarter: 3, earnings: 20000},
    {quarter: 4, earnings: 15500}
  ];
  
  const data2015 = [
    {quarter: 1, earnings: 18000},
    {quarter: 2, earnings: 13250},
    {quarter: 3, earnings: 15000},
    {quarter: 4, earnings: 12000}
  ];

class Home extends Component{
    constructor(props){
        super(props);
        Navigation.events().bindComponent(this);
        this.renderingResults = this.renderingResults.bind(this);
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
        const userData = {
            "user_id" :18,
            "account" : 554131
        }
        this.props.onGetUserHistory(userData);
    }

    renderingResults() {
        return this.props.balanceHistory.map(function(element,key){
            return (
                <View key={key}>
                    <Text>{element.SUMMOUNT},{element.DATCLC}</Text>
                </View>
            )
        })
    }

    render(){
        return (
            // <View>
            //   <Text>User History Page</Text>
            //   <Text>{this.props.error}</Text>
            //   {/* {this.renderingResults()} */}
            // </View>
          
        <VictoryChart
        domainPadding={20}
        theme={VictoryTheme.material}
      >
        <VictoryAxis
          tickValues={[1, 2, 3, 4]}
          tickFormat={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
        />
        <VictoryAxis
          dependentAxis
          tickFormat={(x) => (`$${x / 1000}k`)}
        />
        <VictoryStack colorScale={["green", "yellow", "red"]}>
          <VictoryBar
            data={data2012}
            x="quarter"
            y="earnings"
          />
          <VictoryBar
            data={data2013}
            x="quarter"
            y="earnings"
          />
          <VictoryBar
            data={data2014}
            x="quarter"
            y="earnings"
          />
        </VictoryStack>
      </VictoryChart>
     
        )
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f5fcff"
    }
  });

const mapStateToProps = state => {
    return {
      balanceHistory : state.enquiry.balanceHistory,
      error : state.enquiry.error,
      particpationInfo : state.names.particpationInfo 
    };
  };
  

const mapDispatchToProps = dispatch => {
    return {
        onGetUserHistory : ( userData ) => dispatch(UserBalanceHistory(userData)),
        onGetParticipationInfo: (userID) => dispatch(UserParticipationInfo(userID))
    };
};
  
  
export default connect(mapStateToProps,mapDispatchToProps,null, {"withRef" : true})(Home);