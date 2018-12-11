import React from 'react';
import { View, Text, TextInput, Button, Picker, StyleSheet } from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';

class AddObjection extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            company_id: 1,
            bill_id : 0,
            account : 0
        }
        this.handleObjection = this.handleObjection.bind(this);
        this.renderingResults = this.renderingResults.bind(this);
    }
    
    handleObjection(){
        this.props.objection(this.state);
    }

    renderingResults() {
        return this.props.objectionResults.map(function(element,key){
            return (
                <View key={key}>
                    <Text>{element},{key}</Text>
                </View>
            )
        })
    }
    render(){
        return (
            <View style={styles.container}>
                <Text>Please fill the following form:</Text>
                
                <Picker
                    selectedValue={this.state.company_id}
                    style={{ height: 50, width: 200, borderWidth: 2 }}
                    onValueChange={( company_id ) => this.setState({ company_id })}>
                    {this.props.organizations.map((item, index) => {
                        return (<Picker.Item label={item.name_ar} value={item.id} key={index}/>) 
                    })}
                </Picker>

                <TextInput 
                    style= {{width: 200, height:40, borderWidth: 2}}
                    placeholder="enter your account number"
                    onChangeText={( account ) => this.setState({ account })}
                />

                <TextInput 
                    style= {{width: 200, height:40, borderWidth: 2}}
                    placeholder="enter your bill ID number"
                    onChangeText={( bill_id ) => this.setState({ bill_id })}
                />
                           
                <Button title="Object" onPress={this.handleObjection}/>
        
              {this.renderingResults()}
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


export default AddObjection;