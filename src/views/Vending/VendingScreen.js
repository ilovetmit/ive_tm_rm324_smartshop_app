import React, { Component } from 'react';
import { AsyncStorage, Dimensions, ImageBackground, StyleSheet, View, ScrollView, TouchableOpacity, Platform, StatusBar, Alert, ActivityIndicator, RefreshControl } from 'react-native';
import { Button, Text, Icon, Tooltip, Avatar, Overlay, Image, Badge } from 'react-native-elements';
import { Notifications } from 'expo';
import Axios from "axios";
import Toast from 'react-native-root-toast';
import Waterfall from 'react-native-waterfall'
import Colors from '../../constants/Colors';
import * as Device from 'expo-device';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const BG_IMAGE = require('../../../assets/images/bg_second.jpg');

export default class VendingScreen extends Component {

    static navigationOptions = { header: null, };
    constructor(props) {
        super(props);
        this.init();
    }

    init() {
        this.data = [];
        this.page = 1;
        this.state = {
            isRefreshing: false,
            isLoadingMore: false,
            endPage: 1,
            teclastView: [],
        }
    }

    componentWillMount() {
        if ((Device.brand === "teclast" || Device.brand === "Teclast")) {
            this.getAllData();
        } else {
            this.getData();
        }
    }

    renderItem = (itemData, itemIdx, itemContainer) => {
        return (
            (itemData.product.End) ?
                <View />
                // <TouchableOpacity style={styles.product_body}>
                //     <View style={{alignItems: 'center',}}>
                //         <Text style={{
                //             padding:5,
                //             fontSize: 16,
                //         }}>No more products</Text>
                //     </View>
                //     <Icon
                //         name="cloud-done"
                //         type="material"
                //         color="#0C6"
                //         size={50}
                //         underlayColor={'transparent'}
                //         containerStyle={{paddingBottom:10}}
                //     />
                // </TouchableOpacity>
                :
                <TouchableOpacity style={styles.product_body} key={"product" + itemIdx} activeOpacity={1}
                    onPress={() => this.props.navigation.navigate('VendingBuy', { product_id: itemData.product.product_id })}
                >
                    <Image
                        source={{ uri: HOST_NAME + "/storage/products/image/" + itemData.product.has_product.image }}
                        style={styles.product_image}
                        PlaceholderContent={<ActivityIndicator />}
                        placeholderStyle={{ backgroundColor: '#FFF' }}
                    />
                    <View style={styles.product_type}>
                        <Text style={{ color: '#FFFFFF', fontWeight: "bold" }}>{itemData.product.has_product.has_category[0].name}</Text>
                    </View>
                    <Text style={styles.product_title} numberOfLines={1}>{itemData.product.has_product.name}</Text>
                    <Text style={styles.product_description} numberOfLines={2}>{itemData.product.has_product.description}</Text>
                    <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                        <Text style={styles.product_price_type}>HKD </Text>
                        <Text style={styles.product_price}>{itemData.product.has_product.price}</Text>
                    </View>
                </TouchableOpacity>
        )
    };



    render() {

        let teclastView = this.state.teclastView.map((value, index) => {
            return (
                <TouchableOpacity style={styles.product_body_teclastView} key={"product" + index} activeOpacity={1}
                    onPress={() => this.props.navigation.navigate('VendingBuy', { product_id: value.qrcode })}
                >
                    <Image
                        source={{ uri: value.url }}
                        style={styles.product_image}
                        PlaceholderContent={<ActivityIndicator />}
                        placeholderStyle={{ backgroundColor: '#FFF' }}
                    />
                    <View style={styles.product_type}>
                        <Text style={{ color: '#FFFFFF', fontWeight: "bold" }}>{value.category}</Text>
                    </View>
                    <Text style={styles.product_title} numberOfLines={1}>{value.name}</Text>
                    <Text style={styles.product_description} numberOfLines={2}>{value.description}</Text>
                    <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                        <Text style={styles.product_price_type}>HKD </Text>
                        <Text style={styles.product_price}>{value.price}</Text>
                    </View>
                </TouchableOpacity>
            )
        });

        return (
            <View style={styles.content}>
                <StatusBar barStyle="dark-content" translucent={true} />
                <ImageBackground source={BG_IMAGE} style={styles.bgImage}>
                    <View style={styles.header}>
                        <Icon
                            name="menu"
                            type="feather"
                            color={Colors.BlackText}
                            size={35}
                            onPress={() => this.props.navigation.openDrawer()}
                            underlayColor={'transparent'}
                        />
                        <Text style={styles.headerTitle}>S-Vending</Text>
                        <Icon
                            name="dots-three-horizontal"
                            type="entypo"
                            color="rgba(255,255,255,0)"
                            size={30}
                            // onPress={() =>alert('In Developing...')}
                            underlayColor={'transparent'}
                        />
                    </View>
                    {/*<View style={{ flexDirection:'row',left: 10, marginTop:10,alignItems: 'center',}}>*/}
                    {/*    <Icon*/}
                    {/*        name="book"*/}
                    {/*        type="antdesign"*/}
                    {/*        color="#fff"*/}
                    {/*        size={25}*/}
                    {/*        underlayColor={'transparent'}*/}
                    {/*    />*/}
                    {/*    <Text style={styles.subtitle}>{tran.t('housing_estate_info')}</Text>*/}
                    {/*</View>*/}
                    {(Device.brand === "teclast" || Device.brand === "Teclast") ?
                        <ScrollView>
                            <View style={styles.teclastView}>
                                {teclastView}
                            </View>
                        </ScrollView>
                        :
                        <Waterfall
                            style={styles.product}
                            contentContainerStyle={{ paddingBottom: 10 }}
                            data={this.data}
                            gap={10}
                            numberOfColumns={2}
                            expansionOfScope={200}
                            onEndReachedThreshold={10000}
                            onEndReached={() => {
                                if (this.page < this.state.endPage) {
                                    this.setState({ isLoadingMore: true });
                                    ++this.page;
                                    // console.log("onEndReached"+this.page);
                                    setTimeout(() => {
                                        this.setState({
                                            isLoadingMore: false
                                        });
                                        this.getData();
                                    }, 1000)
                                }
                            }}
                            renderItem={this.renderItem}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.isRefreshing}
                                    onRefresh={this._onRefresh}
                                />
                            } />
                    }

