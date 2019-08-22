import React, { Component } from 'react';
import {
    Text,
    View,
    Dimensions,
    ActivityIndicator,
    Platform,
    Alert,
    Linking,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions'

import uid from 'uuid/v4';
export default class UploadImage extends Component {
    constructor(props) {
        super(props)
        this.askPermission = this.askPermission.bind(this);
        this.showAlert = this.showAlert.bind(this);
        this.state = {
            endpoint: this.props.endpoint ? this.props.endpoint : null,
            payloadKey: this.props.payloadKey ? this.props.payloadKey : null,
            token: this.props.token ? this.props.token : null,
            callbackUrl: this.props.callbackUrl ? this.props.callbackUrl : null,
            loading: false
        }
        defaultProps = {
            onSuccess: undefined,
            onFailure: undefined,
            onStartUpload: undefined,
            alertTitle: 'Please Allow Access',
            alertMessage: [
                'This applicaton needs access to your photo library to upload images.',
                '\n\n',
                'Please go to Settings of your device and grant permissions to Photos.',
            ].join(''),
            alertNo: 'Not Now',
            alertYes: 'Settings',
        };
    }
    async askPermission() {
        // only if user allows permission to camera roll
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        const { onStartUpload } = this.props;
        // On Android users are prompted every time,
        // so no need to show additional Alert
        if (status !== 'granted') {
            if (Platform.OS === 'ios') this.showAlert();
            return;
        }
    }
    showAlert() {
        const { alertMessage, alertTitle, alertYes, alertNo } = this.props;
        Alert.alert(
            'Please Allow Access',
            [
                'This applicaton needs access to your photo library to upload images.',
                '\n\n',
                'Please go to Settings of your device and grant permissions to Photos.',
            ].join(''),
            [
                { text: 'Not Now', style: 'cancel' },
                { text: 'Settings', onPress: () => Linking.openURL('app-settings:') },
            ],
        );
    }
    uploadResult = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        const { onStartUpload } = this.props;
        console.log(status, 'status');
        if (status !== 'granted') {
            if (Platform.OS === 'ios') this.showAlert();
            return;
        }
        Expo.ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
        }).then((result) => {
            console.log(result, 'result');
            const file = result.uri;
            if (!result.cancelled) {
                this.setState({
                    loading: true
                })
                uploadResponse = this.uploadImageAsync(result.uri).then((reponse) => {
                    console.log(reponse, 'reponse');
                    this.setState({
                        loading: false,
                        uploaded_photo: file
                    })
                });
            }
        })
    }
    async uploadImageAsync(uri) {
        const uriParts = uri.split('.');
        const fileType = uriParts[uriParts.length - 1];
        const { headers } = this.props;
        const endpoint = this.state.endpoint; // Define Endpoint Here
        const payloadKey = this.state.poayloadKey; // Define PayloadKey here Ex. 'file'
        const method = 'POST';
        const formData = new FormData();
        formData.append(payloadKey, {
            uri,
            name: uid(),
            type: `image/${fileType}`,
        });
        const options = {
            method,
            body: formData,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                'Authorization': this.state.token, // If restricted provide appropriate token here otherwise ignore or remove this line
            },
        };
        return fetch(endpoint, options);
    }
    render() {
        if (this.state.loading) {
            return (
                <View style={[style.container]}>
                    <ActivityIndicator size="large" color="#FF8241" />
                </View>
            )
        }
        return (
            <View style={style.imgwrapper}>
                {this.props.callbackUrl != null ? <Image source={{ uri: this.state.uploaded_photo ? this.state.uploaded_photo : this.props.callbackUrl }} style={{ width: 80, height: 80, borderRadius: 40 }} /> : <Image source={{ uri: 'https://www.royaleboost.com/template/default-profile-img.png' }} style={{ width: 80, height: 80 }} />}
                <TouchableOpacity
                    style={style.circleWrapper}
                    onPress={() => {
                        this.uploadResult();
                    }}
                >
                    <View />
                </TouchableOpacity>
            </View>
        )
    }
}
const style = StyleSheet.create({
    imgwrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        marginBottom: 80,
    },
    circleWrapper: {
        backgroundColor: '#ECECEC',
        height: 22,
        width: 22,
        borderWidth: 3,
        borderColor: '#ffffff',
        borderRadius: 11,
        marginLeft: 70,
        marginTop: -80,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})