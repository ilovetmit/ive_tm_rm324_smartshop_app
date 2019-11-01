import React, { Component } from 'react';
import {StyleSheet,Text,View, ImageBackground,Dimensions,KeyboardAvoidingView, BackHandler, ScrollView, RefreshControl, } from 'react-native';
import {Input, Button, Icon, Header, ListItem} from 'react-native-elements';
import TouchableScale from "react-native-touchable-scale";
import Axios from "axios";
import Toast from 'react-native-root-toast';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const BG_IMAGE = require('../../../../assets/images/bg_second.jpg');

export default class ServiceRequestScreen extends Component {

    static navigationOptions = { header: null };

    constructor(props) {
        super(props);
        this.init();
    }

    init() {
        this.state = {
            request: [],
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

        var request_status = this.state.status;

        let request = this.state.request.map((value, index) => {

            var status = value.status;
            if(status==request_status['OPEN']){
                status = tran.t('support_status.open');
            }else if(status==request_status['COMPLETED']){
                status = tran.t('support_status.completed');
            }else if(status==request_status['CLOSED']){
                status = tran.t('support_status.closed');
            }else if(status==request_status['CANCEL']){
                status = tran.t('support_status.cancel');
            }else{
                status = tran.t('support_status.unknown');
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
                    leftAvatar={{ rounded: true, icon:{name: 'exception1', type: 'antdesign'}, overlayContainerStyle:{backgroundColor: '#2C0C92'} }}
                    title={value.contents.title}
                    titleStyle={{ color: 'white', fontWeight: 'bold' }}
                    titleProps={{numberOfLines:1,}}
                    subtitleStyle={{ color: 'white' }}
                    subtitle={value.service_request_type.type}
                    chevron={{ color: 'white' }}
                    badge={{ value: status, textStyle: { color: '#FFF' }, containerStyle: { marginTop: 0 } }}
                    onPress={() => this.props.navigation.navigate('ServiceRequestDetail',{ request: value,status:request_status })}
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
                        <Text style={styles.headerTitle}>{tran.t('request_header')}</Text>
                        <Icon
                            name="plus"
                            type="antdesign"
                            color="rgba(255,255,255,1)"
                            size= {30}
                            onPress={() => this.props.navigation.navigate('CreateServiceRequest')}
                            underlayColor={'transparent'}
                            style={{padding:10}}
                        />
                    </View>
                    {(request.length !== 0) ?
                        <ScrollView refreshControl={
                            <RefreshControl
                                //TODO update style
                                progressBackgroundColor={"#B27ACF"}
                                tintColor={"#B27ACF"}
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh}
                            />
                        }>
                            {request}
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
        await Axios.get(HOST_NAME+"request")
            .then((response) => {
                if (response.status === 200) {
                    this.setState({
                        request: response.data.data.request,
                        status: response.data.data.status.variables,
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
