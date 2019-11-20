import React, { Component } from 'react';
import {StyleSheet,Text,View,ImageBackground,Dimensions,KeyboardAvoidingView, StatusBar,} from 'react-native';
import { Input, Button, Icon,Image } from 'react-native-elements';
import Constants from "expo-constants";
import * as Permissions from 'expo-permissions'
import Toast from 'react-native-root-toast';
import * as ImagePicker from 'expo-image-picker';
import Colors from '../../constants/Colors';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const BG_IMAGE = require('../../../assets/images/bg_login.jpg');

export default class LoginScreen extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);

        this.state = {
            email: 'a@test.com',
            email_valid: true,
            password: '12345678',
            password_valid: true,
            login_failed: false,
            isLoading: false,
            pickStart : false,
            source:undefined,
        };
    }

    validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return re.test(email);
    }

    submitLoginCredentials = async () => {
        const { isLoading } = this.state;
        this.setState({isLoading: !isLoading});

        this.setState({ emailError: false, passwordError: false });
        if (this.state.email.trim() === '') {
            this.setState({
                isLoading: false,
                email_valid: false,
            });
            return;
        }
        if (this.state.password.trim() === '') {
            this.setState({
                isLoading: false,
                password_valid: false,
            });
            return;
        }

        await Axios.post(HOST_NAME+HOST_API_VER+"login", {
            email: this.state.email,
            password: this.state.password
        })
            .then((response) => processAuth(response, this))
            .catch((error) => {
                this.setState({isLoading: false});
                // console.log(error);
                Toast.show(tran.t('unexpected_error'), {
                    duration: Toast.durations.SHORT,
                    position: Toast.positions.CENTER,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                    delay: 0,
                });
            });
    };

    // TODO update forgot password function
    render() {
        const { email, password, email_valid, isLoading, password_valid } = this.state;

        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <StatusBar barStyle="dark-content" translucent={true} />
                <ImageBackground source={BG_IMAGE} style={styles.bgImage}>
                    <Text style={styles.version}>v {Constants.manifest.version}</Text>
                    <View style={styles.loginView}>
                        <View style={styles.loginTitle}>
                            <Image
                                source={require('../../../assets/images/S-Shop_logo.png')}
                                style={{ width: 200, height: 200, }}
                                resizeMode={'contain'}
                                placeholderStyle={{opacity:0}}
                            />
                        </View>
                        <View style={styles.loginInput}>
                            <Input
                                leftIcon={
                                    <Icon
                                        name="email"
                                        type="zocial"
                                        color={Colors.BlackText}
                                        size={25}
                                    />
                                }
                                containerStyle={{ marginVertical: 10 }}
                                onChangeText={email => this.setState({ email })}
                                value={email}
                                inputStyle={{ marginLeft: 10, color: Colors.BlackText }}
                                keyboardAppearance="light"
                                placeholder={tran.t('email')}
                                autoFocus={false}
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="email-address"
                                returnKeyType="next"
                                ref={input => (this.emailInput = input)}
                                onSubmitEditing={() => {
                                    this.setState({ email_valid: this.validateEmail(email) });
                                    this.passwordInput.focus();
                                }}
                                blurOnSubmit={false}
                                placeholderTextColor={Colors.BlackText}
                                errorStyle={{ textAlign: 'center', fontSize: 12 }}
                                errorMessage={
                                    email_valid ? null : tran.t('email_valid')
                                }
                            />
                            <Input
                                leftIcon={
                                    <Icon
                                        name="lock"
                                        type="font-awesome"
                                        color={Colors.BlackText}
                                        size={25}
                                        containerStyle={{paddingHorizontal:5}}
                                    />
                                }
                                containerStyle={{ marginVertical: 10 }}
                                onChangeText={password => this.setState({ password })}
                                value={password}
                                inputStyle={{ marginLeft: 10, color: Colors.BlackText }}
                                secureTextEntry={true}
                                keyboardAppearance="light"
                                placeholder={tran.t('password')}
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="default"
                                returnKeyType="done"
                                ref={input => (this.passwordInput = input)}
                                blurOnSubmit={true}
                                placeholderTextColor="white"
                                errorStyle={{ textAlign: 'center', fontSize: 12 }}
                                errorMessage={
                                    password_valid ? null : tran.t('password_valid')
                                }
                            />
                        </View>
                        <View style={{flexDirection:'row',alignItems: 'center',justifyContent:'space-between'}}>
                            <Button
                                icon={
                                    <Icon
                                        name="face-recognition"
                                        type="material-community"
                                        size={25}
                                        color={Colors.BlackText}
                                    />
                                }
                                onPress={() => {this._takeImage()}}
                                loading={isLoading}
                                loadingProps={{ size: 'small', color: Colors.BlackText }}
                                disabled={isLoading}
                                disabledStyle={styles.loginFace}
                                buttonStyle={styles.loginFace}
                                containerStyle={{ marginVertical: 10 }}
                            />
                            <Button
                                title={tran.t('login')}
                                activeOpacity={1}
                                underlayColor="transparent"
                                onPress={this.submitLoginCredentials.bind(this)}
                                loading={isLoading}
                                loadingProps={{ size: 'small', color: Colors.BlackText }}
                                disabled={isLoading}
                                disabledStyle={styles.loginButton}
                                buttonStyle={styles.loginButton}
                                containerStyle={{ marginVertical: 10 }}
                                titleStyle={{ fontWeight: 'bold', color: Colors.BlackText }}
                            />
                        </View>

                        {/*<View style={styles.footerView}>*/}
                        {/*    <Text style={{ color: 'grey' }}>{tran.t('new_here')}</Text>*/}
                        {/*    <Button*/}
                        {/*        title={tran.t('create_account')}*/}
                        {/*        type="clear"*/}
                        {/*        activeOpacity={0.5}*/}
                        {/*        titleStyle={{ color: 'white', fontSize: 15 }}*/}
                        {/*        containerStyle={{ marginTop: -10 }}*/}
                        {/*        onPress={() => this.props.navigation.navigate('Register')}*/}
                        {/*    />*/}
                        {/*</View>*/}
                    </View>
                </ImageBackground>
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

    _takeImage = async () => {
        await this.getPermissionAsync();
        this.setState({pickStart:true});
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            // aspect: [4, 3],
            // base64: true,
            quality: 0,
        });

        // console.log(result);

        if (!result.cancelled) {
            this.setState({ source: result.uri, pickStart:false, });
            this.face_login();
        }else{
            this.setState({
                pickStart:false,
                source: undefined,
                isLoading: false,
            });
            // console.log("break take image");
        }
    };

    face_login = async()=>{
        this.setState({
            isLoading: true,
        });
        let formData = new FormData();
        formData.append("Image",{uri:this.state.source,name:'photo.jpeg',type:'image/jpeg'});
        await Axios.post(HOST_NAME+HOST_API_VER+"face", formData,{
            timeout:60000
        })
            .then((response) => {
                this.setState({isLoading: false});
                processAuth(response, this);
            })
            .catch((error) => {
                this.setState({isLoading: false});
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
    loginButton:{
        height: 50,
        width: 200,
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: Colors.BlackText,
        borderRadius: 30,
    },
    loginFace:{
        height: 50,
        width: 50,
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: Colors.BlackText,
        borderRadius: 30,
        marginRight:8,
    },
    footerView: {
        marginTop: 30,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    version:{
        color: Colors.ButtonText,
        position: 'absolute',
        top:SCREEN_HEIGHT-25,
        alignSelf: 'center',
        opacity:0.5
    },
});
