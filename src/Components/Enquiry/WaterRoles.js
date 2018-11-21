import React from 'react';
import {View, TextInput,Picker, Text, Button} from 'react-native';

class WaterRoles extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            organizationID: '1',
            userAccount: ''
        }
        this.inputChangeHandler= this.inputChangeHandler.bind(this);
        this.getWaterRolesHandler = this.getWaterRolesHandler.bind(this);
    }

    inputChangeHandler = val => {
        this.setState({
            userAccount : val
        })
    } 

    getWaterRolesHandler(){
        this.props.onSubmission(this.state.organizationID,this.state.userAccount);
    }

    render(){
        return (
            <View>
                <TextInput
                style= {{width: 300, height:40, borderColor: "blue", borderWidth: 2}}
                placeholder="enter your account thing"
                onChangeText={this.inputChangeHandler}
                />
                <Picker
                    selectedValue={this.state.organizationID}
                    style={{ height: 50, width: 100 }}
                    onValueChange={(organizationID) => this.setState({organizationID})}>
                    {this.props.organizations.map((item, index) => {
                        return (<Picker.Item label={item.name_ar} value={item.id} key={index}/>) 
                    })}
                </Picker> 
                <Button title="Submit" onPress={this.getWaterRolesHandler} />
            </View>
        )
    }
}

export default WaterRoles;