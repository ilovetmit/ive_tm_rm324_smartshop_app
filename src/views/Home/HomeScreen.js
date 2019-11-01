import React, { Component } from 'react';
import {AsyncStorage,Dimensions,ImageBackground,StyleSheet,View,ScrollView,TouchableOpacity,Platform,StatusBar,Alert} from 'react-native';
import {Button, Text, Icon, Tooltip,Avatar,Overlay} from 'react-native-elements';
import { Notifications } from 'expo';
import Axios from "axios";
import Toast from 'react-native-root-toast';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const BG_IMAGE = require('../../../assets/images/bg_primary.jpg');

export default class HomeScreen extends Component {

    static navigationOptions = { header: null, };
    constructor(props) {
        super(props);
        this.init();
    }

    init() {
        this.state = {

        }
    }

    componentWillMount() {
        this.getData();
    }


    render() {

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

        return (
            <View style={styles.content}>
                <StatusBar barStyle="light-content" translucent={true} />
                <ImageBackground source={BG_IMAGE} style={styles.bgImage}>
                    <View style={styles.header}>
                        <Icon
                            name="menu"
                            type="feather"
                            color="#fff"
                            size={40}
                            // onPress={() =>this.props.navigation.openDrawer()}
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
                    <ScrollView>

                        <View style={styles.news}>
                            <Text> {tran.t('latest_news')} </Text>
                            <Text> {tran.t('coming_soon')} </Text>
                        </View>

                        <View style={{ flexDirection:'row',left: 10, marginTop:10,alignItems: 'center',}}>
                            <Icon
                                name="book"
                                type="antdesign"
                                color="#fff"
                                size={25}
                                underlayColor={'transparent'}
                            />
                            <Text style={styles.subtitle}>{tran.t('housing_estate_info')}</Text>
                        </View>
                        <View style={styles.housing_info}>
                            <Text> {tran.t('housing_estate_info')} </Text>
                            <Text> {tran.t('coming_soon')} </Text>
                        </View>

                    </ScrollView>
                </ImageBackground>
            </View>
        );
    }

    getData = async () => {
        Axios.get(HOST_NAME+"product")
            .then((response) => {
                this.setState({
                    news: response.data.data.news,
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
    weather:{
        flexDirection:'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        // borderColor: '#FFF',
        borderRadius: 30,
        right: 10,
        paddingHorizontal: 12,
        paddingVertical: 3,
        marginTop:5
    },
    weatherText:{
        color: '#FFF',
        fontSize: 15,
        paddingRight: 5,
    },
    weather_nine:{
        marginTop: 10,
        height: 100,
        backgroundColor: 'rgba(255,255,255,0.7)',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginHorizontal: 10,
    },
    weather_nine_item :{
        width: (SCREEN_WIDTH-20)/4,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
    },
    weather_nine_text :{
        color: '#000',
    },
    weather_nine_c_text :{
        color: '#000',
        fontSize: 12,
    },
    itemMenu:{
        flexWrap: 'wrap',
        flexDirection:'row',
        // backgroundColor: 'rgba(79, 11, 114, 0.7)',
        backgroundColor: 'rgba(79, 11, 114, 0.7)',
        borderRadius: 10,
        marginTop: 15,
        marginHorizontal: 10,
    },
    itemButton:{
        width: (SCREEN_WIDTH-20)/4,
        flexDirection:'column',
    },
    itemButtonTitle:{
        color:'#FFF',
        fontFamily: 'light',
        fontSize: 12,
    },
    itemButtonTitle_word:{
        color:'#FFF',
        fontFamily: 'light',
        fontSize: 12,
        marginTop: 8,
    },
    subtitle:{
        color: 'white',
        fontSize: 15,
        left: 10,
    },
    news:{
        marginTop: 5,
        height: 100,
        backgroundColor: 'rgba(255,255,255,0.8)',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginHorizontal: 10,
    },
    housing_info:{
        marginTop: 5,
        marginBottom: 10,
        height: 100,
        backgroundColor: 'rgba(255,255,255,0.8)',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginHorizontal: 10,
    },
});
