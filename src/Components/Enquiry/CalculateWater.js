import React from 'react';
import {View, TextInput,Picker, Text, Button} from 'react-native';

class CalculateWater extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            company_id: 1,
            usage_type: 1,
            quantity : 0,
            sewage_served: 'TRUE'
        }
        this.calculateInvoicValue = this.calculateInvoicValue.bind(this);
    }

    calculateInvoicValue () {
        this.props.onCalculatingInvoice(this.state);
    }

    render(){
        return (
            <View>
                <TextInput
                style= {{width: 300, height:40, borderColor: "blue", borderWidth: 2}}
                placeholder="enter your quantity in meters"
                onChangeText={(quantity) => this.setState({quantity})}
                />
                <Picker
                    selectedValue={this.state.organizationID}
                    style={{ height: 50, width: 100 }}
                    onValueChange={(company_id) => this.setState({company_id})}>
                    {this.props.organizations.map((item, index) => {
                        return (<Picker.Item label={item.name_ar} value={item.id} key={index}/>) 
                    })}
                </Picker> 
                <Button title="Submit" onPress={this.calculateInvoicValue} />
            </View>
        )
    }
}

export default CalculateWater;