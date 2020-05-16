import React, { Component } from 'react';
import { StyleSheet, View, ImageBackground, Dimensions, ScrollView, RefreshControl, Alert, AsyncStorage } from 'react-native';
import { Input, Button, Text, Icon, Tooltip, Avatar, ListItem } from 'react-native-elements';
import TouchableScale from "react-native-touchable-scale";
import Axios from "axios";
import Toast from 'react-native-root-toast';
import { Updates } from "expo";
import Colors from '../../constants/Colors';
import { RectButton } from "react-native-gesture-handler";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const BG_IMAGE = require('../../../assets/images/bg_whitelocker.jpg');

export default class LockerScreen extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.init();
    }

    init() {
        this.state = {
            lockers: [],
            refreshing: false,
        }
    }

    componentWillMount() {
        this.getData();
    }

    render() {



        return (
            <View style={styles.content}>
                <ImageBackground source={BG_IMAGE} style={styles.bgImage} resizeMode='stretch'>
                    <View style={styles.header}>
                        <Icon
                            name="menu"
                            type="feather"
                            color={Colors.BlackText}
                            size={35}
                            onPress={() => this.props.navigation.openDrawer()}
                            underlayColor={'transparent'}
                        />
                        <Text style={styles.headerTitle}>LOCKER</Text>
                        <Icon
                            name="options"
                            type="simple-line-icon"
                            color="rgba(255,255,255,0)"
                            size={30}
                            // onPress={() =>alert('In Developing...')}
                            underlayColor={'transparent'}
                            style={{ padding: 10 }}
                        />
                    </View>
                    <ScrollView>
                        <View style={styles.itemList}>
                            <RectButton
                                style={styles.itemListButton}
                                onPress={() => this.props.navigation.navigate('LockerForm')}>
                                <Icon
                                    name="widgets"
                                    type="material-community"
                                    color={Colors.BlackText}
                                    size={24}
                                    underlayColor={'transparent'}
                                    style={{}}
                                />
                                <Text style={styles.itemListButtonText}>Store Item</Text>
                            </RectButton>
                            <RectButton
                                style={styles.itemListButton}
                                onPress={() => this.props.navigation.navigate('LockerRecord')}>
                                <Icon
                                    name="lock-open-outline"
                                    type="material-community"
                                    color={Colors.BlackText}
                                    size={24}
                                    underlayColor={'transparent'}
                                    style={{}}
                                />
                                <Text style={styles.itemListButtonText}>Get Item</Text>
                            </RectButton>
                        </View>

                    </ScrollView>
                </ImageBackground>
            </View>

        );
    }

    _onRefresh = () => {
        this.setState({ refreshing: true });
        this.getData().then(() => {
            setTimeout(() => { this.setState({ refreshing: false }) }, 1000);
        });
    };

    getData = async () => {
        Axios.get(HOST_NAME + HOST_API_VER + "lockers")
            .then((response) => {
                this.setState({
                    lockers: response.data.data,
                })
            })
            .catch((error) => {
                // console.log(error);
                Toast.show(tran.t('msg_network_error'), {
                    duration: Toast.durations.SHORT,
                    position: Toast.positions.BOTTOM,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                    delay: 0,
                });
            });
    };

    unlockLocker = async (locker_id) => {
        Alert.alert(
            tran.t('confirm'),
            "Are you sure you want to turn on Locker #" + locker_id + "?",
            [
                {
                    text: tran.t('yes'), onPress: async () => {
                        Axios.post(HOST_NAME + HOST_API_VER + "locker", {
                            locker_id: locker_id
                        })
                            .then((response) => {
                                if (response.status === 200) {
                                    // console.log(response);
                                    Toast.show("Request success. Locker Opening...", {
                                        duration: Toast.durations.SHORT,
                                        position: Toast.positions.CENTER,
                                        shadow: true,
                                        animation: true,
                                        hideOnPress: true,
                                        delay: 0,
                                    });
                                } else if (response.status === 233) {
                                    Toast.show("Already request\nPlease wait for Locker to open", {
                                        duration: Toast.durations.SHORT,
                                        position: Toast.positions.CENTER,
                                        shadow: true,
                                        animation: true,
                                        hideOnPress: true,
                                        delay: 0,
                                    });
                                } else {
                                    Toast.show(response.message, {
                                        duration: Toast.durations.SHORT,
                                        position: Toast.positions.CENTER,
                                        shadow: true,
                                        animation: true,
                                        hideOnPress: true,
                                        delay: 0,
                                    });
                                }
                                this._onRefresh();
                            })
                            .catch((error) => {
                                // console.log(error);
                                Toast.show(tran.t('msg_network_error'), {
                                    duration: Toast.durations.SHORT,
                                    position: Toast.positions.BOTTOM,
                                    shadow: true,
                                    animation: true,
                                    hideOnPress: true,
                                    delay: 0,
                                });
                            });
                    }
                },
                { text: tran.t('no'), style: 'cancel' }
            ]
        );
    };
}


const styles = StyleSheet.create({
    content: {
        flex: 1,
    },
    bgImage: {
        flex: 1,
        top: 0,
        left: 0,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
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
    subtitle: {
        color: Colors.BlackText,
        fontSize: 15,
        left: 10,
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
    itemButtonColumn: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        flexDirection: 'column',
        // justifyContent:'space-between',
        // alignItems: 'center',
    },
    itemButtonText: {
        // paddingLeft: 10,
        color: Colors.ButtonText,
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
