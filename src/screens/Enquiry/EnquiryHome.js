import React,{Component} from 'react';
import {View, Button, StyleSheet, TouchableOpacity, Platform, Text} from 'react-native';
import { Navigation } from 'react-native-navigation';
import IconFont from 'react-native-vector-icons/FontAwesome5';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';

class EnquiryHome extends Component{
    constructor(props){
        super(props);
        Navigation.events().bindComponent(this);        
        this.handleScreenNavigation = this.handleScreenNavigation.bind(this);
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

    handleScreenNavigation(screen){
        Navigation.push(this.props.componentId,{
            component:{
                name: screen
            }
        })
    }

    render(){
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => this.handleScreenNavigation('water-app.WaterRolesScreen')} style={styles.Item}>
                    <IconMaterial 
                        name="water"
                        size={30} style={styles.ItemIcon}
                    />
                    <Text>Get Water Role</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.handleScreenNavigation('water-app.WaterBillScreen')} style={styles.Item}>
                    <IconFont 
                        name="file-invoice-dollar"
                        size={30} style={styles.ItemIcon}
                    />
                    <Text>Get Water Bill</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.handleScreenNavigation('water-app.CalculateWaterScreen')} style={styles.Item}>
                    <IconMaterial 
                        name="water-percent"
                        size={30} style={styles.ItemIcon}
                    />
                    <Text>Calculate Water Cost</Text>
                </TouchableOpacity>

            </View>
        )
    }
}
     
const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        alignItems: "center",
    },
    Item: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
    },
    ItemIcon: {
        marginRight: 10
    }
});


export default EnquiryHome;