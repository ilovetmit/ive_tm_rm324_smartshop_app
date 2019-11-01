import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, Dimensions,LayoutAnimation,} from 'react-native';
import {Input, Button, Icon, Header} from 'react-native-elements';
import {RectButton} from "react-native-gesture-handler";
import Axios from "axios";
import Toast from 'react-native-root-toast';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const BG_IMAGE = require('../../../../assets/images/bg_second.jpg');

export default class EnglishNameScreen extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.init();
    }

    init() {
        this.state = {
            en_first_name: this.props.navigation.getParam("en_first_name"),
            en_last_name: this.props.navigation.getParam("en_last_name"),
            firstNameValid: true,
            lastNameValid: true,
        }
    }

    validateFirstName() {
        const { en_first_name } = this.state;
        const firstNameValid = en_first_name.length > 0;
        LayoutAnimation.easeInEaseOut();
        this.setState({ firstNameValid });
        firstNameValid || this.firstNameInput.shake();
        return firstNameValid;
    }

    validateLastName() {
        const { en_last_name } = this.state;
        const lastNameValid = en_last_name.length > 0;
        LayoutAnimation.easeInEaseOut();
        this.setState({ lastNameValid });
        lastNameValid || this.lastNameInput.shake();
        return lastNameValid;
    }

    updateData() {
        LayoutAnimation.easeInEaseOut();
        const firstNameValid = this.validateFirstName();
        const lastNameValid = this.validateLastName();
        if (firstNameValid && lastNameValid) {

            Axios.post(HOST_NAME+HOST_API_VER+"user/profile", {
                type:"en_name",
                en_first:this.state.en_first_name,
                en_last:this.state.en_last_name,
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

    render() {
        const {
            firstNameValid,
            lastNameValid,
        } = this.state;

        return (

            <View style={styles.content}>
                <ImageBackground source={BG_IMAGE} style={styles.bgImage}>
                    <View style={styles.header}>
                        <Icon
                            name="chevron-left"
                            type="feather"
                            color="#fff"
                            size={40}
                            onPress={() => this.props.navigation.goBack()}
                            underlayColor={'transparent'}
                            style={{padding:10}}
                        />
                        <Text style={styles.headerTitle}>{tran.t('en_name_header')}</Text>
                        <Button
                            title={tran.t('save')}
                            type="clear"
                            titleStyle={{color:'#FFF'}}
                            onPress={() => this.updateData()}
                        />
                    </View>
                    <View style={styles.itemList}>
                        <FormInput
                            label={tran.t('first_name')}
                            refInput={input => (this.firstNameInput = input)}
                            icon="user"
                            value={this.state.en_first_name}
                            onChangeText={en_first_name => this.setState({ en_first_name })}
                            placeholder={tran.t('first_name')}
                            placeholderTextColor={"#000"}
                            returnKeyType="next"
                            errorMessage={
                                firstNameValid ? null : tran.t('firstNameValid')
                            }
                            onSubmitEditing={() => {
                                this.validateFirstName();
                                this.lastNameInput.focus();
                            }}
                        />
                        <FormInput
                            label={tran.t('last_name')}
                            refInput={input => (this.lastNameInput = input)}
                            icon="user"
                            value={this.state.en_last_name}
                            onChangeText={en_last_name => this.setState({ en_last_name })}
                            placeholder={tran.t('last_name')}
                            returnKeyType="next"
                            errorMessage={
                                lastNameValid ? null : tran.t('lastNameValid')
                            }
                            onSubmitEditing={() => {
                                this.validateLastName();
                                this.updateData();
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
                <Icon name={icon} type={'simple-line-icon'} color="#B27ACF" size={18} />
            }
            inputStyle={styles.inputStyle}
            autoFocus={false}
            autoCapitalize="none"
            keyboardAppearance="dark"
            errorStyle={styles.errorInputStyle}
            autoCorrect={false}
            blurOnSubmit={false}
            placeholderTextColor="#691594"
            labelStyle={styles.inputLabelStyle}
        />
    );
};

const styles = StyleSheet.create({
    content:{
        flex: 1,
    },
    topMenu:{
        backgroundColor:'#4F0B72',
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
        color: 'white',
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
        paddingLeft: 8,
        borderRadius: 40,
        borderWidth: 1,
        borderColor: '#691594',
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
    inputLabelStyle:{
        color:'#691594'
    },
    errorInputStyle: {
        marginTop: 0,
        textAlign: 'center',
        color: '#FF7575',
    },
});
