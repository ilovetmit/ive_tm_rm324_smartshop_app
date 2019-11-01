import React, { Component } from 'react';
import {StyleSheet,Text,View,ImageBackground,Dimensions,KeyboardAvoidingView, BackHandler, ScrollView, RefreshControl,} from 'react-native';
import {Input, Button, Icon, Header, ListItem} from 'react-native-elements';
import TouchableScale from "react-native-touchable-scale";
import Axios from "axios";
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
            booking: [],
            status: [],
            refreshing: false,
        }
    }

    componentWillMount() {
        this.getData();
        this.willFocusSubscription = this.props.navigation.addListener('didFocus', () => {
            this.getData();
        });
    }

    componentWillUnmount() {
        this.willFocusSubscription.remove();
    }

    render() {
        // TODO if house null

        var booking_status = this.state.status;

        let booking = this.state.booking.map((value, index) => {

            var badge_style = 'primary';
            var status = value.status;
            if(status==booking_status['REQUESTING']){
                status = tran.t('booking_status.requesting');
            }else if(status==booking_status['ALLOW']){
                status = tran.t('booking_status.allow');
                badge_style = 'success';
            }else if(status==booking_status['REJECT']){
                status = tran.t('booking_status.reject');
                badge_style = 'error';
            }else if(status==booking_status['CANCEL']){
                status = tran.t('booking_status.cancel');
                badge_style = 'error';
            }else{
                status = tran.t('booking_status.unknown');
                badge_style = 'warning';
            }

            // TODO update style
            return (
                <ListItem
                    key={index}
                    Component={TouchableScale}
                    containerStyle={{
                        marginTop: 5,
                        marginBottom: 15,
                        marginHorizontal: 10,
                        borderRadius: 10,
                    }}
                    friction={90} //
                    tension={100} // These props are passed to the parent component (here TouchableScale)
                    activeScale={0.95} //
                    linearGradientProps={{
                        colors: ['#691594', '#bf58e2'],
                        start: [1, 0],
                        end: [0.2, 0],
                    }}
                    leftAvatar={{ rounded: true, icon:{name: 'clockcircleo', type: 'antdesign'}, overlayContainerStyle:{backgroundColor: '#2C0C92'} }}
                    title={value.facility.facility}
                    titleStyle={{ color: 'white', fontWeight: 'bold' }}
                    titleProps={{numberOfLines:1,}}
                    subtitleStyle={{ color: 'white' }}
                    subtitle={value.booking_date+" | "+value.booking_time}
                    chevron={{ color: 'white' }}
                    badge={{ value: status, status: badge_style, textStyle: { color: '#FFF' }, containerStyle: { marginTop: 0 } }}
                    onPress={() => this.props.navigation.navigate('BookingDetail',{ booking: value, status:this.state.status })}
                />
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
                        <Text style={styles.headerTitle}>{tran.t('booking_header')}</Text>
                        <Icon
                            name="plus"
                            type="antdesign"
                            color="rgba(255,255,255,1)"
                            size= {30}
                            onPress={() => this.props.navigation.navigate('CreateFacilityList')}
                            underlayColor={'transparent'}
                            style={{padding:10}}
                        />
                    </View>
                    {(booking.length !== 0) ?
                        <ScrollView refreshControl={
                            <RefreshControl
                                //TODO update style
                                progressBackgroundColor={"#B27ACF"}
                                tintColor={"#B27ACF"}
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh}
                            />
                        }>
                            {booking}
                        </ScrollView>
                        :
                        <View style={{flex: 1,justifyContent: 'center'}}>
                            <Text note style={{ textAlign: 'center',color:'#FFF' }}>{tran.t('no_record')}</Text>
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
        await Axios.get(HOST_NAME+"booking")
            .then((response) => {
                if (response.status === 200) {
                    this.setState({
                        booking: response.data.data.booking,
                        status: response.data.data.status.variables,
                    })
                }
            })
            .catch((error) => {
                console.log(error);
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
});
