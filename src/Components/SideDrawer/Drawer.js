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
                    <TouchableOpacity onPress={() => this.props.navigate('water-app.ObjectionService')}  style={{flexDirection: 'row', justifyContent: this.justifyContent(), paddingRight: this.paddingRight(), paddingLeft: this.paddingLeft()}}>
                    { this.props.lang === 'English' ? ([
                        <Image key={0} source={require('./../../assets/images/objection_icon.png')} />,
                        <Text key={1} style={styles.text}>  {data[this.props.lang]['sideMenuObjection']} </Text>
                    ]) : ([
                        <Text key={2} style={styles.text}>  {data[this.props.lang]['sideMenuObjection']} </Text>,
                        <Image key={3} source={require('./../../assets/images/objection_icon.png')} />
                    ])}
                    </TouchableOpacity>
                    <TouchableOpacity style={{flexDirection: 'row', justifyContent: this.justifyContent(), paddingRight: this.paddingRight(), paddingLeft: this.paddingLeft()}}>
                    { this.props.lang === 'English' ? ([
                        <Image key={4} source={require('./../../assets/images/notifications_icon.png')} />,
                         <Text key={5} style={styles.text}>  {data[this.props.lang]['sideMenuNotific']} </Text>
                    ]) : ([
                        <Text key={6} style={styles.text}>  {data[this.props.lang]['sideMenuNotific']} </Text>,
                        <Image key={7} source={require('./../../assets/images/notifications_icon.png')} />
                    ])}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigate('water-app.ComplaintScreen')} style={{flexDirection: 'row', justifyContent: this.justifyContent(), paddingRight: this.paddingRight(), paddingLeft: this.paddingLeft()}}>
                    { this.props.lang === 'English' ? ([
                        <Image key={8} source={require('./../../assets/images/complaints_icon.png')} />,
                         <Text key={9} style={styles.text}>  {data[this.props.lang]['sideMenuComplaint']} </Text>
                    ]) : ([ 
                        <Text key={10} style={styles.text}>  {data[this.props.lang]['sideMenuComplaint']} </Text>,
                        <Image key={11} source={require('./../../assets/images/complaints_icon.png')} />
                    ])}
                    </TouchableOpacity>
                    {/* <TouchableOpacity onPress={() => this.props.navigate('water-app.MainApplicationScreen')} style={{flexDirection: 'row', justifyContent: this.justifyContent(), paddingRight: this.paddingRight(), paddingLeft: this.paddingLeft()}}>
                    { this.props.lang === 'English' ? ([
                        <Image key={12} source={require('./../../assets/images/applications_icon.png')} />,
                         <Text key={13} style={styles.text}>  {data[this.props.lang]['sideMenuApplications']} </Text>
                    ]) : ([ 
                        <Text key={14} style={styles.text}>  {data[this.props.lang]['sideMenuApplications']} </Text>,
                        <Image key={15} source={require('./../../assets/images/applications_icon.png')} />
                    ])}
                    </TouchableOpacity> */}
                    <TouchableOpacity onPress={() => this.props.navigate('water-app.SettingsScreen')} style={{flexDirection: 'row', justifyContent: this.justifyContent(), paddingRight: this.paddingRight(), paddingLeft: this.paddingLeft()}}>
                    { this.props.lang === 'English' ? ([
                        <Image key={16} source={require('./../../assets/images/settings_icon.png')} />,
                         <Text key={17} style={styles.text}>  {data[this.props.lang]['sideMenuSettings']} </Text>
                    ]) : ([ 
                        <Text key={18} style={styles.text}>  {data[this.props.lang]['sideMenuSettings']} </Text>,
                        <Image key={19} source={require('./../../assets/images/settings_icon.png')} />
                    ])}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.triggerModel()} style={{flexDirection: 'row', justifyContent: this.justifyContent(), paddingRight: this.paddingRight(), paddingLeft: this.paddingLeft()}}>
                    { this.props.lang === 'English' ? ([
                        <Image key={20} source={require('./../../assets/images/exit_icon.png')} />,
                         <Text key={21} style={styles.text}>  {data[this.props.lang]['sideMenuLogOut']} </Text>
                    ]) : ([ 
                        <Text key={22} style={styles.text}>  {data[this.props.lang]['sideMenuLogOut']} </Text>,
                        <Image key={23} source={require('./../../assets/images/exit_icon.png')} />
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