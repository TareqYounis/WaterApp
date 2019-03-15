import React from 'react';
import { View, StyleSheet, Text, Image, Dimensions, ImageBackground, TouchableOpacity } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { fonts, colors } from './../../assets/Theme';

const deviceWidth = Dimensions.get("window").width;
const deviceHeight= Dimensions.get("window").height;

class WaterCompany extends React.Component {
    constructor(props){
        super(props);
        this.selectCompany = this.selectCompany.bind(this);
    }
   
    selectCompany(company) {
        Navigation.push(this.props.componentId,{
            component:{
                name: 'water-app.LoginScreen'
            } 
        })
    }
    
    render(){
        return (
            <View style={styles.container}>
                <View style={styles.half1}>
                    <Image source={require('./../../assets/images/logo_inner_page.png')} />
                    <Text style={styles.text}>Water App</Text>
                </View>
                <View style={styles.half2}>
                    <ImageBackground source={require('./../../assets/images/background_blue.png')} style={{width: deviceWidth, height: deviceHeight}} >
                        <View style={styles.buttons}>
                            <TouchableOpacity onPress={()=> this.selectCompany('myahuna')} style={{marginBottom: 30}}>
                                <Image source={require('./../../assets/images/myahuna_button.png')} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=> alert('لا يوجد')} style={{marginBottom: 30}}>
                                <Image source={require('./../../assets/images/yarmouk_button.png')} />
                            </TouchableOpacity>
                             <TouchableOpacity onPress={()=> alert('لا يوجد')}>
                                <Image source={require('./../../assets/images/aqaba_button.png')} />
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </View>
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
    text:{
        color: colors.DarkBlue,
        fontSize: 30,
        fontFamily: fonts.bold
    }
});

export default WaterCompany;