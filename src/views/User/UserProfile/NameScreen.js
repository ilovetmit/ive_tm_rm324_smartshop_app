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

export default class NameScreen extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.init();
    }

    init() {
        this.state = {
            first_name: this.props.navigation.getParam("first_name"),
            last_name: this.props.navigation.getParam("last_name"),
            first_nameValid: true,
            last_nameValid: true,
        }
    }

    validateFirstName() {
        const { first_name } = this.state;
        const first_nameValid = first_name.length > 0;
        LayoutAnimation.easeInEaseOut();
        this.setState({ first_nameValid });
        first_nameValid || this.first_name.shake();
        return first_nameValid;
    }

    validateLastName() {
        const { last_name } = this.state;
        const last_nameValid = last_name.length > 0;
        LayoutAnimation.easeInEaseOut();
        this.setState({ last_nameValid });
        last_nameValid || this.last_name.shake();
        return last_nameValid;
    }

    updateData() {
        Keyboard.dismiss();
        LayoutAnimation.easeInEaseOut();
        const first_nameValid = this.validateFirstName();
        const last_nameValid = this.validateLastName();
        if (first_nameValid && last_nameValid) {

            Axios.post(HOST_NAME + HOST_API_VER + "profile", {
                type: "name",
                first_name: this.state.first_name,
                last_name: this.state.last_name,
            })
                .then((response) => {
                    if (response.status === 200) {
                        // console.log(response.data.data);
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

    render() {
        const { first_nameValid } = this.state;
        const { last_nameValid } = this.state;

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
                        <Text style={styles.headerTitle}>Name</Text>
                        <Button
                            title={tran.t('save')}
                            type="clear"
                            titleStyle={{ color: Colors.ButtonText }}
                            onPress={() => this.updateData()}
                        />
                    </View>
                    <View style={styles.itemList}>
                        <FormInput
                            label="First Name"
                            refInput={input => (this.first_name = input)}
                            value={this.state.first_name}
                            onChangeText={first_name => this.setState({ first_name })}
                            placeholder="First Name"
                            placeholderTextColor={Colors.Primary}
                            returnKeyType="next"
                            errorMessage={
                                first_nameValid ? null : tran.t('nameValid')
                            }
                            onSubmitEditing={() => {
                                this.validateFirstName() ?
                                    this.last_name.focus() : this.first_name.focus()
                            }}
                        />

                        <FormInput
                            label="Last Name"
                            refInput={input => (this.last_name = input)}
                            value={this.state.last_name}
                            onChangeText={last_name => this.setState({ last_name })}
                            placeholder="Last Name"
                            placeholderTextColor="#B8B8B8"
                            returnKeyType="next"
                            errorMessage={
                                last_nameValid ? null : tran.t('nameValid')
                            }
                            onSubmitEditing={() => {
                                this.validateLastName() ?
                                    this.updateData() : this.last_name.focus()
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
