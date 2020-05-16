import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Dimensions,
    LayoutAnimation,
    AsyncStorage,
    Alert,
    TextInput,
    KeyboardAvoidingView,
    ScrollView,
    Keyboard, ActivityIndicator, Platform,
} from 'react-native';
import { Input, Button, Icon, Header } from 'react-native-elements';
import { RectButton } from "react-native-gesture-handler";
import Constants from "expo-constants";
import Axios from "axios";
import { NavigationActions, StackActions } from "react-navigation";
import { Chevron } from 'react-native-shapes';
import RNPickerSelect from 'react-native-picker-select';
import Toast from 'react-native-root-toast';
import Colors from '../../../constants/Colors';
import { Updates } from "expo";


const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const BG_IMAGE = require('../../../../assets/images/bg_primary.jpg');

export default class TransferScreen extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.init();
    }

    init() {
        this.user_list = [];
        this.state = {
            isLoading: false,
            from: "VitCoin",
            toUser: "",
            to_account: "VitCoin",
            amount: "",
            remark: "",
            toUserValid: true,
            amountValid: true,

            isPayLoading: false,
            password: "",
            passwordValid: true,
            firstInput: true,
            confirmPassword: false,
            confirmPasswordMessage: "",
            confirmPasswordSubMessage: "",
            passwordPass: false,
        }
    }

    componentWillMount() {
        this.getData();
    }

    validateToUser() {
        const { toUser } = this.state;
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const toUserValid = re.test(toUser);
        LayoutAnimation.easeInEaseOut();
        this.setState({ toUserValid });
        toUserValid || this.toUserInput.shake();
        return toUserValid;
    }

    validateAmount() {
        const { amount } = this.state;
        const re = /^(\d*\.)?\d+$/;
        const amountValid = re.test(amount);
        LayoutAnimation.easeInEaseOut();
        this.setState({ amountValid });
        amountValid || this.amountInput.shake();
        return amountValid;
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
        const toUserValid = this.validateToUser();
        const amountValid = this.validateAmount();
        if (toUserValid && amountValid) {
            setTimeout(() => {
                this.setState({ confirmPassword: true });
                this.passwordInput.focus();
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
        const toUserValid = this.validateToUser();
        const amountValid = this.validateAmount();
        if (toUserValid && amountValid) {
            await Axios.post(HOST_NAME + HOST_API_VER + "transfer", {
                to: this.state.toUser,
                to_account: this.state.to_account,
                amount: this.state.amount,
                from: this.state.from,
                remark: this.state.remark,
            })
                .then((response) => {
                    // console.log(response);
                    if (response.status === 200) {
                        // Toast.show("Transfer Successful", {
                        //     duration: Toast.durations.SHORT,
                        //     position: Toast.positions.CENTER,
                        //     shadow: true,
                        //     animation: true,
                        //     hideOnPress: true,
                        //     delay: 0,
                        // });
                        this.setState({
                            from: "VitCoin",
                            to_account: "",
                            toUser: "",
                            amount: "",
                            remark: "",

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
                                position: Toast.positions.CENTER,
                                shadow: true,
                                animation: true,
                                hideOnPress: true,
                                delay: 0,
                            });
                            this.setState({
                                isPayLoading: false,
                                from: "VitCoin",
                                to_account: "",
                                toUser: "",
                                amount: "",
                                remark: "",
                            });
                            this.props.navigation.replace('Transaction');
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
    };


    render() {
        const {
            toUserValid,
            amountValid,
        } = this.state;

        const to_account_select_ac = [
            { label: 'Saving A/C', value: 'Saving' },
            { label: 'Current A/C', value: 'Current' },
        ];

        const to_account_select_vit = [
            { label: 'VitCoin', value: 'VitCoin' },
        ];

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
                        <Text style={styles.headerTitle}>TRANSFER</Text>
                        <Button
                            title={tran.t('submit')}
                            type="clear"
                            titleStyle={{ color: Colors.ButtonText }}
                            onPress={() => {
                                this.setState({
                                    confirmPasswordMessage: 'Please enter your password',
                                    // isPayLoading:false,
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
                                <Text style={styles.inputLabel}>From *</Text>
                                <RNPickerSelect
                                    placeholder={{}}
                                    items={[
                                        { label: 'VitCoin', value: 'VitCoin' },
                                        { label: 'Saving A/C', value: 'Saving' },
                                        { label: 'Current A/C', value: 'Current' },
                                    ]}
                                    onValueChange={from => this.setState({ from })}
                                    style={{
                                        ...pickerSelectStyles,
                                        iconContainer: {
                                            top: 28,
                                            right: 30,
                                        },
                                    }}
                                    value={this.state.from}
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
                                {/*<FormInput*/}
                                {/*    label={'To *'}*/}
                                {/*    refInput={input => (this.toUserInput = input)}*/}
                                {/*    value={this.state.toUser}*/}
                                {/*    onChangeText={toUser => this.setState({ toUser })}*/}
                                {/*    placeholder={'eg. user@vtc.edu.hk'}*/}
                                {/*    placeholderTextColor={Colors.Secondary}*/}
                                {/*    returnKeyType="next"*/}
                                {/*    errorMessage={*/}
                                {/*        toUserValid ? null : tran.t('emailValid')*/}
                                {/*    }*/}
                                {/*    onSubmitEditing={() => {*/}
                                {/*        this.validateCurrentPassword();*/}
                                {/*        this.amountInput.focus();*/}
                                {/*    }}*/}
                                {/*/>*/}
                                <RNPickerSelect
                                    placeholder={{}}
                                    items={(this.state.from === "VitCoin") ? to_account_select_vit : to_account_select_ac}
                                    onValueChange={to_account => this.setState({ to_account })}
                                    style={{
                                        ...pickerSelectStyles,
                                        iconContainer: {
                                            top: 28,
                                            right: 30,
                                        },
                                    }}
                                    value={this.state.to_account}
                                    useNativeAndroidPickerStyle={false}
                                    textInputProps={{ underlineColor: 'yellow' }}
                                    Icon={() => {
                                        return <Chevron size={1.5} color="gray" />;
                                    }}
                                />
                                <FormInput
                                    label={'Amount *'}
                                    refInput={input => (this.amountInput = input)}
                                    value={this.state.amount}
                                    onChangeText={amount => this.setState({ amount })}
                                    placeholder=''
                                    placeholderTextColor={Colors.Secondary}
                                    keyboardType="numeric"
                                    returnKeyType="next"
                                    errorMessage={
                                        amountValid ? null : 'Please enter a valid decimal numbers'
                                    }
                                    onSubmitEditing={() => {
                                        this.validateAmount();
                                        // this.remarkInput.focus();
                                        this.checkForm();
                                    }}
                                />
                                <Text style={styles.inputLabel}>Remark</Text>
                                <TextInput
                                    textAlignVertical={"top"}
                                    refInput={input => (this.remarkInput = input)}
                                    style={{ height: 100, borderColor: 'gray', borderWidth: 1, borderRadius: 20, margin: 10, fontSize: 16, padding: 10 }}
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
                                            <KeyboardAvoidingView behavior="padding">
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
        await Axios.get(HOST_NAME + HOST_API_VER + "user/list")
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
                        toUser: this.user_list[0].value,
                        isLoading: false,
                    })
                    // console.log(this.user_list);
                }
            })
            .catch((error) => {
                console.log(error)
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
    },
});