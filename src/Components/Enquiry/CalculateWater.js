import React from 'react';
import {View, TextInput,Picker, Text, StyleSheet, ActivityIndicator, Image, TouchableOpacity} from 'react-native';
import { fonts, colors } from './../../assets/Theme';
import * as data from './../../assets/lang.json';

class CalculateWater extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            company_id: 1,
            usage_type: 1,
            quantity : null,
            sewage_served: true,
            isLoading: false
        }
    }

    componentWillReceiveProps(props){
        //stop running the activity indicator when recieving results
        this.setState({
            isLoading: false
        })
    }

    calculateInvoicValue = () => {
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

    render(){
        return (
            <View style={styles.container}>
            <View style={styles.quarter1}>
                <Text style={styles.headText}>{data[this.props.lang]['calcWateramountMsg']}</Text>
            </View>
            <View style={styles.half2}>
                <TextInput
                    value={this.state.quantity}
                    placeholder={data[this.props.lang]['WaterMeterAmount']}
                    onChangeText= {value => this.onChangeText('quantity', value)}
                    style= {[styles.textInput]}
                    keyboardType='numeric'
                />
                <View style={styles.picker}>
                    <Picker
                        selectedValue={this.state.company_id}
                        style={{height: 35, width: 270}}
                        onValueChange={(company_id) => this.setState({company_id})}>
                        <Picker.Item label={data[this.props.lang]['pickerMsg']} value='0' />
                        {this.props.data.map((item, index) => {
                            return (<Picker.Item label={item.name_en} value={item.id}  key={index}/>) 
                        })}
                    </Picker>
                </View>
                <View style={styles.picker}>
                    <Picker
                        selectedValue={this.state.usage_type}
                        style={{height: 35, width: 270}}
                        onValueChange={(usage_type) => this.setState({usage_type})}>
                        <Picker.Item label={data[this.props.lang]['pickerMsg']} value='0' />
                        {this.props.usage_type.map((item, index) => {
                            return (<Picker.Item label={item.name_en} value={item.id}  key={index}/>) 
                        })}
                    </Picker>
                </View> 
                <View style={{flexDirection: 'row'}}>
                    <Text style={[styles.text,{color: colors.LightBlue}, {marginRight: 10}]}>{data[this.props.lang]["sewage_served"]}</Text>
                    { this.state.sewage_served ? (
                        <TouchableOpacity onPress={()=> this.setState({ sewage_served: false})}>
                            <Image source={require('./../../assets/images/check_box_on.png')}/>
                        </TouchableOpacity>
                    ): (
                        <TouchableOpacity onPress={()=> this.setState({ sewage_served: true})}>
                            <Image source={require('./../../assets/images/check_box_off.png')}/>
                        </TouchableOpacity>
                    )}
                </View>
                <TouchableOpacity onPress={()=> this.calculateInvoicValue()}>
                    <Image source={require('./../../assets/images/blue_button.png')} />
                        <Text style={styles.buttonText}>{data[this.props.lang]['send']}</Text>
                </TouchableOpacity>
                {this.state.isLoading && (
                    <View style={styles.activityIndicator}>
                        <ActivityIndicator color={colors.LightBlue} />
                    </View>
                )} 
                {this.props.invoice_value && (  
                    <View>
                        <Image source={require('./../../assets/images/notification_pop_up.png')} />
                        <Text style={styles.buttonText}>{data[this.props.lang]['calcWateramountValue']} {"\n"} {this.props.invoice_value} {data[this.props.lang]['balanceJD']}</Text>
                    </View>
                )}
            </View>
            {this.props.invoiceFailMsg && (
                <View style={[styles.response]}>
                    <Text style={styles.text}> {data[this.props.lang]['failDataMsg']} {this.props.invoiceFailMsg}</Text>
                </View>
            )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    quarter1: {
        flex: 0.15,
        backgroundColor: colors.LightBlue
    },
    half2:{
        flex: 0.65,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    headText:{
        color: 'white',
        fontSize: 22,
        fontFamily: fonts.bold
    },
    textInput: {
        fontSize: 18,
        fontFamily: fonts.TunisiaLt,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 20,
        backgroundColor: 'white',
        borderColor: colors.LightBlue,
        borderWidth:1,
        width: 270,
        height: 35
    },
    buttonText:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute', 
        alignSelf: 'center',
        color: 'white',
        fontSize: 20,
        fontFamily: fonts.TunisiaLt
    },
    picker: {
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.LightBlue,
        overflow: 'hidden'
    },
    activityIndicator: {
        transform: [{scale: 0.70}],
        marginTop: 3.5,
        marginLeft: 5
    },
    text:{
        fontSize: 20,
        fontFamily: fonts.bold,
        color: 'white'
    },
    response:{
        flex:0.20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.DarkBlue
    }
});

export default CalculateWater;