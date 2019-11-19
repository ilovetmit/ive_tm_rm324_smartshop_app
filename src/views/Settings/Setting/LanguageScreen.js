import React, { Component } from 'react';
import {StyleSheet, Text, View, ImageBackground, Dimensions, LayoutAnimation, AsyncStorage,Alert} from 'react-native';
import {Input, Button, Icon, Header,ListItem} from 'react-native-elements';
import { Updates } from 'expo';
import {RectButton} from "react-native-gesture-handler";
import Axios from "axios";
import Toast from 'react-native-root-toast';
import Colors from '../../../constants/Colors';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const BG_IMAGE = require('../../../../assets/images/bg_second.jpg');

export default class LanguageScreen extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.init();
    }

    init() {
        this.state = {
            language: this.props.navigation.getParam("language"),
            origin: this.props.navigation.getParam("language"),
            en_us: this.props.navigation.getParam("language") === "en_us",
            zh_cn: this.props.navigation.getParam("language") === "zh_cn",
            zh_hk: this.props.navigation.getParam("language") === "zh_hk",
        }
    }

    updateData = async () => {
        if (this.state.language!=null) {
            if(this.state.language!==this.state.origin){
                Alert.alert(
                    tran.t('confirm'),
                    tran.t('change_language_content', { origin: tran.t(tran.locale), new: tran.t(this.state.language) }),
                    [
                        {
                            text: tran.t('yes'), onPress: async () => {
                                await AsyncStorage.setItem('language', this.state.language);
                                Updates.reload();
                            }
                        },
                        { text: tran.t('no'), style: 'cancel' }
                    ]
                );
            }else{
                this.props.navigation.goBack();
            }

        }else{
            alert("Please choose language");
        }
    };

    render() {
        return (

            <View style={styles.content}>
                <ImageBackground source={BG_IMAGE} style={styles.bgImage}>
                    <View style={styles.header}>
                        <Icon
                            name="chevron-left"
                            type="feather"
                            color="#fff"
                            size={40}
                            onPress={() => this.props.navigation.goBack()}
                            underlayColor={'transparent'}
                            style={{padding:10}}
                        />
                        <Text style={styles.headerTitle}>{tran.t('language_header')}</Text>
                        <Button
                            title={tran.t('save')}
                            type="clear"
                            titleStyle={{color:'#FFF'}}
                            onPress={() => this.updateData()}
                        />
                    </View>
                    <View style={styles.itemList}>
                        <ListItem
                            title={tran.t('en_us')}
                            rightIcon={this.state.en_us?{ name:"check",type:"antdesign",color:"rgba(105, 21, 148,1)" }:{name:"check",type:"antdesign",color:"rgba(0,0,0,0)"}}
                            onPress={()=>this.setState({ language:"en_us",en_us:true,zh_hk:false,zh_cn:false })}
                        />
                        <ListItem
                            title={tran.t('zh_hk')+" - "+tran.t('bate')}
                            rightIcon={this.state.zh_hk?{ name:"check",type:"antdesign",color:"rgba(105, 21, 148,1)" }:{name:"check",type:"antdesign",color:"rgba(0,0,0,0)"}}
                            onPress={()=>this.setState({ language:"zh_hk",zh_hk:true,en_us:false,zh_cn:false })}
                        />
                        <ListItem
                            title={tran.t('zh_cn')+" - "+tran.t('bate')}
                            rightIcon={this.state.zh_cn?{ name:"check",type:"antdesign",color:"rgba(105, 21, 148,1)" }:{name:"check",type:"antdesign",color:"rgba(0,0,0,0)"}}
                            onPress={()=>this.setState({ language:"zh_cn",zh_cn:true,en_us:false,zh_hk:false })}
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
        color: 'white',
        fontSize: 20,
        fontFamily: 'bold',
    },
    itemList:{
        marginBottom: 10,
        backgroundColor: 'rgba(255,255,255,1)',
        borderRadius: 10,
        marginHorizontal: 10,
        paddingVertical: 10,
    },
    inputContainer: {
        paddingLeft: 8,
        borderRadius: 40,
        borderWidth: 1,
        borderColor: Colors.Auxiliary1,
        height: 45,
        marginVertical: 10,
    },
    inputStyle: {
        flex: 1,
        marginLeft: 10,
        color: 'black',
        fontFamily: 'UbuntuLight',
        fontSize: 16,
    },
    inputLabelStyle:{
        color:Colors.Auxiliary1
    },
    errorInputStyle: {
        marginTop: 0,
        textAlign: 'center',
        color: '#FF7575',
    },
});
