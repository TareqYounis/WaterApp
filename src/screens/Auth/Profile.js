import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import { UserParticipationInfo } from '../../store/actions/index';

class Profile extends React.Component {
    constructor(props){
        super(props);
        Navigation.events().bindComponent(this);
        this.state = {
            tableHead: ['Name','Account','Iron#','Balance', 'Address', 'Phone'],
            tableData: [],
            isloggedIn : false
        }
        this.renderTableData = this.renderTableData.bind(this);
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
        this.props.onGetParticipationInfo(18);
    }
    componentWillReceiveProps(props){
        console.log(props);
        if(props.particpationInfo.length > 0){
            this.setState({
                isloggedIn : true
            })
            this.renderTableData(props.particpationInfo);
        }
    }
    renderTableData(data){
        // Extract certain values from returned API data and assigin it to the the state.
        for ( var key in data) {
            for ( index in data[key]){
                if( index === 'info'){
                    this.state.tableData= this.state.tableData.concat({
                        name : data[key]['info']['name'],
                        account : data[key]['account'],
                        ironNum : data[key]['info']['counter'],
                        balance : data[key]['info']['balance'],
                        address : data[key]['info']['address'] ,
                        phone : data[key]['info']['phone'],
                    })
                }
            }   
        }
    }
    render(){
        const state = this.state;
     
        return (
          <View style={styles.container}>
            <ScrollView>
                <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
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
            </ScrollView>
          </View>
        )
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6},
    row: { flexDirection: 'row' }
});

const mapStateToProps = state => {
    return {
      user_id : state.names.user_id,
      userProfile : state.names.userProfile,
      particpationInfo : state.names.particpationInfo 
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetParticipationInfo: (userID) => dispatch(UserParticipationInfo(userID))
    };
};
  
export default connect(mapStateToProps,mapDispatchToProps,null, {"withRef" : true})(Profile);