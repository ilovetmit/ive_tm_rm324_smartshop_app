import React, { Component } from 'react';
import {StyleSheet,Text,View,ImageBackground,Dimensions,LayoutAnimation,Picker,ScrollView,KeyboardAvoidingView} from 'react-native';
import {Input, Button, Icon, Header, ListItem} from 'react-native-elements';
import {RectButton} from "react-native-gesture-handler";
import Axios from "axios";
import {NavigationActions, StackActions} from "react-navigation";
import TouchableScale from "react-native-touchable-scale";
import Toast from 'react-native-root-toast';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const BG_IMAGE = require('../../../../assets/images/bg_second.jpg');

export default class CreateServiceRequestScreen extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.init();
    }

    init() {
        this.state = {
            title: "",
            location: "",
            type: "",
            request_type: [],
            content: "",
            remark: "",
            images: "", // TODO image
            titleValid: true,
            locationValid: true,
            contentValid: true,
        }
    }

    componentWillMount() {
        this.getData();
    }

    validateTitle() {
        const { title } = this.state;
        const titleValid = title.length > 0;
        LayoutAnimation.easeInEaseOut();
        this.setState({ titleValid });
        titleValid || this.titleInput.shake();
        return titleValid;
    }

    validateLocation() {
        const { location } = this.state;
        const locationValid = location.length > 0;
        LayoutAnimation.easeInEaseOut();
        this.setState({ locationValid });
        locationValid || this.locationInput.shake();
        return locationValid;
    }

    validateContent() {
        const { content } = this.state;
        const contentValid = content.length > 0;
        LayoutAnimation.easeInEaseOut();
        this.setState({ contentValid });
        contentValid || this.contentInput.shake();
        return contentValid;
    }

    updateData() {
        LayoutAnimation.easeInEaseOut();
        const titleValid = this.validateTitle();
        const locationValid = this.validateLocation();
        const contentValid = this.validateContent();
        if (titleValid && locationValid && contentValid) {
            if(this.state.type===""){
                alert(tran.t('requestTypeValid'));
                return;
            }

            Axios.post(HOST_NAME+"request", {
                title: this.state.title,
                location: this.state.location,
                type: this.state.type,
                body: this.state.content,
                remark: this.state.remark,
            })
                .then((response) => {
                    if (response.status === 200) {
                        // console.log(response);
                        Toast.show(tran.t('create_success'), {
                            duration: Toast.durations.SHORT,
                            position: Toast.positions.BOTTOM,
                            shadow: true,
                            animation: true,
                            hideOnPress: true,
                            delay: 0,
                        });
                        this.props.navigation.replace('ServiceRequestDetail',{ request: response.data.data.request, status:response.data.data.status.variables });
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
            titleValid,
            locationValid,
            contentValid,
        } = this.state;

        const keyboardVerticalOffset = [!titleValid,!locationValid,!contentValid].filter(v => v).length;

        let request_type = this.state.request_type.map((value, index) => {
            return (
                <Picker.Item label={value.type} value={value.id} key={index} />
            )

        });

        // TODO keyboard display bug

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
                        <Text style={styles.headerTitle}>{tran.t('create_request_header')}</Text>
                        <Button
                            title={tran.t('save')}
                            type="clear"
                            titleStyle={{color:'#FFF'}}
                            onPress={() => this.updateData()}
                        />
                    </View>
                    <ScrollView>
                        <View style={styles.itemList}>
                            <FormInput
                                label={"* "+tran.t('title')}
                                refInput={input => (this.titleInput = input)}
                                inputContainerStyle={styles.inputContainer}
                                value={this.state.title}
                                onChangeText={title => this.setState({ title })}
                                placeholder=""
                                returnKeyType="next"
                                errorMessage={
                                    titleValid ? null : tran.t('titleValid')
                                }
                                onSubmitEditing={() => {
                                    this.validateTitle();
                                    this.locationInput.focus();
                                }}
                            />
                            <FormInput
                                label={"* "+tran.t('location')}
                                refInput={input => (this.locationInput = input)}
                                inputContainerStyle={styles.inputContainer}
                                value={this.state.location}
                                onChangeText={location => this.setState({ location })}
                                placeholder=""
                                returnKeyType="next"
                                errorMessage={
                                    locationValid ? null : tran.t('locationValid')
                                }
                                onSubmitEditing={() => {
                                    this.validateLocation();
                                    this.contentInput.focus();
                                }}
                            />
                            <Text style={styles.inputPicker}>{"* "+tran.t('request_type')}</Text>
                            <Picker
                                selectedValue={this.state.type}
                                onValueChange={type => this.setState({ type: type })}
                            >
                                <Picker.Item label="Choose type" value="" />
                                {request_type}
                            </Picker>
                            <FormInput
                                //TODO fix input text in center bug
                                multiline
                                label={"* "+tran.t('content')}
                                refInput={input => (this.contentInput = input)}
                                inputContainerStyle={styles.inputContainerContent}
                                value={this.state.content}
                                onChangeText={content => this.setState({ content })}
                                placeholder=""
                                returnKeyType="next"
                                errorMessage={
                                    contentValid ? null : tran.t('contentValid')
                                }
                                onSubmitEditing={() => {
                                    this.validateContent();
                                }}
                            />
                            {/*<Text>TODO Image</Text>*/}
                            <FormInput
                                //TODO fix input text in center bug
                                multiline
                                label={tran.t('remark')}
                                refInput={input => (this.remarkInput = input)}
                                inputContainerStyle={styles.inputContainerContent}
                                value={this.state.remark}
                                onChangeText={remark => this.setState({ remark })}
                                placeholder=""
                            />
                        </View>
                    </ScrollView>
                </ImageBackground>
            </View>
        );
    }

    getData = async () => {
        await Axios.get(HOST_NAME+"request/type")
            .then((response) => {
                if (response.status === 200) {
                    this.setState({
                        request_type: response.data.data,
                    })
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
    };
}

export const FormInput = props => {
    const { icon, refInput, ...otherProps } = props;
    return (
        <Input
            {...otherProps}
            ref={refInput}
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
    inputContainerContent: {
        paddingLeft: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#691594',
        height: 150,
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
        color:'#691594',
    },
    inputPicker:{
        color:'#691594',
        fontFamily: 'UbuntuBold',
        marginLeft: 10,
    },
    errorInputStyle: {
        marginTop: 0,
        textAlign: 'center',
        color: '#ff2c2e',
    },
});
