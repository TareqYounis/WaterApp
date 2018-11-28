import React from 'react';
import {View, TextInput,Picker, Button, StyleSheet} from 'react-native';

class WaterRole extends React.Component {
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
            <View style={styles.container}>
                <TextInput
                style= {{width: 300, height:40, borderColor: "blue", borderWidth: 2}}
                placeholder="enter your account number"
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

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        alignItems: "center",
    },
    Item: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
    },
    ItemIcon: {
        marginRight: 10
    }
});

export default WaterRole;