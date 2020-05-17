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

export default class BirthdayScreen extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.init();
    }

    init() {
        this.state = {
            birthday: "1999-10-25",
        }
    }

    updateData() {
        Keyboard.dismiss();
        LayoutAnimation.easeInEaseOut();
        this.props.navigation.goBack();
        // const nameValid = this.validateName();
        // if (nameValid) {

        //     Axios.post(HOST_NAME + HOST_API_VER + "user/profile", {
        //         type: "name",
        //         name: this.state.firstName,
        //     })
        //         .then((response) => {
        //             if (response.status === 200) {
        //                 // console.log(response);
        //                 Toast.show(tran.t('update_success'), {
        //                     duration: Toast.durations.SHORT,
        //                     position: Toast.positions.BOTTOM,
        //                     shadow: true,
        //                     animation: true,
        //                     hideOnPress: true,
        //                     delay: 0,
        //                 });
        //                 this.props.navigation.goBack();
        //             } else {
        //                 Toast.show(response.data.message, {
        //                     duration: Toast.durations.SHORT,
        //                     position: Toast.positions.BOTTOM,
        //                     shadow: true,
        //                     animation: true,
        //                     hideOnPress: true,
        //                     delay: 0,
        //                 });
        //             }
        //         })
        //         .catch((error) => {
        //             // console.log(error);
        //             Toast.show(tran.t('unexpected_error'), {
        //                 duration: Toast.durations.SHORT,
        //                 position: Toast.positions.BOTTOM,
        //                 shadow: true,
        //                 animation: true,
        //                 hideOnPress: true,
        //                 delay: 0,
        //             });
        //         });
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
                        <Text style={styles.headerTitle}>Birthday</Text>
                        <Button
                            title={tran.t('save')}
                            type="clear"
                            titleStyle={{ color: Colors.ButtonText }}
                            onPress={() => this.updateData()}
                        />
                    </View>
                    <View style={styles.itemList}>
                        <FormInput
                            label="Birthday"
                            refInput={input => (this.birthday = input)}
                            icon="birthday-cake"
                            type="font-awesome"
                            value={this.state.birthday}
                            onChangeText={birthday => this.setState({ birthday })}
                            placeholder="1999-10-25"
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
            leftIcon={
                <Icon name={icon} type={type} color={Colors.Auxiliary1} size={18} />
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
