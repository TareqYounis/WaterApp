import React from "react";
import { Modal, View, Image, Text, Button } from "react-native";

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
        <View>
          <Button title="Delete" color="red" onPress={props.onItemDeleted} />
          <Button title="Close" onPress={props.onModalClosed} />
        </View>
      </View>
    </Modal>
  );
};


export default NameDetail;
