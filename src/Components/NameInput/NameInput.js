import React, {Component} from 'react';
import {View, TextInput, Button} from 'react-native';

class NameInput extends Component {
    state = {
        name : ""
    };

    nameChangedHandler = val => {
        this.setState({
          name : val
        })
    }

    nameSubmitHandler = () => {
        //check if the user made an input first.
        if(this.state.name.trim() === ""){
          return;
        }
        this.props.onNameAdded(this.state.name);
    }

    render(){
        return (
            <View>
                <TextInput 
                    style= {{width: 300, height:40, borderColor: "blue", borderWidth: 2}}
                    placeholder= "Add something"
                    onChangeText= {this.nameChangedHandler}
                    value ={this.state.name}
                    />
                <Button title="add" onPress={this.nameSubmitHandler}/>
            </View>
        )
    }
}

export default NameInput;