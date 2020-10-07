import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ImageBackground,
    Dimensions,
    ScrollView,
    RefreshControl,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import { Input, Button, Text, Icon, Tooltip, Avatar, ListItem } from 'react-native-elements';
import TouchableScale from "react-native-touchable-scale";
import Axios from "axios";
import Toast from 'react-native-root-toast';
import Colors from '../../constants/Colors';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const BG_IMAGE = require('../../../assets/images/bg_second.jpg');

export default class BankingLoginScreen extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.init();
    }

    init() {
        this.state = {
            date: new Date().getFullYear() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getDate() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds(),
            banking_token: this.props.navigation.getParam("banking_token"),
            banking_pass: false,
            isLogin: false,
        }
    }

    componentDidMount() {
        this._navListener = this.props.navigation.addListener('didFocus', () => {
            StatusBar.setBarStyle('dark-content');
        });
    }

    componentWillUnmount() {
        this._navListener.remove();
    }

    render() {

        return (
            <View style={styles.content}>
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
                        <Text style={styles.headerTitle}>BANKING LOGIN</Text>
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

                    {!this.state.banking_pass ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text note style={{ color: Colors.BlackText, fontSize: 16, marginBottom: 10 }}>Are you sure to login to the banking system?</Text>
                        <Button
                            title="Confirm Login"
                            activeOpacity={1}
                            underlayColor="transparent"
                            onPress={() => {
                                this.setState({
                                    isLoading: true,
                                });
                                setTimeout(() => { this.bankingLogin() }, 2000);
                            }}
                            loading={this.state.isLoading}
                            loadingProps={{ size: 'small', color: Colors.Primary }}
                            disabled={this.state.isLoading}
                            disabledStyle={styles.confirmButton}
                            buttonStyle={styles.confirmButton}
                            containerStyle={{ marginVertical: 10 }}
                            titleStyle={{ fontWeight: 'bold', color: Colors.Primary }}
                        />
                        <Button
                            title="Cancel"
                            activeOpacity={1}
                            underlayColor="transparent"
                            onPress={() => { this.props.navigation.navigate('Home') }}
                            // loading={this.state.isLoading}
                            // loadingProps={{ size: 'small', color: Colors.BlackText }}
                            disabled={this.state.isLoading}
                            disabledStyle={styles.cancelButton}
                            buttonStyle={styles.cancelButton}
                            containerStyle={{ marginVertical: 10 }}
                            titleStyle={{ fontWeight: 'bold', color: 'white' }}
                        />
                        <Text note style={{ color: Colors.BlackText, fontSize: 14, marginBottom: 10, opacity: 0.5 }}>{this.state.date}</Text>
                    </View> : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text note style={{ color: Colors.BlackText, fontSize: 32, marginBottom: 20, fontWeight: 'bold' }}>Login successful</Text>
                            <Text note style={{ color: Colors.BlackText, fontSize: 20, marginBottom: 10 }}>Please check the machine.</Text>
                            <Text note style={{ color: Colors.BlackText, fontSize: 14, marginTop: 50, opacity: 0.5 }}>Close the page after 5 seconds</Text>
                        </View>

                    }

                </ImageBackground>
            </View>

        );
    }

    bankingLogin = async () => {
        Axios.post(HOST_NAME + HOST_API_VER + "banking_login", {
            token: this.state.banking_token,
        })
            .then((response) => {
                if (response.status === 200) {
                    this.setState({
                        banking_pass: true,
                        isLoading: false,
                    });
                    setTimeout(() => {
                        this.props.navigation.navigate('Home')
                    }, 5000);
                } else {
                    this.setState({
                        isLoading: false,
                    });
                    Toast.show(response.data.message, {
                        duration: Toast.durations.SHORT,
                        position: Toast.positions.CENTER,
                        shadow: true,
                        animation: true,
                        hideOnPress: true,
                        delay: 0,
                    });
                }

            })
            .catch((error) => {
                // console.log(error);
                this.setState({
                    isLoading: false,
                });
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
}


const styles = StyleSheet.create({
    content: {
        flex: 1,
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
    subtitle: {
        color: Colors.BlackText,
        fontSize: 15,
        left: 10,
    },
    confirmButton: {
        height: 50,
        width: 200,
        backgroundColor: '#00aa02',
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 5,
        marginBottom: 5,
    },
    cancelButton: {
        height: 50,
        width: 200,
        backgroundColor: '#df0400',
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 5,
        marginBottom: 5,
    },
});
