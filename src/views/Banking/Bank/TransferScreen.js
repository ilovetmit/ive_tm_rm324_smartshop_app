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
    Keyboard,
} from 'react-native';
import {Input, Button, Icon, Header} from 'react-native-elements';
import {RectButton} from "react-native-gesture-handler";
import Constants from "expo-constants";
import Axios from "axios";
import {NavigationActions, StackActions} from "react-navigation";
import { Chevron } from 'react-native-shapes';
import RNPickerSelect from 'react-native-picker-select';
import Toast from 'react-native-root-toast';
import Colors from '../../../constants/Colors';
import {Updates} from "expo";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const BG_IMAGE = require('../../../../assets/images/bg_second.jpg');

export default class TransferScreen extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.init();
    }

    init() {
        this.state = {
            form: "VitCoin",
            toUser: "",
            to_account: "",
            amount: "",
            remark: "",
            toUserValid: true,
            amountValid: true,
        }
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


    updateData= async () => {
        Keyboard.dismiss();
        LayoutAnimation.easeInEaseOut();
        const toUserValid = this.validateToUser();
        const amountValid = this.validateAmount();
        if (toUserValid && amountValid) {
            await Axios.post(HOST_NAME+HOST_API_VER+"transfer", {
                to:this.state.toUser,
                to_account:this.state.to_account,
                amount:this.state.amount,
                form:this.state.form,
                remark:this.state.remark,
            })
                .then((response) => {
                    // console.log(response);
                    if (response.status === 200) {
                        Alert.alert(
                            'Message',
                            'Transfer Successful!',
                            [
                                {
                                    text: tran.t('yes'), onPress: ()=>this.props.navigation.replace('Transaction')
                                }
                            ]
                        );
                        this.setState({
                            form: "VitCoin",
                            to_account: "",
                            toUser: "",
                            amount: "",
                            remark: "",
                        })
                    } else{
                        Alert.alert(tran.t('error'), response.data.message);
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
            { label: 'Vit Coin', value: 'VitCoin' },
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
                            style={{padding:10}}
                        />
                        <Text style={styles.headerTitle}>TRANSFER</Text>
                        <Button
                            title={tran.t('submit')}
                            type="clear"
                            titleStyle={{color:Colors.ButtonText}}
                            onPress={() => this.updateData()}
                        />
                    </View>

                    <KeyboardAvoidingView
                        style={{ flex: 1 }}
                        behavior="padding"
                    >
                        <ScrollView style={[styles.itemList,{flex:1}]} ref={component => { this.TransferScrollView = component; }}>
                            <Text style={styles.inputLabel}>Form *</Text>
                            <RNPickerSelect
                                placeholder={{}}
                                items={[
                                    { label: 'Vit Coin', value: 'VitCoin' },
                                    { label: 'Saving A/C', value: 'Saving' },
                                    { label: 'Current A/C', value: 'Current' },
                                ]}
                                onValueChange={form => this.setState({ form })}
                                style={{
                                    ...pickerSelectStyles,
                                    iconContainer: {
                                        top: 28,
                                        right: 30,
                                    },
                                }}
                                value={this.state.form}
                                useNativeAndroidPickerStyle={false}
                                textInputProps={{ underlineColor: 'yellow' }}
                                Icon={() => {
                                    return <Chevron size={1.5} color="gray" />;
                                }}
                            />
                            <FormInput
                                label={'To *'}
                                refInput={input => (this.toUserInput = input)}
                                value={this.state.toUser}
                                onChangeText={toUser => this.setState({ toUser })}
                                placeholder={'eg. user@vtc.edu.hk'}
                                placeholderTextColor={Colors.Secondary}
                                returnKeyType="next"
                                errorMessage={
                                    toUserValid ? null : tran.t('emailValid')
                                }
                                onSubmitEditing={() => {
                                    this.validateCurrentPassword();
                                    this.amountInput.focus();
                                }}
                            />
                            <RNPickerSelect
                                placeholder={{}}
                                items={(this.state.form==="VitCoin")?to_account_select_vit:to_account_select_ac}
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
                                    this.validatePassword();
                                    this.passwordConfirmedInput.focus();
                                }}
                            />
                            <Text style={styles.inputLabel}>Remark</Text>
                            <TextInput
                                textAlignVertical={"top"}
                                refInput={input => (this.remarkInput = input)}
                                style={{ height:100, borderColor: 'gray', borderWidth: 1,borderRadius: 20, margin:10, fontSize:16,padding: 10}}
                                multiline
                                onChangeText={remark => this.setState({ remark })}
                                value={this.state.remark}
                                onFocus={() => this.TransferScrollView.scrollTo({ x: 0, y: 750, animated: true })}
                            />
                        </ScrollView>
                    </KeyboardAvoidingView>
                </ImageBackground>
            </View>

        );

    }
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
        paddingVertical: 10,
    },
    inputContainer: {
        borderRadius: 20,
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
    inputLabel:{
        marginLeft:10,
        fontSize: 16,
        fontWeight:'bold',
        color:Colors.Secondary
    },
    inputLabelStyle:{
        color:Colors.Secondary
    },
    errorInputStyle: {
        marginTop: 0,
        textAlign: 'center',
        color: '#FF7575',
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