import React, { Component } from 'react';
import {StyleSheet,View,ImageBackground,Dimensions,ScrollView,RefreshControl,Alert, AsyncStorage} from 'react-native';
import {Input, Button,Text, Icon, Tooltip, Avatar, ListItem} from 'react-native-elements';
import TouchableScale from "react-native-touchable-scale";
import Axios from "axios";
import Toast from 'react-native-root-toast';
import {Updates} from "expo";
import Colors from '../../../constants/Colors';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const BG_IMAGE = require('../../../../assets/images/bg_second.jpg');

export default class LockerScreen extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.init();
    }

    init() {
        this.state = {
            vendings: [],
            refreshing: false,
        }
    }

    componentWillMount() {
        this.getData();
    }

    render() {

        let vendings = this.state.vendings.map((value, index) => {
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
                        colors: [Colors.Primary, Colors.Primary],
                        start: [1, 0],
                        end: [0.2, 0],
                    }}
                    leftAvatar={{ rounded: true, icon:{name: 'inbox', type: 'antdesign'}, overlayContainerStyle:{backgroundColor: '#2C0C92'} }}
                    title={"# "+value.vending_channel}
                    titleStyle={{ color: Colors.ButtonText, fontWeight: 'bold' }}
                    titleProps={{numberOfLines:1,}}
                    // subtitleStyle={{ color: 'white' }}
                    // subtitle={"Size "+value.size}
                    rightTitle={"Spin"}
                    rightTitleStyle={{color:Colors.ButtonText}}
                    onPress={() => this.unlockLocker(value.vending_channel)}
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
                            color={Colors.BlackText}
                            size={40}
                            onPress={() =>this.props.navigation.goBack()}
                            underlayColor={'transparent'}
                            style={{padding:10}}
                        />
                        <Text style={styles.headerTitle}>LOCKER</Text>
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
                    {(vendings.length !==0) ?
                        <ScrollView refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={()=>this._onRefresh()}
                            />
                        }>
                            {vendings}
                        </ScrollView>
                        :
                        <View style={{flex: 1,justifyContent: 'center'}}>
                            <Text note style={{ textAlign: 'center',color:Colors.ButtonText }}>{tran.t('no_record')}</Text>
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
        Axios.get(HOST_NAME+HOST_API_VER+"vending_product/all")
            .then((response) => {
                this.setState({
                    vendings: response.data.data,
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

    unlockLocker = async (vending_id) => {
        Alert.alert(
            tran.t('confirm'),
            "Are you sure you want to turn on Vending #"+vending_id+"?",
            [
                {
                    text: tran.t('yes'), onPress: async () => {
                        Axios.get(HOST_NAME+HOST_API_VER+"vending_test/"+vending_id)
                            .then((response) => {
                                if (response.status === 200) {
                                    // console.log(response);
                                    Toast.show("Request success. Vending Running...", {
                                        duration: Toast.durations.SHORT,
                                        position: Toast.positions.CENTER,
                                        shadow: true,
                                        animation: true,
                                        hideOnPress: true,
                                        delay: 0,
                                    });
                                } else if (response.status === 233) {
                                    Toast.show("Already request\nPlease wait for Locker to open", {
                                        duration: Toast.durations.SHORT,
                                        position: Toast.positions.CENTER,
                                        shadow: true,
                                        animation: true,
                                        hideOnPress: true,
                                        delay: 0,
                                    });
                                }else{
                                    Toast.show(response.message, {
                                        duration: Toast.durations.SHORT,
                                        position: Toast.positions.CENTER,
                                        shadow: true,
                                        animation: true,
                                        hideOnPress: true,
                                        delay: 0,
                                    });
                                }
                                this._onRefresh();
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
        color: Colors.BlackText,
        fontSize: 20,
        fontFamily: 'bold',
    },
    subtitle:{
        color: Colors.BlackText,
        fontSize: 15,
        left: 10,
    },
});
