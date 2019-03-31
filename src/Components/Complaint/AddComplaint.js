import React from 'react';
import { View, Text, StyleSheet, Picker, TextInput, Image, ImageBackground, TouchableOpacity, ActivityIndicator } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { Navigation } from 'react-native-navigation';
import { fonts, colors } from './../../assets/Theme';
import * as data from './../../assets/lang.json';

class AddComplaint extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user_id: this.props.user_id,
            complaint_type : 0,
            location: 0,
            date: "2019-01-01",
            remark : "",
            phone : "",
            image : [],
            locationAddress: "",
            isLoading: false
        }
    }

    componentWillReceiveProps(props){
        this.setState({
            isLoading: false
        })
    }

    handleImagePick = () => {
        ImagePicker.showImagePicker({title: "Pick an Image"}, res => {
            if(res.didCancel){
                console.log("user canceld");
            }else if(res.error){
                console.log("error", res.error)
            }else{
                this.setState({
                    image: this.state.image.concat({
                        uri: res.uri,
                        type: res.type,
                        data: res.data
                    })
                })
            }
        })
    }

    handleLocation = () => {
        Navigation.push(this.props.componentId,{
            component:{
                name: 'water-app.LocationPicker',
                passProps: {
                    results: this.handlevalue,
                    lang: this.props.lang
                } 
            }
        })
    }

    handlevalue = (callback) => {
        var locationResults = callback();
        this.setState({
            location: locationResults.location,
            locationAddress: locationResults.locationAddress
        })
    }
    
    onChangeText = (key, value) => {
        this.setState({
          [key]: value
        })
    }

    handleComplaint = () => { 
        // send current date with the complaint
        var date = new Date();
        var res = date.toISOString();

        this.setState({
            complaint_type: Number(this.state.complaint_type),
            phone: Number(this.state.phone),
            date: res.slice(0,10),
            isLoading: true
        })
        this.props.onUserComplaint(this.state);
    }

    alignSelf = ()=> {
        return this.props.lang  === 'English' ? 'flex-start' : 'flex-end'     
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
                        selectedValue={this.state.complaint_type}
                        style={{height: 35, width: 270}} 
                        onValueChange={(complaint_type) => this.setState({complaint_type})}>
                        <Picker.Item label={data[this.props.lang]['pickerMsgComplain']} value='0' />
                        {this.props.complaintType.map((item, index) => {
                            return (<Picker.Item label={item.name_ar} value={item.id} key={index} />) 
                        })}
                    </Picker>
                </View>
                <TouchableOpacity onPress={() => this.handleLocation()} style={{marginTop: 15, flexDirection: 'row', width: 270, height: 35}}>
                    <Image source={require('./../../assets/images/location_icon.png')} />
                    <TextInput
                        value={this.state.locationAddress}
                        placeholder={data[this.props.lang]['enterLocationMsg']}
                        onChangeText= {() => this.handleLocation()}
                        style= {[styles.textInput, {width: 250}]}
                    />
                </TouchableOpacity>
                <TextInput
                    value={this.state.remark}
                    placeholder={data[this.props.lang]['complainRemark']}
                    onChangeText= {value => this.onChangeText('remark', value)}
                    style= {[styles.textInput]}
                />
                <TextInput
                    value={this.state.phone}
                    placeholder={data[this.props.lang]['phoneNum']}
                    onChangeText= {value => this.onChangeText('phone', value)}
                    style= {[styles.textInput]}
                    keyboardType='numeric'
                />
            </View>
            <View style={{alignItems: 'flex-end'}}>
                <View style={{flexDirection: 'row', marginBottom: 20 }}>
                    <Text style={{fontSize: 18,fontFamily: fonts.TunisiaLt, marginRight: 10, color:'gray'}}>{data[this.props.lang]['pickImage']}</Text>
                    <TouchableOpacity onPress={this.handleImagePick}>
                        <Image source={require('./../../assets/images/image_icon.png')}/>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', marginBottom: 20}}>
                        <TouchableOpacity onPress={this.handleImagePick} style={{paddingTop: 25}}>        
                            <Image source={require('./../../assets/images/plus_icon.png')}/>
                        </TouchableOpacity>
                        { this.state.image.length >0 ? (
                            this.state.image.map(function(element,key){
                                return (
                                    <View style={styles.imageBox}>        
                                        <Image source={{uri : element['uri']}} style={{width: 100, height: 70}}/>
                                    </View>
                                )
                            })
                        ) : 
                        (
                            <View style={styles.imageBox}>        
                                <Text style={[styles.text,{paddingTop: 20}]}>1</Text>
                            </View>
                        )}
                </View>
            </View>
                <View style={{alignItems: 'center'}}>
                { this.props.complaint === null ? (
                    <View>
                        <TouchableOpacity onPress={()=> this.handleComplaint()}>
                            <Image source={require('./../../assets/images/blue_button.png')} />
                            <Text style={[styles.text,{color: 'white'}]}>{data[this.props.lang]['send']}</Text>
                        </TouchableOpacity>
                        {this.state.isLoading !== false && (
                            <View style={styles.activityIndicator}>
                                <ActivityIndicator color={colors.LightBlue} />
                            </View>
                        )}
                    </View>
                ) : 
                (
                    <View style={{backgroundColor: 'green', width: 200, height: 70, borderRadius: 10}}>
                        <Text style={[styles.text,{paddingTop: 20},{color:'white'}]}>{data[this.props.lang]['successComplaint']}</Text>
                    </View>
                )}
                </View>
                {( this.props.complaintFailMsg || this.props.error ) && this.props.complaint === null && (
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ color: 'red'}}>{data[this.props.lang]['failDataMsg']}</Text>
                    </View>
                )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around'
    },
    quarter1: {
        flex: 0.2,
        backgroundColor: colors.LightBlue
    },
    headText:{
        color: 'white',
        fontSize: 22,
        fontFamily: fonts.bold
    },
    half2:{
        flex: 0.8,
        alignItems: 'center',
        justifyContent: 'space-around'    
    },
    picker: {
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.LightBlue,
        // overflow: 'hidden',
        marginTop: 15
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
        height: 35,
        color: 'gray'
    },
    text:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute', 
        fontSize: 18,
        fontFamily: fonts.TunisiaLt,
        alignSelf: 'center',
        color: 'gray'
    },
    imageBox:{
        backgroundColor: 'white',
        width: 100,
        height: 70,
        borderWidth: 1,
        borderColor: colors.LightBlue,
        marginLeft: 20
    },
    activityIndicator: {
        transform: [{scale: 0.70}],
        marginTop: 3.5,
        marginLeft: 5
    }
});

export default AddComplaint;


