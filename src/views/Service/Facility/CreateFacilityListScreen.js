import React, { Component } from 'react';
import {StyleSheet,ActivityIndicator,Text,View,ImageBackground,Dimensions,KeyboardAvoidingView, BackHandler, ScrollView, RefreshControl,} from 'react-native';
import {Input, Button, Icon, Header, ListItem} from 'react-native-elements';
import TouchableScale from "react-native-touchable-scale";
import Axios from "axios";
import {RectButton} from "react-native-gesture-handler";
import Toast from 'react-native-root-toast';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const BG_IMAGE = require('../../../../assets/images/bg_second.jpg');

export default class FacilityBookingScreen extends Component {

    static navigationOptions = { header: null };

    constructor(props) {
        super(props);
        this.init();
    }

    init() {
        this.state = {
            facility: [],
            refreshing: false,
        }
    }

    componentWillMount() {
        this.getData();
    }

    render() {
        let facility = this.state.facility.map((value, index) => {
            return (
                <RectButton
                    key={index}
                    style={styles.itemButton}
                    onPress={() => this.props.navigation.replace('CreateBooking',{
                        facility: value,
                    })}
                >
                    <View style={{ flexDirection: 'row',alignItems: 'center',}}>
                        <Icon
                            name="home"
                            type="antdesign"
                            color="#000"
                            size={24}
                            underlayColor={'transparent'}
                            style={{}}
                        />
                        <Text style={styles.itemButtonText}>{value.facility}</Text>
                    </View>
                    <Icon
                        name="right"
                        type="antdesign"
                        color="#924EB4"
                        size={20}
                        underlayColor={'transparent'}
                        // style={{paddingRight:20}}
                    />
                </RectButton>
            )
        });

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
                        <Text style={styles.headerTitle}>{tran.t('create_booking')}</Text>
                        <Icon
                            name="plus"
                            type="antdesign"
                            color="rgba(255,255,255,0)"
                            size= {30}
                            underlayColor={'transparent'}
                            style={{padding:10}}
                        />
                    </View>
                    {(facility.length !== 0) ?
                        <ScrollView refreshControl={
                            <RefreshControl
                                //TODO update style
                                progressBackgroundColor={"#B27ACF"}
                                tintColor={"#B27ACF"}
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh}
                            />
                        }>
                            <View style={styles.itemList}>
                                {facility}
                            </View>
                        </ScrollView>
                        :
                        <View style={{flex: 1,justifyContent: 'center'}}>
                            <ActivityIndicator size="large" color="#B27ACF" />
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
        await Axios.get(HOST_NAME+"facility")
            .then((response) => {
                if (response.status === 200) {
                    this.setState({
                        facility: response.data.data,
                    })
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
    };
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
    },
    itemButton:{
        paddingHorizontal: 20,
        paddingVertical: 15,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent:'space-between',
    },
    itemButtonText:{
        paddingLeft: 10,
        color:'#4F0B72',
        fontFamily: 'regular',
        fontSize: 16,
    },
});
