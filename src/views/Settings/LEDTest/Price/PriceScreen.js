import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, Dimensions, LayoutAnimation, Keyboard, ScrollView } from 'react-native';
import { Input, Button, Icon, Header } from 'react-native-elements';
import { RectButton } from "react-native-gesture-handler";
import Axios from "axios";
import Toast from 'react-native-root-toast';
import Colors from '../../../../constants/Colors';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const BG_IMAGE = require('../../../../../assets/images/bg_second.jpg');

export default class NameScreen extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.init();
    }
    componentWillMount() {
        this.getData();
    };

    init() {
        this.state = {
            price1: 9999,
            price2: 9999,
            price3: 9999,
            price1Valid: true,
            price2Valid: true,
            price3Valid: true,
        }
    }

    validatePrice1() {
        const { price1 } = this.state;
        const re = /^\d+$/;
        const price1Valid = re.test(price1) && price1 >= 0 && price1 <= 9999;
        LayoutAnimation.easeInEaseOut();
        this.setState({ price1Valid });
        price1Valid || this.price1Input.shake();
        return price1Valid;
    }

    validatePrice2() {
        const { price2 } = this.state;
        const re = /^\d+$/;
        const price2Valid = re.test(price2) && price2 >= 0 && price2 <= 9999;
        LayoutAnimation.easeInEaseOut();
        this.setState({ price2Valid });
        price2Valid || this.price2Input.shake();
        return price2Valid;
    }

    validatePrice3() {
        const { price3 } = this.state;
        const re = /^\d+$/;
        const price3Valid = re.test(price3) && price3 >= 0 && price3 <= 9999;
        LayoutAnimation.easeInEaseOut();
        this.setState({ price3Valid });
        price3Valid || this.price3Input.shake();
        return price3Valid;
    }

    updateData() {
        Keyboard.dismiss();
        LayoutAnimation.easeInEaseOut();
        const price1Valid = this.validatePrice1();
        const price2Valid = this.validatePrice2();
        const price3Valid = this.validatePrice3();
        if (price1Valid && price2Valid && price3Valid) {

            Axios.post(HOST_NAME + HOST_API_VER + "led/price", {
                price1: this.state.price1,
                price2: this.state.price2,
                price3: this.state.price3,
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
                        // this.props.navigation.goBack();
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

    render() {
        const { price1Valid, price2Valid, price3Valid } = this.state;

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
                        <Text style={styles.headerTitle}>LED PRICE</Text>
                        <Button
                            title={tran.t('save')}
                            type="clear"
                            titleStyle={{ color: Colors.ButtonText }}
                            onPress={() => this.updateData()}
                        />
                    </View>

                    <ScrollView>
                        <View style={styles.itemList}>
                            <FormInput
                                label={'Price 1 *'}
                                refInput={input => (this.price1Input = input)}
                                value={String(this.state.price1)}
                                numericvalue
                                onChangeText={price1 => this.setState({ price1 })}
                                placeholder=''
                                icon={'numeric-1-circle'}
                                keyboardType="numeric"
                                placeholderTextColor={Colors.Secondary}
                                errorMessage={
                                    price1Valid ? null : 'Please enter a valid decimal numbers and length up to 4'
                                }
                                onSubmitEditing={() => {
                                    this.validatePrice1();
                                    this.price2Input.focus();
                                }}
                            />
                            <FormInput
                                label={'Price 2 *'}
                                refInput={input => (this.price2Input = input)}
                                value={String(this.state.price2)}
                                numericvalue
                                onChangeText={price2 => this.setState({ price2 })}
                                placeholder=''
                                icon={'numeric-2-circle'}
                                keyboardType="numeric"
                                placeholderTextColor={Colors.Secondary}
                                errorMessage={
                                    price2Valid ? null : 'Please enter a valid decimal numbers and length up to 4'
                                }
                                onSubmitEditing={() => {
                                    this.validatePrice2();
                                    this.price3Input.focus();
                                }}
                            />
                            <FormInput
                                label={'Price 3 *'}
                                refInput={input => (this.price3Input = input)}
                                value={String(this.state.price3)}
                                numericvalue
                                onChangeText={price3 => this.setState({ price3 })}
                                placeholder=''
                                icon={'numeric-3-circle'}
                                keyboardType="numeric"
                                placeholderTextColor={Colors.Secondary}
                                errorMessage={
                                    price3Valid ? null : 'Please enter a valid decimal numbers and length up to 4'
                                }
                                onSubmitEditing={() => {
                                    this.validatePrice3();
                                    this.updateData();
                                }}
                            />
                        </View>
                    </ScrollView>
                </ImageBackground>
            </View>

        );

    }

    getData = async () => {
        await Axios.get(HOST_NAME + HOST_API_VER + 'led/price')
            .then((response) => {
                this.setState({
                    price1: response.data.data[0],
                    price2: response.data.data[1],
                    price3: response.data.data[2],
                })
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
                // this._signOutAsync()
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
                <Icon name={icon} type={'material-community'} color={Colors.Auxiliary1} size={18} />
            }
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
