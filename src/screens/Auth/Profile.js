import React from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity, Text, Platform} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import { UserParticipationInfo } from '../../store/actions/index';
import Icon from 'react-native-vector-icons/Ionicons';
import { getItem, saveUserData, saveUserAccounts } from '../../StorageData';

class Profile extends React.Component {
    constructor(props){
        super(props);
        Navigation.events().bindComponent(this);
        this.state = {
            tableHead: ['Name','Account','Iron#','Balance', 'Address'],
            tableData: [],
            isloggedIn : false,
            counter: 0
        }
        this.renderTableData = this.renderTableData.bind(this);
        this.addingUserAccount = this.addingUserAccount.bind(this);
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
        getItem('userId')
        .then(userID => {
            console.log("test",userID)
            this.props.onGetParticipationInfo(Number(userID));        
        })
    }

    componentWillReceiveProps(props){
        this.setState({
            counter: this.state.counter+1
        })
        // make sure to render data only once
        if(props.particpationInfo.length > 0 && this.state.counter === 1){
            this.renderTableData(props.particpationInfo);
            // save user profile in phone storage
            console.log(props.userProfile);
            saveUserData(props.userProfile);
            // save user accounts in phone storage
            saveUserAccounts(props.userAccounts);
        }
    }
    renderTableData(data){
        // Extract certain values from returned API data and assigin it to the the state.
        for ( var key in data) {
            for ( var index in data[key]){
                if( index === 'info'){
                    this.setState({
                        tableData : this.state.tableData.concat({
                            name : data[key]['info']['name'],
                            account : data[key]['account'],
                            ironNum : data[key]['info']['counter'],
                            balance : data[key]['info']['balance'],
                            address : data[key]['info']['address'] 
                        })
                    })
                }
            }   
        }
    }

    addingUserAccount(){
        Navigation.push(this.props.componentId,{
            component:{
                name: 'water-app.AddUserAccountScreen'
            }
        })
    }

    render(){
        const state = this.state;
     
        return (
            <View style={styles.container}>
            <ScrollView>
                <Table borderStyle={{borderWidth: 2}}>
                <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>                
                
                { 
                    state.tableData.map((rowData, index) => (
                    <TableWrapper key={index} style={styles.row} >
                        { 
                            Object.keys(rowData).map((cellData, cellIndex) => (
                                <Cell key={cellIndex} data= {rowData[cellData]} textStyle={styles.text}/>
                            ))
                        } 
                    </TableWrapper>
                    ))
                }
                </Table>
                {this.props.particpFailMsg && ( 
                 <Text> Please Add an Account to view Data</Text>   
                )}
             
        </ScrollView>
               <TouchableOpacity onPress={this.addingUserAccount} style={styles.TouchableOpacityStyle}>                   
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
  
export default connect(mapStateToProps,mapDispatchToProps,null, {"withRef" : true})(Profile);