import React, { Component } from "react";
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, Platform, Modal } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import IconFontAwsm from "react-native-vector-icons/FontAwesome";
import IconOcticons from "react-native-vector-icons/Octicons";
import { Navigation } from "react-native-navigation";
import { connect } from 'react-redux';
import { SaveTabID } from './../../store/actions/index';
import Button from '../../Components/Styles/Button'

class SideDrawer extends Component {
    constructor(props){
        super(props);
        Navigation.events().bindComponent(this);
        // get current componentID and save it in store in order to navigate from sidemenu to screens
        Navigation.events().registerComponentDidAppearListener((componentId) => {
            // component 6 is sidedrawer ID, need not to regester its ID since its causing a navigation problem when navigating from sidemenu of ios.
            if(componentId.componentId !== 'Component8'){
                this.props.onSavingTapID(componentId.componentId);
            }
        });
        this.state={
            modalVisible: false,
            isAuthenticating: false
        }
        this.handleScreenNavigation = this.handleScreenNavigation.bind(this);
        this.closeSideDrawer = this.closeSideDrawer.bind(this);
        this.loggingOut = this.loggingOut.bind(this);
        this.closeModel = this.closeModel.bind(this);
    }
    
    handleScreenNavigation(screen){
        this.closeSideDrawer();        
        Navigation.push(this.props.Tab_ID,{
            component:{
                name: screen
            }
        })
    }

    closeModel(){
        // close the Model
        this.setState({
            modalVisible : false
        })
    }

    closeSideDrawer(){
        Navigation.mergeOptions(this.props.componentId, {
            sideMenu: {
              left: {
                visible: false
              },
            },
        }); 
    }

    loggingOut(){
        this.closeModel();
        this.handleScreenNavigation('water-app.LoginScreen');
    } 

    render() {
        return (
        <View
            style={[
            styles.container,
            { width: Dimensions.get("window").width * 0.8 }
            ]}
        >
        <TouchableOpacity onPress={() => this.handleScreenNavigation('water-app.ObjectionService')}> 
            <View style={styles.drawerItem}>
                <IconFontAwsm
                name="hand-stop-o"
                size={30}
                color="#aaa"
                style={styles.drawerItemIcon}
                />
                <Text>Objection Service</Text>
            </View>
            </TouchableOpacity>

        <TouchableOpacity onPress={() => this.handleScreenNavigation('water-app.ReturnCounterScreen')}>
            <View style={styles.drawerItem}>
                <IconFontAwsm
                name="unlock-alt"
                size={30}
                color="#aaa"
                style={styles.drawerItemIcon}
                />
                <Text>Return Blocked Counter</Text>
            </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.handleScreenNavigation('water-app.ComplaintScreen')}>
            <View style={styles.drawerItem}>
                <IconOcticons
                name= "report"
                size={30}
                color="#aaa"
                style={styles.drawerItemIcon}
                />
                <Text>Complaint</Text>
            </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.handleScreenNavigation('water-app.MainApplicationScreen')}>
            <View style={styles.drawerItem}>
                <IconFontAwsm
                name= "file-text-o"
                size={30}
                color="#aaa"
                style={styles.drawerItemIcon}
                />
                <Text>Applications</Text>
            </View>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => this.setState({ modalVisible: true})}>
            <View style={styles.drawerItem}>
                <Icon
                name={Platform.OS === "android" ? "md-log-out" : "ios-log-out"}
                size={30}
                color="#aaa"
                style={styles.drawerItemIcon}
                />
                <Text>Sign Out</Text>
            </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.handleScreenNavigation('water-app.SettingsScreen')}>
            <View style={styles.drawerItem}>
                <Icon
                name={Platform.OS === "android" ? "md-settings" : "ios-settings"}
                size={30}
                color="#aaa"
                style={styles.drawerItemIcon}
                />
                <Text>Settings</Text>
            </View>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}>
                 <View style={styles.modal}>
                    <Text style={styles.greeting}>
                     Are you sure you want to log out?
                    </Text>
                        <Button
                            title='LogOut'
                            onPress= {this.loggingOut.bind(this)}
                            isLoading={this.state.isAuthenticating}
                        />
                        <Button
                            title='Cancel'
                            onPress= {this.closeModel.bind(this)}
                            isLoading={this.state.isAuthenticating}
                        />
                </View>
            </Modal>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        backgroundColor: "white",
        flex: 1
    },
    drawerItem: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        backgroundColor: "#eee"
    },
    drawerItemIcon: {
        marginRight: 10
    },
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    greeting: {
        fontFamily: 'Lato-Light',
        color: '#666',
        fontSize: 24,
        marginTop: 5
    },
});

const mapStateToProps = state => {
    return {
      Tab_ID : state.names.Tab_ID 
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSavingTapID: (tabId) => dispatch(SaveTabID(tabId))
    };
};
  
  
export default connect(mapStateToProps,mapDispatchToProps,null, {"withRef" : true})(SideDrawer);