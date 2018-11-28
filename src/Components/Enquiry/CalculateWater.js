import React from 'react';
import {View, TextInput,Picker, Button, CheckBox, Text, StyleSheet} from 'react-native';

class CalculateWater extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            company_id: 1,
            usage_type: 1,
            quantity : 0,
            sewage_served: true
        }
        this.calculateInvoicValue = this.calculateInvoicValue.bind(this);
    }

    calculateInvoicValue () {
        this.props.onCalculatingInvoice(this.state);
    }

    render(){
        return (
            <View style={styles.container}>
                <TextInput
                style= {{width: 300, height:40, borderColor: "blue", borderWidth: 2}}
                placeholder="enter your quantity in meters"
                onChangeText={(quantity) => this.setState({quantity})}
                />
                <Picker
                    selectedValue={this.state.company_id}
                    style={{ height: 50, width: 100 }}
                    onValueChange={(company_id) => this.setState({company_id})}>
                    {this.props.organizations.map((item, index) => {
                        return (<Picker.Item label={item.name_ar} value={item.id} key={index}/>) 
                    })}
                </Picker>
                <Picker
                    selectedValue={this.state.usage_type}
                    style={{ height: 50, width: 100 }}
                    onValueChange={(usage_type) => this.setState({usage_type})}>
                    {this.props.usageTypes.map((item, index) => {
                        return (<Picker.Item label={item.name_ar} value={item.id} key={index}/>) 
                    })}
                </Picker>
                <View style={{flexDirection: 'row'}}>
                    <Text>sewage_served</Text>
                    <CheckBox 
                    value={this.state.sewage_served}
                    onValueChange={() => this.setState({ sewage_served: !this.state.sewage_served })}
                    />
                </View> 
                <Button title="Submit" onPress={this.calculateInvoicValue} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        alignItems: "center",
    }
});

export default CalculateWater;