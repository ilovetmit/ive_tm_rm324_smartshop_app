import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, Dimensions, AsyncStorage, } from 'react-native';
import { Input, Button, Icon, Header, ListItem } from 'react-native-elements';
import { RectButton } from "react-native-gesture-handler";
import Axios from "axios";
import Toast from 'react-native-root-toast';
import Colors from '../../constants/Colors';

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

    UNSAFE_componentWillMount() {
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
                            name="menu"
                            type="feather"
                            color={Colors.BlackText}
                            size={35}
                            onPress={() => this.props.navigation.openDrawer()}
                            underlayColor={'transparent'}
                        />
                        <Text style={styles.headerTitle}>Test Zone</Text>
                        <Icon
                            name="options"
                            type="simple-line-icon"
                            color="rgba(255,255,255,0)" // hide logo
                            size={30}
                            // onPress={() =>alert('In Developing...')}
                            underlayColor={'transparent'}
                            style={{ padding: 10 }}
                        />
                    </View>
                    <View style={styles.itemList}>

                        <RectButton
                            style={styles.itemButton}
                            onPress={() => this.props.navigation.navigate('Language', {
                                language: this.state.language,
                            })}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                <Icon
                                    name="translate"
                                    type="material-community"
                                    color={Colors.Secondary}
                                    size={25}
                                    underlayColor={'transparent'}
                                    style={{}}
                                />
                                <Text style={styles.itemButtonText}>{tran.t('s_language')}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                <Text style={styles.itemButtonContent} numberOfLines={1}>{this.state.language == null ? tran.t('unfilled') : tran.t(this.state.language)}</Text>
                                <Icon
                                    name="right"
                                    type="antdesign"
                                    color={Colors.Secondary}
                                    size={20}
                                    underlayColor={'transparent'}
                                // style={{marginRight:20}}
                                />
                            </View>
                        </RectButton>
                    </View>

                    {/*<View style={styles.itemList}>*/}
                    {/*    <RectButton*/}
                    {/*        style={styles.itemListButton}*/}
                    {/*        onPress={() => this.props.navigation.navigate('LED_Price')}>*/}
                    {/*        <Icon*/}
                    {/*            name="flash"*/}
                    {/*            type="entypo"*/}
                    {/*            color={Colors.BlackText}*/}
                    {/*            size={24}*/}
                    {/*            underlayColor={'transparent'}*/}
                    {/*            style={{}}*/}
                    {/*        />*/}
                    {/*        <Text style={styles.itemListButtonText}>LED Price Test</Text>*/}
                    {/*    </RectButton>*/}
                    {/*    /!*<RectButton*!/*/}
                    {/*    /!*    style={styles.itemListButton}*!/*/}
                    {/*    /!*    onPress={() => this.props.navigation.navigate('LED_String')}>*!/*/}
                    {/*    /!*    <Icon*!/*/}
                    {/*    /!*        name="flash"*!/*/}
                    {/*    /!*        type="entypo"*!/*/}
                    {/*    /!*        color={Colors.BlackText}*!/*/}
                    {/*    /!*        size={24}*!/*/}
                    {/*    /!*        underlayColor={'transparent'}*!/*/}
                    {/*    /!*        style={{}}*!/*/}
                    {/*    /!*    />*!/*/}
                    {/*    /!*    <Text style={styles.itemListButtonText}>LED String Test</Text>*!/*/}
                    {/*    /!*</RectButton>*!/*/}

                    {/*</View>*/}

                    {/*<View style={styles.itemList}>*/}
                    {/*    <RectButton*/}
                    {/*        style={styles.itemListButton}*/}
                    {/*        onPress={() => this.props.navigation.navigate('LockerTest')}>*/}
                    {/*        <Icon*/}
                    {/*            name="flash"*/}
                    {/*            type="entypo"*/}
                    {/*            color={Colors.BlackText}*/}
                    {/*            size={24}*/}
                    {/*            underlayColor={'transparent'}*/}
                    {/*            style={{}}*/}
                    {/*        />*/}
                    {/*        <Text style={styles.itemListButtonText}>Locker Test</Text>*/}
                    {/*    </RectButton>*/}
                    {/*</View>*/}

                    {/*<View style={styles.itemList}>*/}

                    {/*    <RectButton*/}
                    {/*        style={styles.itemListButton}*/}
                    {/*        onPress={() => this.props.navigation.navigate('VendingTest')}>*/}
                    {/*        <Icon*/}
                    {/*            name="flash"*/}
                    {/*            type="entypo"*/}
                    {/*            color={Colors.BlackText}*/}
                    {/*            size={24}*/}
                    {/*            underlayColor={'transparent'}*/}
                    {/*            style={{}}*/}
                    {/*        />*/}
                    {/*        <Text style={styles.itemListButtonText}>Vending Test</Text>*/}
                    {/*    </RectButton>*/}

                    {/*</View>*/}

                    {/*<View style={styles.itemList}>*/}

                    {/*    <RectButton*/}
                    {/*        style={styles.itemListButton}*/}
                    {/*        onPress={() => this.props.navigation.navigate('ProductList')}>*/}
                    {/*        <Icon*/}
                    {/*            name="flash"*/}
                    {/*            type="entypo"*/}
                    {/*            color={Colors.BlackText}*/}
                    {/*            size={24}*/}
                    {/*            underlayColor={'transparent'}*/}
                    {/*            style={{}}*/}
                    {/*        />*/}
                    {/*        <Text style={styles.itemListButtonText}>Product List Demo</Text>*/}
                    {/*    </RectButton>*/}

                    {/*</View>*/}
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
    content: {
        flex: 1,
    },
    topMenu: {
        backgroundColor: Colors.Primary,
    },
    bgImage: {
        flex: 1,
        top: 0,
        left: 0,
    },
    header: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'transparent',
        marginTop: 25,
        padding: 10,
    },
    headerTitle: {
        color: Colors.BlackText,
        fontSize: 20,
        fontFamily: 'bold',
    },
    itemList: {
        marginBottom: 10,
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderRadius: 10,
        marginHorizontal: 10,
    },
    itemListButton: {
        paddingLeft: 20,
        paddingVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemListButtonText: {
        paddingLeft: 10,
        color: Colors.BlackText,
        fontFamily: 'regular',
        fontSize: 16,
    },
    itemButton: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemButtonText: {
        paddingLeft: 10,
        color: Colors.Secondary,
        fontFamily: 'regular',
        fontSize: 16,
    },
    itemButtonContent: {
        // paddingLeft: 10,
        color: Colors.ButtonText,
        fontFamily: 'light',
        fontSize: 16,
    },
});
