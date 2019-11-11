import * as React from "react";
import {AsyncStorage,ImageBackground,ScrollView,StyleSheet,Text,View,TouchableOpacity,SafeAreaView,} from "react-native";
import {Avatar, Icon, Badge, Image} from "react-native-elements";
import {RectButton} from "react-native-gesture-handler";
import {Notifications} from "expo";
import Axios from "axios";
import Toast from 'react-native-root-toast';

export default class DrawerMenu extends React.Component {

    jumpToSection = (page) => {
        this.props.navigation.navigate(page);
        this.props.navigation.closeDrawer();
    };

    constructor(props) {
        super(props);
        this.init();
    }

    init() {
        this.state = {
            en_name: "",
            cn_name: "",
            email: "",
            user_type: "",
            en_first_name: "",
            en_last_name: "",
            cn_first_name: "",
            cn_last_name: "",
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

    render() {
        return (
            <ScrollView
                style={{backgroundColor: '#924EB4'}}
                contentContainerStyle={{ flex: 1, backgroundColor: '#4F0B72', justifyContent:'space-between' }}
                alwaysBounceVertical={false}
            >
                <SafeAreaView forceInset={{ top: 'always', horizontal: 'never',backgroundColor:"#924EB4" }}>
                    <View style={styles.drawerHeader}>
                        <Image
                            // source={{ uri: image }}
                            style={{ width: 200, height: 100 }}
                        />
                    </View>

                    <RectButton
                        style={styles.button}
                        onPress={() => {this.jumpToSection('Home')}}>
                        <Icon
                            name="home"
                            type="entypo"
                            color="#fff"
                            size={25}
                            underlayColor={'transparent'}
                            style={{}}
                        />
                        <Text style={styles.buttonText}>{tran.t('home')}</Text>
                    </RectButton>
                    <RectButton
                        style={styles.button}
                        onPress={() => this.jumpToSection('Banking')}>
                        <Icon
                            name="bank"
                            type="antdesign"
                            color="#fff"
                            size={25}
                            underlayColor={'transparent'}
                            style={{}}
                        />
                        <Text style={styles.buttonText}>Smart Bank</Text>
                    </RectButton>
                    <RectButton
                        style={styles.button}
                        onPress={() => this.jumpToSection('Locker')}>
                        <Icon
                            name="unlock"
                            type="antdesign"
                            color="#fff"
                            size={25}
                            underlayColor={'transparent'}
                            style={{}}
                        />
                        <Text style={styles.buttonText}>Locker</Text>
                    </RectButton>
                    <RectButton
                        style={styles.button}
                        onPress={() => this.jumpToSection('Me')}>
                        <Icon
                            name="account-circle"
                            type="material-community"
                            color="#fff"
                            size={25}
                            underlayColor={'transparent'}
                            style={{}}
                        />
                        <Text style={styles.buttonText}>Profile</Text>
                    </RectButton>
                    <RectButton
                        style={styles.button}
                        onPress={() => this.jumpToSection('ContactUs')}>
                        <Icon
                            name="customerservice"
                            type="antdesign"
                            color="#fff"
                            size={25}
                            underlayColor={'transparent'}
                            style={{}}
                        />
                        <Text style={styles.buttonText}>{tran.t('contact_us')}</Text>
                    </RectButton>
                    <RectButton
                        style={styles.button}
                        onPress={() => this.jumpToSection('About')}>
                        <Icon
                            name="infocirlceo"
                            type="antdesign"
                            color="#fff"
                            size={25}
                            underlayColor={'transparent'}
                            style={{}}
                        />
                        <Text style={styles.buttonText}>{tran.t('about')}</Text>
                    </RectButton>
                    <RectButton
                        style={styles.button}
                        onPress={() => this.jumpToSection('Settings')}>
                        <Icon
                            name="setting"
                            type="antdesign"
                            color="#fff"
                            size={25}
                            underlayColor={'transparent'}
                            style={{}}
                        />
                        <Text style={styles.buttonText}>{tran.t('settings')}</Text>
                    </RectButton>

                </SafeAreaView>


                <RectButton
                    style={styles.button}
                    onPress={() => this._signOutAsync()}>
                    <Icon
                        name="back"
                        type="antdesign"
                        color="#fff"
                        size={25}
                        underlayColor={'transparent'}
                        style={{}}
                    />
                    <Text style={styles.buttonText}>{tran.t('logout')}</Text>
                </RectButton>
            </ScrollView>

        );
    }

    _signOutAsync = async () => {

        delete Axios.defaults.headers.common['Authorization'];
        await AsyncStorage.clear();
        Toast.show(tran.t('msg_re_login'), {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
        });
        this.props.navigation.navigate('Login');
    };

    getData = async () => {
        await Axios.get(HOST_NAME + 'user/profile')
            .then((response) => {
                this.setState({
                    en_name: response.data.data.en_name,
                    cn_name: response.data.data.cn_name,
                    email: response.data.data.email,
                    user_type: response.data.data.detail.type,
                    en_first_name: response.data.data.detail.name.en.first,
                    en_last_name: response.data.data.detail.name.en.last,
                    cn_first_name: response.data.data.detail.name.cn.first,
                    cn_last_name: response.data.data.detail.name.cn.last,
                    avatar: response.data.data.detail.avatar,
                })
            })
            .catch((error) => {
                // console.log(error);
                // this._signOutAsync();
            });
    };
}

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 15,
        paddingVertical: 15,
        flexDirection:'row',
        alignItems: 'center',
    },
    text:{
        fontFamily: 'UbuntuLight',
        color: 'white',
        fontSize: 16,
    },
    buttonText:{
        color:'#fff',
        fontFamily: 'UbuntuLight',
        fontSize: 16,
        left: 10,
    },
    drawerHeader:{
        paddingTop: 40,
        paddingBottom: 20,
        backgroundColor: '#4F0B72',
        paddingHorizontal: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    drawerTitle:{
        fontFamily: 'bold',
        fontSize: 24,
        color: '#B27ACF',
    },

});
