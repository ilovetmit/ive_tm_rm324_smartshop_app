import React, { Component } from 'react';
import {StyleSheet,Text,View,ImageBackground,Dimensions,AsyncStorage,} from 'react-native';
import {Input, Button, Icon, Header,ListItem} from 'react-native-elements';
import {RectButton} from "react-native-gesture-handler";
import Axios from "axios";
import Toast from 'react-native-root-toast';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const BG_IMAGE = require('../../../assets/images/bg_second.jpg');

export default class SettingsScreen extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.init();
    }

    init() {
        this.state = {
            pushNotifications: true,
            language: 'unknown',
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
                        <Text style={styles.headerTitle}>{tran.t('settings_header')}</Text>
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
                    <View style={styles.itemList}>

                        <RectButton
                            style={styles.itemButton}
                            onPress={() => this.props.navigation.navigate('Language',{
                                language: this.state.language,
                            })}
                        >
                            <View style={{flexDirection:'row',alignItems: 'center',}}>
                                <Icon
                                    name="translate"
                                    type="material-community"
                                    color="#924EB4"
                                    size={25}
                                    underlayColor={'transparent'}
                                    style={{}}
                                />
                                <Text style={styles.itemButtonText}>{tran.t('s_language')}</Text>
                            </View>
                            <View style={{ flexDirection: 'row',alignItems: 'center',}}>
                                <Text style={styles.itemButtonContent} numberOfLines={1}>{this.state.language==null?tran.t('unfilled'):tran.t(this.state.language)}</Text>
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
                </ImageBackground>
            </View>

        );
    }

    getData = async () => {
        let language = await AsyncStorage.getItem('language') || 'en_us';
        this.setState({
            language: language
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
        paddingLeft: 10,
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