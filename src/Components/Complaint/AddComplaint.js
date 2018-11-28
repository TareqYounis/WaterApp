import React from 'react';
import { View, Text, TextInput,Button, Picker, Platform, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-datepicker'
import ImagePicker from 'react-native-image-picker';

class AddComplaint extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            complaint_type : 0,
            location: 0,
            date: "2018-11-28",
            remark : '',
            phone : 0,
            image : 0
        }
        this.handleImagePick = this.handleImagePick.bind(this);
        this.handleComplaint = this.handleComplaint.bind(this);
    }

    handleImagePick(){
        const options = {
            title: 'Select Avatar',
            customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
            storageOptions: {
              skipBackup: true,
              path: 'images',
            },
          };
        ImagePicker.launchImageLibrary(options, (response) => {
            //handle user image;
        });
    }
    
    handleComplaint(){
        this.props.complaint(this.state);
    }

    render(){
        return (
            <View style={styles.container}>
                <Text>Please fill the following form:</Text>
                
                <TextInput 
                    style= {{width: 200, height:40, borderWidth: 2}}
                    placeholder="enter your location"
                    onChangeText={(location) => this.setState({location})}
                />
                
                <TextInput 
                    style= {{width: 200, height:40, borderWidth: 2}}
                    placeholder="enter your phone number"
                    onChangeText={(phone) => this.setState({phone})}
                />
                
                <TextInput 
                    style= {{width: 200, height:40, borderWidth: 2}}
                    placeholder="enter your remark"
                    onChangeText={(remark) => this.setState({remark})}
                />
                
                <DatePicker 
                    style={{width: 200}}
                    date={this.state.date}
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    minDate="2015-05-01"
                    onDateChange={(date) => {this.setState({date: date})}}
                />

                <Picker
                    selectedValue={this.state.complaint_type}
                    style={{ height: 50, width: 200, borderWidth: 2 }}
                    onValueChange={(complaint_type) => this.setState({complaint_type})}>
                    {this.props.complaintType.map((item, index) => {
                        return (<Picker.Item label={item.name_ar} value={item.id} key={index}/>) 
                    })}
                </Picker>
                
                <TouchableOpacity onPress={this.handleImagePick} style={styles.Item}>
                        <Ionicon 
                        name={Platform.OS === "android" ? "md-images" : "ios-images"} 
                        size={30} style={styles.ItemIcon}
                        />
                        <Text>Pick an image </Text>
                </TouchableOpacity>
               

                <Button title="complain" onPress={this.handleComplaint}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        alignItems: "center",
    },
    Item: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
    },
    ItemIcon: {
        marginRight: 10
    }
});


export default AddComplaint;