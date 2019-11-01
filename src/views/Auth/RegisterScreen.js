import React, { Component } from 'react';
import {Alert,LayoutAnimation,TouchableOpacity,Dimensions,Image,UIManager,KeyboardAvoidingView,StyleSheet,ScrollView,Text,View,} from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import Toast from 'react-native-root-toast';

// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental &&
UIManager.setLayoutAnimationEnabledExperimental(true);

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class LoginScreen3 extends Component {

    static navigationOptions = {
        headerTintColor: '#FFFFFF',
        headerStyle: {
            backgroundColor: '#7B31A1',
        },
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

            Axios.post(HOST_NAME+"register", {
                email:this.state.email,
                password:this.state.password,
                name:this.state.name,
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

        const keyboardVerticalOffset = [!confirmationPasswordValid,!emailValid,!passwordValid,!nameValid].filter(v => v).length;

        return (
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={styles.container}
                style={{backgroundColor: '#4F0B72',}}
            >
                <KeyboardAvoidingView
                    behavior="position" enabled
                    contentContainerStyle={styles.formContainer}
                    keyboardVerticalOffset={-60+(keyboardVerticalOffset*(-15))}
                >
                    <Text style={styles.signUpText}>{tran.t('sign_up')}</Text>
                    <View style={{ width: '100%', alignItems: 'center' }}>
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
                    <Button
                        // loading={isLoading}
                        // loadingProps={{ size: 'small', color: 'white' }}
                        title={tran.t('sign_up')}
                        containerStyle={{ flex: -1 }}
                        buttonStyle={styles.signUpButton}
                        linearGradientProps={{
                            colors: ['#691594', '#924EB4'],
                            start: [1, 0],
                            end: [0.2, 0],
                        }}
                        titleStyle={styles.signUpButtonText}
                        onPress={this.signup}
                        // disabled={isLoading}
                        disabledStyle={styles.signUpButton}
                    />
                </KeyboardAvoidingView>
                <View style={styles.loginHereContainer}>
                    <Text style={styles.alreadyAccountText}>
                        {tran.t('alreadyAccountText')}
                    </Text>
                    <Button
                        title={tran.t('login_here')}
                        titleStyle={styles.loginHereText}
                        containerStyle={{ flex: -1 }}
                        buttonStyle={{ backgroundColor: 'transparent' }}
                        underlayColor="transparent"
                        onPress={() => this.props.navigation.navigate('Login')}
                    />
                </View>
            </ScrollView>
        );
    }
}

export const UserTypeItem = props => {
    const { image, label, labelColor, selected, ...attributes } = props;
    return (
        <TouchableOpacity {...attributes}>
            <View
                style={[
                    styles.userTypeItemContainer,
                    selected && styles.userTypeItemContainerSelected,
                ]}
            >
                <Text style={[styles.userTypeLabel, { color: labelColor }]}>
                    {label}
                </Text>
                <Image
                    source={image}
                    style={[
                        styles.userTypeMugshot,
                        selected && styles.userTypeMugshotSelected,
                    ]}
                />
            </View>
        </TouchableOpacity>
    );
};

export const FormInput = props => {
    const { icon, refInput, ...otherProps } = props;
    return (
        <Input
            {...otherProps}
            ref={refInput}
            inputContainerStyle={styles.inputContainer}
            leftIcon={
                <Icon name={icon} type={'simple-line-icon'} color="#B27ACF" size={18} />
            }
            inputStyle={styles.inputStyle}
            autoFocus={false}
            autoCapitalize="none"
            keyboardAppearance="dark"
            errorStyle={styles.errorInputStyle}
            autoCorrect={false}
            blurOnSubmit={false}
            placeholderTextColor="#B27ACF"
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingBottom: 20,
        paddingTop: 20,
        backgroundColor: '#4F0B72',
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    formContainer: {
        backgroundColor: '#4F0B72',
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    signUpText: {
        color: 'white',
        fontSize: 28,
        fontFamily: 'UbuntuLight',
    },
    whoAreYouText: {
        color: '#B27ACF',
        fontFamily: 'UbuntuBold',
        fontSize: 14,
    },
    userTypesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: SCREEN_WIDTH,
        alignItems: 'center',
    },
    userTypeItemContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.5,
    },
    userTypeItemContainerSelected: {
        opacity: 1,
    },
    userTypeMugshot: {
        margin: 4,
        height: 70,
        width: 70,
    },
    userTypeMugshotSelected: {
        height: 100,
        width: 100,
    },
    userTypeLabel: {
        color: 'yellow',
        fontFamily: 'UbuntuBold',
        fontSize: 11,
    },
    inputContainer: {
        paddingLeft: 8,
        borderRadius: 40,
        borderWidth: 1,
        borderColor: 'rgba(178, 122, 207, 1)',
        height: 45,
        marginVertical: 10,
    },
    inputStyle: {
        flex: 1,
        marginLeft: 10,
        color: 'white',
        fontFamily: 'UbuntuLight',
        fontSize: 16,
    },
    errorInputStyle: {
        marginTop: 0,
        textAlign: 'center',
        color: '#FF7575',
    },
    signUpButtonText: {
        fontFamily: 'UbuntuBold',
        fontSize: 13,
    },
    signUpButton: {
        width: 250,
        borderRadius: Math.round(45 / 2),
        height: 45,
    },
    loginHereContainer: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    alreadyAccountText: {
        fontFamily: 'UbuntuLightItalic',
        fontSize: 12,
        color: 'white',
    },
    loginHereText: {
        color: '#B27ACF',
        fontFamily: 'UbuntuLightItalic',
        fontSize: 12,
    },
});
