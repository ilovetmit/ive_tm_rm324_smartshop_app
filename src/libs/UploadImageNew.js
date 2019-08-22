import * as React from 'react';
import { Button, Image, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { ImagePicker, Permissions, Constants } from 'expo';

export default class ImagePickerExample extends React.Component {

   
        state = {
            image: null,
        }
    
    

    render() {
        let { image } = this.state;



        if (this.state.loading) {
            return (
                <View style={[style.container]}>
                    <ActivityIndicator size="large" color="#FF8241" />
                </View>
            )
        }
        return (
            <View style={style.imgwrapper}>
                
                {this.props.url != "" ? <Image source={{uri: this.props.url} } style={{ width: 80, height: 80, borderRadius: 40 }} />
                    : <Image source={{ uri: 'https://www.royaleboost.com/template/default-profile-img.png' }} style={{ width: 80, height: 80, borderRadius: 40 }} />}
                <TouchableOpacity
                    style={style.circleWrapper}
                    onPress={this._pickImage}
                >
                    <Text>+</Text>
                </TouchableOpacity>
            </View>
        )

    }

    componentDidMount() {
        this.getPermissionAsync();
    }

    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    }

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
        });

        console.log(result);

        if (!result.cancelled) {
            this.setState({ image: result.uri });
        }

        // ImagePicker saves the taken photo to disk and returns a local URI to it
        let localUri = result.uri;
        let filename = localUri.split('/').pop();

        // Infer the type of the image
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        // Upload the image using the fetch and FormData APIs
        let formData = new FormData();
        // Assume "photo" is the name of the form field the server expects
        formData.append('image', { uri: localUri, name: filename, type });

        return await fetch('https://ss.anchorlab.it/api/profile-avatar', {
            method: 'POST',
            body: formData,
            header: {
                'Content-type': 'multipart/form-data',
                "Authorization": "Bearer zs3jdLOBKJ3wgXTyeoYu77OJ41ausvy2Zu3rEqu1IuvZ4n2bKcCIMDkNLaJo",
            },
        }).then((response) => JSON.stringify(response))
            .then((responseJson) => {
                console.warn(JSON.stringify(formData))
                // if (responseJson.status === 'SUCCESS') {
                //     this.setToken(responseJson.token);
                //     this.props.navigation.navigate('Main', {});
                // } else {
                //     alert(responseJson.msg)
                // }
            })
            .catch((error) => {
                alert('Login Fail, Please Try Again')
            })
            .done();

    };
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
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})