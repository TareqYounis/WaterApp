import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import Input from '../Styles/Input'
import Button from '../Styles/Button'

class UserLogin extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username : '',
            password: ''
        }
        this.loggingIn = this.loggingIn.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
    }
   
    onChangeText = (key, value) => {
        this.setState({
          [key]: value
        })
    }

    loggingIn (){
        this.props.onLoggingIn(this.state);
    }

    render(){
        return(
            <View>
                    <View style={styles.heading}>
                        <Image
                            source={require('../../assets/miyahuna.png')}
                            style={styles.headingImage}
                            resizeMode="contain"
                        />
                    </View>
                    <Text style={styles.greeting}>
                    Welcome again, Sign In to continue
                    </Text>
                    <View style={styles.inputContainer}>
                        <Input
                            value={this.state.username}
                            placeholder="User Name"
                            type='username'
                            onChangeText={this.onChangeText}
                        />
                        <Input
                            value={this.state.password}
                            placeholder="Password"
                            secureTextEntry
                            type='password'
                            onChangeText={this.onChangeText}
                        />
                    </View>
                    <Button
                        title='LogIn'
                        onPress={this.loggingIn.bind(this)}
                        isLoading={this.state.isAuthenticating}
                    />
                    {this.props.loginFailMsg && (
                            <Text style={[styles.errorMessage,{ color: 'black' }]}>Error signing in in. Please try again.{"\n"} {this.props.loginFailMsg}</Text>
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
      fontFamily: fonts.light,
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
        fontFamily: fonts.base,
        fontSize: 12,
        marginTop: 10,
        color: 'transparent'
  }
});
export default UserLogin;