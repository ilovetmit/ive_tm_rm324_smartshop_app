import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Dimensions,
    KeyboardAvoidingView, BackHandler,
} from 'react-native';
import {Input, Button, Icon, Header} from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const BG_IMAGE = require('../../../../assets/images/bg_second.jpg');

export default class SmartLockerScreen extends Component {

    static navigationOptions = { header: null };

    constructor(props) {
        super(props);
    }

    render() {
        // TODO planning
        return (
            <View style={styles.content}>
                <Header
                    containerStyle={styles.topMenu}
                    leftComponent={{ icon: 'chevron-left', color: '#fff', onPress: () => this.props.navigation.goBack(),underlayColor: 'transparent' }}
                    centerComponent={{ text: 'Smart Locker', style: { color: '#fff' } }}
                    // rightComponent={{ icon: 'home', color: '#fff' }}
                />
                <ImageBackground source={BG_IMAGE} style={styles.bgImage}>
                    <Text style={styles.text}>Smart Locker</Text>
                    <Text style={styles.text}>🚀 Coming Soon</Text>
                </ImageBackground>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    content:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
        justifyContent: 'center',
        alignItems: 'center',
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
