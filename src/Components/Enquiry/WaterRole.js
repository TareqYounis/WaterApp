import React from 'react';
import {View, Picker, TextInput, Image, Text, StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native';
import { fonts, colors } from './../../assets/Theme';
import * as data from './../../assets/lang.json';

class WaterRole extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            organizationID: 1,
            userAccount: '',
            isLoading: false
        }
    }

    componentWillReceiveProps(props){
        this.setState({
            isLoading: false
        })
    }

    getWaterRolesHandler = () => {
        // rest old data in store before continue, and then make a request
        this.props.onResetState();
        this.setState({
            isLoading : true
        })
        this.props.onGettingWaterRoles(this.state);
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
                <Text style={styles.headText}>{data[this.props.lang]['waterRoleFillMessg']}</Text>
            </View>
            <View style={styles.half2}>
                <TextInput
                    value={this.state.userAccount}
                    placeholder={data[this.props.lang]['waterRoleAccount#']}
                    onChangeText= {value => this.onChangeText('userAccount', value)}
                    style= {[styles.textInput]}
                    keyboardType='numeric'
                /> 
                <View style={styles.picker}>
                    <Picker
                        selectedValue={this.state.organizationID}
                        style={{height: 35, width: 270}}
                        onValueChange={(organizationID) => this.setState({organizationID})}>
                        <Picker.Item label={data[this.props.lang]['pickerMsg']} value='0' />
                        {this.props.data.map((item, index) => {
                            return (<Picker.Item label={item.name_en} value={item.id}  key={index}/>) 
                        })}
                    </Picker>
                </View>
                <TouchableOpacity onPress={()=> this.getWaterRolesHandler()}>
                    <Image source={require('./../../assets/images/blue_button.png')} />
                        <Text style={styles.buttonText}>{data[this.props.lang]['send']}</Text>
                </TouchableOpacity>
                {this.state.isLoading && (
                    <View style={styles.activityIndicator}>
                        <ActivityIndicator color={colors.LightBlue} />
                    </View>
                )}                    
            </View>
            {this.props.waterRole && (
                <View style={[styles.response]}>
                    <Text style={styles.text}> {data[this.props.lang]['waterRoleRespMessg']} {this.props.waterRole}</Text>
                </View>
            )}
            {this.props.waterRoleFail && (
                <View style={[styles.response]}>
                    <Text style={styles.text}> {data[this.props.lang]['failDataMsg']} {this.props.waterRoleFail}</Text>
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
        flex: 0.5,
        justifyContent: 'center',
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
        marginBottom: 15,
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
        overflow: 'hidden',
        marginBottom: 25
    },
    activityIndicator: {
        transform: [{scale: 0.70}],
        marginTop: 3.5,
        marginLeft: 5
    },
    response:{
        flex:0.35,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.DarkBlue
    },
    text:{
        fontSize: 20,
        fontFamily: fonts.bold,
        color: 'white'
    }
});

export default WaterRole;