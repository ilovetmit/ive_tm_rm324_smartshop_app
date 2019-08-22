import React, { Component } from "react";
import { AsyncStorage, StyleSheet, Keyboard, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView, TouchableOpacity, Dimensions } from 'react-native';
import { Button, Text, Image } from '@shoutem/ui';

export default class LoginScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: 'a@test.com',
      password: '12345678',
    }
  }
  static navigationOptions = {
    header: null
  }


  render() {
    let { navigate } = this.props.navigation;
    const window = Dimensions.get('window')
    return (
      <KeyboardAvoidingView style={styles.containerView} behavior="padding">
        <View>
          <Image style={{ height: window.height, width: window.width, position: 'absolute' }} source={require('./assets/images/foodBackground.jpg')} />
        </View>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.loginScreenContainer}>
            <View style={styles.loginFormView}>
              <Text style={styles.logoText}>Peter Food</Text>
              <TextInput
                onChangeText={(email) => this.setState({ email })}
                value={this.state.email}
                placeholder="Email"
                placeholderColor="#c4c3cb"
                style={styles.loginFormTextInput} />
              <TextInput
                onChangeText={(password) => this.setState({ password })}
                value={this.state.password}
                placeholder="Password"
                placeholderColor="#c4c3cb"
                style={styles.loginFormTextInput}
                secureTextEntry={true} />
              <View style={styles.buttonContainer}>
                <Button styleName="horizontal" style={styles.loginButton}
                  onPress={() => this.onLoginPress()}>
                  <Text style={styles.loginText}>Login</Text>
                </Button>
                <TouchableOpacity onPress={() => navigate('QR', {})}>
                  <Text style={{ marginLeft: window.width / 2 - 85, marginTop: 30, color: "#6495ed" }}>Login with QR code</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigate('Register', {})}>
                  <Text style={{ marginLeft: window.width/2 - 85, marginTop: 30, color:"#6495ed"}}>Sign Up</Text>
                </TouchableOpacity>
              </View>
              
            </View>
            
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }

  componentDidMount() {
  }

  componentWillUnmount() {

  }

  onLoginPress() {
    fetch('https://ss.anchorlab.it/api/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === 'SUCCESS') {
          this.setToken(responseJson.token);
          this.props.navigation.navigate('Main', {});
        } else {
          alert(responseJson.msg)
        }
      })
      .catch((error) => {
        alert(error)
      })
      .done();
  }

  setToken = async (token) => {
    await AsyncStorage.setItem('apiToken', token);
  };

}



const styles = StyleSheet.create({
  containerView: {
    flex: 1,
  },
  loginScreenContainer: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  logoText: {
    fontSize: 40,
    fontWeight: "800",
    marginTop: 150,
    marginBottom: 30,
    textAlign: 'center',
  },
  loginFormView: {
    flex: 1
  },
  loginFormTextInput: {
    height: 43,
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: '#fafafa',
    paddingLeft: 10,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    marginBottom: 5,

  },
  loginButton: {
    marginTop: 20,
    backgroundColor: '#3897f1',
    borderColor: 'transparent',
    borderRadius:10,
  },
  loginText: {
    color: '#FFF',
    fontSize: 16,
  },
  buttonContainer:{
    flex: 1,
    paddingLeft: 50,
    paddingRight: 50,
    backgroundColor: 'transparent'
  }
});