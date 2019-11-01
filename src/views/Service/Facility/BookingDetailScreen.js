import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ImageBackground,
    Dimensions,
    KeyboardAvoidingView,
    BackHandler,
    ScrollView,
    Alert, AsyncStorage,
} from 'react-native';
import {Input, Button, Text, Icon, Header, Badge, ListItem} from 'react-native-elements';
import Axios from "axios";
import TouchableScale from "react-native-touchable-scale";
import Toast from 'react-native-root-toast';
import {Updates} from "expo";

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
            booking: this.props.navigation.getParam("booking"),
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
                            onPress={() =>this.props.navigation.navigate('FacilityBooking')}
                            underlayColor={'transparent'}
                            style={{padding:10}}
                        />
                        <Text style={styles.headerTitle}>{tran.t('booking_header')}</Text>
                        <Icon
                            name="options"
                            type="simple-line-icon"
                            color="rgba(255,255,255,0)"
                            size= {30}
                            underlayColor={'transparent'}
                            style={{padding:10}}
                        />
                    </View>
                    <ScrollView>
                        <View style={{paddingHorizontal:10,alignItems: 'center',justifyContent:'center'}}>
                            {(this.state.booking.status==this.state.status['REQUESTING'])?
                                <Badge value={tran.t('booking_status.requesting')} status="primary" />:
                                (this.state.booking.status==this.state.status['ALLOW'])?
                                    <Badge value={tran.t('booking_status.allow')} status="success" />:
                                    (this.state.booking.status==this.state.status['REJECT'])?
                                        <Badge value={tran.t('booking_status.reject')} status="error" />:
                                        (this.state.booking.status==this.state.status['CANCEL'])?
                                            <Badge value={tran.t('booking_status.cancel')} status="error" />:
                                            <Badge value={tran.t('booking_status.unknown')} status="warning" />
                            }
                            <View style={styles.titleView}>
                                <Text style={styles.title}>{this.state.booking.facility.facility}</Text>
                            </View>
                            <Text style={styles.text}>{tran.t('booking_date')} : {this.state.booking.booking_date}</Text>
                            <Text style={styles.text}>{tran.t('booking_time')} : {this.state.booking.booking_time}</Text>
                            <Text style={styles.text}>{tran.t('num_of_user')} : {this.state.booking.num_of_user}</Text>
                            {this.state.booking.remark!==null?
                                <Text style={styles.text}>{tran.t('remark')} : {this.state.booking.remark}</Text>:<View></View>
                            }

                            <Text style={styles.text}>{tran.t('created_at')} : {this.state.booking.created_at}</Text>
                            {(this.state.booking.status == this.state.status['REQUESTING']) ?
                                <Button
                                    title={tran.t('edit_booking')}
                                    onPress={()=>alert('🚀 '+tran.t('coming_soon'))}
                                />:<View></View>
                            }
                            {(this.state.booking.status != this.state.status['CANCEL'] && this.state.booking.status != this.state.status['REJECT']) ?
                                <Button
                                    title={tran.t('cancel_booking')}
                                    buttonStyle={{backgroundColor: '#F00',marginTop: 10}}
                                    onPress={() => this.cancelBooking()}
                                />:<View></View>
                            }
                        </View>
                    </ScrollView>
                </ImageBackground>
            </View>

        );
    }

    cancelBooking = async () => {
        Alert.alert(
            tran.t('confirm'),
            tran.t('cancel_booking_msg', { origin: tran.t(tran.locale), new: tran.t(this.state.language) }),
            [
                {
                    text: tran.t('yes'), onPress: async () => {
                        await Axios.get(HOST_NAME+"booking/action/"+this.state.booking.id+"/cancel")
                            .then((response) => {
                                if (response.status === 200) {
                                    Toast.show(tran.t('operation_success'), {
                                        duration: Toast.durations.SHORT,
                                        position: Toast.positions.BOTTOM,
                                        shadow: true,
                                        animation: true,
                                        hideOnPress: true,
                                        delay: 0,
                                    });
                                    this.props.navigation.replace('BookingDetail',{ booking: response.data.data.booking, status:response.data.data.status.variables });
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
                    }
                },
                { text: tran.t('no'), style: 'cancel' }
            ]
        );

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
    title:{
        color:'#FFF',
        fontFamily: 'UbuntuBold',
        fontSize: 20,
    },
    titleView:{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection:'row',
        flex: 1,
        marginVertical: 10,
        marginBottom: 20,
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
