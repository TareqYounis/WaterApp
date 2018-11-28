import React from 'react';
import {View,TouchableOpacity, Platform, Text, StyleSheet} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import IconAnt from 'react-native-vector-icons/AntDesign';

class MainApplication extends React.Component {
    constructor(props){
        super(props);
    }
    
    render(){
        return(
            <View style={styles.container}>
              
              <TouchableOpacity style={styles.Item}>
                <IconAnt name="addfile" size={30} style={styles.ItemIcon}/>
                <Text>Apply for a new application</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.Item}>
                <Ionicon name={Platform.OS === "android" ? "md-eye" : "ios-eye"} 
                size={30} style={styles.ItemIcon}/>
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