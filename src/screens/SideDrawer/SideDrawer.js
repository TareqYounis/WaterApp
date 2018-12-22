import React, { Component } from "react";
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, Platform } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import IconFontAwsm from "react-native-vector-icons/FontAwesome";
import IconOcticons from "react-native-vector-icons/Octicons";
import { Navigation } from "react-native-navigation";
import { connect } from 'react-redux';
import { SaveTabID } from './../../store/actions/index';

class SideDrawer extends Component {
    constructor(props){
        super(props);
        Navigation.events().bindComponent(this);
        // get current componentID and save it in store in order to navigate from sidemenu to screens
        Navigation.events().registerComponentDidAppearListener((componentId) => {
            // component 6 is sidedrawer ID, need not to regester its ID since its causing a navigation problem when navigating from sidemenu of ios.
            if(componentId.componentId !== 'Component6'){
                this.props.onSavingTapID(componentId.componentId);
            }
        });
        this.handleScreenNavigation = this.handleScreenNavigation.bind(this);
    }
    
    handleScreenNavigation(screen){
        Navigation.mergeOptions(this.props.componentId, {
            sideMenu: {
              left: {
                visible: false
              },
            },
        }); 
        Navigation.push(this.props.Tab_ID,{
            component:{
                name: screen
            }
        })
    }
    //water-app.ComplaintScreen
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
            
            <TouchableOpacity>
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

            <TouchableOpacity>
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
    }
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