import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Dimensions,
    ScrollView,
    AsyncStorage,
    TouchableOpacity,
    ActivityIndicator,
    StatusBar
} from 'react-native';
import { Input, Button, Icon, Avatar, Badge, ListItem } from 'react-native-elements';
import { RectButton } from "react-native-gesture-handler";
import Axios from "axios";
import { Notifications } from "expo";
import TouchableScale from 'react-native-touchable-scale';
import Toast from 'react-native-root-toast';
import Colors from '../../constants/Colors';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const BG_IMAGE = require('../../../assets/images/bg_primary.jpg');

export default class MeScreen extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.init();
    }

    init() {
        this.state = {
            email: "",
            first_name: "",
            last_name: "",
            avatar: null,
        }
    }

    componentWillMount() {
        this.getData();
        this.willFocusSubscription = this.props.navigation.addListener('didFocus', () => {
            this.getData();
        });
        this._navListener = this.props.navigation.addListener('didFocus', () => {
            StatusBar.setBarStyle('dark-content');
        });
    }

    componentWillUnmount() {
        this.willFocusSubscription.remove();
        this._navListener.remove();
    }

    getData = async () => {
        await Axios.get(HOST_NAME + HOST_API_VER + 'profile')
            .then((response) => {
                this.setState({
                    first_name: response.data.data.first_name,
                    last_name: response.data.data.last_name,
                    email: response.data.data.email,
                    avatar: response.data.data.avatar,
                })
            })
            .catch((error) => {
                console.log(error);
                Toast.show(tran.t('msg_re_login'), {
                    duration: Toast.durations.SHORT,
                    position: Toast.positions.BOTTOM,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                    delay: 0,
                });
                // this._signOutAsync()
            });
    };

    render() {
        // let name = this.state.name.toUpperCase().split(" ");
        let first_name = this.state.first_name.toUpperCase().substring(0, 1);
        let last_name = this.state.last_name.toUpperCase().substring(1, 2);
        let name = this.state.first_name + " " + this.state.last_name;
        // if (name.length > 1) {
        //     last_name = name[1].substring(0, 1);
        // }
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
                        <Text style={styles.headerTitle}>S-SHOP@TMIT</Text>
                        <Icon
                            name="dots-three-horizontal"
                            type="entypo"
                            color="rgba(255,255,255,0)"
                            size={30}
                            // onPress={() =>alert('In Developing...')}
                            underlayColor={'transparent'}
                        />
                    </View>
                    <ScrollView>
                        <ListItem
                            Component={TouchableScale}
                            containerStyle={{
                                marginTop: 5,
                                marginBottom: 15,
                                marginHorizontal: 10,
                                borderRadius: 10,
                            }}
                            friction={90}
                            tension={100}
                            activeScale={0.95} //
                            linearGradientProps={{
                                colors: [Colors.Primary, Colors.Primary],
                                start: [1, 0],
                                end: [0.2, 0],
                            }}
                            leftAvatar={{
                                rounded: true,
                                source: { uri: this.state.avatar },
                                title: first_name + last_name,
                                size: 60,
                                PlaceholderContent: <ActivityIndicator />,
                                placeholderStyle: { backgroundColor: '#FFF' },
                                overlayContainerStyle: { backgroundColor: '#FFF' },
                                titleStyle: { color: Colors.Auxiliary2 },
                                // showEditButton: true,
                            }}
                            title={name === " " ? "Unfilled" : name > 15 ? name + "..." : name}
                            titleStyle={{ color: Colors.BlackText, fontWeight: 'bold' }}
                            subtitle={<View>
                                <Text style={{ color: Colors.BlackText }}>{this.state.email}</Text>
                                {/*<View style={{flexDirection:"row",alignItems: 'center',marginTop:3}}>*/}
                                {/*    <Icon*/}
                                {/*        name='coin'*/}
                                {/*        type='material-community'*/}
                                {/*        color='#ffbd2a'*/}
                                {/*    />*/}
                                {/*    <Text style={{color: Colors.BlackText}}>{this.state.ive_coin}</Text>*/}
                                {/*</View>*/}
                            </View>}
                            chevron={{ color: Colors.Secondary }}
                            onPress={() => this.props.navigation.navigate('User', {
                                first_name: this.state.first_name,
                                last_name: this.state.last_name,
                                email: this.state.email
                            })}
                        />

                        <View style={styles.itemList}>
                            <RectButton
                                style={styles.itemButton}
                                onPress={() => this.props.navigation.navigate('Order')}>
                                <Icon
                                    name="checklist"
                                    type="octicon"
                                    color={Colors.BlackText}
                                    size={24}
                                    underlayColor={'transparent'}
                                    style={{}}
                                />
                                <Text style={styles.itemButtonText}>Order History</Text>
                            </RectButton>
                            <RectButton
                                style={styles.itemButton}
                                onPress={() => this.props.navigation.navigate('Password')}>
                                <Icon
                                    name="textbox-password"
                                    type="material-community"
                                    color={Colors.BlackText}
                                    size={24}
                                    underlayColor={'transparent'}
                                    style={{}}
                                />
                                <Text style={styles.itemButtonText}>{tran.t('change_password')}</Text>
                            </RectButton>

                            <RectButton
                                style={styles.itemButton}
                                onPress={() => this.props.navigation.navigate('AddressList')}>
                                <Icon
                                    name="address-book"
                                    type="font-awesome"
                                    color={Colors.BlackText}
                                    size={24}
                                    underlayColor={'transparent'}
                                    style={{}}
                                />
                                <Text style={styles.itemButtonText}>Delivery Address</Text>
                            </RectButton>
                        </View>

                        {/*<View style={styles.itemList}>*/}
                        {/*    <RectButton*/}
                        {/*        style={styles.itemButton}*/}
                        {/*        onPress={() => this.props.navigation.navigate('ContactUs')}>*/}
                        {/*        <Icon*/}
                        {/*            name="phone"*/}
                        {/*            type="antdesign"*/}
                        {/*            color={Colors.BlackText}*/}
                        {/*            size={24}*/}
                        {/*            underlayColor={'transparent'}*/}
                        {/*            style={{}}*/}
                        {/*        />*/}
                        {/*        <Text style={styles.itemButtonText}>{tran.t('contact_us')}</Text>*/}
                        {/*    </RectButton>*/}
                        {/*    <RectButton*/}
                        {/*        style={styles.itemButton}*/}
                        {/*        onPress={() => this.props.navigation.navigate('About')}>*/}
                        {/*        <Icon*/}
                        {/*            name="infocirlceo"*/}
                        {/*            type="antdesign"*/}
                        {/*            color={Colors.BlackText}*/}
                        {/*            size={24}*/}
                        {/*            underlayColor={'transparent'}*/}
                        {/*            style={{}}*/}
                        {/*        />*/}
                        {/*        <Text style={styles.itemButtonText}>{tran.t('about')}</Text>*/}
                        {/*    </RectButton>*/}
                        {/*    <RectButton*/}
                        {/*        style={styles.itemButton}*/}
                        {/*        onPress={() => this.props.navigation.navigate('Settings')}>*/}
                        {/*        <Icon*/}
                        {/*            name="setting"*/}
                        {/*            type="antdesign"*/}
                        {/*            color="#000"*/}
                        {/*            size={24}*/}
                        {/*            underlayColor={'transparent'}*/}
                        {/*            style={{}}*/}
                        {/*        />*/}
                        {/*        <Text style={styles.itemButtonText}>{tran.t('settings')}</Text>*/}
                        {/*    </RectButton>*/}
                        {/*</View>*/}


                        <View style={styles.itemList}>
                            <RectButton
                                style={styles.itemButton}
                                onPress={() => this._signOutAsync()}>
                                <Icon
                                    name="back"
                                    type="antdesign"
                                    color="#000"
                                    size={24}
                                    underlayColor={'transparent'}
                                    style={{}}
                                />
                                <Text style={styles.itemButtonText}>{tran.t('logout')}</Text>
                            </RectButton>
                        </View>
                    </ScrollView>
                </ImageBackground>
            </View>

        );
    }

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
        this.props.navigation.navigate('Login');
    };

}


const styles = StyleSheet.create({
    content: {
        flex: 1,
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
    bgImage: {
        flex: 1,
        top: 0,
        left: 0,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
    },
    userHeader: {
        marginTop: 5,
        marginBottom: 15,
        marginHorizontal: 10,
        height: 100,
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderRadius: 10,
        paddingLeft: 5,
        paddingRight: 30,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    userHeaderAvatar: {

    },
    userHeaderTitle: {
        color: Colors.Primary,
        fontSize: 16,
        marginLeft: 6,
    },
    itemList: {
        marginBottom: 10,
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderRadius: 10,
        marginHorizontal: 10,
    },
    itemButton: {
        paddingLeft: 20,
        paddingVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemButtonText: {
        paddingLeft: 10,
        color: Colors.BlackText,
        fontFamily: 'regular',
        fontSize: 16,
    },
});
