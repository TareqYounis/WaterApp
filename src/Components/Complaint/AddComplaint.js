import React from 'react';
import { View, Text, StyleSheet, Picker, Image, Platform, TouchableOpacity,  } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import DatePicker from 'react-native-datepicker';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Input from '../Styles/Input'
import Button from '../Styles/Button'
import { getItem } from '../../StorageData';

class AddComplaint extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            complaint_type : 0,
            location: "",
            date: "2019-01-01",
            remark : "",
            phone : 0,
            image : '',
            isLoading: false
        }
        this.handleImagePick = this.handleImagePick.bind(this);
        this.handleComplaint = this.handleComplaint.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.renderError = this.renderError.bind(this);
    }

    handleImagePick(){
        ImagePicker.showImagePicker({title: "Pick an Image"}, res => {
            if(res.didCancel){
                console.log("user canceld");
            }else if(res.error){
                console.log("error", res.error)
            }else{
                this.setState({
                    image: {
                        uri: res.uri,
                        type: res.type,
                        data: res.data
                    }
                })
            }
        })
    }
    
    onChangeText = (key, value) => {
        this.setState({
          [key]: value
        })
    }

    renderError (){ 
        // check the returned value from the API, if its an obj or a string, and render accordingly
        if(typeof (this.props.complaintFailMsg) === 'object' ){
            const obj= this.props.complaintFailMsg;      
            return Object.keys(obj).map(function(element,key){
                return (
                    <View key={key}>
                        <Text>{element}, {obj[element]}</Text>
                    </View>
                )
            })
        }else{
            return (
                <Text>{this.props.complaintFailMsg}</Text>
            )
        }
    }
    
    handleComplaint(){
        //send userId if he was signed in
        getItem('userId')
        .then(results => {
            if(results !== 'none'){
                this.setState({
                    user_id : Number(results)
                })
            }
        })
        this.setState({
            complaint_type: Number(this.state.complaint_type),
            isLoading: true
        })
        this.props.onUserComplaint(this.state);
    }
    
    componentWillReceiveProps(props){
        this.setState({
            isLoading: false
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
                    selectedValue={this.state.complaint_type}
                    itemStyle={styles.picker}
                    onValueChange={(complaint_type) => this.setState({complaint_type})}>
                    <Picker.Item label='Please select an option...' value='0' color="#1493ff" />
                        {this.props.complaintType.map((item, index) => {
                            return (<Picker.Item label={item.name_en} value={item.id} key={index} color="#1493ff"/>) 
                        })}
                </Picker>
                <Input
                    value={this.state.location}
                    placeholder="Your location?"
                    type='location'
                    onChangeText={this.onChangeText}
                />
                <Input
                    value={this.state.remark}
                    placeholder="Complain Description"
                    type='remark'
                    onChangeText={this.onChangeText}
                />
               <Input
                    value={this.state.phone}
                    placeholder="Phone Number"
                    type='phone'
                    keyboardType='numeric'
                    onChangeText={this.onChangeText}
                />
                 <DatePicker 
                    style={{width: 250}}
                    date={this.state.date}
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    minDate="2015-05-01"
                    onDateChange={(date) => {this.setState({date: date})}}
                />
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity onPress={this.handleImagePick}>
                        <Ionicon 
                        name={Platform.OS === "android" ? "md-images" : "ios-images"} 
                        size={30} color='#1493ff'
                        />
                    </TouchableOpacity>
                    <Text style={styles.greeting}>   Pick an image </Text>
                </View>
                { this.state.image.uri && (
                    <Image source={{uri : this.state.image.uri}} style={{width: 66, height: 58}}/>
                )}
            </View>
            <Button
                title='Complain'
                onPress={this.handleComplaint.bind(this)}
                isLoading={this.state.isLoading}
            />
            {this.props.complaintFailMsg !== null && this.props.complaint === null && (
                <View>
                    <Text style={[styles.errorMessage,{ color: 'black'}]}>Error Complaining, please try again with correct information.</Text>
                    {this.renderError()}
                </View>
            )}
            {this.props.complaint && (
                <Text style={[styles.greeting]}>{this.props.complaint}</Text>
            )}
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


export default AddComplaint;