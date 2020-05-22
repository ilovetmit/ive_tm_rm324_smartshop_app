import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, Dimensions, LayoutAnimation, Keyboard, } from 'react-native';
import { Input, Button, Icon, Header } from 'react-native-elements';
import { RectButton } from "react-native-gesture-handler";
import Axios from "axios";
import Toast from 'react-native-root-toast';
import Colors from '../../../constants/Colors';

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
            address1: this.props.navigation.getParam("address1"),
            address2: this.props.navigation.getParam("address2"),
            district: this.props.navigation.getParam("district"),
            default: this.props.navigation.getParam('default'),
            address_id: this.props.navigation.getParam('address_id'),
            validateAddress: true,
        }
    }

    validateAddress() {
        if (this.state.address1.length < 0 || this.state.address2.length < 0 || this.state.district.length < 0) {
            this.setState({ validateAddress: false });
        }
    }

    updateData() {
        Keyboard.dismiss();
        LayoutAnimation.easeInEaseOut();
        this.props.navigation.goBack();

        if (this.state.validateAddress) {
            if (this.state.type == "add") {
                Axios.post(HOST_NAME + HOST_API_VER + "address/add", {
                    type: "add",
                    address1: this.state.address1,
                    address2: this.state.address2,
                    district: this.state.district,
                })
                    .then((response) => {
                        if (response.status === 200) {
                            // console.log(response);
                            Toast.show("Add address Success", {
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
            } else {
                Axios.post(HOST_NAME + HOST_API_VER + "address/update" + this.state.address_id, {
                    type: "update",
                    address_id: this.state.address_id,
                    address1: this.state.address1,
                    address2: this.state.address2,
                    district: this.state.district,
                    default: this.state.default,
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
                            placeholder={this.state.address1}
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
                            placeholder={this.state.address2}
                            placeholderTextColor={Colors.Secondary}
                            returnKeyType="next"
                            errorMessage={
                                null
                            }
                            onSubmitEditing={() => {

                            }}
                        />

                        <FormInput
                            label="District"
                            refInput={input => (this.district = input)}
                            value={this.state.district}
                            onChangeText={district => this.setState({ district })}
                            placeholder={this.state.district}
                            placeholderTextColor={Colors.Secondary}
                            returnKeyType="next"
                            errorMessage={
                                null
                            }
                            onSubmitEditing={() => {

                            }}
                        />
                    </View>
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
    inputLabelStyle: {
        color: Colors.Secondary
    },
    errorInputStyle: {
        marginTop: 0,
        textAlign: 'center',
        color: '#FF7575',
    },
});
