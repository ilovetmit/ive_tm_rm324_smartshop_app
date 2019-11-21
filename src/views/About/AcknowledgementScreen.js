import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground, Linking,
    Dimensions, Image, TouchableOpacity,
    KeyboardAvoidingView, BackHandler, ScrollView,
} from 'react-native';
import {Input, Button, Icon, Header,Avatar,} from 'react-native-elements';
import Constants from 'expo-constants';
import Colors from '../../constants/Colors';
import {RectButton} from "react-native-gesture-handler";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const BG_IMAGE = require('../../../assets/images/bg_second.jpg');
const ICON_IMAGE = require('../../../assets/icon.png');
const WEB_QRCODE = require('../../../assets/images/web_qrcode.png');

export default class AcknowledgementScreen extends Component {

    static navigationOptions = { header: null };



    constructor(props) {
        super(props);
    }

    render() {
        return (

            <View style={styles.content}>
                <ImageBackground source={BG_IMAGE} style={styles.bgImage}>
                    <View style={styles.header}>
                        <Icon
                            name="chevron-left"
                            type="feather"
                            color={Colors.BlackText}
                            size={40}
                            onPress={() =>this.props.navigation.goBack()}
                            underlayColor={'transparent'}
                            style={{padding:10}}
                        />
                        <Text style={styles.headerTitle}>ACKNOWLEDGEMENT</Text>
                        <Icon
                            name="options"
                            type="simple-line-icon"
                            color="rgba(255,255,255,0)" // hide logo
                            size= {30}
                            // onPress={() =>alert('In Developing...')}
                            underlayColor={'transparent'}
                            style={{padding:10}}
                        />
                    </View>
                    {/*<ScrollView>*/}

                    {/*</ScrollView>*/}
                    <View style={{flex: 1,justifyContent: 'center'}}>
                        <Text note style={{ textAlign: 'center',color:Colors.ButtonText }}>Coming Soon...</Text>
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
});