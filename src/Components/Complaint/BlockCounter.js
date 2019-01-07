import React from 'react';
import { View, Text, Picker, StyleSheet } from 'react-native';
import Input from '../Styles/Input'
import Button from '../Styles/Button'


class BlockCounter extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            company_id: 1,
            account : '',
            isLoading: false
        }
        this.onChangeText = this.onChangeText.bind(this);        
        this.handleReturnCounter = this.handleReturnCounter.bind(this);
        this.renderingResults = this.renderingResults.bind(this);
        this.renderError = this.renderError.bind(this);
    }
    
    handleReturnCounter(){
        // convert the value to a number
        this.setState({
            account: Number(this.state.account),
            isLoading: true
        })
        this.props.onReturnBlockCounter(this.state);
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
    
    renderingResults() {
        // check if there is a returned value from the API.
            return this.props.returnCounter.map(function(element,key){
                return (
                    <View key={key}>
                        <Text>{element}</Text>
                    </View>
                )
            })
    }

    renderError(){
        return (
            <Text style={[styles.errorMessage,{ color: 'black'}]}>Error Returning Counter, please try again.{"\n"} {this.props.failReturnCounter}</Text>
        )
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
                            {this.props.data.map((item, index) => {
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
                </View>
                <Button
                    title='Return Counter'
                    onPress={this.handleReturnCounter.bind(this)}
                    isLoading={this.state.isLoading}
                />
                {this.props.failReturnCounter !== null && (this.renderError())}
                {this.props.returnCounter && (this.renderingResults())}
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

export default BlockCounter;