import React from 'react';
import {View,TouchableOpacity, Platform} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import IconAnt from 'react-native-vector-icons/AntDesign';

class MainApplication extends React.Component {
    constructor(props){
        super(props);
    }
    
    render(){
        return(
            <View>
              <TouchableOpacity>
                <IconAnt name="addfile" size={30}/>
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicon name={Platform.OS === "android" ? "md-eye" : "ios-eye"} 
                size={30}/>
              </TouchableOpacity>
            </View>
        )
    }
}
  
export default MainApplication;