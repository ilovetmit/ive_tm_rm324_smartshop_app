import React, { Component } from 'react';
import { StyleSheet, View, ImageBackground, Dimensions, ScrollView, RefreshControl, TouchableOpacity, } from 'react-native';
import { Input, Button, Text, Icon, Tooltip, Avatar, ListItem } from 'react-native-elements';
import TouchableScale from "react-native-touchable-scale";
import Axios from "axios";
import Toast from 'react-native-root-toast';
import Colors from '../../constants/Colors';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const BG_IMAGE = require('../../../assets/images/bg_second.jpg');

export default class OrderScreen extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.init();
    }

    init() {
        this.state = {
            orders: [],
            refreshing: false,
        }
    }

    UNSAFE_componentWillMount() {
        this.getData();
    }

    render() {

        let orders = this.state.orders.map((value, index) => {
            let product_transaction = value.has_product_transaction[0]
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
                    leftAvatar={{ rounded: true, icon: { name: 'shopping', type: 'material-community' }, overlayContainerStyle: { backgroundColor: '#2C0C92' } }}
                    title={
                        <View>
                            <Text style={{ color: Colors.ButtonText, fontWeight: 'bold' }}> {value.header}</Text>
                            <View style={{ flexDirection: "row", alignItems: 'center' }}>
                                {value.currency == 2 ?
                                    <Icon
                                        name='coin'
                                        type='material-community'
                                        color='#FFFF00'
                                        size={14}
                                    /> : <View />}
                                <Text style={{ color: Colors.ButtonText }}>{value.currency == 2 ? "" : "$"} {value.amount}</Text>
                            </View>
                        </View>

                    }
                    titleStyle={{ color: Colors.ButtonText, fontWeight: 'bold' }}
                    titleProps={{ numberOfLines: 1, }}
                    subtitleStyle={{ color: Colors.ButtonText }}
                    subtitle={"#" + value.id + " | " + value.created_at}
                    chevron={{ color: Colors.ButtonText }}
                    // badge={{ value: status, status: badge_style, textStyle: { color: '#FFF' }, containerStyle: { marginTop: 0 } }}

                    onPress={() => this.props.navigation.navigate('OrderDetail', {
                        order: value,
                        amount: value.amount,
                        payment_type: value.currency,
                        remark: product_transaction.remark,

                    })}

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
                            onPress={() => this.props.navigation.goBack()}
                            underlayColor={'transparent'}
                            style={{ padding: 10 }}
                        />
                        <Text style={styles.headerTitle}>ORDER</Text>
                        <Icon
                            name="options"
                            type="simple-line-icon"
                            color="rgba(255,255,255,0)"
                            size={30}
                            // onPress={() =>alert('In Developing...')}
                            underlayColor={'transparent'}
                            style={{ padding: 10 }}
                        />
                    </View>
                    {(orders.length !== 0) ?
                        <ScrollView refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={() => this._onRefresh()}
                            />
                        }>
                            {orders}
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
        Axios.get(HOST_NAME + HOST_API_VER + "orders")
            .then((response) => {
                this.setState({
                    orders: response.data.data,
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
    content: {
        flex: 1,
    },
    bgImage: {
        flex: 1,
        top: 0,
        left: 0,
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
        fontSize: 20,
        fontFamily: 'bold',
    },
    subtitle: {
        color: Colors.BlackText,
        fontSize: 15,
        left: 10,
    },
});
