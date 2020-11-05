import Axios from "axios";
import * as React from "react";
import { AsyncStorage, Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { Icon, Image } from "react-native-elements";
import { RectButton } from "react-native-gesture-handler";
import Colors from '../constants/Colors';

const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class DrawerMenu extends React.Component {

    jumpToSection = (page) => {
        this.props.navigation.navigate(page);
        this.props.navigation.closeDrawer();
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ScrollView
                style={{ backgroundColor: Colors.ButtonText }}
                contentContainerStyle={{ flex: 1, backgroundColor: Colors.Primary }}
                alwaysBounceVertical={false}
            >
                <View style={styles.drawerHeader}>
                    <Image
                        source={require('../../assets/images/S-Shop_logo.png')}
                        style={{ width: 200, height: 100}}
                        resizeMode={'contain'}
                    />
                </View>
                <RectButton
                    style={styles.button}
                    onPress={() => { this.jumpToSection('Home') }}>
                    <Icon
                        name="home"
                        type="antdesign"
                        color={Colors.BlackText}
                        size={25}
                        underlayColor={'transparent'}
                    />
                    <Text style={styles.buttonText}>{tran.t('home')}</Text>
                </RectButton>
                <RectButton
                    style={styles.button}
                    onPress={() => { this.jumpToSection('Shop') }}>
                    <Icon
                        name="shopping-cart"
                        type="feather"
                        color={Colors.BlackText}
                        size={25}
                        underlayColor={'transparent'}
                    />
                    <Text style={styles.buttonText}>S-Shop</Text>
                </RectButton>
                <RectButton
                    style={styles.button}
                    onPress={() => this.jumpToSection('Banking')}>
                    <Icon
                        name="bank"
                        type="antdesign"
                        color={Colors.BlackText}
                        size={25}
                        underlayColor={'transparent'}
                    />
                    <Text style={styles.buttonText}>S-Bank</Text>
                </RectButton>
                <RectButton
                    style={styles.button}
                    onPress={() => this.jumpToSection('Locker')}>
                    <Icon
                        name="unlock"
                        type="antdesign"
                        color={Colors.BlackText}
                        size={25}
                        underlayColor={'transparent'}
                    />
                    <Text style={styles.buttonText}>S-Locker</Text>
                </RectButton>
                <RectButton
                    style={styles.button}
                    onPress={() => this.jumpToSection('Vending')}>
                    <Icon
                        name="inbox"
                        type="antdesign"
                        color={Colors.BlackText}
                        size={25}
                        underlayColor={'transparent'}
                    />
                    <Text style={styles.buttonText}>S-Vending</Text>
                </RectButton>

                <RectButton
                    style={styles.button}
                    onPress={() => this.jumpToSection('Mission')}>
                    <Icon
                        name="hammer"
                        type="material-community"
                        color={Colors.BlackText}
                        size={25}
                        underlayColor={'transparent'}
                    />
                    <Text style={styles.buttonText}>Mission</Text>
                </RectButton>

                <RectButton
                    style={styles.button}
                    onPress={() => this.jumpToSection('ContactUs')}>
                    <Icon
                        name="customerservice"
                        type="antdesign"
                        color={Colors.BlackText}
                        size={25}
                        underlayColor={'transparent'}
                    />
                    <Text style={styles.buttonText}>{tran.t('contact_us')}</Text>
                </RectButton>
                <RectButton
                    style={styles.button}
                    onPress={() => this.jumpToSection('About')}>
                    <Icon
                        name="infocirlceo"
                        type="antdesign"
                        color={Colors.BlackText}
                        size={25}
                        underlayColor={'transparent'}
                    />
                    <Text style={styles.buttonText}>{tran.t('about')}</Text>
                </RectButton>
                <RectButton
                    style={styles.button}
                    onPress={() => this.jumpToSection('Settings')}>
                    <Icon
                        name="flash"
                        type="entypo"
                        color={Colors.BlackText}
                        size={25}
                        underlayColor={'transparent'}
                    />
                    <Text style={styles.buttonText}>Test Zone</Text>
                </RectButton>

                <RectButton
                    style={[{ position: 'absolute', top: SCREEN_HEIGHT -55, width: '100%' }, styles.button]}
                    onPress={() => this._signOutAsync()}>
                    <Icon
                        name="back"
                        type="antdesign"
                        color={Colors.BlackText}
                        size={25}
                        underlayColor={'transparent'}
                    />
                    <Text style={styles.buttonText}>{tran.t('logout')}</Text>
                </RectButton>
            </ScrollView>
        );
    }

    _signOutAsync = async () => {
        Axios.post(HOST_NAME + HOST_API_VER + 'logout');
        delete Axios.defaults.headers.common['Authorization'];
        await AsyncStorage.clear();
        this.props.navigation.navigate('Login');
    };

}

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        fontFamily: 'UbuntuLight',
        color: Colors.BlackText,
        fontSize: 16,
    },
    buttonText: {
        color: Colors.BlackText,
        fontFamily: 'UbuntuLight',
        fontSize: 16,
        left: 10,
    },
    drawerHeader: {
        paddingTop: 50,
        paddingBottom: 10,
        backgroundColor: Colors.Primary,
        paddingHorizontal: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    drawerTitle: {
        fontFamily: 'bold',
        fontSize: 24,
        color: Colors.Secondary,
    },

});
