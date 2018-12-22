import React from 'react';
import { View, Text, TextInput, Button, Picker, StyleSheet } from 'react-native';


class BlockCounter extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            company_id: 1,
            account : 0
        }
        this.handleReturnCounter = this.handleReturnCounter.bind(this);
        this.renderingResults = this.renderingResults.bind(this);
    }
    
    handleReturnCounter(){
        this.props.returnBlockCounter(this.state);
        this.renderingResults();
    }

    renderingResults() {
        // check if there is a returned value from the API.
        if(this.props.blockResutls.length > 0){
            return this.props.blockResutls.map(function(element,key){
                return (
                    <View key={key}>
                        <Text>{element},{key}</Text>
                    </View>
                )
            })
        }else{
            return (
                <View>
                    <Text>Null</Text>
                </View>
            )
        }
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
                           
                <Button title="Return Blocked Counter" onPress={this.handleReturnCounter}/>
        
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


export default BlockCounter;