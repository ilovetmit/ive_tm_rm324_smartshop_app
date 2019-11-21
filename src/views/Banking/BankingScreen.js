import React, { Component } from 'react';
import {StyleSheet,Text,View,ImageBackground,Dimensions,AsyncStorage,ScrollView,StatusBar,ActivityIndicator} from 'react-native';
import {Input, Button, Icon, Header, ListItem, Avatar} from 'react-native-elements';
import {RectButton} from "react-native-gesture-handler";
import Axios from "axios";
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions'
import Toast from 'react-native-root-toast';
import Colors from '../../constants/Colors';

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
            credit_card: this.props.navigation.getParam("name"),
            credit_card_no: this.props.navigation.getParam("name"),
            balance: this.props.navigation.getParam("balance"),
            vit_coin: this.props.navigation.getParam("ive_coin"),
            avatar: null,
        };
        this.getData();
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
                <StatusBar barStyle="dark-content" translucent={true} />
                <ImageBackground source={BG_IMAGE} style={styles.bgImage}>
                    <View style={styles.header}>
                        <Icon
                            name="menu"
                            type="feather"
                            color={Colors.BlackText}
                            size={35}
                            onPress={() =>this.props.navigation.openDrawer()}
                            underlayColor={'transparent'}
                        />
                        <Text style={styles.headerTitle}>S-BANK</Text>
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
                        <View style={styles.itemList}>
                            <RectButton
                                style={styles.itemButton}
                                // onPress={() => this.props.navigation.navigate('Email')}
                            >
                                <Text style={styles.itemButtonText}>Saving A/C: </Text>
                                <View style={{ flexDirection: 'row',alignItems: 'center',}}>
                                    <Text style={styles.itemButtonContent} numberOfLines={1}>$ {this.state.balance}</Text>
                                </View>
                            </RectButton>
                            <RectButton
                                style={styles.itemButton}
                                // onPress={() => this.props.navigation.navigate('Email')}
                            >
                                <Text style={styles.itemButtonText}>Current A/C: </Text>
                                <View style={{ flexDirection: 'row',alignItems: 'center',}}>
                                    <Text style={styles.itemButtonContent} numberOfLines={1}>$ {this.state.balance}</Text>
                                </View>
                            </RectButton>
                            <RectButton
                                style={styles.itemButton}
                                // onPress={() => this.props.navigation.navigate('Email')}
                            >
                                <Text style={styles.itemButtonText}>Vit Coin</Text>
                                <View style={{ flexDirection: 'row',alignItems: 'center',}}>
                                    <Icon
                                        name='coin'
                                        type='material-community'
                                        color='#ffbd2a'
                                    />
                                    <Text style={styles.itemButtonContent} numberOfLines={1}> {this.state.vit_coin}</Text>
                                </View>
                            </RectButton>
                        </View>
                        <View style={styles.itemList}>
                            <RectButton
                                style={styles.itemListButton}
                                onPress={() => this.props.navigation.navigate('Transaction')}>
                                <Icon
                                    name="md-list-box"
                                    type="ionicon"
                                    color={Colors.BlackText}
                                    size={24}
                                    underlayColor={'transparent'}
                                    style={{}}
                                />
                                <Text style={styles.itemListButtonText}>Transaction</Text>
                            </RectButton>
                        </View>
                        <View style={styles.itemList}>
                            <RectButton
                                style={styles.itemListButton}
                                onPress={() => this.props.navigation.navigate('Insurance')}>
                                <Icon
                                    name="heart"
                                    type="antdesign"
                                    color={Colors.BlackText}
                                    size={24}
                                    underlayColor={'transparent'}
                                    style={{}}
                                />
                                <Text style={styles.itemListButtonText}>Insurance</Text>
                            </RectButton>
                            <RectButton
                                style={styles.itemListButton}
                                onPress={() => this.props.navigation.navigate('Stock')}>
                                <Icon
                                    name="linechart"
                                    type="antdesign"
                                    color={Colors.BlackText}
                                    size={24}
                                    underlayColor={'transparent'}
                                    style={{}}
                                />
                                <Text style={styles.itemListButtonText}>Stock</Text>
                            </RectButton>
                        </View>
                    </ScrollView>
                </ImageBackground>
            </View>

        );
    }

    getData = async () => {
        await Axios.get(HOST_NAME+HOST_API_VER + 'user/profile')
            .then((response) => {
                // console.log(response.data.data);
                this.setState({
                    email: response.data.data.email,
                    credit_card: response.data.data.detail.cc_type,
                    credit_card_no: response.data.data.detail.credit_card,
                    balance: response.data.data.detail.balance,
                    vit_coin: response.data.data.detail.ive_coin,
                })
            })
            .catch((error) => {
                // console.log(error);
                // this._signOutAsync();
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
        backgroundColor:Colors.Primary,
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
        color: Colors.BlackText,
        fontSize: 20,
        fontFamily: 'bold',
    },
    itemList:{
        marginBottom: 10,
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderRadius: 10,
        marginHorizontal: 10,
    },
    itemListButton:{
        paddingLeft: 20,
        paddingVertical: 15,
        flexDirection:'row',
        alignItems: 'center',
    },
    itemListButtonText:{
        paddingLeft: 10,
        color:Colors.BlackText,
        fontFamily: 'regular',
        fontSize: 16,
    },
    itemButton:{
        paddingHorizontal: 10,
        paddingVertical: 15,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems: 'center',
    },
    itemButtonColumn:{
        paddingHorizontal: 10,
        paddingVertical: 10,
        flexDirection:'column',
        // justifyContent:'space-between',
        // alignItems: 'center',
    },
    itemButtonText:{
        // paddingLeft: 10,
        color:Colors.ButtonText,
        fontFamily: 'regular',
        fontSize: 16,
    },
    itemButtonContent:{
        // paddingLeft: 10,
        color:Colors.ButtonText,
        fontFamily: 'light',
        fontSize: 16,
    },
});
