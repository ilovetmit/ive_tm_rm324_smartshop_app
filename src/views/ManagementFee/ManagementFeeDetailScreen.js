import React, { Component } from 'react';
import {StyleSheet, View, ImageBackground, Dimensions, KeyboardAvoidingView, BackHandler, ScrollView, } from 'react-native';
import {Input, Button, Text, Icon, Header, Badge, ListItem} from 'react-native-elements';
import Axios from "axios";
import TouchableScale from "react-native-touchable-scale";
import Toast from 'react-native-root-toast';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const BG_IMAGE = require('../../../assets/images/bg_second.jpg');

export default class ManagementFeeDetailScreen extends Component {

    static navigationOptions = { header: null };

    constructor(props) {
        super(props);
        this.init();
    }

    init() {
        this.state = {
            id: this.props.navigation.getParam("id"),
            status: this.props.navigation.getParam("status"),
            management_fee: this.props.navigation.getParam("management_fee"),
            refreshing: false,
        }
    }

    componentWillMount() {
        // this.getData();
    }

    render() {

        let parking_space_fee = this.state.management_fee.detail.parking_space_fee.map((value, index) => {

            // TODO update style
            return (
                <Text key={index} style={styles.text}>#{value.parking_space_id} - {value.license_plate}: $ {value.fee}</Text>
            )

        });

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
                        <Text style={styles.headerTitle}>{tran.t('management_fee_header')}</Text>
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
                            <Text style={styles.text}>{this.state.management_fee.detail.billing_month}</Text>
                            <Text style={styles.total}>$ {this.state.management_fee.fee}</Text>
                            {(this.state.status=="Pending")?
                                <Badge value={tran.t('management_fee_status.pending')} status="primary" />:
                                (this.state.status=='Complete')?
                                    <Badge value={tran.t('management_fee_status.complete')} status="success" />:
                                    (this.state.status=="Arrears")?
                                        <Badge value={tran.t('management_fee_status.arrears')} status="warning" />:
                                        (this.state.status=="Expired")?
                                            <Badge value={tran.t('management_fee_status.expired')} status="error" />:
                                            (this.state.status=="Cancel")?
                                            <Badge value={tran.t('management_fee_status.cancel')} status="error" />:
                                                <Badge value={tran.t('management_fee_status.unknown')} status="error" />
                            }
                            <Text style={styles.text}>{tran.t('management_fee')}: $ {this.state.management_fee.detail.house_fee}</Text>
                            {parking_space_fee}
                            <Text style={styles.text}>{tran.t('repair_fund')}Repair Fund: $ {this.state.management_fee.detail.repair_fund}</Text>
                            <Text style={styles.text}>{tran.t('create_at')} {this.state.management_fee.created_at}</Text>

                        </View>
                    </ScrollView>
                </ImageBackground>
            </View>

        );
    }

    getData = async () => {
        await Axios.get(HOST_NAME+"user/management_fee/"+this.state.id)
            .then((response) => {
                if (response.status === 200) {
                    this.setState({
                        management_fee: response.data.data.management_fee,
                        type: response.data.data.type,
                        status: response.data.data.status,
                    });
                    // console.log(response);
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
