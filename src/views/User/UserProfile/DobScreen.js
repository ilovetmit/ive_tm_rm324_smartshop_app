import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, Dimensions,LayoutAnimation,  } from 'react-native';
import {Input, Button, Icon, Header} from 'react-native-elements';
import {RectButton} from "react-native-gesture-handler";
import Axios from "axios";
import DatePicker from 'react-native-datepicker';
import Toast from 'react-native-root-toast';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const BG_IMAGE = require('../../../../assets/images/bg_second.jpg');

export default class DobScreen extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.init();
    }

    init() {
        this.state = {
            dob: this.props.navigation.getParam("dob"),
            dobValid: true,
        }
    }

    validateDob() {
        const { dob } = this.state;
        const dobValid = dob!=null;
        LayoutAnimation.easeInEaseOut();
        this.setState({ dobValid });
        return dobValid;
    }

    updateData() {
        LayoutAnimation.easeInEaseOut();
        const validateDob = this.validateDob();
        if (validateDob) {
            Axios.post(HOST_NAME+"user/profile", {
                type:"dob",
                dob:this.state.dob,
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
            alert(tran.t('dobValid'));
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
                        <Text style={styles.headerTitle}>EDIT - DATE OF BIRTH</Text>
                        <Button
                            title={tran.t('save')}
                            type="clear"
                            titleStyle={{color:'#FFF'}}
                            onPress={() => this.updateData()}
                        />
                    </View>
                    <View style={styles.itemList}>
                        <Text style={{fontSize:20,color:'#691594',marginHorizontal:10}}>{tran.t('dob')}</Text>
                        <DatePicker
                            style={styles.datePicker}
                            date={this.state.dob}
                            mode="date"
                            placeholder="Choose Date"
                            format="YYYY-MM-DD"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            showIcon={false}
                            maxDate={new Date().toJSON().slice(0,10).replace(/-/g,'-')}
                            onDateChange={dob => this.setState({ dob })}
                            customStyles={{
                                placeholderText: {
                                    color: '#691594',
                                },
                            }}
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
        backgroundColor: 'rgba(255,255,255,0.8)',
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
    datePicker: {
        width: '100%',
        padding:10,
        borderColor: '#691594',
    },
});
