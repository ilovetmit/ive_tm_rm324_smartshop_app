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
            name: '',
            email: '',
            password: '',
            confirmationPassword: '',
            emailValid: true,
            passwordValid: true,
            nameValid: true,
            confirmationPasswordValid: true,
        };

        this.validateEmail = this.validateEmail.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
        this.validateConfirmationPassword = this.validateConfirmationPassword.bind(
            this
        );
        this.signup = this.signup.bind(this);
    }

    signup() {
        // const { isLoading } = this.state;
        LayoutAnimation.easeInEaseOut();
        const nameValid = this.validateName();
        const emailValid = this.validateEmail();
        const passwordValid = this.validatePassword();
        const confirmationPasswordValid = this.validateConfirmationPassword();
        if (
            emailValid &&
            passwordValid &&
            confirmationPasswordValid &&
            nameValid
        ) {
            // this.setState({isLoading: !isLoading});
            //TODO loading have bug?

            Axios.post(HOST_NAME + HOST_API_VER + "register", {
                email: this.state.email,
                password: this.state.password,
                name: this.state.name,
            })
                .then((response) => processAuth(response, this))
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


    validateName() {
        const { name } = this.state;
        const nameValid = name.length > 0;
        LayoutAnimation.easeInEaseOut();
        this.setState({ nameValid });
        nameValid || this.nameInput.shake();
        return nameValid;
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

    validateConfirmationPassword() {
        const { password, confirmationPassword } = this.state;
        const confirmationPasswordValid = password === confirmationPassword;
        LayoutAnimation.easeInEaseOut();
        this.setState({ confirmationPasswordValid });
        confirmationPasswordValid || this.confirmationPasswordInput.shake();
        return confirmationPasswordValid;
    }



    render() {
        const {
            isLoading,
            confirmationPassword,
            email,
            emailValid,
            password,
            passwordValid,
            confirmationPasswordValid,
            name,
            nameValid,
        } = this.state;

        const keyboardVerticalOffset = [!confirmationPasswordValid, !emailValid, !passwordValid, !nameValid].filter(v => v).length;

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
                                        refInput={input => (this.nameInput = input)}
                                        icon="user"
                                        value={name}
                                        onChangeText={name => this.setState({ name })}
                                        placeholder={tran.t('name')}
                                        returnKeyType="next"
                                        errorMessage={
                                            nameValid ? null : tran.t('nameValid')
                                        }
                                        onSubmitEditing={() => {
                                            this.validateName();
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
                                            this.confirmationPasswordInput.focus();
                                        }}
                                    />
                                    <FormInput
                                        refInput={input => (this.confirmationPasswordInput = input)}
                                        icon="lock"
                                        value={confirmationPassword}
                                        onChangeText={confirmationPassword =>
                                            this.setState({ confirmationPassword })
                                        }
                                        placeholder={tran.t('c_password')}
                                        secureTextEntry
                                        errorMessage={
                                            confirmationPasswordValid
                                                ? null
                                                : tran.t('confirmationPasswordValid')
                                        }
                                        returnKeyType="go"
                                        onSubmitEditing={() => {
                                            this.validateConfirmationPassword();
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
                                    onPress={this.submitLoginCredentials.bind(this)}
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

    submitLoginCredentials = async () => {
        global.HOST_NAME = HOST_NAME_LOCAL;
        const { isLoading, isQuickLoading } = this.state;
        this.setState({ isLoading: !isLoading, isQuickLoading: !isQuickLoading });

        this.setState({ emailError: false, passwordError: false });
        if (this.state.email.trim() === '') {
            this.setState({
                isLoading: false,
                isQuickLoading: false,
                email_valid: false,
            });
            return;
        }
        if (this.state.password.trim() === '') {
            this.setState({
                isLoading: false,
                isQuickLoading: false,
                password_valid: false,
            });
            return;
        }
    }




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

