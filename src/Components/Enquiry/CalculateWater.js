import React from 'react';
import {View, TextInput,Picker, CheckBox, Text, StyleSheet} from 'react-native';
import Input from '../Styles/Input'
import Button from '../Styles/Button'

class CalculateWater extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            company_id: 1,
            usage_type: 1,
            quantity : 0,
            sewage_served: true,
            isLoading: false
        }
        this.calculateInvoicValue = this.calculateInvoicValue.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.renderError = this.renderError.bind(this);
        this.renderResults = this.renderResults.bind(this);
    }
    componentWillReceiveProps(props){
        //stop running the activity indicator when recieving results
        this.setState({
            isLoading: false
        })
    }

    calculateInvoicValue () {
        //start running the activity indicator when sending request
        this.setState({
            isLoading: true
        })
        this.props.onCalculatingInvoice(this.state);
    }
    
    onChangeText = (key, value) => {
        this.setState({
          [key]: value
        })
    }
    
    renderError(){
        return (
            <Text style={[styles.errorMessage, {color: 'black'}]}>Error calculating water bill, please check your values, and try again. {"\n"} {this.props.invoiceFailMsg}</Text>
        )
    }
    renderResults(){
        return (
            <Text style={styles.resultText}>Water Value is: {this.props. invoice_value}</Text>
        )
    }

    render(){
        return (
            <View>
            <Text style={styles.greeting}>
                Please fill the following
            </Text>
            <View style={styles.inputContainer}>
                <Input
                    value={this.state.quantity}
                    placeholder="Quantity in meters"
                    type='quantity'
                    keyboardType='numeric'
                    onChangeText={this.onChangeText}
                />              
                <Picker
                    selectedValue={this.state.company_id}
                    itemStyle={styles.picker}
                    onValueChange={(company_id) => this.setState({company_id})}>
                    <Picker.Item label='Please select an option...' value='0' color="#1493ff" />
                        {this.props.data.map((item, index) => {
                            return (<Picker.Item label={item.name_en} value={item.id} key={index} color="#1493ff"/>) 
                        })}
                </Picker>
                <Picker
                    selectedValue={this.state.usage_type}
                    itemStyle={styles.picker}
                    onValueChange={(usage_type) => this.setState({usage_type})}>
                    <Picker.Item label='Please select an option...' value='0' color="#1493ff" />
                        {this.props.usage_type.map((item, index) => {
                            return (<Picker.Item label={item.name_en} value={item.id} key={index} color="#1493ff"/>) 
                        })}
                </Picker>  
                <View style={{flexDirection: 'row'}}>
                    <CheckBox 
                    value={this.state.sewage_served}
                    size="15"
                    color="#1493ff"
                    onValueChange={() => this.setState({ sewage_served: !this.state.sewage_served })}
                    />
                    <Text style={styles.greeting}>sewage_served</Text>
                </View>
            </View>
            <Button
                title='Submit'
                onPress={this.calculateInvoicValue.bind(this)}
                isLoading={this.state.isLoading}
            />            
            {this.props.invoiceFailMsg !== null && (this.renderError())}
            {this.props.invoice_value  && (this.renderResults())}
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        alignItems: "center",
    },
    greeting: {
        fontFamily: 'Lato-Light',
        color: '#666',
        fontSize: 20,
        marginTop: 5
    },
    resultText: {
        color:  '#1493ff',
        fontFamily:  'Lato-Light',
        fontSize: 25,
        letterSpacing: 0.5
    },
    picker: {
        height: 45,
        width: 150,
        marginBottom: 15,
        borderBottomWidth: 1.5,
        fontSize: 16,
        borderBottomColor: '#1493ff',
        fontFamily: 'Lato-Light'
    },
    errorMessage: {
        fontFamily: 'Lato-Regular',
        fontSize: 12,
        marginTop: 10,
        color: 'transparent'
    }
});

export default CalculateWater;