import React from 'react';
import {FlatList} from 'react-native';
import ListItem from '../ListItem/ListItem';
import NameImage from '../../assets/testPhoto.jpeg';

const NameList = props => {
    // const names = props.names.map((value,i) => (
    //     <ListItem key={i} Name={value} onItemPressed={()=> props.onItemSelected(i)} nameImage={NameImage}/>
    // ));
    
    return (
        // <ScrollView>{names}</ScrollView>
        <FlatList
        data={props.names}
        renderItem={(info) => (
            <ListItem
            Name={info.item.name}
            nameImage={NameImage}
            onItemPressed={() => props.onItemSelected(info.item.key)}
            />
        )}
        />
    );
}



export default NameList;