import React, { Component } from 'react';
import {StyleSheet,Text,View,ImageBackground,Dimensions,AsyncStorage,ScrollView,StatusBar,ActivityIndicator} from 'react-native';
import {Input, Button, Icon, Header, ListItem, Avatar} from 'react-native-elements';
import {RectButton} from "react-native-gesture-handler";
import Axios from "axios";
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions'
import Toast from 'react-native-root-toast';
import Colors from '../../constants/Colors';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const BG_IMAGE = require('../../../assets/images/bg_second.jpg');

export default class UserScreen extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <View style={styles.content}>
                <StatusBar barStyle="dark-content" backgroundColor="rgb(229,229,227)" />
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
                        <Text style={styles.headerTitle}>TEST PAGE</Text>
                        <Icon
                            name="options"
                            type="simple-line-icon"
                            color="rgba(255,255,255,0)"
                            size= {30}
                            underlayColor={'transparent'}
                            style={{padding:10}}
                        />
                    </View>
                    <View style={{flex: 1,justifyContent: 'center'}}>
                        <Text note style={{ textAlign: 'center',color:Colors.ButtonText }}>{tran.t('test')}</Text>
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
