import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,Linking,
    Dimensions,Image,TouchableOpacity,
    KeyboardAvoidingView, BackHandler,
} from 'react-native';
import {Input, Button, Icon, Header,Avatar,} from 'react-native-elements';
import Constants from 'expo-constants';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const BG_IMAGE = require('../../../assets/images/bg_second.jpg');
const ICON_IMAGE = require('../../../assets/icon.png');
const WEB_QRCODE = require('../../../assets/images/web_qrcode.png');

export default class AboutScreen extends Component {

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
                    <View style={styles.loginTitle}>
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
                    </View>
                    <TouchableOpacity onPress={()=>Linking.openURL('https://re.anchorlab.it')} activeOpacity={1}>
                    <Image
                        source={require('../../../assets/images/web_qrcode.png')}
                        style={{ width: 200, height: 200 }}
                    />
                    </TouchableOpacity>
                    <Text style={styles.text}>v {Constants.manifest.version}</Text>
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
        marginVertical: 10,
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
