import React, { Component } from 'react';
import {StyleSheet, View, ImageBackground, Dimensions, KeyboardAvoidingView, BackHandler, ScrollView, } from 'react-native';
import {Input, Button, Text, Icon, Header, Badge, ListItem} from 'react-native-elements';
import Axios from "axios";
import TouchableScale from "react-native-touchable-scale";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const BG_IMAGE = require('../../../../assets/images/bg_second.jpg');

export default class ServiceRequestDetailScreen extends Component {

    static navigationOptions = { header: null };

    constructor(props) {
        super(props);
        this.init();
    }

    init() {
        this.state = {
            request: this.props.navigation.getParam("request"),
            status: this.props.navigation.getParam("status"),
        }
    }

    componentWillMount() {
        // this.getData();
    }

    render() {

        // TODO update style
        return (

            <View style={styles.content}>
                <ImageBackground source={BG_IMAGE} style={styles.bgImage}>
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
                        <Text style={styles.headerTitle}>REQUEST</Text>
                        <Icon
                            name="options"
                            type="simple-line-icon"
                            color="rgba(255,255,255,0)"
                            size= {30}
                            // onPress={() =>alert('In Developing...')}
                            underlayColor={'transparent'}
                            style={{padding:10}}
                        />
                    </View>
                    <ScrollView>
                        <View style={{paddingHorizontal:10,alignItems: 'center',justifyContent:'center'}}>
                            {(this.state.request.status==this.state.status['OPEN'])?
                                <Badge value={tran.t('support_status.open')} status="primary" />:
                                (this.state.request.status==this.state.status['COMPLETED'])?
                                    <Badge value={tran.t('support_status.completed')} status="success" />:
                                    (this.state.request.status==this.state.status['CLOSED'])?
                                        <Badge value={tran.t('support_status.closed')} status="warning" />:
                                        (this.state.request.status==this.state.status['CANCEL'])?
                                            <Badge value={tran.t('support_status.cancel')} status="error" />:
                                            <Badge value={tran.t('support_status.unknown')} status="error" />
                            }
                            <Badge value={this.state.request.service_request_type.type} status="primary" />
                            <Text style={styles.text}>{tran.t('title')} : {this.state.request.contents.title}</Text>
                            <Text style={styles.text}>{tran.t('content')} : {this.state.request.contents.body}</Text>
                            <Text style={styles.text}>{tran.t('location')} : {this.state.request.location}</Text>
                            <Text style={styles.text}>{tran.t('created_at')}: {this.state.request.created_at}</Text>
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
    button: {
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    total:{
        padding: 10,
        color: 'white',
        fontSize: 30,
        fontFamily: 'bold',
    },
    text:{
        padding: 10,
        color: 'white',
        fontSize: 20,
    },
    bodyText:{
        textAlign:'justify',
        color: '#000',
        fontSize: 18,
    },
    body:{
        marginTop: 5,
        marginBottom: 10,
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderRadius: 10,
        marginHorizontal: 10,
        padding: 10,
    },
    news_urgent_type:{
        flexDirection:'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,0,0,0.6)',
        borderRadius: 30,
        paddingHorizontal: 12,
        paddingVertical: 3,
    },
    news_info_type:{
        flexDirection:'row',
        alignItems: 'center',
        backgroundColor: 'rgba(23, 162, 184,0.6)',
        borderRadius: 30,
        paddingHorizontal: 12,
        paddingVertical: 3,
    },
    news_general_type:{
        flexDirection:'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 123, 255,0.6)',
        borderRadius: 30,
        paddingHorizontal: 12,
        paddingVertical: 3,
    }
});
