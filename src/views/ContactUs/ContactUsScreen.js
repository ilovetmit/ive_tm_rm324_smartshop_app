import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Dimensions,
    KeyboardAvoidingView, BackHandler, TouchableOpacity, Linking, Image,
} from 'react-native';
import MapView from 'react-native-maps';
import {Input, Button, Icon, Header} from 'react-native-elements';
import Constants from "expo-constants";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const BG_IMAGE = require('../../../assets/images/bg_second.jpg');

const REGION = {
    latitude: 22.3969539,
    longitude: 113.9664751,
    latitudeDelta: 0.0005,
    longitudeDelta: 0.0005,
};

export default class ContactUsScreen extends Component {

    static navigationOptions = { header: null };



    constructor(props) {
        super(props);
    }

    render() {
        return (

            <View style={styles.content}>
                <ImageBackground source={BG_IMAGE} style={styles.bgImage}>
                    <Text style={styles.copyright}>{tran.t('copyright')}</Text>
                    <View style={styles.header}>
                        <Icon
                            name="chevron-left"
                            type="feather"
                            color="#fff"
                            size={40}
                            onPress={() =>this.props.navigation.goBack()}
                            underlayColor={'transparent'}
                            style={{padding:10}}
                        />
                    </View>
                    <View style={{alignItems: 'center',justifyContent: 'center',}}>
                        <Icon
                            name="home"
                            type="font-awesome"
                            color="rgba(255, 255, 255, 1)"
                            size={40}
                        />
                        <Text style={styles.royalText}>Concierge</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.royalText}>Premier</Text>
                            <Text style={styles.plusText}>+</Text>
                        </View>
                        <Text style={styles.text}>{tran.t('phone')}: +852 12345678</Text>
                        <Text style={styles.text}>{tran.t('email')}: email@example.com</Text>
                        <MapView
                            style={{ width: SCREEN_WIDTH, height: 300 }}
                            initialRegion={REGION}
                            provider={null}
                        />
                    </View>
                </ImageBackground>
            </View>

        );
    }
}


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
    loginTitle: {
        marginBottom: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    royalText: {
        color: 'white',
        fontSize: 30,
        fontFamily: 'bold',
    },
    plusText: {
        color: 'white',
        fontSize: 30,
        fontFamily: 'regular',
    },
    text:{
        color: 'white',
        fontSize: 20,
        marginBottom: 10,
    },
    copyright:{
        color: '#FFF',
        position: 'absolute',
        top:SCREEN_HEIGHT-25,
        alignSelf: 'center',
        opacity:0.5,
        fontSize: 10,
    },
});
