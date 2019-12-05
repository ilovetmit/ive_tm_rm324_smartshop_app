import React, { Component } from 'react';
import {StyleSheet,Text,View,ImageBackground,Dimensions,KeyboardAvoidingView, StatusBar,ScrollView} from 'react-native';
import { Input, Button, Icon,Image } from 'react-native-elements';
import Constants from "expo-constants";
import * as Permissions from 'expo-permissions'
import Toast from 'react-native-root-toast';
import * as ImagePicker from 'expo-image-picker';
import Colors from '../../constants/Colors';
import { Chevron } from 'react-native-shapes';
import RNPickerSelect from "react-native-picker-select";
import Axios from "axios";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const BG_IMAGE = require('../../../assets/images/bg_login.jpg');

export default class LoginScreen extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.user_list = [];
        this.state = {
            email: 'User List Loading...',
            email_valid: true,
            password: 'ilovetmit',
            password_valid: true,
            login_failed: false,
            isLoading: false,
            isCloudLoading: false,
            isQuickLoading: false,
            isFaceLoading: false,
            pickStart : false,
            source:undefined,
        };
    }

    validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return re.test(email);
    }

    submitLoginCloudCredentials = async () => {
        global.HOST_NAME = HOST_NAME_CLOUD;
        const { isLoading,isCloudLoading } = this.state;
        this.setState({isLoading: !isLoading,isCloudLoading:!isCloudLoading});
        this.setState({ emailError: false, passwordError: false });
        await Axios.post(HOST_NAME+HOST_API_VER+"login", {
            email: this.state.email,
            password: this.state.password
        })
            .then((response) => processAuth(response, this,HOST_NAME))
            .catch((error) => {
                this.setState({isLoading: false,isCloudLoading:false});
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

    submitLoginCredentials = async () => {
        global.HOST_NAME = HOST_NAME_LOCAL;
        const { isLoading,isQuickLoading } = this.state;
        this.setState({isLoading: !isLoading,isQuickLoading:!isQuickLoading});

        this.setState({ emailError: false, passwordError: false });

        await Axios.post(HOST_NAME+HOST_API_VER+"login", {
            email: this.state.email,
            password: this.state.password
        },{
            timeout: 2500,
        })
            .then((response) => processAuth(response, this,HOST_NAME))
            .catch((error) => {
                this.setState({isLoading: false,isQuickLoading:false});
                // console.log(error);
                Toast.show('Please connect S-SHOP WiFi' , {
                    duration: Toast.durations.SHORT,
                    position: Toast.positions.CENTER,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                    delay: 0,
                });
            });
    };

    componentDidMount() {
        this.getData();
    }

    render() {
        const { email, password, email_valid, isLoading, isCloudLoading,isQuickLoading,isFaceLoading,password_valid } = this.state;

        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <StatusBar barStyle="dark-content" translucent={true} />
                <ScrollView scrollEnabled={false}>
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
                            <RNPickerSelect
                                placeholder={{}}
                                items={this.user_list}
                                onValueChange={email => this.setState({ email })}
                                style={{
                                    ...pickerSelectStyles,
                                    iconContainer: {
                                        top: 18,
                                        right: 20,
                                    },
                                }}
                                disabled={isLoading}
                                value={this.state.email}
                                useNativeAndroidPickerStyle={false}
                                textInputProps={{ underlineColor: 'yellow' }}
                                Icon={() => {
                                    return <Chevron size={1.5} color="gray" />;
                                }}
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
                            <Button
                                title={'Standard Account'}
                                icon={
                                    <Icon
                                        name="cube-outline"
                                        // size={15}
                                        color={isLoading?Colors.LoadingText:Colors.BlackText}
                                        type={'material-community'}
                                        containerStyle={{ marginRight: 5,marginTop:2 }}
                                    />
                                }
                                activeOpacity={1}
                                underlayColor="transparent"
                                onPress={() => this.props.navigation.navigate('Login')}
                                // loading={isLoading}
                                // loadingProps={{ size: 'small', color: Colors.BlackText }}
                                // disabled={isLoading}
                                // disabledStyle={[styles.loginButton,{width:260}]}
                                buttonStyle={[styles.loginButton,{width:260}]}
                                containerStyle={{ }}
                                titleStyle={{ fontWeight: 'bold', color: Colors.BlackText }}
                            />

                            {isLoading?<View/>:
                                <View style={{flexDirection:'row',alignItems: 'center',justifyContent:'center'}}>
                                    {/*<Text style={{ color: Colors.ButtonText }}>Developer tools</Text>*/}
                                    <Button
                                        title='Login via Cloud Server'
                                        type="clear"
                                        activeOpacity={0.5}
                                        titleStyle={{ color: Colors.LoadingText, fontSize: 15 }}
                                        // containerStyle={{ marginTop: -10 }}
                                        onPress={this.submitLoginCloudCredentials.bind(this)}
                                    />
                                </View>
                            }

                        </View>

                    </ImageBackground>
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }

    getData = async () => {
        let list_done = false;
        this.setState({
            isLoading: true,
        });
        await Axios.get(HOST_NAME_LOCAL+HOST_API_VER+"user/list",{
            timeout: 2000,
        })
            .then((response) => {
                if (response.status === 200 && list_done === false) {
                    list_done = true;
                    this.user_list=[];
                    var users = response.data.data;
                    for(var i=0;i<users.length;++i){
                        this.user_list.push({
                            label: users[i].email,
                            value: users[i].email,
                        });
                    }
                    this.setState({
                        email:this.user_list[0],
                        isLoading: false,
                    })
                    console.log("local");
                }
            })
            .catch((error) => {
                console.log(error)
            });

        await Axios.get(HOST_NAME_CLOUD+HOST_API_VER+"user/list")
            .then((response) => {
                if (response.status === 200 && list_done === false) {
                    list_done = true;
                    this.user_list=[];
                    var users = response.data.data;
                    for(var i=0;i<users.length;++i){
                        this.user_list.push({
                            label: users[i].email,
                            value: users[i].email,
                        });
                    }
                    this.setState({
                        email:this.user_list[0],
                        isLoading: false,
                    })
                    console.log("cloud");
                }
            })
            .catch((error) => {
                console.log(error)
            });
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
    loginButton:{
        height: 50,
        width: 260,
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

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        height: 45,
        width: 260,
        // margin: 10,
        marginBottom: 20,
        fontSize: 16,
        paddingLeft: 20,
        borderWidth: 2,
        borderColor: Colors.Secondary,
        borderRadius: 20,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        height: 45,
        width: 260,
        // margin: 10,
        marginBottom: 20,
        fontSize: 16,
        paddingLeft: 20,
        borderWidth: 2,
        borderColor: Colors.Secondary,
        borderRadius: 40,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});