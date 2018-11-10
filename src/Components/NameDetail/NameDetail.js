import React from "react";
import { Modal, View, Image, Text, Button, TouchableOpacity } from "react-native";

import Icon from 'react-native-vector-icons/Ionicons';

const NameDetail = props => {
  let modalContent = null;

  if (props.selectedName) {
    modalContent = (
      <View>
        <Image source={props.selectedName.image}/>
        <Text>{props.selectedName.name}</Text>
      </View>
    );
  }
  return (
    <Modal
      onRequestClose={props.onModalClosed}
      visible={props.selectedName !== null}
      animationType="slide"
    >
      <View>
        {modalContent}
        <View style={{alignItems:"center"}}>
          <TouchableOpacity onPress={props.onItemDeleted}>
            <Icon size={30} name="ios-trash" color="red"/>
          </TouchableOpacity>
          <Button title="Close" onPress={props.onModalClosed} />
        </View>
      </View>
    </Modal>
  );
};


export default NameDetail;
