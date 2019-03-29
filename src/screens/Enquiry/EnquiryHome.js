import React,{Component} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { fonts, colors } from './../../assets/Theme';
import * as data from './../../assets/lang.json';

class EnquiryHome extends Component{
    constructor(props){
        super(props);
        this.state= {
            isLoading: false
        }
        Navigation.events().bindComponent(this);                
    }
    
    //show sidemenu when menu button is clicked.
    navigationButtonPressed({ buttonId }) {
        // position menu button on topBar according to the langague
        let menuButton = this.props.lang === 'Arabic' ? 'right' :  'left'
        Navigation.mergeOptions(this.props.componentId, {
            sideMenu: {
              [menuButton]: {
                visible: true,
              }
            },
        });        
    }

    handleScreenNavigation = (screen) =>{
        Navigation.push(this.props.componentId,{
            component:{
                name: screen
            }
        })
    }

    render(){
        return (
            <View style={styles.container}>
                <View style={styles.buttons}>
                    <TouchableOpacity onPress={()=> this.handleScreenNavigation('water-app.WaterRolesScreen')}>
                        <Image source={require('./../../assets/images/water_role.png')} />
                            <Text style={[styles.buttonText,{color: 'white'}]}>{data[this.props.lang]['waterRole']}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> this.handleScreenNavigation('water-app.WaterBillScreen')}>
                        <Image source={require('./../../assets/images/bill_on.png')} />
                            <Text style={styles.buttonText}>{data[this.props.lang]['waterBill']}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> this.handleScreenNavigation('water-app.CalculateWaterScreen')}>
                        <Image source={require('./../../assets/images/water_cost_on.png')} />
                            <Text style={styles.buttonText}>{data[this.props.lang]['waterCost']}</Text>
                    </TouchableOpacity>
                </View>
          </View>
        )
    }
}
   
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    buttons:{
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    buttonText:{
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute', 
        alignSelf: 'center',
        padding: 37,
        paddingLeft: 5,
        color: colors.LightBlue,
        fontSize: 20,
        fontFamily: fonts.bold
    },
    text:{
        color: colors.DarkBlue,
        fontSize: 30,
        fontFamily: fonts.bold
    }
});

export default EnquiryHome;