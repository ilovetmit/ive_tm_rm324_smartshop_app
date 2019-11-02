import React, { Component } from 'react';
import {StyleSheet,Text,View,ImageBackground,Dimensions,ScrollView, AsyncStorage,  TouchableOpacity} from 'react-native';
import {Input, Button, Icon, Avatar, Badge,ListItem} from 'react-native-elements';
import {RectButton} from "react-native-gesture-handler";
import Axios from "axios";
import {Notifications} from "expo";
import TouchableScale from 'react-native-touchable-scale';
import Toast from 'react-native-root-toast';

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
            name: "",
            balance: 0,
            avatar: null,
        }
    }

    componentWillMount() {
        this.getData();
        this.willFocusSubscription = this.props.navigation.addListener('didFocus', () => {
            this.getData();
        });
    }

    componentWillUnmount() {
        this.willFocusSubscription.remove();
    }

    getData = async () =>{
        await Axios.get(HOST_NAME+HOST_API_VER + 'user/profile')
            .then((response) => {
                this.setState({
                    name: response.data.data.name,
                    email: response.data.data.email,
                    avatar: response.data.data.detail.avatar,
                    balance: response.data.data.detail.balance,
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
        return (

            <View style={styles.content}>
                <ImageBackground source={BG_IMAGE} style={styles.bgImage}>
                    <View style={styles.header}>
                        <Icon
                            name="qrcode"
                            type="material-community"
                            color="#fff"
                            size={30}
                            onPress={() => this.props.navigation.navigate('QR')}
                            underlayColor={'transparent'}
                            style={{padding:10}}
                        />
                        <Text style={styles.headerTitle}>SMART SHOP +</Text>
                        <Icon
                            name="dots-three-horizontal"
                            type="entypo"
                            color="#fff"
                            size= {30}
                            onPress={() =>alert('In Developing...')}
                            underlayColor={'transparent'}
                            style={{padding:10}}
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
                                colors: ['#691594', '#bf58e2'],
                                start: [1, 0],
                                end: [0.2, 0],
                            }}
                            leftAvatar={{ rounded: true,
                                source:{uri: HOST_NAME+this.state.avatar },
                                title:this.state.name.substring(0,1).toUpperCase()+this.state.name.substring(1,2).toUpperCase(),
                                size:60,
                                placeholderStyle:{backgroundColor: '#FFF'},
                                overlayContainerStyle:{backgroundColor: '#FFF'},
                                titleStyle:{color:'#bf58e2'},
                                // showEditButton: true,
                            }}
                            title={this.state.name===" "?"Unfilled":this.state.name.length > 15 ?this.state.name.substr(0,15)+"...":this.state.name }
                            titleStyle={{ color: 'white', fontWeight: 'bold' }}
                            subtitle={<View>
                                <Text style={{color: 'white'}}>{this.state.email}</Text>
                                <View style={{flexDirection:"row",alignItems: 'center',}}>
                                    <Icon
                                        name='coin'
                                        type='material-community'
                                        color='#FFFF00'
                                    />
                                    <Text style={{color: 'white'}}>{this.state.balance}</Text>
                                </View>
                            </View>}
                            chevron={{ color: 'white' }}
                            onPress={() =>this.props.navigation.navigate('User',{name:this.state.name,email:this.state.email})}
                        />

                        <View style={styles.itemList}>
                            <RectButton
                                style={styles.itemButton}
                                onPress={() => this.props.navigation.navigate('FacilityBooking')}>
                                <Icon
                                    name="checklist"
                                    type="octicon"
                                    color="#000"
                                    size={24}
                                    underlayColor={'transparent'}
                                    style={{}}
                                />
                                <Text style={styles.itemButtonText}>Order</Text>
                            </RectButton>
                        </View>

                        <View style={styles.itemList}>
                            <RectButton
                                style={styles.itemButton}
                                onPress={() => this.props.navigation.navigate('ContactUs')}>
                                <Icon
                                    name="phone"
                                    type="antdesign"
                                    color="#000"
                                    size={24}
                                    underlayColor={'transparent'}
                                    style={{}}
                                />
                                <Text style={styles.itemButtonText}>{tran.t('contact_us')}</Text>
                            </RectButton>
                            <RectButton
                                style={styles.itemButton}
                                onPress={() => this.props.navigation.navigate('About')}>
                                <Icon
                                    name="infocirlceo"
                                    type="antdesign"
                                    color="#000"
                                    size={24}
                                    underlayColor={'transparent'}
                                    style={{}}
                                />
                                <Text style={styles.itemButtonText}>{tran.t('about')}</Text>
                            </RectButton>
                            <RectButton
                                style={styles.itemButton}
                                onPress={() => this.props.navigation.navigate('Settings')}>
                                <Icon
                                    name="setting"
                                    type="antdesign"
                                    color="#000"
                                    size={24}
                                    underlayColor={'transparent'}
                                    style={{}}
                                />
                                <Text style={styles.itemButtonText}>{tran.t('settings')}</Text>
                            </RectButton>
                        </View>
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
    content:{
        flex: 1,
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
    bgImage: {
        flex: 1,
        top: 0,
        left: 0,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
    },
    userHeader:{
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
    userHeaderAvatar:{

    },
    userHeaderTitle:{
        color:'#4F0B72',
        fontSize: 16,
        marginLeft: 6,
    },
    itemList:{
        marginBottom: 10,
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderRadius: 10,
        marginHorizontal: 10,
    },
    itemButton:{
        paddingLeft: 20,
        paddingVertical: 15,
        flexDirection:'row',
        alignItems: 'center',
    },
    itemButtonText:{
        paddingLeft: 10,
        color:'#4F0B72',
        fontFamily: 'regular',
        fontSize: 16,
    },
});
