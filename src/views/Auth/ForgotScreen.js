import React from 'react';
import {AsyncStorage,StyleSheet,View} from 'react-native';
import { Button, Text } from 'react-native-elements';

export default class ForgotScreen extends React.Component {
    static navigationOptions = {
        title: 'In development...',
    };

    render() {
        return (
            <View style={styles.content}>
                <Button
                    style={styles.button}
                    onPress={this._login}
                    title={'Back to Login Page'}
                />
            </View>
        );
    }

    _login = async () => {
        this.props.navigation.navigate('Login');
    };
}

const styles = StyleSheet.create({
    content:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    text:{
        color: 'white',
        fontSize: 20,
    },
});