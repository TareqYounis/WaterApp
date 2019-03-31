import React, { Component } from "react";
import { View,Alert, Text, Dimensions, StyleSheet, TouchableOpacity, Platform, Modal, ImageBackground, Image } from "react-native";
import { Navigation } from "react-native-navigation";
import { connect } from 'react-redux';
import { SaveTabID } from './../../store/actions/index';
import { removeItemValue } from '../../StorageData';
import Drawer from './../../Components/SideDrawer/Drawer'
import { fonts, colors } from './../../assets/Theme';
import * as data from './../../assets/lang.json';

const deviceWidth = Dimensions.get("window").width;
const deviceHeight= Dimensions.get("window").height;


class SideDrawer extends Component {
    constructor(props){
        super(props);
        Navigation.events().bindComponent(this);
        // get current componentID and save it in store in order to navigate from sidemenu to screens
        Navigation.events().registerComponentDidAppearListener((componentId) => {
            // component sideDrawer is the sidedrawer ID, need not to regester the ID of the drawer since its causing a navigation 
            // problem when navigating from sidemenu of ios.
            if(componentId.componentId !== 'sideDrawer'){
                this.props.onSavingTapID(componentId.componentId);
            }
        });
        this.state={
            modalVisible: false
        }
    }
    
    handleScreenNavigation = (screen) => {
        this.closeSideDrawer();        
        Navigation.push(this.props.Tab_ID,{
            component:{
                name: screen
            }
        })
    }

    triggerModel = () => {
        // open or close Model
        this.setState({
            modalVisible : !this.state.modalVisible
        })
    }

    closeSideDrawer = () => {
        Navigation.mergeOptions(this.props.componentId, {
            sideMenu: {
              right: {
                visible: false
              },
              left: {
                visible: false
              },
            },
        }); 
    }

    loggingOut = () => {
        removeItemValue('userId');
        removeItemValue('userData');
        removeItemValue('userAccounts');
        removeItemValue('particInfo');
        this.triggerModel();
        this.handleScreenNavigation('water-app.LoginScreen');
    } 

    render() {
        return (
            <View style={{flex: 1}}>
                <Drawer {...this.props} triggerModel={this.triggerModel.bind(this)} navigate={this.handleScreenNavigation.bind(this)}/>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                <View style={styles.container}>
                <View style={styles.half1}>
                    <Image source={require('./../../assets/images/logo_inner_page.png')} />
                    <Text style={styles.text}>Water App</Text>
                </View>
                <View style={styles.half2}>
                    <ImageBackground source={require('./../../assets/images/background_blue.png')} style={{width: deviceWidth, height: deviceHeight}} >
                        <View style={styles.buttons}>
                            <TouchableOpacity onPress= {this.loggingOut.bind(this)} style={{marginBottom: 30}}>
                                <Image source={require('./../../assets/images/dark_blue_button.png')} />
                                    <Text style={styles.buttonText}>{data[this.props.lang]['sideMenuLogOut']}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress= {this.triggerModel.bind(this)}>
                                <Image source={require('./../../assets/images/dark_blue_button.png')} />
                                    <Text style={styles.buttonText}>{data[this.props.lang]['cancel']}</Text>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </View>
                </View>
                </Modal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    half1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    half2:{
        flex: 2,
    },
    buttons:{
        flex: 0.6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText:{
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute', 
      alignSelf: 'center',
      color: 'white',
      fontSize: 20,
      fontFamily: fonts.TunisiaLt
    },
    text:{
        color: colors.DarkBlue,
        fontSize: 30,
        fontFamily: fonts.bold
    }
});

const mapStateToProps = state => {
    return {
      Tab_ID : state.names.Tab_ID,
      lang: state.names.lang
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSavingTapID: (tabId) => dispatch(SaveTabID(tabId))
    };
};
  
  
export default connect(mapStateToProps,mapDispatchToProps,null, {"withRef" : true})(SideDrawer);