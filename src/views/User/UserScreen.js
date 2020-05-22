import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, Dimensions, AsyncStorage, ScrollView, StatusBar, ActivityIndicator } from 'react-native';
import { Input, Button, Icon, Header, ListItem, Avatar } from 'react-native-elements';
import { RectButton } from "react-native-gesture-handler";
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
            first_name: "",
            last_name: "",
            id: this.props.navigation.getParam("id"),
            email: this.props.navigation.getParam("email"),
            balance: this.props.navigation.getParam("balance"),
            avatar: null,
            bio: "",
        }
    }

    componentWillMount() {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', () => {
            this.getData();
        });
    }

    render() {
        // let name = name.toUpperCase().split(" ");
        let first_name = this.state.first_name.toUpperCase().substring(0, 1);
        let last_name = this.state.last_name.toUpperCase().substring(1, 2);
        let name = this.state.first_name + " " + this.state.last_name;

        // if (name.length > 1) {
        //     last_name = name[1].substring(0, 1);
        // }
        return (
            <View style={styles.content}>
                <StatusBar barStyle="dark-content" hidden={false} translucent={true} />
                <ImageBackground source={BG_IMAGE} style={styles.bgImage}>
                    <View style={styles.header}>
                        <Icon
                            name="chevron-left"
                            type="feather"
                            color={Colors.BlackText}
                            size={40}
                            onPress={() => this.props.navigation.goBack()}
                            underlayColor={'transparent'}
                            style={{ padding: 10 }}
                        />
                        <Text style={styles.headerTitle}>PROFILE</Text>
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
                    <ScrollView>
                        <View style={{ alignItems: 'center', marginBottom: 10 }}>
                            <Avatar
                                rounded
                                source={{ uri: this.state.avatar }}
                                title={first_name + last_name}
                                size="xlarge"
                                placeholderStyle={{ backgroundColor: Colors.Secondary }}
                                PlaceholderContent={<ActivityIndicator />}
                                overlayContainerStyle={{ backgroundColor: Colors.Secondary }}
                                onPress={() => this._pickImage()}
                                showEditButton />
                        </View>
                        <View style={styles.itemList}>
                            <RectButton
                                style={styles.itemButton}
                            // onPress={() => this.props.navigation.navigate('Email')}
                            >
                                <Text style={styles.itemButtonText}>{tran.t('email')}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                    <Text style={styles.itemButtonContent} numberOfLines={1}>{this.state.email}</Text>
                                </View>
                            </RectButton>
                            <RectButton
                                style={styles.itemButton}
                                onPress={() => this.props.navigation.navigate('Name', {
                                    first_name: this.state.first_name,
                                    last_name: this.state.last_name,
                                })}
                            >
                                <Text style={styles.itemButtonText}>{tran.t('name')}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                    <Text style={styles.itemButtonContent} numberOfLines={1}>{name === " " ? tran.t('unfilled') : name.length > 15 ? name.substr(0, 15) + "..." : name}</Text>
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

                            <RectButton
                                style={styles.itemButton}
                                onPress={() => this.props.navigation.navigate('Gender', {
                                    gender: this.state.gender
                                })}
                            >
                                <Text style={styles.itemButtonText}>Gender</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                    <Text style={styles.itemButtonContent} numberOfLines={1}>{this.state.gender == 1 ? "Male" : "Female"}</Text>
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

                            <RectButton
                                style={styles.itemButton}
                                onPress={() => this.props.navigation.navigate('Birthday', {
                                    birthday: this.state.birthday
                                })}
                            >
                                <Text style={styles.itemButtonText}>Birthday</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                    <Text style={styles.itemButtonContent} numberOfLines={1}>{this.state.birthday}</Text>
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

                            <RectButton
                                style={styles.itemButton}
                                onPress={() => this.props.navigation.navigate('Phone', {
                                    telephone: this.state.telephone
                                })}
                            >
                                <Text style={styles.itemButtonText}>Phone</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                    <Text style={styles.itemButtonContent} numberOfLines={1}>{this.state.telephone}</Text>
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

                            <RectButton
                                style={styles.itemButton}
                                onPress={() => this.props.navigation.navigate('Bio', {
                                    bio: this.state.bio
                                })}
                            >
                                <Text style={styles.itemButtonText}>Bio</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                    <Text style={styles.itemButtonContent} numberOfLines={1}>{this.state.bio.length > 20 ? this.state.bio.substr(0, 20) + "..." : this.state.bio}</Text>
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
        formData.append("avatar", { uri: this.state.avatar, name: 'photo.jpeg', type: 'image/jpeg' });
        await Axios.post(HOST_NAME + HOST_API_VER + "update_avatar", formData)
            .then((response) => {
                if (response.status === 200) {
                    this.setState({
                        avatar: response.data.data.avatar,
                    });
                    Toast.show(tran.t('update_success'), {
                        duration: Toast.durations.SHORT,
                        position: Toast.positions.BOTTOM,
                        shadow: true,
                        animation: true,
                        hideOnPress: true,
                        delay: 0,
                    });
                } else {
                    Toast.show(response.data.message, {
                        duration: Toast.durations.SHORT,
                        position: Toast.positions.BOTTOM,
                        shadow: true,
                        animation: true,
                        hideOnPress: true,
                        delay: 0,
                    });
                }
            })
            .catch((error) => {

            });

    };

    getData = async () => {
        await Axios.get(HOST_NAME + HOST_API_VER + 'profile')
            .then((response) => {
                //console.log(response.data.data);
                this.setState({
                    first_name: response.data.data.first_name,
                    last_name: response.data.data.last_name,
                    email: response.data.data.email,
                    gender: response.data.data.gender,
                    telephone: response.data.data.telephone,
                    bio: response.data.data.bio,
                    birthday: response.data.data.birthday,
                    avatar: response.data.data.avatar,
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
    itemList: {
        marginBottom: 10,
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderRadius: 10,
        marginHorizontal: 10,
    },
    itemButton: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
