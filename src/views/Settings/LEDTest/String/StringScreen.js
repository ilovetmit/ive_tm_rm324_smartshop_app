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
            string1: "test",
            string2: "test",
            string1Valid: true,
            string2Valid: true,
        }
    }

    validateString1() {
        const { string1 } = this.state;
        const string1Valid = string1.length > 0;
        LayoutAnimation.easeInEaseOut();
        this.setState({ string1Valid });
        string1Valid || this.string1Input.shake();
        return string1Valid;
    }

    validateString2() {
        const { string2 } = this.state;
        const string2Valid = string2.length > 0;
        LayoutAnimation.easeInEaseOut();
        this.setState({ string2Valid });
        string2Valid || this.string2Input.shake();
        return string2Valid;
    }


    updateData() {
        Keyboard.dismiss();
        LayoutAnimation.easeInEaseOut();
        const string1Valid = this.validateString1();
        const string2Valid = this.validateString2();
        if (string1Valid && string2Valid) {

            Axios.post(HOST_NAME + HOST_API_VER + "led/string", {
                string1: this.state.string1,
                string2: this.state.string2,
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
        const { string1Valid, string2Valid } = this.state;

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
                                label={'String 1 *'}
                                refInput={input => (this.string1Input = input)}
                                value={String(this.state.string1)}
                                onChangeText={string1 => this.setState({ string1 })}
                                placeholder=''
                                icon={'numeric-1-circle'}
                                placeholderTextColor={Colors.Secondary}
                                errorMessage={
                                    string1Valid ? null : 'Can\'t be blank'
                                }
                                onSubmitEditing={() => {
                                    this.validatePrice1();
                                    this.string2Input.focus();
                                }}
                            />
                            <FormInput
                                label={'String 2 *'}
                                refInput={input => (this.string2Input = input)}
                                value={String(this.state.string2)}
                                onChangeText={string2 => this.setState({ string2 })}
                                placeholder=''
                                icon={'numeric-3-circle'}
                                placeholderTextColor={Colors.Secondary}
                                errorMessage={
                                    string2Valid ? null : 'Can\'t be blank'
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
        await Axios.get(HOST_NAME + HOST_API_VER + 'led/string')
            .then((response) => {
                this.setState({
                    string1: response.data.data[0],
                    string2: response.data.data[1],
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
