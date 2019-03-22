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
        this.setState({
            isLoading : true,
            organizationID: Number(this.state.organizationID),
            userAccount: Number(this.state.userAccount),
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
                <Picker
                    selectedValue={this.state.organizationID}
                    itemStyle={styles.picker}
                    onValueChange={(organizationID) => this.setState({organizationID})}>
                    <Picker.Item label={data[this.props.lang]['waterRolesOrgz#']} value='0' color="#1493ff" />
                    {this.props.data.map((item, index) => {
                        return (<Picker.Item label={item.name_en} value={item.id} key={index}/>) 
                    })}
                </Picker> 
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
        fontSize: 22,
        fontFamily: fonts.TunisiaLt
    },
    picker: {
        height: 45,
        width: 150,
        marginBottom: 15,
        borderBottomWidth: 1.5,
        fontSize: 16,
        // borderBottomColor: 'black',
        borderColor: colors.LightBlue,
        borderWidth:1,
        // fontFamily: fonts.TunisiaLt
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
        fontSize: 22,
        fontFamily: fonts.bold,
        color: 'white'
    }
});

export default WaterRole;