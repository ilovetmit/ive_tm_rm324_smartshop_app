import React, { Component } from 'react';
import {StyleSheet,View,ImageBackground,Dimensions, ScrollView, RefreshControl,TouchableOpacity,} from 'react-native';
import {Input, Button,Text, Icon, Tooltip, Avatar} from 'react-native-elements';
import Axios from "axios";
import Toast from 'react-native-root-toast';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const BG_IMAGE = require('../../../assets/images/bg_primary.jpg');

export default class NewsScreen extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.init();
    }

    init() {
        this.state = {
            news: [],
            type: [],
            news_urgent: [],
            refreshing: false,
        }
    }

    componentWillMount() {
        this.getData();
    }

    render() {

        // TODO if news null

        let news_urgent = this.state.news_urgent.map((value, index) => {
            return (
                <TouchableOpacity style={styles.news} key={"news_urgent_"+index} activeOpacity={1}
                                  onPress={() => this.props.navigation.navigate('NewsDetail',{ news: value, type: this.state.type.variables})}
                >
                    <View style={{flexDirection:'row',alignItems: 'center',justifyContent:'space-between'}}>
                        <View style={styles.news_urgent_type}>
                            <Text style={{color:'#FFFFFF',fontWeight: "bold"}}>{tran.t('urgent')}</Text>
                        </View>
                        <Text style={{fontSize:16}}> {value.post_date} </Text>
                    </View>
                    <Text style={styles.news_title} numberOfLines={2}>{value.title}</Text>
                </TouchableOpacity>
            )

        });

        let news = this.state.news.map((value, index) => {
            return (
                <TouchableOpacity style={styles.news} key={"news_"+index} activeOpacity={1}
                                  onPress={() => this.props.navigation.navigate('NewsDetail',{ news: value, type: this.state.type.variables})}
                >
                    {(value.type === 0) ?
                        <View style={{flexDirection:'row',alignItems: 'center',justifyContent:'space-between'}}>
                            <View style={styles.news_info_type}>
                                <Text style={{color:'#FFFFFF'}}>{tran.t('info')}</Text>
                            </View>
                            <Text style={{fontSize:16}}> {value.post_date} </Text>
                        </View>
                        :
                        <View style={{flexDirection:'row',alignItems: 'center',justifyContent:'space-between'}}>
                            <View style={styles.news_general_type}>
                                <Text style={{color:'#FFFFFF'}}>{tran.t('general')}</Text>
                            </View>
                            <Text style={{fontSize:16}}> {value.post_date} </Text>
                        </View>}
                    <Text style={styles.news_title} numberOfLines={2}>{value.title}</Text>
                </TouchableOpacity>
            )

        });

        return (
            <View style={styles.content}>
                <ImageBackground source={BG_IMAGE} style={styles.bgImage}>
                    <View style={styles.header}>
                        <Icon
                            name="menu"
                            type="feather"
                            color="#fff"
                            size={40}
                            onPress={() =>this.props.navigation.openDrawer()}
                            underlayColor={'transparent'}
                            style={{padding:10}}
                        />
                        <Text style={styles.headerTitle}>SMART SHOP +</Text>
                        <Icon
                            name="dots-three-horizontal"
                            type="entypo"
                            color="#fff"
                            size= {30}
                            onPress={() =>alert('In Developing...')}
                            underlayColor={'transparent'}
                            style={{padding:10}}
                        />
                    </View>
                    {(news_urgent.length !== 0 && news.length !== 0) ?
                        <ScrollView refreshControl={
                            <RefreshControl
                                //TODO update style
                                progressBackgroundColor={"#B27ACF"}
                                tintColor={"#FFF"}
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh}
                            />
                        }>
                            {news_urgent}
                            {news}
                        </ScrollView>
                        :
                        <View style={{flex: 1,justifyContent: 'center'}}>
                            <Text note style={{ textAlign: 'center',color:'#FFF' }}>{tran.t('no_news')}</Text>
                        </View>
                    }
                </ImageBackground>
            </View>

        );
    }

    _onRefresh = () => {
        this.setState({ refreshing: true });
        this.getData().then(() => {
            setTimeout(() => { this.setState({ refreshing: false }) }, 1000);
        });
    };

    getData = async () => {
        Axios.get(HOST_NAME+"news")
            .then((response) => {
                this.setState({
                    news: response.data.data.news,
                    news_urgent: response.data.data.news_urgent,
                    type: response.data.data.type,
                })
            })
            .catch((error) => {
                // console.log(error);
                Toast.show(tran.t('msg_network_error'), {
                    duration: Toast.durations.SHORT,
                    position: Toast.positions.BOTTOM,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                    delay: 0,
                });
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
    subtitle:{
        color: 'white',
        fontSize: 15,
        left: 10,
    },
    news:{
        marginTop: 5,
        marginBottom: 10,
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderRadius: 10,
        marginHorizontal: 10,
        padding: 10,
    },
    news_title:{
        marginVertical: 10,
        fontSize: 20,
        fontWeight: "bold",
        // fontFamily: 'regular',
        // textAlign: 'justify',
    },
    news_body:{

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
