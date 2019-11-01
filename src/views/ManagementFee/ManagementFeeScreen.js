import React, { Component } from 'react';
import {StyleSheet,Text,View,ImageBackground,Dimensions,KeyboardAvoidingView, BackHandler, ScrollView,  TouchableOpacity, RefreshControl,} from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
import {Input, Button, Icon, Header, ListItem} from 'react-native-elements';
import Axios from "axios";
import Toast from 'react-native-root-toast';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const BG_IMAGE = require('../../../assets/images/bg_second.jpg');

export default class ManagementFeeScreen extends Component {

    static navigationOptions = { header: null };

    constructor(props) {
        super(props);
        this.init();
    }

    init() {
        this.state = {
            status: [],
            type: [],
            management_fee: [],
            refreshing: false,
        }
    }

    componentWillMount() {
        this.getData();
    }

    render() {
        //TODO if management fee null

        var fee_status = this.state.status.variables;
        let management_fee = this.state.management_fee.map((value, index) => {
            var status = value.status;
            if(status==fee_status['PENDING']){
                status = tran.t('management_fee_status.pending');
            }else if(status==fee_status['COMPLETE']){
                status = tran.t('management_fee_status.complete');
            }else if(status==fee_status['ARREARS']){
                status = tran.t('management_fee_status.arrears');
            }else if(status==fee_status['EXPIRED']){
                status = tran.t('management_fee_status.expired');
            }else if(status==fee_status['CANCEL']){
                status = tran.t('management_fee_status.cancel');
            }else{
                status = tran.t('management_fee_status.unknown');
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
                        colors: ['#3C10F2', '#775AEF'],
                        start: [1, 0],
                        end: [0.2, 0],
                    }}
                    leftAvatar={{ rounded: true, icon:{name: 'dollar', type: 'foundation'}, overlayContainerStyle:{backgroundColor: '#2C0C92'} }}
                    title={"$ "+value.fee}
                    titleStyle={{ color: 'white', fontWeight: 'bold' }}
                    subtitleStyle={{ color: 'white' }}
                    subtitle={"["+value.detail.billing_month+"] "+value.house.building+"-"+value.house.floor+(Array(2).join('0') + value.house.room).slice(-2)}
                    chevron={{ color: 'white' }}
                    badge={{ value: status, textStyle: { color: '#FFF' }, containerStyle: { marginTop: 0 } }}
                    onPress={() => this.props.navigation.navigate('ManagementFeeDetail',{ id: value.id,status:status,management_fee:value })}
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
                        <Text style={styles.headerTitle}>{tran.t('management_fee_header')}</Text>
                        <Icon
                            name="options"
                            type="simple-line-icon"
                            color="rgba(255,255,255,0)"
                            size= {30}
                            underlayColor={'transparent'}
                            style={{padding:10}}
                        />
                    </View>
                    {(management_fee.length !== 0) ?
                        <ScrollView refreshControl={
                            <RefreshControl
                                //TODO update style
                                progressBackgroundColor={"#B27ACF"}
                                tintColor={"#B27ACF"}
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh}
                            />
                        }>
                            {management_fee}
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
        await Axios.get(HOST_NAME+"user/management_fee")
            .then((response) => {
                if (response.status === 200) {
                    this.setState({
                        management_fee: response.data.data.management_fee,
                        type: response.data.data.type,
                        status: response.data.data.status,
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
});
