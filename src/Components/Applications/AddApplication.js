import React from 'react';
import { View, TextInput, StyleSheet, Text, Button, DatePicker, Picker, Platform, TouchableOpacity} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import IconAnt from 'react-native-vector-icons/AntDesign';

class AddApplication extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            subs_id_number: 0,
            subs_name : '',
            mobile: '',
            address : '',
            vil_id: 0,
            sec_id : 0,
            par_id: 0
        }
    }
    render (){
        return (
            <View style={styles.container}>
                <TextInput 
                        style= {{width: 200, height:40, borderWidth: 2}}
                        placeholder="enter your id number"
                        onChangeText={(phone) => this.setState({phone})}
                />
                    
                <TextInput 
                        style= {{width: 200, height:40, borderWidth: 2}}
                        placeholder="enter your Full name"
                        onChangeText={(subs_name) => this.setState({subs_name})}
                />

                <TextInput 
                        style= {{width: 200, height:40, borderWidth: 2}}
                        placeholder="enter your phone number"
                        onChangeText={(mobile) => this.setState({mobile})}
                />

                <TextInput 
                        style= {{width: 200, height:40, borderWidth: 2}}
                        placeholder="enter your address detailes"
                        onChangeText={(address) => this.setState({address})}
                />
                    
                {/* <Picker
                        selectedValue={this.state.vil_id}
                        style={{ height: 50, width: 200, borderWidth: 2 }}
                        onValueChange={(vil_id) => this.setState({vil_id})}>
                        {this.props.villageId.map((item, index) => {
                            return (<Picker.Item label={item.name_ar} value={item.id} key={index}/>) 
                        })}
                </Picker> */}
                
                <DatePicker 
                        style={{width: 200}}
                        date={this.state.date}
                        mode="date"
                        placeholder="select date"
                        format="YYYY-MM-DD"
                        minDate="2015-05-01"
                        onDateChange={(date) => {this.setState({date: date})}}
                />

                {/* <Picker
                    selectedValue={this.state.complaint_type}
                    style={{ height: 50, width: 200, borderWidth: 2 }}
                    onValueChange={(complaint_type) => this.setState({complaint_type})}>
                    {this.props.complaintType.map((item, index) => {
                        return (<Picker.Item label={item.name_ar} value={item.id} key={index}/>) 
                    })}
                </Picker> */}
                    
                <TouchableOpacity onPress={this.handleImagePick} style={styles.Item}>
                    <Ionicon 
                        name={Platform.OS === "android" ? "md-images" : "ios-images"} 
                        size={30} style={styles.ItemIcon}
                    />
                    <Text>Pick an image </Text>
                </TouchableOpacity>
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

export default AddApplication;