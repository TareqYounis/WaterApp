import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, Button} from 'react-native';
import { connect } from "react-redux";

import NameInput from './src/Components/NameInput/NameInput';
import NameList from './src/Components/NameList/NameList';
import NameDetail from './src/Components/NameDetail/NameDetail';

import {
  AddName,
  DeleteName,
  SelectName,
  DeselectName
} from "./src/store/actions/index";

class App extends Component {
  nameAddedHandler = name => {
    this.props.onAddName(name);
  };

  nameDeletedHandler = () => {
    this.props.onDeleteName();
  };

  modalClosedHandler = () => {
    this.props.onDeselectName();
  };

  nameSelectedHandler = key => {
    this.props.onSelectName(key);
  };

  
  render() {
    return (
      <View style={styles.container}>
      <NameDetail
          selectedName={this.props.selectedName}
          onItemDeleted={this.nameDeletedHandler}
          onModalClosed={this.modalClosedHandler}
        />
        <NameInput onNameAdded={this.nameAddedHandler} />
        <NameList
          names={this.props.names}
          onItemSelected={this.nameSelectedHandler}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

const mapStateToProps = state => {
  return {
    names: state.names.names,
    selectedName: state.names.selectedName
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddName: (name,key) => dispatch(AddName(name,key)),
    onDeleteName: () => dispatch(DeleteName()),
    onSelectName: key => dispatch(SelectName(key)),
    onDeselectName: () => dispatch(DeselectName())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
