import React, { Component } from "react";
import { AsyncStorage, Dimensions, StyleSheet, Keyboard, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { Button, Text, Image } from '@shoutem/ui';

export default class RegisterScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: '',
            password: '',
            confirm_password: "",

        }
    }
    static navigationOptions = {
        header: null
    }

    valid() {
        if (this.state.password != this.state.confirm_password) {
            alert("The two password fields didn't match")
        } else if (this.state.name == "" ||
            this.state.email == "" ||
            this.state.password == "" ||
            this.state.confirm_password == ""
        ) {
            alert("Please input all the field")
        } else {
            this.register();
        }
    }
    register() {
        fetch('https://ss.anchorlab.it/api/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                

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
                alert('Login Fail, Please Try Again')
            })
            .done();

    }


    render() {
        const window = Dimensions.get('window')
        return (
            <KeyboardAvoidingView style={styles.containerView} behavior="padding">
                <View>
                    <Image style={{ height: window.height, width: window.width, position: 'absolute' }} source={require('./assets/images/registerBackground.jpg')} />
                </View>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.loginScreenContainer}>
                        <View style={styles.loginFormView}>
                            <Text style={styles.logoText}>Peter Food</Text>
                            <TextInput
                                onChangeText={(name) => this.setState({ name })}
                                value={this.state.name}
                                placeholder="Your Name"
                                placeholderColor="#c4c3cb"
                                style={styles.loginFormTextInput} />
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
                            <TextInput
                                onChangeText={(confirm_password) => this.setState({ confirm_password })}
                                value={this.state.confirm_password}
                                placeholder="Confirm Password"
                                placeholderColor="#c4c3cb"
                                style={styles.loginFormTextInput} />
                            <View style={styles.buttonContainer}>
                                <Button styleName="horizontal" style={styles.loginButton}
                                    onPress={() => this.valid()}>
                                    <Text style={styles.loginText}>Register</Text>
                                </Button>
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
        color: "#ff8c00"
    },
    loginFormView: {
        flex: 1
    },
    loginFormTextInput: {
        color: "#FFF",
        height: 43,
        fontSize: 14,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#eaeaea',
        backgroundColor: 'transparent',
        paddingLeft: 10,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 5,
        marginBottom: 5,

    },
    loginButton: {
        marginTop: 20,
        backgroundColor: 'transparent',
        borderRadius: 10,

    },
    loginText: {
        color: '#FFF',
        fontSize: 16,
    },
    buttonContainer: {
        flex: 1,
        paddingLeft: 100,
        paddingRight: 100,
        backgroundColor: 'transparent'
    }
});