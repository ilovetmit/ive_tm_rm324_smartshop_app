import React, { Component } from 'react';
import {StyleSheet, Text, View, ImageBackground, Dimensions, AsyncStorage, ScrollView, StatusBar} from 'react-native';
import {Input, Button, Icon, Header, ListItem, Avatar} from 'react-native-elements';
import {RectButton} from "react-native-gesture-handler";
import Axios from "axios";
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions'
import Toast from 'react-native-root-toast';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const BG_IMAGE = require('../../../assets/images/bg_second.jpg');

export default class UserScreen extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.init();
    }

    init() {
        this.state = {
            id: this.props.navigation.getParam("id"),
            email: this.props.navigation.getParam("email"),
            name: this.props.navigation.getParam("name"),
            balance: this.props.navigation.getParam("balance"),
            avatar: null,
        }
    }

    componentWillMount() {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', () => {
            this.getData();
        });
    }

    render() {

        return (
            <View style={styles.content}>
                <StatusBar barStyle="light-content" translucent={true} />
                <ImageBackground source={BG_IMAGE} style={styles.bgImage}>
                    <View style={styles.header}>
                        <Icon
                            name="chevron-left"
                            type="feather"
                            color="#fff"
                            size={40}
                            onPress={() =>this.props.navigation.goBack()}
                            underlayColor={'transparent'}
                            style={{padding:10}}
                        />
                        <Text style={styles.headerTitle}>{tran.t('account_header')}</Text>
                        <Icon
                            name="options"
                            type="simple-line-icon"
                            color="rgba(255,255,255,0)" // hide logo
                            size= {30}
                            // onPress={() =>alert('In Developing...')}
                            underlayColor={'transparent'}
                            style={{padding:10}}
                        />
                    </View>
                    <ScrollView>
                        <View style={{alignItems: 'center', marginBottom:10}}>
                            <Avatar
                                rounded
                                source={{ uri: HOST_NAME+this.state.avatar }}
                                title={this.state.name.substring(0,1).toUpperCase()+this.state.name.substring(1,2).toUpperCase()}
                                size="xlarge"
                                placeholderStyle={{backgroundColor: '#B27ACF'}}
                                overlayContainerStyle={{backgroundColor: '#B27ACF'}}
                                onPress={()=>this._pickImage()}
                                showEditButton />
                        </View>
                        <View style={styles.itemList}>
                            <RectButton
                                style={styles.itemButton}
                                // onPress={() => this.props.navigation.navigate('Email')}
                            >
                                <Text style={styles.itemButtonText}>{tran.t('email')}</Text>
                                <View style={{ flexDirection: 'row',alignItems: 'center',}}>
                                    <Text style={styles.itemButtonContent} numberOfLines={1}>{this.state.email}</Text>
                                </View>
                            </RectButton>
                            <RectButton
                                style={styles.itemButton}
                                onPress={() => this.props.navigation.navigate('Name',{
                                    name: this.state.name,
                                })}
                            >
                                <Text style={styles.itemButtonText}>{tran.t('en_name')}</Text>
                                <View style={{ flexDirection: 'row',alignItems: 'center',}}>
                                    <Text style={styles.itemButtonContent} numberOfLines={1}>{this.state.name===" "?tran.t('unfilled'):this.state.name.length > 15 ?this.state.name.substr(0,15)+"...":this.state.name }</Text>
                                    <Icon
                                        name="right"
                                        type="antdesign"
                                        color="#924EB4"
                                        size={20}
                                        underlayColor={'transparent'}
                                        // style={{marginRight:20}}
                                    />
                                </View>
                            </RectButton>
                        </View>
                        <View style={styles.itemList}>
                            <RectButton
                                style={styles.itemButton}
                                onPress={() => this.props.navigation.navigate('Password')}
                            >
                                <Text style={styles.itemButtonText}>{tran.t('change_password')}</Text>
                                <View style={{ flexDirection: 'row',alignItems: 'center',}}>
                                    <View style={{ flexDirection: 'row',alignItems: 'center',}}>
                                        <Icon
                                            name="right"
                                            type="antdesign"
                                            color="#924EB4"
                                            size={20}
                                            underlayColor={'transparent'}
                                            // style={{marginRight:20}}
                                        />
                                    </View>
                                </View>
                            </RectButton>
                        </View>
                    </ScrollView>
                </ImageBackground>
            </View>

        );
    }

    _pickImage = async () => {
        await this.getPermissionAsync();

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            // quality: 0,
            allowsEditing: true
        });

        if (!result.cancelled) {
            this.setState({
                avatar: result.uri
            });
            this.update_avatar();
        }
    };

    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                this.alert('error', 'Sorry, we need camera roll permissions to make this work!');
            }
        }
    };

    update_avatar = async () => {
        let formData = new FormData();
        formData.append("url",{uri:this.state.avatar,name:'photo.jpeg',type:'image/jpeg'});
        await Axios.post(HOST_NAME+HOST_API_VER+"user/avatar",formData)
            .then((response) => {
                if (response.status === 200) {
                    Toast.show(tran.t('update_success'), {
                        duration: Toast.durations.SHORT,
                        position: Toast.positions.BOTTOM,
                        shadow: true,
                        animation: true,
                        hideOnPress: true,
                        delay: 0,
                    });
                }else{
                    Toast.show(response.data.message), {
                        duration: Toast.durations.SHORT,
                        position: Toast.positions.BOTTOM,
                        shadow: true,
                        animation: true,
                        hideOnPress: true,
                        delay: 0,
                    };
                }
            })
            .catch((error) => {

            });

    };

    getData = async () => {
        await Axios.get(HOST_NAME+HOST_API_VER + 'user/profile')
            .then((response) => {
                console.log(response.data.data)
                this.setState({
                    name: response.data.data.name,
                    email: response.data.data.email,
                    avatar: response.data.data.detail.avatar,
                })
            })
            .catch((error) => {
                // console.log(error);
                this._signOutAsync();
            });
    };

    _signOutAsync = async () => {
        // TODO Notifications token
        // try{
        //     const token = await Notifications.getExpoPushTokenAsync();
        //     Axios.post(HOST_NAME+HOST_API_VER + 'modify-token-user', {
        //         expo_token: token,
        //         type: 0
        //     });
        // }catch (e) {
        //
        // }

        delete Axios.defaults.headers.common['Authorization'];
        await AsyncStorage.clear();
        Toast.show('Login data Error, Please re-login.', {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
        });
        this.props.navigation.navigate('Login');
    };
}


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
    },
    itemButton:{
        paddingHorizontal: 10,
        paddingVertical: 15,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems: 'center',
    },
    itemButtonText:{
        // paddingLeft: 10,
        color:'#4F0B72',
        fontFamily: 'regular',
        fontSize: 16,
    },
    itemButtonContent:{
        // paddingLeft: 10,
        color:'#924EB4',
        fontFamily: 'light',
        fontSize: 16,
    },
});
