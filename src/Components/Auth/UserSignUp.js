import React from 'react';
import { StyleSheet, Image, Text, View, ScrollView} from 'react-native';
import Input from '../Styles/Input'
import Button from '../Styles/Button'
import { Navigation } from 'react-native-navigation';

class UserSignUp extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            username: '',
            email: '',
            phone: '',
            password: '',
            pass_confirm: '',
            full_name: '',
            isAuthenticating: false
        }
        this.signingUp = this.signingUp.bind(this);
        this.signingIn = this.signingIn.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
    }
    signingUp () {
        this.setState({
            isAuthenticating: !this.state.isAuthenticating
        })
        this.props.onSignup(this.state);
    }

    signingIn(){
        Navigation.push(this.props.componentId,{
            component:{
                name: 'water-app.LoginScreen'
            } 
        })
    }
    
    onChangeText = (key, value) => {
        this.setState({
          [key]: value
        })
    }

    render(){
        return (
            <ScrollView>
            <View style={styles.container}>
                    <View style={styles.heading}>
                        <Image
                            source={require('../../assets/miyahuna.png')}
                            style={styles.headingImage}
                            resizeMode="contain"
                        />
                    </View>
                    <Text style={styles.greeting}>
                    Welcome, Sign up to continue
                    </Text>
                    <View style={styles.inputContainer}>
                    <Input
                        value={this.state.full_name}
                        placeholder="Full Name"
                        type='full_name'
                        onChangeText={this.onChangeText}
                    />
                    <Input
                        value={this.state.username}
                        placeholder="User Name"
                        type='username'
                        onChangeText={this.onChangeText}
                    />
                    <Input
                        value={this.state.email}
                        placeholder="Email"
                        type='email'
                        onChangeText={this.onChangeText}
                    />
                    <Input
                        value={this.state.phone}
                        placeholder="Phone Number"
                        type='phone'
                        keyboardType='numeric'
                        onChangeText={this.onChangeText}
                    />
                    <Input
                        value={this.state.password}
                        placeholder="Password"
                        secureTextEntry
                        type='password'
                        onChangeText={this.onChangeText}
                    />
                    <Input
                        value={this.state.pass_confirm}
                        placeholder="Confirm Password"
                        secureTextEntry
                        type='pass_confirm'
                        onChangeText={this.onChangeText}
                    />
                    </View>
                    <Button
                        title='Sign Up'
                        onPress={this.signingUp.bind(this)}
                        isLoading={this.state.isAuthenticating}
                    />
                    <Button
                        title='Already a User? SignIn'
                        onPress={this.signingIn.bind(this)}
                        isLoading={this.state.isAuthenticating}
                    />
                    {this.props.errorMsg && (
                            <Text style={[styles.errorMessage,{ color: 'black' }]}>Error signing up in. Please try again.{"\n"} {this.props.errorMsg}</Text>
                    )}
            </View>
        </ScrollView>
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
  }
});

export default UserSignUp;