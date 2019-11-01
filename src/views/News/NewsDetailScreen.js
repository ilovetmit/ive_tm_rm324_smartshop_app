import React, { Component } from 'react';
import {StyleSheet, View, ImageBackground, Dimensions, KeyboardAvoidingView, BackHandler, ScrollView,} from 'react-native';
import {Input, Button,Text, Icon, Header} from 'react-native-elements';
import Axios from "axios";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const BG_IMAGE = require('../../../assets/images/bg_second.jpg');

export default class NewsDetailScreen extends Component {

    static navigationOptions = { header: null };

    constructor(props) {
        super(props);
        this.init();
    }

    init() {
        this.state = {
            news: this.props.navigation.getParam("news"),
            type: this.props.navigation.getParam("type"),
            view: 0,
        }
    }

    componentWillMount() {
        this.getData();
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
                            onPress={() =>this.props.navigation.goBack()}
                            underlayColor={'transparent'}
                            style={{padding:10}}
                        />
                        <Text style={styles.headerTitle}>{tran.t('news_header')}</Text>
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
                        <View style={{paddingHorizontal:10,flexDirection:'row',alignItems: 'center',justifyContent:'space-between'}}>
                            {this.state.news.type===this.state.type['INFO']?
                                <View style={styles.news_info_type}>
                                    <Text style={{color:'#FFFFFF'}}>{tran.t('info')}</Text>
                                </View> : this.state.news.type===this.state.type['GENERAL'] ?
                                    <View style={styles.news_general_type}>
                                        <Text style={{color:'#FFFFFF'}}>{tran.t('general')}</Text>
                                    </View> : this.state.news.type===this.state.type['URGENT'] ?
                                        <View style={styles.news_urgent_type}>
                                            <Text style={{color:'#FFFFFF'}}>{tran.t('urgent')}</Text>
                                        </View> : <View></View>
                            }
                            <Text style={styles.text}>{this.state.news.post_date}</Text>
                            <View style={{flexDirection:'row',alignItems: 'center'}}>
                                <Icon
                                    name="eye"
                                    type="entypo"
                                    color="#FFF"
                                    size= {15}
                                    underlayColor={'transparent'}
                                    style={{padding:10}}
                                />
                                <Text style={styles.text}>{this.state.view}</Text>
                            </View>
                        </View>
                        <Text h4 style={styles.text}>{this.state.news.title}</Text>
                        <View style={styles.body}>
                            <Text style={styles.bodyText}>{this.state.news.body.split("<br/>").join("\n")}</Text>
                        </View>
                    </ScrollView>
                </ImageBackground>
            </View>

        );
    }

    getData = async () => {
        await Axios.get(HOST_NAME+"news/add/"+this.state.news.id)
            .then((response) => {
                if (response.status === 200) {
                    this.setState({
                        view: response.data.data,
                    })
                }
            })
            .catch((error) => {

            });
    };
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
