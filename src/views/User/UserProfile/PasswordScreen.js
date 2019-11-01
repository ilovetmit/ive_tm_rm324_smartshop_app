import React, { Component } from 'react';
import {StyleSheet,Text,View,ImageBackground,Dimensions,LayoutAnimation,AsyncStorage,Alert} from 'react-native';
import {Input, Button, Icon, Header} from 'react-native-elements';
import {RectButton} from "react-native-gesture-handler";
import Axios from "axios";
import {NavigationActions, StackActions} from "react-navigation";
import Toast from 'react-native-root-toast';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const BG_IMAGE = require('../../../../assets/images/bg_second.jpg');

export default class PasswordScreen extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.init();
    }

    init() {
        this.state = {
            password_current: "",
            password: "",
            password_confirmed: "",
            passwordValid: true,
            passwordCurrentValid: true,
            passwordConfirmedValid: true,
        }
    }

    validateCurrentPassword() {
        const { password_current } = this.state;
        const passwordCurrentValid = password_current.length > 0;
        LayoutAnimation.easeInEaseOut();
        this.setState({ passwordCurrentValid });
        passwordCurrentValid || this.passwordCurrentInput.shake();
        return passwordCurrentValid;
    }

    validatePassword() {
        const { password } = this.state;
        const passwordValid = password.length >= 6;
        LayoutAnimation.easeInEaseOut();
        this.setState({ passwordValid });
        passwordValid || this.passwordInput.shake();
        return passwordValid;
    }

    validateConfirmedPassword() {
        const { password_confirmed,password } = this.state;
        const passwordConfirmedValid = password_confirmed===password;
        LayoutAnimation.easeInEaseOut();
        this.setState({ passwordConfirmedValid });
        passwordConfirmedValid || this.passwordConfirmedInput.shake();
        return passwordConfirmedValid;
    }


    updateData() {
        LayoutAnimation.easeInEaseOut();
        const passwordValid = this.validatePassword();
        const passwordCurrentValid = this.validateCurrentPassword();
        const passwordConfirmedValid = this.validateConfirmedPassword();
        if (passwordValid && passwordCurrentValid && passwordConfirmedValid) {
            Axios.post(HOST_NAME+"user/password", {
                password_current:this.state.password_current,
                password:this.state.password,
            })
                .then((response) => {
                    if (response.status === 200) {
                        // console.log(response);
                        this._signOutAsync();
                    } else if (response.status === 217) {
                        Alert.alert(tran.t('error'), tran.t('msg_current_password_wrong'));
                        this.passwordCurrentInput.shake();
                    } else{
                        Alert.alert(tran.t('error'), response.data.message);
                    }
                })
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
                });
        }
    }

    _signOutAsync = async () => {
        // TODO Notifications token
        // try{
        //     const token = await Notifications.getExpoPushTokenAsync();
        //     Axios.post(HOST_NAME + 'modify-token-user', {
        //         expo_token: token,
        //         type: 0
        //     });
        // }catch (e) {
        //
        // }
        Toast.show(tran.t('msg_change_password'), {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
        });
        delete Axios.defaults.headers.common['Authorization'];
        await AsyncStorage.clear();
        this.props.navigation.navigate('Login');
    };

    render() {
        const {
            passwordCurrentValid,
            passwordValid,
            passwordConfirmedValid,
        } = this.state;

        return (

            <View style={styles.content}>
                <ImageBackground source={BG_IMAGE} style={styles.bgImage}>
                    <View style={styles.header}>
                        <Icon
                            name="chevron-left"
                            type="feather"
                            color="#fff"
                            size={40}
                            onPress={() => this.props.navigation.goBack()}
                            underlayColor={'transparent'}
                            style={{padding:10}}
                        />
                        <Text style={styles.headerTitle}>{tran.t('change_password_header')}</Text>
                        <Button
                            title={tran.t('save')}
                            type="clear"
                            titleStyle={{color:'#FFF'}}
                            onPress={() => this.updateData()}
                        />
                    </View>
                    <View style={styles.itemList}>
                        <FormInput
                            label={tran.t('current_password')}
                            refInput={input => (this.passwordCurrentInput = input)}
                            icon="lock"
                            value={this.state.password_current}
                            onChangeText={password_current => this.setState({ password_current })}
                            placeholder={tran.t('current_password')}
                            placeholderTextColor={"#000"}
                            secureTextEntry
                            returnKeyType="next"
                            errorMessage={
                                passwordCurrentValid ? null : tran.t('passwordCurrentValid')
                            }
                            onSubmitEditing={() => {
                                this.validateCurrentPassword();
                                this.passwordInput.focus();
                            }}
                        />
                        <FormInput
                            label={tran.t('new_password')}
                            refInput={input => (this.passwordInput = input)}
                            icon="lock"
                            value={this.state.password}
                            onChangeText={password => this.setState({ password })}
                            placeholder={tran.t('new_password')}
                            secureTextEntry
                            placeholderTextColor={"#000"}
                            returnKeyType="next"
                            errorMessage={
                                passwordValid ? null : tran.t('passwordValid')
                            }
                            onSubmitEditing={() => {
                                this.validatePassword();
                                this.passwordConfirmedInput.focus();
                            }}
                        />
                        <FormInput
                            label={tran.t('confirm_password')}
                            refInput={input => (this.passwordConfirmedInput = input)}
                            icon="lock"
                            value={this.state.password_confirmed}
                            onChangeText={password_confirmed => this.setState({ password_confirmed })}
                            placeholder={tran.t('confirm_password')}
                            secureTextEntry
                            placeholderTextColor={"#000"}
                            returnKeyType="next"
                            errorMessage={
                                passwordConfirmedValid ? null : tran.t('passwordConfirmedValid')
                            }
                            onSubmitEditing={() => {
                                this.validatePassword();
                                this.updateData();
                            }}
                        />
                    </View>
                </ImageBackground>
            </View>

        );

    }
}

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
            placeholderTextColor="#691594"
            labelStyle={styles.inputLabelStyle}
        />
    );
};

const styles = StyleSheet.create({
    content:{
        flex: 1,
    },
    topMenu:{
        backgroundColor:'#4F0B72',
    },
    bgImage: {
        flex: 1,
        top: 0,
        left: 0,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
    },
    header: {
        justifyContent:'space-between',
        alignItems: 'center',
        flexDirection:'row',
        backgroundColor: 'transparent',
        marginTop:25,
        padding: 10,
    },
    headerTitle:{
        color: 'white',
        fontSize: 20,
        fontFamily: 'bold',
    },
    itemList:{
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
        borderColor: '#691594',
        height: 45,
        marginVertical: 10,
    },
    inputStyle: {
        flex: 1,
        marginLeft: 10,
        color: 'black',
        fontFamily: 'UbuntuLight',
        fontSize: 16,
    },
    inputLabelStyle:{
        color:'#691594'
    },
    errorInputStyle: {
        marginTop: 0,
        textAlign: 'center',
        color: '#FF7575',
    },
});
