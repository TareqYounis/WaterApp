import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Modal, ImageBackground, Image } from "react-native";
import { fonts, colors } from './../../assets/Theme';
import * as data from './../../assets/lang.json';

class Drawer extends React.Component {
    constructor(props){
        super(props);
    }

    justifyContent = () => {
        return this.props.lang === 'Arabic' ? 'flex-end' : 'flex-start'
    }

    paddingRight = () => {
        return this.props.lang === 'Arabic' ? 30 : 0
    }

    paddingLeft = () => {
        return this.props.lang === 'Arabic' ? 0 : 20
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.quarter}>
                    <ImageBackground source={require('./../../assets/images/side_menu_logo.png')} style={{width: '100%', height: '100%'}} >
                        <Image source={require('./../../assets/images/my_account_icon.png')} style={styles.profile}/>
                    </ImageBackground>
                </View>
                <View style={styles.half}>
                    <TouchableOpacity  onPress={() => this.props.navigate('water-app.ObjectionService')} style={{flexDirection: 'row', justifyContent: this.justifyContent(), paddingRight: this.paddingRight(), paddingLeft: this.paddingLeft()}}>
                    { this.props.lang === 'English' ? ([
                        <Image source={require('./../../assets/images/objection_icon.png')} />,
                        <Text style={styles.text}>  {data[this.props.lang]['sideMenuObjection']} </Text>
                    ]) : ([
                        <Text key={0} style={styles.text}>  {data[this.props.lang]['sideMenuObjection']} </Text>,
                        <Image key={1} source={require('./../../assets/images/objection_icon.png')} />
                    ])}
                    </TouchableOpacity>
                    <TouchableOpacity style={{flexDirection: 'row', justifyContent: this.justifyContent(), paddingRight: this.paddingRight(), paddingLeft: this.paddingLeft()}}>
                    { this.props.lang === 'English' ? ([
                        <Image source={require('./../../assets/images/notifications_icon.png')} />,
                         <Text style={styles.text}>  {data[this.props.lang]['sideMenuNotific']} </Text>
                    ]) : ([
                        <Text key={2} style={styles.text}>  {data[this.props.lang]['sideMenuNotific']} </Text>,
                        <Image key={3} source={require('./../../assets/images/notifications_icon.png')} />
                    ])}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigate('water-app.ComplaintScreen')} style={{flexDirection: 'row', justifyContent: this.justifyContent(), paddingRight: this.paddingRight(), paddingLeft: this.paddingLeft()}}>
                    { this.props.lang === 'English' ? ([
                        <Image source={require('./../../assets/images/complaints_icon.png')} />,
                         <Text style={styles.text}>  {data[this.props.lang]['sideMenuComplaint']} </Text>
                    ]) : ([ 
                        <Text key={4} style={styles.text}>  {data[this.props.lang]['sideMenuComplaint']} </Text>,
                        <Image key={5} source={require('./../../assets/images/complaints_icon.png')} />
                    ])}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigate('water-app.MainApplicationScreen')} style={{flexDirection: 'row', justifyContent: this.justifyContent(), paddingRight: this.paddingRight(), paddingLeft: this.paddingLeft()}}>
                    { this.props.lang === 'English' ? ([
                        <Image source={require('./../../assets/images/applications_icon.png')} />,
                         <Text style={styles.text}>  {data[this.props.lang]['sideMenuApplications']} </Text>
                    ]) : ([ 
                        <Text key={6} style={styles.text}>  {data[this.props.lang]['sideMenuApplications']} </Text>,
                        <Image key={7} source={require('./../../assets/images/applications_icon.png')} />
                    ])}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigate('water-app.SettingsScreen')} style={{flexDirection: 'row', justifyContent: this.justifyContent(), paddingRight: this.paddingRight(), paddingLeft: this.paddingLeft()}}>
                    { this.props.lang === 'English' ? ([
                        <Image source={require('./../../assets/images/settings_icon.png')} />,
                         <Text style={styles.text}>  {data[this.props.lang]['sideMenuSettings']} </Text>
                    ]) : ([ 
                        <Text key={8} style={styles.text}>  {data[this.props.lang]['sideMenuSettings']} </Text>,
                        <Image key={9} source={require('./../../assets/images/settings_icon.png')} />
                    ])}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.triggerModel()} style={{flexDirection: 'row', justifyContent: this.justifyContent(), paddingRight: this.paddingRight(), paddingLeft: this.paddingLeft()}}>
                    { this.props.lang === 'English' ? ([
                        <Image source={require('./../../assets/images/exit_icon.png')} />,
                         <Text style={styles.text}>  {data[this.props.lang]['sideMenuLogOut']} </Text>
                    ]) : ([ 
                        <Text key={10} style={styles.text}>  {data[this.props.lang]['sideMenuLogOut']} </Text>,
                        <Image key={11} source={require('./../../assets/images/exit_icon.png')} />
                    ])}
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    quarter: { 
        flex: 0.3,
    },
    half: {
        flex: 0.7,
        backgroundColor: 'white',
        justifyContent: 'space-around'
    },
    profile: {
      flex:1,
      position: 'absolute', 
      alignSelf: 'center',
      top: 100
    },
    text:{
        color: colors.DarkBlue,
        fontSize: 20,
        fontFamily: fonts.TunisiaLt
    }
});

export default Drawer;