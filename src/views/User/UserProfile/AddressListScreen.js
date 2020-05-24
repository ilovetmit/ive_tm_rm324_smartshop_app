import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ImageBackground,
    Dimensions,
    ScrollView,
    RefreshControl,
    Alert,
    AsyncStorage,
    ActivityIndicator
} from 'react-native';
import { Input, Button, Text, Icon, Tooltip, Avatar, ListItem } from 'react-native-elements';
import TouchableScale from "react-native-touchable-scale";
import Axios from "axios";
import Toast from 'react-native-root-toast';
import { Updates } from "expo";
import Colors from '../../../constants/Colors';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const BG_IMAGE = require('../../../../assets/images/bg_second.jpg');

export default class AddressListScreen extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.init();
    }

    init() {
        this.state = {
            addressList: [],
            refreshing: false,
            isLoading: false,
        }

        this.district = [
            "",
            'Kwai Tsing, New Territories',
            'Tsuen Wan, New Territories',
            'Tuen Mun, New Territories',
            'Yuen Long, New Territories',
            'North, New Territories',
            'Tai Po, New Territories',
            'Sha Tin, New Territories',
            'Sai Kung, New Territories',
            'Islands, New Territories',
            'Yau Tsim Mong, Kowloon',
            'Sham Shui Po, Kowloon',
            'Kowloon City, Kowloon',
            'Wong Tai Sin, Kowloon',
            'Kwun Tong, Kowloon',
            'Central and Western, Hong Kong',
            'Wan Chai, Hong Kong',
            'Eastern, Hong Kong',
            'Southern, Hong Kong',
        ];
    }

    componentWillMount() {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', () => {
            this.getData();
        });
    }

    updateDefault($id) {
        Axios.post(HOST_NAME + HOST_API_VER + "address", {
            type: "default",
            address_id: $id
        })
            .then((response) => {
                if (response.status === 200) {
                    // console.log(response);
                    Toast.show("Update Default Address Success", {
                        duration: Toast.durations.SHORT,
                        position: Toast.positions.BOTTOM,
                        shadow: true,
                        animation: true,
                        hideOnPress: true,
                        delay: 0,
                    });
                    this._onRefresh();
                } else {
                    Toast.show(response.data.message, {
                        duration: Toast.durations.SHORT,
                        position: Toast.positions.BOTTOM,
                        shadow: true,
                        animation: true,
                        hideOnPress: true,
                        delay: 0,
                    });
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


    }


    render() {

        let addressList = this.state.addressList.map((value, index) => {
            return (

                value.default == 1 ?
                    <ListItem
                        key={index}
                        Component={TouchableScale}
                        containerStyle={{
                            marginTop: 10,
                            marginBottom: 10,
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
                        rightAvatar={{ rounded: true, icon: { name: 'check', type: 'font-awesome' }, overlayContainerStyle: { backgroundColor: "#00c800", height: 40, width: 40 } }}
                        title={<View>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{value.address1}</Text>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{value.address2}</Text>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{this.district[value.district]}</Text>
                        </View>}
                        titleStyle={{ color: Colors.ButtonText, fontWeight: 'bold' }}
                        titleProps={{ numberOfLines: 1, }}
                        subtitleStyle={{ color: Colors.ButtonText }}
                        onPress={() => this.props.navigation.navigate('AddressDetail', {
                            address: value,
                            type: "update",
                        })}
                        onLongPress={() => this.updateDefault(value.id)}
                    />

                    :

                    <ListItem
                        key={index}
                        Component={TouchableScale}
                        containerStyle={{
                            marginTop: 10,
                            marginBottom: 10,
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

                        title={<View>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{value.address1}</Text>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{value.address2}</Text>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{this.district[value.district]}</Text>
                        </View>}
                        titleStyle={{ color: Colors.ButtonText, fontWeight: 'bold' }}
                        titleProps={{ numberOfLines: 1, }}
                        subtitleStyle={{ color: Colors.ButtonText }}
                        onPress={() => this.props.navigation.navigate('AddressDetail', {
                            address: value,
                            type: "update",
                        })}
                        onLongPress={() => this.updateDefault(value.id)}
                    />


            )

        });


        return (
            <View style={styles.content} >
                <ImageBackground source={BG_IMAGE} style={styles.bgImage}>
                    <View style={styles.header}>
                        <Icon
                            name="chevron-left"
                            type="feather"
                            color={Colors.BlackText}
                            size={40}
                            onPress={() => this.props.navigation.goBack()}
                            underlayColor={'transparent'}
                            style={{ padding: 10 }}
                        />
                        <Text style={styles.headerTitle}>ADDRESS</Text>
                        <Button
                            title="Add"
                            type="clear"
                            titleStyle={{ color: Colors.ButtonText }}
                            onPress={() => {
                                this.props.navigation.navigate('AddressDetail', {
                                    type: "add",
                                    address: {
                                        address1: "",
                                        address2: "",
                                        district: 1,
                                    }

                                })
                            }}
                        />
                    </View>
                    {this.state.isLoading ?
                        <View style={styles.loading}>
                            <ActivityIndicator style={styles.indicator} size="large" color={Colors.BlackText} />
                        </View>
                        :
                        (addressList.length !== 0) ?
                            <ScrollView refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={() => this._onRefresh()}
                                />
                            }>
                                {addressList}
                            </ScrollView>
                            :
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                <Text note style={{ textAlign: 'center', color: Colors.ButtonText }}>{tran.t('no_record')}</Text>
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
        this.setState({
            isLoading: true,
        });
        Axios.get(HOST_NAME + HOST_API_VER + "address")
            .then((response) => {
                this.setState({
                    addressList: response.data.data,
                    isLoading: false,
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
    loading: {
        justifyContent: 'center',
        alignContent: 'center',
        width: '100%',
        height: '100%'
    },
    content: {
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
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'transparent',
        marginTop: 25,
        padding: 10,
    },
    headerTitle: {
        color: Colors.BlackText,
        fontSize: 16,
        fontFamily: 'bold',
    },
    subtitle: {
        color: Colors.BlackText,
        fontSize: 15,
        left: 10,
    },
});
