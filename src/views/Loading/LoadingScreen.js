import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar, StyleSheet,
    View,
} from 'react-native';
import Colors from '../../constants/Colors';
import Toast from "react-native-root-toast";
import Axios from "axios";


export default class LoadingScreen extends React.Component {

    constructor(props) {
        super(props);
        this._bootstrapAsync();
        state = {
            notification: {},
        };
    }

    _bootstrapAsync = async () => {
        let token = await AsyncStorage.getItem('apiToken');
        let host = await AsyncStorage.getItem('hostName');

        if(host){
            if(host===HOST_NAME_LOCAL){
                global.HOST_NAME = HOST_NAME_LOCAL;
            }else if(host===HOST_NAME_CLOUD){
                global.HOST_NAME = HOST_NAME_CLOUD;
            }
        }

        if (token){
            Axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            await Axios.get(HOST_NAME+HOST_API_VER+"user/profile")
                .then((response) => {
                    console.log('response:'+response);
                })
                .catch((error) => {
                    if(HOST_NAME===HOST_NAME_LOCAL){
                        Toast.show('NETWORK TIMEOUT\nPlease connect S-SHOP WiFi', {
                            duration: Toast.durations.LONG,
                            position: Toast.positions.CENTER,
                            shadow: true,
                            animation: true,
                            hideOnPress: true,
                            delay: 0,
                        });
                    }else if(error.response.status===401){
                        delete Axios.defaults.headers.common['Authorization'];
                        AsyncStorage.clear();
                        Toast.show('Login credentials expired\n\nPlease log in again.', {
                            duration: Toast.durations.LONG,
                            position: Toast.positions.CENTER,
                            shadow: true,
                            animation: true,
                            hideOnPress: true,
                            delay: 0,
                        });
                        token = null;
                    }
                });
        }
        this.props.navigation.navigate(token ? 'App' : 'Login');

    };

    // Render any loading content that you like here
    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator style={styles.indicator} size="large" color={Colors.BlackText} />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: Colors.Primary,
        width: '100%',
        height: '100%'
    },
    indicator: {
        justifyContent: 'center',
    }
});
