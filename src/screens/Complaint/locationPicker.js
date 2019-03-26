import React,{Component} from 'react';
import { View, Text } from 'react-native';
import { Navigation } from 'react-native-navigation';

class locationPicker extends Component{
    constructor(props){
        super(props);
        props.results(function(){
            return "hello world"
        })
    }
    render(){
        return (
            <View>
                <Text>hellllo</Text>
            </View>
        )
    }
}

export default locationPicker;