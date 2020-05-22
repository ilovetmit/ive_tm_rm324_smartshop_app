import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, Dimensions, LayoutAnimation, Keyboard, } from 'react-native';
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

export default class GenderScreen extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.init();
    }

    init() {
        this.state = {
            gender: this.props.navigation.getParam("gender"),
        }
        this.gender_select = [
            { label: 'Male', value: 1 },
            { label: 'Female', value: 2 },
        ];
    }

    updateData() {
        Keyboard.dismiss();
        LayoutAnimation.easeInEaseOut();
        this.props.navigation.goBack();
        // const nameValid = this.validateName();
        // if (nameValid) {

        Axios.post(HOST_NAME + HOST_API_VER + "profile", {
            type: "gender",
            gender: this.state.gender,
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
        // }
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
                        <Text style={styles.headerTitle}>Gender</Text>
                        <Button
                            title={tran.t('save')}
                            type="clear"
                            titleStyle={{ color: Colors.ButtonText }}
                            onPress={() => this.updateData()}
                        />
                    </View>
                    <View style={styles.itemList}>

                        <Text style={styles.inputLabel}>Gender</Text>
                        <RNPickerSelect
                            placeholder={{}}
                            items={this.gender_select}
                            onValueChange={gender => this.setState({ gender })}
                            style={{
                                ...pickerSelectStyles,
                                iconContainer: {
                                    top: 28,
                                    right: 30,
                                },
                            }}
                            value={this.state.gender}
                            useNativeAndroidPickerStyle={false}
                            textInputProps={{ underlineColor: 'yellow' }}
                            Icon={() => {
                                return <Chevron size={1.5} color="gray" />;
                            }}
                        />

                    </View>
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
                <Icon name={icon} type={'simple-line-icon'} color={Colors.Auxiliary1} size={18} />
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
    inputLabel: {
        marginLeft: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.BlackText
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