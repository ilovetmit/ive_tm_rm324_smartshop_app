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
    KeyboardAvoidingView, TextInput, Keyboard, LayoutAnimation
} from 'react-native';
import {Input, Button,Text, Icon, Tooltip, Avatar, ListItem} from 'react-native-elements';
import TouchableScale from "react-native-touchable-scale";
import Axios from "axios";
import Toast from 'react-native-root-toast';
import {Updates} from "expo";
import Colors from '../../constants/Colors';
import RNPickerSelect from "react-native-picker-select";
import {Chevron} from "react-native-shapes";
import {FormInput} from "../Banking/Bank/TransferScreen";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const BG_IMAGE = require('../../../assets/images/bg_second.jpg');

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
            storage_item: "",
            storage_time: "",
            storage_price: "",
            refreshing: false,
        }
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
                            <FormInput
                                label={'Storage Item *'}
                                refInput={input => (this.itemInput = input)}
                                value={this.state.toUser}
                                onChangeText={storage_item => this.setState({ storage_item })}
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
                            <FormInput
                                label={'Amount *'}
                                refInput={input => (this.amountInput = input)}
                                value={this.state.amount}
                                onChangeText={amount => this.setState({ amount })}
                                placeholder=''
                                placeholderTextColor={Colors.Secondary}
                                returnKeyType="next"
                                errorMessage={
                                    amountValid ? null : tran.t('passwordValid')
                                }
                                onSubmitEditing={() => {
                                    this.validatePassword();
                                    this.passwordConfirmedInput.focus();
                                }}
                            />
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


const styles = StyleSheet.create({
    content:{
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
    subtitle:{
        color: Colors.BlackText,
        fontSize: 15,
        left: 10,
    },
});
