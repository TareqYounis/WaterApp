import React,{Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import { Navigation } from 'react-native-navigation';
import Button from '../../Components/Styles/Button'

class EnquiryHome extends Component{
    constructor(props){
        super(props);
        this.state= {
            isLoading: false
        }
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
                <Text style={styles.greeting2}>
                Please choose one of the following services:
                </Text>
                <Button
                    title='Get Water Role'
                    onPress={this.handleScreenNavigation.bind(this, 'water-app.WaterRolesScreen')}
                    isLoading={this.state.isLoading}
                />
                <Button
                    title='Get Water Bill'
                    onPress={this.handleScreenNavigation.bind(this, 'water-app.WaterBillScreen')}
                    isLoading={this.state.isLoading}
                />
                <Button
                    title='Calculate Water Cost'
                    onPress={this.handleScreenNavigation.bind(this, 'water-app.CalculateWaterScreen')}
                    isLoading={this.state.isLoading}
                />
            </View>
        )
    }
}
   
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 40
    },
    greeting2: {
        fontFamily: fonts.light,
        color: '#666',
        fontSize: 24,
        marginTop: 5
    }
})

export default EnquiryHome;