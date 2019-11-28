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
import Colors from '../../constants/Colors';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const BG_IMAGE = require('../../../assets/images/bg_second.jpg');

const REGION = {
    latitude: 22.3931537,
    longitude: 113.9666597,
    latitudeDelta: 0.002,
    longitudeDelta: 0.002,
};

export default class ContactUsScreen extends Component {

    static navigationOptions = { header: null };



    constructor(props) {
        super(props);
    }

    //TODO information update

    render() {
        return (

            <View style={styles.content}>
                <ImageBackground source={BG_IMAGE} style={styles.bgImage}>
                    <Text style={styles.copyright}>{tran.t('copyright')}</Text>
                    <View style={styles.header}>
                        <Icon
                            name="menu"
                            type="feather"
                            color={Colors.BlackText}
                            size={35}
                            onPress={() =>this.props.navigation.openDrawer()}
                            underlayColor={'transparent'}
                        />
                    </View>
                    <View style={{alignItems: 'center',justifyContent: 'center',}}>
                        <Image
                            source={require('../../../assets/images/S-Shop_logo.png')}
                            style={{ width: SCREEN_WIDTH, height:150, marginBottom:50}}
                            resizeMode={'contain'}
                            placeholderStyle={{opacity:0}}
                        />
                        <Text style={styles.text}>{tran.t('phone')}: 2460 5375</Text>
                        <Text style={styles.text}>{tran.t('email')}: tm-cs@vtc.edu.hk</Text>
                        <MapView
                            style={{ width: SCREEN_WIDTH, height: 250 }}
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
        backgroundColor:Colors.Primary,
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
        color: Colors.BlackText,
        fontSize: 20,
        fontFamily: 'bold',
    },
    loginTitle: {
        marginBottom: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    royalText: {
        color: Colors.BlackText,
        fontSize: 30,
        fontFamily: 'bold',
    },
    plusText: {
        color: Colors.BlackText,
        fontSize: 30,
        fontFamily: 'regular',
    },
    text:{
        color: Colors.BlackText,
        fontSize: 20,
        marginBottom: 10,
    },
    copyright:{
        color: Colors.ButtonText,
        position: 'absolute',
        top:SCREEN_HEIGHT-25,
        alignSelf: 'center',
        opacity:0.5,
        fontSize: 10,
    },
});
