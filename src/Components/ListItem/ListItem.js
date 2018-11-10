import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';

const ListItem = (props) => (
    <TouchableOpacity onPress={props.onItemPressed}>
        <View style={{flexDirection:"row"}}>
            <Image source={props.nameImage} resizeMode="contain" style={{height:30 ,width:30}}/>
            <Text>{props.Name}</Text>
        </View>
    </TouchableOpacity>
)

export default ListItem;