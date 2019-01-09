import React from 'react';
import { View, StyleSheet, Platform, Text } from 'react-native';
import SettingsList from 'react-native-settings-list';
import Icon from "react-native-vector-icons/AntDesign";
import { getItem } from '../../StorageData';

class Settings extends React.Component{
    constructor(){
        super();
        this.state = {
            switchValue: false,
            userProfile: null,
            language: null
        };
        this.renderIcon = this.renderIcon.bind(this);
        this.onValueChange = this.onValueChange.bind(this);
      }

      componentWillMount(){
          // get user profile data from local storage
          getItem('userData')
          .then(results => {
              this.setState({
                  userProfile: JSON.parse(results)
              })
          })

          // get user app langage from local storage
          getItem('language')
          .then(results => {
              this.setState({
                language: results
              })
          })
      }
      
      onValueChange(value){
        this.setState({switchValue: value});
      }

      renderIcon(nameAndroid, nameIOS){
        return(
          <View style={{height:30,marginLeft:10,alignSelf:'center'}}>  
            <Icon
            name={Platform.OS === "android" ? nameAndroid : nameIOS}
            size={30}
            color="#aaa"
            />
          </View>
        )
      }
      
      render() {
        return (
          <View style={styles.container}>
          {this.state.userProfile && ( 
            <View style={{flex:1, marginTop:20}}> 
              <SettingsList>
                <SettingsList.Header 
                headerText= {this.state.userProfile['display_name'] + ' Profile'} 
                headerStyle={{color:'black', fontSize: 20}} />
                <SettingsList.Item titleInfo={this.state.userProfile['username']} hasNavArrow={false} title='User Name' icon={this.renderIcon('user','user')}/>
                <SettingsList.Item titleInfo={this.state.userProfile['phone']} hasNavArrow={false} title='Phone #'  icon={this.renderIcon('phone','phone')}/>
                <SettingsList.Item titleInfo={this.state.userProfile['email']} hasNavArrow={false} title='Email Address'  icon={this.renderIcon('mail','mail')}/>
                <SettingsList.Item titleInfo={this.state.userProfile['role_name']} hasNavArrow={false} title='Role'  icon={this.renderIcon('solution1','solution1')}/>
                <SettingsList.Item titleInfo={this.state.userProfile['language']} hasNavArrow={false} title='Profile Langague'  icon={this.renderIcon('zhihu','zhihu')}/>
              </SettingsList>
              <Text>{'\n'}</Text>
              <SettingsList>
                <SettingsList.Header headerText='Application Info'
                headerStyle={{color:'black', fontSize: 20}}/>
                <SettingsList.Item
                    hasNavArrow={false}
                    switchState={this.state.switchValue}
                    switchOnValueChange={this.onValueChange}
                    hasSwitch={true}
                    title='Push Notifications'/>
                <SettingsList.Item titleInfo={this.state.language} hasNavArrow={false} title='Application Langague'  icon={this.renderIcon('zhihu','zhihu')}/>
                </SettingsList>
            </View>
            )}
          </View>
        );
      }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:'#f1f8ff',
        flex:1,
        paddingHorizontal: 20
    },
})
    
export default Settings;