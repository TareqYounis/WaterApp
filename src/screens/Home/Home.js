import React,{Component} from 'react';
import { View, Text } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import { UserBalanceHistory } from './../../store/actions/index';

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
            <View>
              <Text>User History Page</Text>
              <Text>{this.props.error}</Text>
              {this.renderingResults()}
            </View>
            
        )
    }
}

const mapStateToProps = state => {
    return {
      balanceHistory : state.enquiry.balanceHistory,
      error : state.enquiry.error
    };
  };
  

const mapDispatchToProps = dispatch => {
    return {
        onGetUserHistory : ( userData ) => dispatch(UserBalanceHistory(userData))
    };
};
  
  
export default connect(mapStateToProps,mapDispatchToProps,null, {"withRef" : true})(Home);