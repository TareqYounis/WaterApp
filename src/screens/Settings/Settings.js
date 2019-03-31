import React from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';
import { getItem, saveLangauge } from '../../StorageData';
import { fonts, colors } from './../../assets/Theme';
import * as data from './../../assets/lang.json';

class Settings extends React.Component{
    constructor(){
        super();
        this.state = {
            switchValue: false,
            userProfile: null
        };        
      }

      componentWillMount(){
          // get user profile data from local storage
          getItem('userData')
          .then(results => {
            if(results !== 'none'){
              console.log(results);
              this.setState({
                  userProfile: JSON.parse(results)[0]
              })
            }
          })
      }
      
      onValueChange = (value) => {
        this.setState({switchValue: value});
      }

      changeLang = (lang) =>{
        saveLangauge(lang);
        Alert.alert('Done')
      }

      direction = () => {
        return this.props.lang === 'English' ? 'flex-start' : 'flex-end'
      }

      render() {
        return (
          <View style={styles.container}>          
            <View style={[styles.quarter1,{alignItems: this.direction()}]}>
            { this.props.lang === 'Arabic' ? (
              <View style={{flexDirection: 'row'}}>
                { this.state.userProfile && (  
                    <Text style={styles.headText}>{this.state.userProfile['display_name']}</Text>
                )}
                <Image source={require('./../../assets/images/my_account_icon.png')} />
              </View>
            ) : (
              <View style={{flexDirection: 'row'}}>
                <Image source={require('./../../assets/images/my_account_icon.png')} />
                { this.state.userProfile && (  
                    <Text style={styles.headText}>{this.state.userProfile['display_name']}</Text>
                )}
              </View>
            )}              
            </View>
          { this.state.userProfile && ( 
            <View style={[styles.half2,{alignItems: this.direction()}]}> 
                <Text style={styles.text}>{data[this.props.lang]['userName']}</Text>
                <View style={styles.textBox}>
                  <Text style={{fontSize: 18, fontFamily: fonts.TunisiaLt}}>{this.state.userProfile['username']}</Text>
                </View>
                <Text style={styles.text}>{data[this.props.lang]['phoneNum']}</Text> 
                <View style={styles.textBox}>
                  <Text style={{fontSize: 18, fontFamily: fonts.TunisiaLt}}>{this.state.userProfile['phone']}</Text>
                </View>
                <Text style={styles.text}>{data[this.props.lang]['email']}</Text>
                <View style={styles.textBox}>
                  <Text style={{fontSize: 18, fontFamily: fonts.TunisiaLt}}>{this.state.userProfile['email']}</Text>
                </View>                              
            </View>
          )}
          <View style={styles.half3}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            { this.props.lang === 'Arabic' ? ([
              <Image key={0} source={require('./../../assets/images/notifications_off.png')} />,
              <Text key={1} style={styles.text}>{data[this.props.lang]['activeNotifications']}</Text>
            ]):([
              <Text key={2} style={styles.text}>{data[this.props.lang]['activeNotifications']}</Text>,
              <Image key={3} source={require('./../../assets/images/notifications_off.png')} />
            ])}
            </View>
            { this.props.lang === 'Arabic' ? (
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <TouchableOpacity onPress={() => this.changeLang('English')}>
                        <Image source={require('./../../assets/images/green_button.png')} />
                        <Text style={styles.buttonText}>English</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.changeLang('Arabic')}>
                        <Image source={require('./../../assets/images/blue_button.png')} />
                        <Text style={styles.buttonText}>Arabic</Text>
                  </TouchableOpacity>
                  <Text style={styles.text}>{data[this.props.lang]['pickLang']}</Text>
              </View>
            ) : (
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.text}>{data[this.props.lang]['pickLang']}</Text>
                <TouchableOpacity onPress={() => this.changeLang('Arabic')}>
                      <Image source={require('./../../assets/images/blue_button.png')} />
                      <Text style={styles.buttonText}>Arabic</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.changeLang('English')}>
                      <Image source={require('./../../assets/images/green_button.png')} />
                      <Text style={styles.buttonText}>English</Text>
                </TouchableOpacity>
            </View>
            )}
          </View>
          </View>                                
        )
      }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    quarter1: {
        flex: 0.15,
        backgroundColor: colors.LightBlue,
        alignItems: 'flex-start'
    },
    half2:{
        flex: 0.5,
        justifyContent: 'space-around',
        alignItems: 'flex-end'
    },
    half3:{
      flex: 0.35,
      justifyContent: 'space-around'      
    },
    headText:{
        color: 'white',
        fontSize: 22,
        fontFamily: fonts.bold
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
    textBox: {
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.LightBlue,
        width: 270,
        height: 35       
    },    
    text:{
      fontSize: 18,
      color: colors.DarkBlue,
      fontFamily: fonts.bold
    }
})

const mapStateToProps = state => {
  return {
      lang: state.enquiry.lang    
  };
};

export default connect(mapStateToProps,null,null, {"withRef" : true})(Settings);