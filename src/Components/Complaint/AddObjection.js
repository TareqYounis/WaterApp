import React from 'react';
import {View, TextInput,Picker, Text, StyleSheet, ActivityIndicator, Image, TouchableOpacity} from 'react-native';
import { fonts, colors } from './../../assets/Theme';
import * as data from './../../assets/lang.json';


class AddObjection extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            company_id: 1,
            isLoading: false,
            bill_id : null,
            account : null,
            sewage_served: false
        }
    }
    
    handleObjection = () => {
        // convert input to string before sending to the API
        this.setState({
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

    render(){
        return (
            <View style={styles.container}>
            <View style={styles.quarter1}>
                <Text style={styles.headText}>{data[this.props.lang]['fillDataMsg']}</Text>
            </View>
            <View style={styles.half2}>
                <View style={styles.picker}>
                    <Picker
                        selectedValue={this.state.company_id}
                        style={{height: 35, width: 270}}
                        onValueChange={(company_id) => this.setState({company_id})}>
                        <Picker.Item label={data[this.props.lang]['pickerMsg']} value='0' />
                        {this.props.data.map((item, index) => {
                            return (<Picker.Item label={this.props.lang === 'Arabic' ? item.name_ar : item.name_en} value={item.id}  key={index}/>) 
                        })}
                    </Picker>
                </View> 
                <TextInput
                    value={this.state.account}
                    placeholder={data[this.props.lang]['waterRoleAccount#']}
                    onChangeText= {value => this.onChangeText('account', value)}
                    style= {[styles.textInput]}
                    keyboardType='numeric'
                />
                <TextInput
                    value={this.state.bill_id}
                    placeholder={data[this.props.lang]['billNumb']}
                    onChangeText= {value => this.onChangeText('bill_id', value)}
                    style= {[styles.textInput]}
                    keyboardType='numeric'
                />
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
                <TouchableOpacity onPress={()=> this.handleObjection()}>
                    <Image source={require('./../../assets/images/blue_button.png')} />
                        <Text style={styles.buttonText}>{data[this.props.lang]['object']}</Text>
                </TouchableOpacity>
                {this.state.isLoading && (
                    <View style={styles.activityIndicator}>
                        <ActivityIndicator color={colors.LightBlue} />
                    </View>
                )} 
                {this.props.objectionResults.length > 0 && (  
                    <View style={[styles.response]}>
                        <Text style={styles.text}> {this.props.objectionResults[0]}</Text>
                    </View>
                )}
            </View>
            {this.props.objectionFailResults && (
                <View style={[styles.response]}>
                    <Text style={styles.text}> {data[this.props.lang]['failDataMsg']} {this.props.objectionFailResults}</Text>
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
        fontSize: 18,
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
        fontSize: 18,
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


export default AddObjection;