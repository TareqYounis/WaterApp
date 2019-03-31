import React from 'react';
import {View,TouchableOpacity, Platform, Text, StyleSheet} from 'react-native';
import { Navigation } from 'react-native-navigation';

class MainApplication extends React.Component {
    constructor(props){
        super(props);
        this.ApplyforApplication = this.ApplyforApplication.bind(this);
    }
    
    ApplyforApplication (screen) {
        Navigation.push(this.props.componentId,{
            component:{
                name: screen
            } 
        })
    }    
    render(){
        return(
            <View style={styles.container}>
              
              <TouchableOpacity style={styles.Item} onPress={ () => this.ApplyforApplication('water-app.ApplyApplicationScreen')}>
                <Text>Apply for a new application</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.Item}>
                <Text>View your application</Text>
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
export default MainApplication;