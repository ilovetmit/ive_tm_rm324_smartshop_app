import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar, StyleSheet,
    View,
} from 'react-native';


export default class LoadingScreen extends React.Component {

    constructor(props) {
        super(props);
        this._bootstrapAsync();
        state = {
            notification: {},
        };
    }

    _bootstrapAsync = async () => {
        const token = await AsyncStorage.getItem('apiToken');

        if (token)
            Axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            this.props.navigation.navigate(token ? 'App' : 'Login');

    };

    // Render any loading content that you like here
    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator style={styles.indicator} size="large" color="#B27ACF" />
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
        backgroundColor: '#7B31A1',
        width: '100%',
        height: '100%'
    },
    indicator: {
        justifyContent: 'center',
    }
});
