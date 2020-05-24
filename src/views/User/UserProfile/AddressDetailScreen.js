import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, Dimensions, LayoutAnimation, Keyboard, Alert } from 'react-native';
import { Input, Button, Icon, Header } from 'react-native-elements';
import { RectButton } from "react-native-gesture-handler";
import Axios from "axios";
import Toast from 'react-native-root-toast';
import Colors from '../../../constants/Colors';
import RNPickerSelect from "react-native-picker-select";
import { Chevron } from "react-native-shapes";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const BG_IMAGE = require('../../../../assets/images/bg_second.jpg');

export default class AddressDetailScreen extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.init();
    }

    init() {
        this.state = {
            type: this.props.navigation.getParam("type"),
            address: this.props.navigation.getParam("address"),
            validateAddress: true,
            address1: "",
            address2: "",
            district: 1,
        }

        this.district_select = [
            { label: 'Kwai Tsing, New Territories', value: 1 },
            { label: 'Tsuen Wan, New Territories', value: 2 },
            { label: 'Tuen Mun, New Territories', value: 3 },
            { label: 'Yuen Long, New Territories', value: 4 },
            { label: 'North, New Territories', value: 5 },
            { label: 'Tai Po, New Territories', value: 6 },
            { label: 'Sha Tin, New Territories', value: 7 },
            { label: 'Sai Kung, New Territories', value: 8 },
            { label: 'Islands, New Territories', value: 9 },
            { label: 'Yau Tsim Mong, Kowloon', value: 10 },
            { label: 'Sham Shui Po, Kowloon', value: 11 },
            { label: 'Kowloon City, Kowloon', value: 12 },
            { label: 'Wong Tai Sin, Kowloon', value: 13 },
            { label: 'Kwun Tong, Kowloon', value: 14 },
            { label: 'Central and Western, Hong Kong', value: 15 },
            { label: 'Wan Chai, Hong Kong', value: 16 },
            { label: 'Eastern, Hong Kong', value: 17 },
            { label: 'Southern, Hong Kong', value: 18 },
        ];
    }

    componentWillMount() {
        this.setState({
            address1: this.state.address.address1,
            address2: this.state.address.address2,
            district: this.state.address.district
        })
    }

    validateAddress() {
        if (this.state.address1.length < 0 || this.state.address2.length < 0 || this.state.district.length < 0) {
            this.setState({ validateAddress: false });
        }
    }

    updateData() {
        Keyboard.dismiss();
        LayoutAnimation.easeInEaseOut();
        if (this.state.validateAddress) {
            if (this.state.type == "add") {
                Axios.post(HOST_NAME + HOST_API_VER + "address", {
                    type: "add",
                    address1: this.state.address1,
                    address2: this.state.address2,
                    district: this.state.district,
                })
                    .then((response) => {
                        if (response.status === 200) {
                            // console.log(response);
                            Toast.show(response.data.message, {
                                duration: Toast.durations.SHORT,
                                position: Toast.positions.BOTTOM,
                                shadow: true,
                                animation: true,
                                hideOnPress: true,
                                delay: 0,
                            });
                            this.props.navigation.goBack();
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
                        console.log(error);
                        Toast.show(tran.t('unexpected_error'), {
                            duration: Toast.durations.SHORT,
                            position: Toast.positions.BOTTOM,
                            shadow: true,
                            animation: true,
                            hideOnPress: true,
                            delay: 0,
                        });
                    });
            } else {
                Axios.post(HOST_NAME + HOST_API_VER + "address", {
                    type: "update",
                    address_id: this.state.address.id,
                    address1: this.state.address1,
                    address2: this.state.address2,
                    district: this.state.district,
                    default: this.state.address.default,
                })
                    .then((response) => {
                        if (response.status === 200) {
                            // console.log(response);
                            Toast.show(tran.t('update_success'), {
                                duration: Toast.durations.SHORT,
                                position: Toast.positions.BOTTOM,
                                shadow: true,
                                animation: true,
                                hideOnPress: true,
                                delay: 0,
                            });
                            this.props.navigation.goBack();
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
                        console.log(error);
                        console.log(this.state.type)
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
    }

    addressDelete = async (value) => {
        Alert.alert(
            tran.t('confirm'),
            "Are you sure you want to Delete the address?",
            [
                {
                    text: tran.t('yes'), onPress: async () => {
                        Axios.delete(HOST_NAME + HOST_API_VER + "address/" + this.state.address.id, {
                            default: this.state.address.default,
                            address_id: this.state.address.id,
                        })
                            .then((response) => {
                                if (response.status === 200) {
                                    // console.log(response);
                                    Toast.show("Delete success.", {
                                        duration: Toast.durations.SHORT,
                                        position: Toast.positions.CENTER,
                                        shadow: true,
                                        animation: true,
                                        hideOnPress: true,
                                        delay: 0,
                                    });
                                    this.props.navigation.goBack()
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
                            })
                            .catch((error) => {
                                console.log(error);
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
                        <Text style={styles.headerTitle}>Delivery Address</Text>
                        <Button
                            title={tran.t('save')}
                            type="clear"
                            titleStyle={{ color: Colors.ButtonText }}
                            onPress={() => this.updateData()}
                        />
                    </View>
                    <View style={styles.itemList}>
                        <FormInput
                            label="Flat and Floor"
                            refInput={input => (this.address1 = input)}
                            value={this.state.address1}
                            onChangeText={address1 => this.setState({ address1 })}
                            placeholder="Flat/Floor"
                            placeholderTextColor={Colors.Secondary}
                            returnKeyType="next"
                            errorMessage={
                                null
                            }
                            onSubmitEditing={() => {

                            }}
                        />

                        <FormInput
                            label="Street Name"
                            refInput={input => (this.address2 = input)}
                            value={this.state.address2}
                            onChangeText={address2 => this.setState({ address2 })}
                            placeholder="Building"
                            placeholderTextColor={Colors.Secondary}
                            returnKeyType="next"
                            errorMessage={
                                null
                            }
                            onSubmitEditing={() => {

                            }}
                        />

                        {/* <FormInput
                            label="District"
                            refInput={input => (this.district = input)}
                            value={this.state.district}
                            onChangeText={district => this.setState({ district })}
                            placeholder="district number"
                            placeholderTextColor={Colors.Secondary}
                            returnKeyType="next"
                            errorMessage={
                                null
                            }
                            onSubmitEditing={() => {

                            }}
                        /> */}
                        <Text style={styles.inputLabel}>District</Text>
                        <RNPickerSelect
                            placeholder={{}}
                            items={this.district_select}
                            onValueChange={district => this.setState({ district })}
                            style={{
                                ...pickerSelectStyles,
                                iconContainer: {
                                    top: 28,
                                    right: 30,
                                },
                            }}
                            value={this.state.district}
                            useNativeAndroidPickerStyle={false}
                            textInputProps={{ underlineColor: 'yellow' }}
                            Icon={() => {
                                return <Chevron size={1.5} color="gray" />;
                            }}
                        />
                    </View>
                    {this.state.type == "update" ?
                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                            <Button
                                title={"Delete"}
                                activeOpacity={1}
                                underlayColor="transparent"
                                onPress={() => this.addressDelete()}
                                buttonStyle={[styles.deleteButton]}
                                containerStyle={{ marginVertical: 10 }}
                                titleStyle={{ fontWeight: 'bold', color: Colors.BlackText }}
                            />
                        </View>
                        :
                        <View></View>
                    }
                </ImageBackground>
            </View>

        );

    }
}

export const FormInput = props => {
    const { icon, type, refInput, ...otherProps } = props;
    return (
        <Input
            {...otherProps}
            ref={refInput}
            inputContainerStyle={styles.inputContainer}
            inputStyle={styles.inputStyle}
            autoFocus={false}
            autoCapitalize="none"
            keyboardAppearance="dark"
            errorStyle={styles.errorInputStyle}
            autoCorrect={false}
            blurOnSubmit={false}
            placeholderTextColor="#B8B8B8"
            labelStyle={styles.inputLabelStyle}
        />
    );
};

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
        paddingVertical: 10,
    },
    inputContainer: {
        paddingLeft: 8,
        borderRadius: 40,
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
    inputLabel: {
        marginLeft: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.Secondary
    },
    inputLabelStyle: {
        color: Colors.Secondary
    },
    errorInputStyle: {
        marginTop: 0,
        textAlign: 'center',
        color: '#FF7575',
    },
    deleteButton: {
        height: 50,
        width: 100,
        backgroundColor: Colors.Fail,
        borderWidth: 2.5,
        borderColor: "#CD5C5C",
        borderRadius: 30,
    }
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