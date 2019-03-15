import React from 'react';
import { View, StyleSheet, Text, Image, Dimensions, ImageBackground, TouchableOpacity } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { saveLangauge } from '../../StorageData';
import { fonts, colors } from './../../assets/Theme';

const deviceWidth = Dimensions.get("window").width;
const deviceHeight= Dimensions.get("window").height;

class Language extends React.Component {
    constructor(props){
        super(props);
        this.selectLangague= this.selectLangague.bind(this);
    }
    
    selectLangague(lang){
        // save the user option in the local storage.
        saveLangauge(lang);
        Navigation.push(this.props.componentId,{
            component:{
                name: 'water-app.WaterCompanyScreen'
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
                            <TouchableOpacity onPress={()=> this.selectLangague('Arabic')} style={{marginBottom: 30}}>
                                <Image source={require('./../../assets/images/blue_button.png')} />
                                    <Text style={styles.buttonText}>العربية</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=> this.selectLangague('English')}>
                                <Image source={require('./../../assets/images/green_button.png')} />
                                    <Text style={styles.buttonText}>English</Text>
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

export default Language;