                    {/*<View style={styles.product}>*/}
                    {/*    {products}*/}
                    {/*</View>*/}

                </ImageBackground>
            </View>
        );
    }

    _onRefresh = () => {
        if (this.state.isRefreshing || this.state.isLoadingMore) {
            return;
        }
        this.data = [];
        this.setState({
            isRefreshing: true,
            endPage: 1,
        });
        this.page = 1;
        // console.log("_onRefresh"+this.page);
        if ((Device.brand === "teclast" || Device.brand === "Teclast")) {
            this.getAllData().then(() => {
                setTimeout(() => { this.setState({ isRefreshing: false }) }, 1000);
            });
        } else {
            this.getData().then(() => {
                setTimeout(() => { this.setState({ isRefreshing: false }) }, 1000);
            });
        }
    };

    getAllData = async () => {
        Axios.get(HOST_NAME + HOST_API_VER + "vending_product/all")
            .then((response) => {
                this.setState({
                    teclastView: response.data.data,
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

    getData = async () => {
        await Axios.get(HOST_NAME + HOST_API_VER + "vending?page=" + this.page)
            .then((response) => {
                var products = response.data.data.data;
                for (var i = 0; i < products.length; ++i) {
                    this.data.push({
                        product: products[i],
                    });
                }
                if (this.page === response.data.data.last_page) {
                    this.data.push({
                        product: {
                            End: true,
                        }
                    });
                }
                this.setState({
                    endPage: response.data.data.last_page,
                });
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
        fontSize: 20,
        fontFamily: 'bold',
    },
    subtitle: {
        color: Colors.BlackText,
        fontSize: 15,
        left: 10,
    },
    teclastView: {
        marginTop: 10,
        flexWrap: 'wrap',
        flexDirection: 'row',
        padding: 5,
    },
    product: {
        flex: 1,
    },
    product_body_teclastView: {
        width: (SCREEN_WIDTH - 100) / 2,
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderRadius: 10,
        flexBasis: (SCREEN_WIDTH - 30) / 2,
        overflow: "hidden",
        marginBottom: 10,
        marginHorizontal: 5,
    },
    product_body: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderRadius: 10,
        flexBasis: (SCREEN_WIDTH - 30) / 2,
        overflow: "hidden",
    },
    product_image: {
        flex: 1,
        width: (SCREEN_WIDTH - 30) / 2,
        height: (SCREEN_WIDTH - 30) / 2,
    },
    product_title: {
        marginTop: 10,
        marginLeft: 5,
        fontSize: 16,
        fontWeight: "bold",
        // fontFamily: 'regular',
        // textAlign: 'justify',
    },
    product_description: {
        marginTop: 3,
        marginLeft: 5,
        fontSize: 14,
        color: "#747474",
    },
    product_price_type: {
        paddingTop: 8,
        marginLeft: 5,
        fontSize: 12,
        color: "#ff2c2e",
    },
    product_price: {
        marginLeft: 1,
        fontSize: 24,
        fontFamily: "UbuntuBold",
        color: "#ff2c2e",
    },
    product_type: {
        position: 'absolute', top: 5, right: 5,
        backgroundColor: 'rgba(255,0,0,0.6)',
        borderRadius: 8,
        paddingHorizontal: 5,
        paddingVertical: 3,
    },
});
