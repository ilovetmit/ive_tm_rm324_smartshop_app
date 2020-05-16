import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ImageBackground,
    Dimensions,
    ScrollView,
    RefreshControl,
    Alert,
    AsyncStorage,
    KeyboardAvoidingView, TextInput, Keyboard, LayoutAnimation, ActivityIndicator, Platform
} from 'react-native';
import { Input, Button, Text, Icon, Tooltip, Avatar, ListItem } from 'react-native-elements';
import TouchableScale from "react-native-touchable-scale";
import Axios from "axios";
import Toast from 'react-native-root-toast';
import { Updates } from "expo";
import Colors from '../../constants/Colors';
import RNPickerSelect from "react-native-picker-select";
import { Chevron } from "react-native-shapes";

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
        this.user_list = [];
        this.price_list = [];
        this.price_select = [
            { label: 'VitCoin', value: 'VitCoin' },
            { label: 'Saving A/C', value: 'Saving' },
            { label: 'Current A/C', value: 'Current' },
        ];
        this.state = {
            isLoading: false,
            lockerStatus: null,
            storageItem: "",
            storagePlan: [],
            storageItemValid: true,
            account: "",
            toUser: "",
            remark: "",
            refreshing: false,

            isPayLoading: false,
            password: "",
            passwordValid: true,
            firstInput: true,
            confirmPassword: false,
            confirmPasswordMessage: "",
            confirmPasswordSubMessage: "",

            payment_type: "",

            passwordPass: false,
        }
    }

    componentWillMount() {
        this.getData();
    }

    validateStorageItem() {
        const { storageItem } = this.state;
        const storageItemValid = storageItem.length > 0;
        LayoutAnimation.easeInEaseOut();
        this.setState({ storageItemValid });
        storageItemValid || this.storageItemInput.shake();
        return storageItemValid;
    }

    validatePassword() {
        const { password } = this.state;
        const passwordValid = password.length > 0;
        LayoutAnimation.easeInEaseOut();
        this.setState({ passwordValid });
        passwordValid || this.passwordInput.shake();
        return passwordValid;
    }

    checkForm() {
        Keyboard.dismiss();
        LayoutAnimation.easeInEaseOut();
        const storageItemValid = this.validateStorageItem();
        if (storageItemValid) {
            setTimeout(() => {
                this.setState({ confirmPassword: true })
            }, 0);
        } else {
            this.setState({ isPayLoading: false })
        }
    }

    submitOrderCredentials = async () => {
        LayoutAnimation.easeInEaseOut();
        const passwordValid = this.validatePassword();
        if (passwordValid) {
            this.setState({
                isPayLoading: true,
            });
            await Axios.post(HOST_NAME + HOST_API_VER + "check_password", {
                password: this.state.password
            })
                .then((response) => {
                    if (response.status === 200) {
                        // console.log(response);
                        this.updateData();
                    } else if (response.status === 217) {
                        Toast.show(tran.t('msg_current_password_wrong'), {
                            duration: Toast.durations.SHORT,
                            position: Toast.positions.CENTER,
                            shadow: true,
                            animation: true,
                            hideOnPress: true,
                            delay: 0,
                        });
                        this.setState({ password: "", isPayLoading: false, });
                        this.passwordInput.shake();
                        this.passwordInput.force = false;
                    } else {
                        Toast.show(response.data.message, {
                            duration: Toast.durations.SHORT,
                            position: Toast.positions.CENTER,
                            shadow: true,
                            animation: true,
                            hideOnPress: true,
                            delay: 0,
                        });
                        this.setState({ password: "", isPayLoading: false, });
                        this.passwordInput.shake();
                        this.passwordInput.force = false;
                    }
                })
                .catch((error) => {
                    this.setState({ password: "", isPayLoading: false });
                    // console.log(error);
                    Toast.show(tran.t('unexpected_error'), {
                        duration: Toast.durations.SHORT,
                        position: Toast.positions.CENTER,
                        shadow: true,
                        animation: true,
                        hideOnPress: true,
                        delay: 0,
                    });
                });
        }
    };

    updateData = async () => {
        Keyboard.dismiss();
        LayoutAnimation.easeInEaseOut();
        const storageItemValid = this.validateStorageItem();
        if (storageItemValid) {
            var price = this.state.storagePlan['price'];
            if (this.state.account == "VitCoin") {
                price = this.state.storagePlan['price'] * 0.5;
            }
            await Axios.post(HOST_NAME + HOST_API_VER + "locker/order", {
                to: this.state.toUser,
                account: this.state.account,
                amount: price,
                item: this.state.storageItem,
                time: this.state.storagePlan['save_day'],
                remark: this.state.remark,
            })
                .then((response) => {
                    // console.log(response);
                    if (response.status === 200) {
                        this.setState({
                            firstInput: false,
                            passwordPass: true,
                            confirmPasswordMessage: 'System is completing the transaction...',
                            confirmPasswordSubMessage: 'Payment successful!',
                        });
                        setTimeout(() => {
                            this.setState({
                                password: "",
                                isLoading: false,
                                isPayLoading: false,
                                confirmPassword: false,
                                confirmPasswordMessage: 'Please enter your password',
                            });
                            Toast.show('Transaction successful!', {
                                duration: Toast.durations.LONG,
                                position: Toast.positions.BOTTOM,
                                shadow: true,
                                animation: true,
                                hideOnPress: true,
                                delay: 0,
                            });
                            this.setState({
                                isPayLoading: false,
                                from: "VitCoin",
                                toUser: "",
                                amount: "",
                                remark: "",
                            });
                            Alert.alert(
                                'Message',
                                response.data.message,
                                [
                                    {
                                        text: tran.t('yes'), onPress: () => this.props.navigation.replace('Transaction')
                                    }
                                ]
                            );
                        }, 2000);
                    } else {
                        Alert.alert(tran.t('error'), response.data.message);
                        this.setState({
                            password: "",
                            isLoading: false,
                            isPayLoading: false,
                            confirmPassword: false,
                            confirmPasswordMessage: 'Please enter your password',
                        });
                    }
                })
                .catch((error) => {
                    // console.log(error);
                    this.setState({
                        isPayLoading: false,
                    });
                    Toast.show(tran.t('unexpected_error'), {
                        duration: Toast.durations.SHORT,
                        position: Toast.positions.BOTTOM,
                        shadow: true,
                        animation: true,
                        hideOnPress: true,
                        delay: 0,
                    });
                });
        }
    }

    render() {
        const {
            // toUserValid,
            storageItemValid,
        } = this.state;

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
                        <Text style={styles.headerTitle}>LOCKER</Text>
                        <Button
                            title={tran.t('submit')}
                            type="clear"
                            titleStyle={{ color: Colors.ButtonText }}
                            onPress={() => {
                                this.setState({
                                    confirmPasswordMessage: 'Please enter your password',
                                    // isPayLoading:false,
                                    payment_type: 'Saving',
                                });
                                this.checkForm()
                            }}
                        />
                    </View>

                    {this.state.isLoading ?
                        <View style={styles.loading}>
                            <ActivityIndicator style={styles.indicator} size="large" color={Colors.BlackText} />
                        </View>
                        :
                        <KeyboardAvoidingView
                            style={{ flex: 1 }}
                            behavior="height"
                        >
                            <ScrollView style={[styles.itemList, { flex: 1 }]} ref={component => { this.TransferScrollView = component; }}>
                                <FormInput
                                    label={'Storage Item *'}
                                    refInput={input => (this.storageItemInput = input)}
                                    value={this.state.storageItem}
                                    onChangeText={storageItem => this.setState({ storageItem })}
                                    icon="grid"
                                    placeholder="eg. a book"
                                    disabled={this.state.isPayLoading}
                                    placeholderTextColor={Colors.Secondary}
                                    returnKeyType="next"
                                    errorMessage={
                                        storageItemValid ? null : 'Storage Item can\'t be blank'
                                    }
                                    onSubmitEditing={() => {
                                        this.validateStorageItem();
                                        // this.amountInput.focus();
                                    }}
                                />
                                <Text style={styles.inputLabel}>Storage Time *</Text>
                                <RNPickerSelect
                                    placeholder={{}}
                                    items={this.price_list}
                                    onValueChange={storagePlan => this.setState({ storagePlan })}
                                    disabled={this.state.isPayLoading}
                                    style={{
                                        ...pickerSelectStyles,
                                        iconContainer: {
                                            top: 28,
                                            right: 30,
                                        },
                                    }}
                                    value={this.state.storagePlan}
                                    useNativeAndroidPickerStyle={false}
                                    textInputProps={{ underlineColor: 'yellow' }}
                                    Icon={() => {
                                        return <Chevron size={1.5} color="gray" />;
                                    }}
                                />
                                <Text style={styles.inputLabel}>Price:</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10, marginBottom: 10 }}>
                                    <Text style={{ fontSize: 20, color: Colors.ButtonText }}>HK$ {this.state.storagePlan['price']} = VitCoin</Text>
                                    <Text style={{ fontSize: 35, fontWeight: 'bold', color: Colors.Fail }}> {this.state.storagePlan['price'] * 0.5}</Text>
                                </View>

                                <Text style={styles.inputLabel}>Payment *</Text>
                                <RNPickerSelect
                                    placeholder={{}}
                                    items={this.price_select}
                                    onValueChange={account => this.setState({ account })}
                                    disabled={this.state.isPayLoading}
                                    style={{
                                        ...pickerSelectStyles,
                                        iconContainer: {
                                            top: 28,
                                            right: 30,
                                        },
                                    }}
                                    value={this.state.account}
                                    useNativeAndroidPickerStyle={false}
                                    textInputProps={{ underlineColor: 'yellow' }}
                                    Icon={() => {
                                        return <Chevron size={1.5} color="gray" />;
                                    }}
                                />

                                <Text style={styles.inputLabel}>To *</Text>
                                <RNPickerSelect
                                    placeholder={{}}
                                    items={this.user_list}
                                    disabled={this.state.isPayLoading}
                                    onValueChange={toUser => this.setState({ toUser })}
                                    style={{
                                        ...pickerSelectStyles,
                                        iconContainer: {
                                            top: 28,
                                            right: 30,
                                        },
                                    }}
                                    value={this.state.toUser}
                                    useNativeAndroidPickerStyle={false}
                                    textInputProps={{ underlineColor: 'yellow' }}
                                    Icon={() => {
                                        return <Chevron size={1.5} color="gray" />;
                                    }}
                                />
                                <Text style={styles.inputLabel}>Remark</Text>
                                <TextInput
                                    textAlignVertical={"top"}
                                    disabled={this.state.isPayLoading}
                                    refInput={input => (this.remarkInput = input)}
                                    style={{ height: 100, borderColor: '#003459', borderWidth: 1, borderRadius: 20, margin: 10, fontSize: 16, padding: 10, backgroundColor: Colors.NoticeText, }}
                                    multiline
                                    onChangeText={remark => this.setState({ remark })}
                                    value={this.state.remark}
                                    onFocus={() => this.TransferScrollView.scrollTo({ x: 0, y: 750, animated: true })}
                                />
                            </ScrollView>
                            {
                                this.state.confirmPassword ?
                                    <View style={styles.tabBarInfoContainer}>
                                        <Icon
                                            name='close'
                                            size={30}
                                            type='evilicon'
                                            containerStyle={{ position: 'absolute', top: 10, right: 10 }}
                                            color={'#a6a6a6'}
                                            onPress={() => !this.state.isLoading ? this.setState({
                                                confirmPassword: false,
                                                confirmPasswordMessage: 'Please enter your password',
                                                isPayLoading: false,
                                                password: "",
                                            }) : null}
                                        />
                                        {this.state.firstInput ?
                                            <Icon
                                                name={'lock-outline'}
                                                size={48}
                                                type='material-community'
                                                containerStyle={{ paddingTop: 10 }}
                                                color={'#a6a6a6'}
                                            /> :
                                            <Icon
                                                name={this.state.passwordPass ? 'check-circle' : 'close-circle'}
                                                size={48}
                                                type='material-community'
                                                style={{ marginBottom: 5 }}
                                                color={this.state.passwordPass ? '#0F0' : '#F00'}
                                            />}
                                        <Text style={styles.tabBarInfoText}>
                                            {this.state.confirmPasswordMessage}
                                        </Text>
                                        {this.state.passwordPass ? <Text style={styles.tabBarText}>
                                            {this.state.confirmPasswordSubMessage}
                                        </Text> : <View />}
                                        {this.state.passwordPass ? <ActivityIndicator style={{ justifyContent: 'center', marginBottom: 10, marginTop: 5 }} size="large" color="#0C0" /> : <View />}

                                        {!this.state.passwordPass ?
                                            <KeyboardAvoidingView behavior="height">
                                                <FormInput
                                                    // label={tran.t('new_password')}
                                                    refInput={input => (this.passwordInput = input)}
                                                    icon="lock"
                                                    value={this.state.password}
                                                    onChangeText={password => this.setState({ password })}
                                                    placeholder={tran.t('password')}
                                                    secureTextEntry
                                                    placeholderTextColor={"#000"}
                                                    placeholderStyle={{ opacity: 0.6 }}
                                                    returnKeyType="next"
                                                    errorMessage={
                                                        this.state.passwordValid ? null : 'Your password can\'t be blank'
                                                    }
                                                    onSubmitEditing={() => {
                                                        this.validatePassword();
                                                        this.submitOrderCredentials();
                                                    }}
                                                />
                                                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                                    <Button
                                                        title="Submit"
                                                        activeOpacity={1}
                                                        underlayColor="transparent"
                                                        onPress={this.submitOrderCredentials.bind(this)}
                                                        // onPress={()=>this.setState({
                                                        //     confirmPassword:true,
                                                        //     confirmPasswordMessage:'Please enter your password',
                                                        //     isLoading:true,
                                                        // })}
                                                        loading={this.state.isPayLoading}
                                                        loadingProps={{ size: 'small', color: 'white' }}
                                                        disabled={this.state.isPayLoading}
                                                        disabledStyle={styles.submitButton}
                                                        buttonStyle={styles.submitButton}
                                                        containerStyle={{ marginVertical: 10 }}
                                                        titleStyle={{ fontWeight: 'bold', color: 'white' }}
                                                    />
                                                </View>
                                            </KeyboardAvoidingView>
                                            : <View />}
                                    </View>
                                    : <View />
                            }
                        </KeyboardAvoidingView>
                    }



                </ImageBackground>
            </View>

        );
    }


    getData = async () => {
        this.setState({
            isLoading: true,
        });
        await Axios.get(HOST_NAME + HOST_API_VER + "locker/using")
            .then((response) => {
                var locker = response.data.data;
                if (locker) {
                    this.setState({
                        lockerStatus: true,
                    });
                    var price = response.data.data.price;
                    // console.log(price);
                    for (var i = 0; i < price.length; ++i) {
                        this.price_list.push({
                            label: price[i].plan,
                            value: price[i],
                        });
                    }
                    Axios.get(HOST_NAME + HOST_API_VER + "user/list")
                        .then((response) => {
                            if (response.status === 200) {
                                var users = response.data.data;
                                for (var i = 0; i < users.length; ++i) {
                                    this.user_list.push({
                                        label: users[i].email,
                                        value: users[i].email,
                                    });
                                }
                                this.setState({
                                    storagePlan: price[0],
                                    toUser: this.user_list[0].value,
                                    account: this.price_select[0].value,
                                    isLoading: false,
                                })
                                // console.log(this.user_list);
                            }
                        })
                        .catch((error) => {
                            console.log(error)
                        });
                } else {
                    this.setState({
                        lockerStatus: false,
                    });
                    Alert.alert(
                        tran.t('confirm'),
                        "There are currently no available lockers.",
                        [
                            {
                                text: tran.t('back'), onPress: async () => {
                                    this.props.navigation.navigate('Locker')
                                }
                            }
                        ]
                    );
                }
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


}

export const FormInput = props => {
    const { icon, refInput, ...otherProps } = props;
    return (
        <Input
            {...otherProps}
            ref={refInput}
            inputContainerStyle={styles.inputContainer}
            leftIcon={
                <Icon name={icon} type={'simple-line-icon'} color={Colors.Secondary} size={18} />
            }
            inputStyle={styles.inputStyle}
            autoFocus={false}
            autoCapitalize="none"
            keyboardAppearance="dark"
            errorStyle={styles.errorInputStyle}
            autoCorrect={false}
            blurOnSubmit={false}
            placeholderTextColor={Colors.Secondary}
            labelStyle={styles.inputLabelStyle}
        />
    );
};

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

const styles = StyleSheet.create({
    loading: {
        justifyContent: 'center',
        alignContent: 'center',
        width: '100%',
        height: '100%'
    },
    indicator: {
        justifyContent: 'center',
    },
    content: {
        flex: 1,
    },
    bgImage: {
        flex: 1,
        top: 0,
        left: 0,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        opacity: 0.85,
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
    button: {
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    text: {
        padding: 10,
        color: Colors.BlackText,
        fontSize: 20,
    },
    bodyText: {
        textAlign: 'justify',
        color: '#000',
        fontSize: 18,
    },
    body: {
        marginTop: 5,
        marginBottom: 10,
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderRadius: 10,
        marginHorizontal: 10,
        padding: 10,
    },
    product_text: {
        padding: 10,
        color: Colors.BlackText,
        textAlign: 'center',
        fontSize: 22,
    },
    product_image: {
        flex: 1,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT / 2,
    },
    product_title: {
        marginTop: 10,
        marginLeft: 5,
        fontSize: 16,
        fontWeight: "bold",
        // fontFamily: 'regular',
        // textAlign: 'justify',
    },
    product_description: {
        marginTop: 3,
        marginLeft: 5,
        fontSize: 14,
        color: "#747474",
    },
    product_price_type: {
        marginLeft: 5,
        fontSize: 14,
        color: "#ff2c2e",
    },
    product_price: {
        marginLeft: 1,
        fontSize: 24,
        fontFamily: "UbuntuBold",
        color: "#ff2c2e",
    },
    product_type: {
        position: 'absolute', top: 5, right: 5,
        backgroundColor: 'rgba(255,0,0,0.6)',
        borderRadius: 8,
        paddingHorizontal: 5,
        paddingVertical: 3,
    },
    buyButton: {
        height: 50,
        width: 100,
        backgroundColor: '#00c800',
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 5,
        marginBottom: 5,
    },
    buyVitButton: {
        height: 50,
        width: 200,
        backgroundColor: '#ffbd2a',
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 5,
        marginBottom: 5,
    },
    disableVitButton: {
        height: 50,
        width: 200,
        backgroundColor: '#5e5e5e',
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 5,
        marginBottom: 5,
    },
    disableButton: {
        height: 50,
        width: 100,
        backgroundColor: '#5e5e5e',
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 5,
        marginBottom: 5,
    },
    submitButton: {
        height: 50,
        width: 200,
        backgroundColor: '#3a67ff',
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 5,
        marginBottom: 5,
    },
    tabBarInfoContainer: {
        // flex:1,
        // position: 'absolute',
        // bottom: 0,
        // left: 0,
        // right: 0,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { width: 0, height: -3 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 20,
            },
        }),
        alignItems: 'center',
        backgroundColor: '#fbfbfb',
    },
    tabBarText: {
        fontSize: 24,
        color: 'rgb(37,39,48)',
        textAlign: 'center',
        marginBottom: 5,
    },
    tabBarInfoText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        textAlign: 'center',
        marginBottom: 5,
    },
    navigationFilename: {
        marginTop: 5,
    },
    inputContainer: {
        width: SCREEN_WIDTH - 30,
        paddingLeft: 8,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.Secondary,
        height: 45,
        marginVertical: 10,
        backgroundColor: Colors.NoticeText,
    },
    inputStyle: {
        flex: 1,
        marginLeft: 10,
        color: 'black',
        fontFamily: 'UbuntuLight',
        fontSize: 16,
    },
    inputLabelStyle: {
        color: Colors.Secondary
    },
    errorInputStyle: {
        marginTop: 0,
        textAlign: 'center',
        color: '#FF7575',
    },
    inputLabel: {
        marginLeft: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.Secondary
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        height: 45,
        margin: 10,
        fontSize: 16,
        paddingLeft: 20,
        borderWidth: 1,
        borderColor: Colors.Secondary,
        borderRadius: 40,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
        backgroundColor: Colors.NoticeText,
    },
    inputAndroid: {
        height: 45,
        margin: 10,
        fontSize: 16,
        paddingLeft: 20,
        borderWidth: 1,
        borderColor: Colors.Secondary,
        borderRadius: 40,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
        backgroundColor: Colors.NoticeText,
    },
});