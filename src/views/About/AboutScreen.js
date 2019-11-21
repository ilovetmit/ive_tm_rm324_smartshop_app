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

export default class AboutScreen extends Component {

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
                        name="menu"
                        type="feather"
                        color={Colors.BlackText}
                        size={35}
                        onPress={() =>this.props.navigation.openDrawer()}
                        underlayColor={'transparent'}
                    />
                    <Text style={styles.headerTitle}>ABOUT</Text>
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
                <ScrollView>
                    <View style={styles.itemList}>
                        <RectButton
                            style={styles.itemListButton}
                            onPress={() => this.props.navigation.navigate('PrivacyPolicy')}>
                            <Icon
                                name="shield-account"
                                type="material-community"
                                color={Colors.BlackText}
                                size={24}
                                underlayColor={'transparent'}
                                style={{}}
                            />
                            <Text style={styles.itemListButtonText}>Privacy Policy</Text>
                        </RectButton>
                        <RectButton
                            style={styles.itemListButton}
                            onPress={() => this.props.navigation.navigate('TermCondition')}>
                            <Icon
                                name="checklist"
                                type="octicon"
                                color={Colors.BlackText}
                                size={24}
                                underlayColor={'transparent'}
                                style={{}}
                            />
                            <Text style={styles.itemListButtonText}>Terms & Conditions</Text>
                        </RectButton>
                    </View>
                    <View style={styles.itemList}>
                        <RectButton
                            style={styles.itemListButton}
                            onPress={() => this.props.navigation.navigate('IVE_TM_IT')}>
                            <Icon
                                name="md-school"
                                type="ionicon"
                                color={Colors.BlackText}
                                size={24}
                                underlayColor={'transparent'}
                                style={{}}
                            />
                            <Text style={styles.itemListButtonText}>About IVE(TM)/IT</Text>
                        </RectButton>
                        <RectButton
                            style={styles.itemListButton}
                            onPress={() => this.props.navigation.navigate('C_Group_Limited')}>
                            <Icon
                                name="briefcase"
                                type="entypo"
                                color={Colors.BlackText}
                                size={24}
                                underlayColor={'transparent'}
                                style={{}}
                            />
                            <Text style={styles.itemListButtonText}>About C Group Limited</Text>
                        </RectButton>
                    </View>
                    <View style={styles.itemList}>
                        <RectButton
                            style={styles.itemListButton}
                            onPress={() => this.props.navigation.navigate('DevelopmentTeam')}>
                            <Icon
                                name="users"
                                type="font-awesome"
                                color={Colors.BlackText}
                                size={24}
                                underlayColor={'transparent'}
                                style={{}}
                            />
                            <Text style={styles.itemListButtonText}>Development Team</Text>
                        </RectButton>
                        <RectButton
                            style={styles.itemListButton}
                            onPress={() => this.props.navigation.navigate('Acknowledgement')}>
                            <Icon
                                name="book"
                                type="font-awesome"
                                color={Colors.BlackText}
                                size={24}
                                underlayColor={'transparent'}
                                style={{}}
                            />
                            <Text style={styles.itemListButtonText}>Acknowledgement</Text>
                        </RectButton>
                    </View>
                </ScrollView>
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
    itemList:{
        marginBottom: 10,
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderRadius: 10,
        marginHorizontal: 10,
    },
    itemListButton:{
        paddingLeft: 20,
        paddingVertical: 15,
        flexDirection:'row',
        alignItems: 'center',
    },
    itemListButtonText:{
        paddingLeft: 10,
        color:Colors.BlackText,
        fontFamily: 'regular',
        fontSize: 16,
    },
    itemButton:{
        paddingHorizontal: 10,
        paddingVertical: 15,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems: 'center',
    },
    itemButtonColumn:{
        paddingHorizontal: 10,
        paddingVertical: 10,
        flexDirection:'column',
        // justifyContent:'space-between',
        // alignItems: 'center',
    },
    itemButtonText:{
        // paddingLeft: 10,
        color:Colors.ButtonText,
        fontFamily: 'regular',
        fontSize: 16,
    },
    itemButtonContent:{
        // paddingLeft: 10,
        color:Colors.ButtonText,
        fontFamily: 'light',
        fontSize: 16,
    },
});