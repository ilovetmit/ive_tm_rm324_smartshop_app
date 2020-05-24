import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, Dimensions, KeyboardAvoidingView, StatusBar, ScrollView, LayoutAnimation } from 'react-native';
import { Input, Button, Icon, Image } from 'react-native-elements';
import Constants from "expo-constants";
import * as Permissions from 'expo-permissions'
import Toast from 'react-native-root-toast';
import * as ImagePicker from 'expo-image-picker';
import Colors from '../../constants/Colors';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const BG_IMAGE = require('../../../assets/images/bg_second.jpg');

export default class LoginScreen extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            emailValid: true,
            passwordValid: true,
            firstNameValid: true,
            lastNameValid: true,
        };

        this.validateEmail = this.validateEmail.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
        this.signup = this.signup.bind(this);
    }

    signup() {
        // const { isLoading } = this.state;
        LayoutAnimation.easeInEaseOut();
        const FirstNameValid = this.validateFirstName();
        const LastNameValid = this.validateLastName();
        const emailValid = this.validateEmail();
        const passwordValid = this.validatePassword();
        if (
            emailValid &&
            passwordValid &&
            FirstNameValid &&
            LastNameValid
        ) {
            // this.setState({isLoading: !isLoading});
            //TODO loading have bug?

            Axios.post(HOST_NAME + HOST_API_VER + "auth/register", {
                email: this.state.email,
                password: this.state.password,
                first_name: this.state.first_name,
                last_name: this.state.last_name,
            })
                .then((response) => processAuth(response, this, HOST_NAME))
                .catch((error) => {
                    // console.log(error);
                    Toast.show(tran.t('unexpected_error'), {
                        duration: Toast.durations.SHORT,
                        position: Toast.positions.BOTTOM,
                        shadow: true,
                        animation: true,
                        hideOnPress: true,
                        delay: 0,
                    });
                    // this.setState({isLoading: false});
                });
        }
    }


    validateFirstName() {
        const { first_name } = this.state;
        const firstNameValid = first_name.length > 0;
        LayoutAnimation.easeInEaseOut();
        this.setState({ firstNameValid });
        firstNameValid || this.first_name.shake();
        return firstNameValid;
    }

    validateLastName() {
        const { last_name } = this.state;
        const lastNameValid = last_name.length > 0;
        LayoutAnimation.easeInEaseOut();
        this.setState({ lastNameValid });
        lastNameValid || this.last_name.shake();
        return lastNameValid;
    }


    validateEmail() {
        const { email } = this.state;
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const emailValid = re.test(email);
        LayoutAnimation.easeInEaseOut();
        this.setState({ emailValid });
        emailValid || this.emailInput.shake();
        return emailValid;
    }

    validatePassword() {
        const { password } = this.state;
        const passwordValid = password.length >= 6;
        LayoutAnimation.easeInEaseOut();
        this.setState({ passwordValid });
        passwordValid || this.passwordInput.shake();
        return passwordValid;
    }

    render() {
        const {
            isLoading,
            email,
            emailValid,
            password,
            passwordValid,
            first_name,
            last_name,
            firstNameValid,
            lastNameValid
        } = this.state;

        const keyboardVerticalOffset = [!emailValid, !passwordValid, !firstNameValid, lastNameValid].filter(v => v).length;

        return (
            <KeyboardAvoidingView style={styles.container} behavior="height" enabled>
                <StatusBar barStyle="dark-content" translucent={true} />
                <ScrollView scrollEnabled={false}>
                    <ImageBackground source={BG_IMAGE} style={styles.bgImage}>
                        <Text style={styles.version}>v {Constants.manifest.version}</Text>
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <View style={styles.loginView}>
                                <View style={styles.loginTitle}>
                                    <Image
                                        source={require('../../../assets/images/S-Shop_logo.png')}
                                        style={{ width: 150, height: 150, }}
                                        resizeMode={'contain'}
                                        placeholderStyle={{ opacity: 0 }}
                                    />
                                </View>
                                <View style={styles.loginInput}>
                                    <FormInput
                                        autoCapitalize="words"
                                        refInput={input => (this.first_name = input)}
                                        icon="user"
                                        value={first_name}
                                        onChangeText={first_name => this.setState({ first_name })}
                                        placeholder="First Name"
                                        returnKeyType="next"
                                        errorMessage={
                                            firstNameValid ? null : tran.t('nameValid')
                                        }
                                        onSubmitEditing={() => {
                                            this.validateFirstName();
                                            this.last_name.focus();
                                        }}
                                    />
                                    <FormInput
                                        autoCapitalize="words"
                                        refInput={input => (this.last_name = input)}
                                        icon="user"
                                        value={last_name}
                                        onChangeText={last_name => this.setState({ last_name })}
                                        placeholder="Last Name"
                                        returnKeyType="next"
                                        errorMessage={
                                            lastNameValid ? null : tran.t('nameValid')
                                        }
                                        onSubmitEditing={() => {
                                            this.validateLastName();
                                            this.emailInput.focus();
                                        }}
                                    />
                                    <FormInput
                                        refInput={input => (this.emailInput = input)}
                                        icon="envelope"
                                        value={email}
                                        onChangeText={email => this.setState({ email })}
                                        placeholder={tran.t('email')}
                                        keyboardType="email-address"
                                        returnKeyType="next"
                                        errorMessage={
                                            emailValid ? null : tran.t('emailValid')
                                        }
                                        onSubmitEditing={() => {
                                            this.validateEmail();
                                            this.passwordInput.focus();
                                        }}
                                    />
                                    <FormInput
                                        refInput={input => (this.passwordInput = input)}
                                        icon="lock"
                                        value={password}
                                        onChangeText={password => this.setState({ password })}
                                        placeholder={tran.t('password')}
                                        secureTextEntry
                                        returnKeyType="next"
                                        errorMessage={
                                            passwordValid ? null : tran.t('passwordValid')
                                        }
                                        onSubmitEditing={() => {
                                            this.validatePassword();
                                            this.signup();
                                        }}
                                    />



                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 30 }}>
                                <Button
                                    title="Sign Up"
                                    activeOpacity={1}
                                    underlayColor="transparent"
                                    onPress={this.signup.bind(this)}
                                    loadingProps={{ size: 'small', color: Colors.BlackText }}
                                    disabled={isLoading}
                                    disabledStyle={[styles.loginButton]}
                                    buttonStyle={[styles.loginButton,]}
                                    containerStyle={{ marginVertical: 10 }}
                                    titleStyle={{ fontWeight: 'bold', color: Colors.BlackText }}
                                />
                            </View>


                        </View>

                    </ImageBackground>
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }

    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                this.alert('error', 'Sorry, we need camera roll permissions to make this work!');
            }
        }
    };


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bgImage: {
        flex: 1,
        top: 0,
        left: 0,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 1,
    },
    loginView: {
        marginTop: 100,
        backgroundColor: 'transparent',
        width: 250,
        height: 400,

    },
    loginTitle: {
        marginBottom: 140,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    royalText: {
        color: Colors.BlackText,
        fontSize: 30,
        fontFamily: 'bold',
    },
    plusText: {
        color: Colors.BlackText,
        fontSize: 30,
        fontFamily: 'regular',
    },
    loginInput: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 50,
    },
    loginButton: {
        height: 40,
        width: 230,
        backgroundColor: Colors.NoticeText,
        borderWidth: 2.5,
        borderColor: Colors.BlackText,
        borderRadius: 30,
    },
    loginFace: {
        height: 50,
        width: 50,
        backgroundColor: Colors.NoticeText,
        borderWidth: 2,
        borderColor: Colors.BlackText,
        borderRadius: 30,
        marginRight: 8,
    },
    footerView: {
        marginTop: 30,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    version: {
        color: Colors.ButtonText,
        position: 'absolute',
        top: SCREEN_HEIGHT - 25,
        alignSelf: 'center',
        opacity: 0.5
    },
    topMenu: {
        backgroundColor: Colors.Primary,
    },
    bgImage: {
        flex: 1,
        top: 0,
        left: 0,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
    },

    itemList: {
        marginBottom: 10,
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderRadius: 10,
        marginHorizontal: 10,
        paddingVertical: 10,
    },
    inputContainer: {
        paddingLeft: 8,
        borderRadius: 40,
        borderWidth: 1,
        borderColor: Colors.Secondary,
        height: 45,
        marginVertical: 10,
        backgroundColor: Colors.NoticeText
    },
    inputStyle: {
        flex: 1,
        marginLeft: 10,
        color: 'black',
        fontFamily: 'UbuntuLight',
        fontSize: 16,
    },
    inputLabelStyle: {
        color: Colors.Secondary
    },
    errorInputStyle: {
        marginTop: 0,
        textAlign: 'center',
        color: '#FF7575',
    },
});

export const FormInput = props => {
    const { icon, refInput, ...otherProps } = props;
    return (
        <Input
            {...otherProps}
            ref={refInput}
            inputContainerStyle={styles.inputContainer}
            leftIcon={
                <Icon name={icon} type={'simple-line-icon'} color={Colors.Auxiliary1} size={18} />
            }
            inputStyle={styles.inputStyle}
            autoFocus={false}
            autoCapitalize="none"
            keyboardAppearance="dark"
            errorStyle={styles.errorInputStyle}
            autoCorrect={false}
            blurOnSubmit={false}
            placeholderTextColor="#B8B8B8"
            labelStyle={styles.inputLabelStyle}
        />
    );
};

