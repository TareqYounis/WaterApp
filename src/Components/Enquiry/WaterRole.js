import React from 'react';
import {View, Picker, Image, Text, StyleSheet} from 'react-native';
import Input from '../Styles/Input'
import Button from '../Styles/Button'

class WaterRole extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            organizationID: 1,
            userAccount: 0,
            isAuthenticating: false
        }

        this.getWaterRolesHandler = this.getWaterRolesHandler.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
    }

    getWaterRolesHandler(){
        this.setState({
            isAuthenticating : true,
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

    componentWillReceiveProps(props){
        this.setState({
            isAuthenticating: false
        })
    }

    render(){
        return (
            <View>
                    <View style={styles.heading}>
                        <Image
                            source={require('../../assets/miyahuna.png')}
                            style={styles.headingImage}
                            resizeMode="contain"
                        />
                    </View>
                    <Text style={styles.greeting}>
                    Please fill the following to know your water turn
                    </Text>
                    <View style={styles.inputContainer}>
                        <Input
                            value={this.state.userAccount}
                            placeholder="Your Account"
                            type='userAccount'
                            onChangeText={this.onChangeText}
                        />
                        <Picker
                            selectedValue={this.state.organizationID}
                            itemStyle={styles.picker}
                            onValueChange={(organizationID) => this.setState({organizationID})}>
                            <Picker.Item label='Please select an option...' value='0' color="#1493ff" />
                            {this.props.data.map((item, index) => {
                                return (<Picker.Item label={item.name_en} value={item.id} key={index}/>) 
                            })}
                        </Picker> 
                    </View>
                    <Button
                        title='Submit'
                        onPress={this.getWaterRolesHandler.bind(this)}
                        isLoading={this.state.isAuthenticating}
                    />
                    {this.props.waterRole && (
                            <Text style={[styles.greeting,{ color: 'black' }]}>Your WAter Role is: {"\n"} {this.props.waterRole}</Text>
                    )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    inputContainer: {
        marginTop: 20
      },
      container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 40
      },
      greeting: {
        fontFamily: 'Lato-Light',
        color: '#666',
        fontSize: 24,
        marginTop: 5
      },
      heading: {
        flexDirection: 'row'
      },
      headingImage: {
        width: 38,
        height: 38
      },
      errorMessage: {
          fontFamily: 'Lato-Regular',
          fontSize: 12,
          marginTop: 10,
          color: 'transparent'
    },
    picker: {
        height: 45,
        width: 150,
        marginBottom: 15,
        borderBottomWidth: 1.5,
        fontSize: 16,
        borderBottomColor: '#1493ff',
        fontFamily: 'Lato-Light'
    }
});

export default WaterRole;