import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, Dimensions,LayoutAnimation, } from 'react-native';
import {Input, Button, Icon, Header,ListItem} from 'react-native-elements';
import {RectButton} from "react-native-gesture-handler";
import Axios from "axios";
import Toast from 'react-native-root-toast';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const BG_IMAGE = require('../../../../assets/images/bg_second.jpg');

export default class GenderScreen extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.init();
    }

    init() {
        this.state = {
            gender: this.props.navigation.getParam("gender"),
            male: this.props.navigation.getParam("gender") === "male",
            female: this.props.navigation.getParam("gender") === "female",
        }
    }

    updateData() {
        if (this.state.gender!=null) {

            Axios.post(HOST_NAME+HOST_API_VER+"user/profile", {
                type:"gender",
                gender:this.state.gender,
            })
                .then((response) => {
                    if (response.status === 200) {
                        // console.log(response);
                        Toast.show(tran.t('update_success'), {
                    duration: Toast.durations.SHORT,
                    position: Toast.positions.BOTTOM,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                    delay: 0,
                });
                        this.props.navigation.goBack();
                    } else {
                        Toast.show(response.data.message, {
                    duration: Toast.durations.SHORT,
                    position: Toast.positions.BOTTOM,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                    delay: 0,
                });
                    }
                })
                .catch((error) => {
                    // console.log(error);
                    Toast.show(tran.t('unexpected_error'), {
                    duration: Toast.durations.SHORT,
                    position: Toast.positions.BOTTOM,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                    delay: 0,
                });
                });
        }else{
            alert("Please choose gender");
        }
    }

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
                        <Text style={styles.headerTitle}>{tran.t('gender_header')}</Text>
                        <Button
                            title={tran.t('save')}
                            type="clear"
                            titleStyle={{color:'#FFF'}}
                            onPress={() => this.updateData()}
                        />
                    </View>
                    <View style={styles.itemList}>
                        <ListItem
                            title={tran.t('male')}
                            leftIcon={{ name:"man",type:"antdesign" }}
                            rightIcon={this.state.male?{ name:"check",type:"antdesign",color:"rgba(105, 21, 148,1)" }:{name:"check",type:"antdesign",color:"rgba(0,0,0,0)"}}
                            onPress={()=>this.setState({ gender:"male",male:true,female:false })}
                        />
                        <ListItem
                            title={tran.t('female')}
                            leftIcon={{ name:"woman",type:"antdesign" }}
                            rightIcon={this.state.female?{ name:"check",type:"antdesign",color:"rgba(105, 21, 148,1)" }:{name:"check",type:"antdesign",color:"rgba(0,0,0,0)"}}
                            onPress={()=>this.setState({ gender:"female",male:false,female:true })}
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
        borderColor: '#691594',
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
        color:'#691594'
    },
    errorInputStyle: {
        marginTop: 0,
        textAlign: 'center',
        color: '#FF7575',
    },
});
