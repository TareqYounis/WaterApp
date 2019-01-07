import React from 'react';
import { View, Text, Picker, StyleSheet } from 'react-native';
import Input from '../Styles/Input'
import Button from '../Styles/Button'

class AddObjection extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            company_id: 1,
            isLoading: false,
            bill_id : '',
            account : ''
        }
        this.onChangeText = this.onChangeText.bind(this);
        this.handleObjection = this.handleObjection.bind(this);
        this.renderingResults = this.renderingResults.bind(this);
        this.renderError = this.renderError.bind(this);
    }
    
    handleObjection(){
        // convert input to string before sending to the API
        this.setState({
            bill_id: Number(this.state.bill_id),
            account : Number(this.state.account),
            isLoading: true
        })
        this.props.objection(this.state);
    }
    
    onChangeText = (key, value) => {
        this.setState({
          [key]: value
        })
    }
    componentWillReceiveProps(props){
        //stop running activity indicator in case of results back
        this.setState({
            isLoading: false
        })
    }
    renderError (){
        return (
            <Text style={[styles.errorMessage,{ color: 'black'}]}>Error Objecting, please try again with correct information.{"\n"}{this.props.objFail}</Text>
        )
    }

    renderingResults() {
        return this.props.objectionResults.map(function(element,key){
            return (
                <View key={key}>
                    <Text>{element}</Text>
                </View>
            )
        })
    }

    render(){
        return (
            <View>
                <Text style={styles.greeting}>
                    Please fill the following
                </Text>
                <View style={styles.inputContainer}>
                    <Picker
                        selectedValue={this.state.company_id}
                        itemStyle={styles.picker}
                        onValueChange={(company_id) => this.setState({company_id})}>
                        <Picker.Item label='Please select an option...' value='0' color="#1493ff" />
                            {this.props.organizations.map((item, index) => {
                                return (<Picker.Item label={item.name_en} value={item.id} key={index} color="#1493ff"/>) 
                            })}
                    </Picker>
                    <Input
                        value={this.state.account}
                        placeholder="Account Number"
                        type='account'
                        keyboardType='numeric'
                        onChangeText={this.onChangeText}
                    />
                    <Input
                        value={this.state.bill_id}
                        placeholder="Bill ID Number"
                        type='bill_id'
                        keyboardType='numeric'
                        onChangeText={this.onChangeText}
                    />
                </View>
                <Button
                    title='Object'
                    onPress={this.handleObjection.bind(this)}
                    isLoading={this.state.isLoading}
                />
                {this.props.objFail !== null && (this.renderError())}
                {this.props.objectionResults && (this.renderingResults())}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    inputContainer: {
      marginTop: 20
    },
    greeting: {
      fontFamily: 'Lato-Light',
      color: '#666',
      fontSize: 20,
      marginTop: 5
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
        fontSize: 14,
        marginTop: 10,
        color: 'transparent'
    }
});


export default AddObjection;