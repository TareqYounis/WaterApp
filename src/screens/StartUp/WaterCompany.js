import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Navigation } from 'react-native-navigation';
import Button from '../../Components/Styles/Button'

class WaterCompany extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isAuthenticating: false,
            company: 'Miyahuna'
        }
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
                <Button
                    title='Miyahuna'
                    onPress = {this.selectCompany.bind(this,'Miyahuna')}
                    isLoading={this.state.isAuthenticating}
                    />
                    <Button
                    title='Yarmook'
                    onPress = {this.selectCompany.bind(this,'Yarmook')}
                    isLoading={this.state.isAuthenticating}
                    />
                     <Button
                    title='Aqba'
                    onPress = {this.selectCompany.bind(this,'Aqba')}
                    isLoading={this.state.isAuthenticating}
                    />
          </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
      }
});

export default WaterCompany;