import React from 'react';
import {View} from 'react-native';
import AddApplication from './../../Components/Applications/AddApplication';

class ApplyApplication extends React.Component {
    constructor(props){
        super(props);
    }
    
    render(){
        return(
            <View>
                <AddApplication />
            </View>
        )
    }
}

export default ApplyApplication;