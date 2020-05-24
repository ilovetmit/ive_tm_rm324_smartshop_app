import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ImageBackground,
    Dimensions,
    KeyboardAvoidingView,
    BackHandler,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import { Input, Button, Text, Icon, Header, Image, ListItem } from 'react-native-elements';
import Axios from "axios";
import { RectButton } from "react-native-gesture-handler";
import Colors from '../../constants/Colors';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const BG_IMAGE = require('../../../assets/images/bg_second.jpg');

export default class OrderDetailScreen extends Component {

    static navigationOptions = { header: null };

    constructor(props) {
        super(props);
        this.init();
    }

    init() {
        this.state = {
            order: this.props.navigation.getParam("order"),
            totalPrice: this.props.navigation.getParam("amount"),
            payment_type: this.props.navigation.getParam("payment_type"),
            remark: this.props.navigation.getParam("remark"),
        }
    }

    componentWillMount() {
        // this.getData();
    }

    render() {

        let productList = this.state.order.has_product_transaction.map((value, index) => {
            let product = value.has_product
            return (
                <ListItem
                    key={index}
                    //Component={TouchableScale}
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
                    leftElement={
                        <Image source={{ uri: HOST_NAME + "/storage/products/image/" + product.image }} style={{ height: 60, width: 60 }} />
                    }
                    title={<View>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{product.name}</Text>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: "red" }}>$ {product.price}</Text>
                    </View>}
                    titleStyle={{ color: Colors.ButtonText, fontWeight: 'bold' }}
                    titleProps={{ numberOfLines: 1, }}
                    subtitleStyle={{ color: Colors.ButtonText }}
                    subtitle={<Text>Quantity: {value.quantity}</Text>}

                />
            )

        });
        if (this.state.remark) {
            let address = this.state.remark.deliveryAddress.split(",")
            var address_view = [];
            for (var i = 0; i < address.length; i++) {
                if (i == 0) {
                    address_view.push(
                        <Text key={i} style={styles.bodyText}>{' ' + address[i] + ','}</Text>
                    )
                } else {
                    address_view.push(
                        <Text key={i} style={styles.bodyText}>{address[i] + ','}</Text>
                    )
                }

            }
        }

        return (
            <KeyboardAvoidingView behavior="padding" style={styles.content}>
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
                        <Text style={styles.headerTitle}>Order Detail</Text>
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
                    {this.state.isLoading ?
                        <View style={styles.loading}>
                            <ActivityIndicator style={styles.indicator} size="large" color={Colors.BlackText} />
                        </View>
                        :
                        (productList.length !== 0) ?
                            <ScrollView>
                                {productList}
                                <View style={{ flexDirection: 'row', marginBottom: 6, alignItems: 'center', marginLeft: "15%" }}>

                                </View>
                                {(this.state.payment_type == 2) ?
                                    <View style={styles.body}>
                                        <Text style={styles.product_price}>Total :{this.state.totalPrice}</Text>
                                        <Icon
                                            name='coin'
                                            type='material-community'
                                            color='#FF8000'
                                            fontSize="20"
                                        />
                                    </View>
                                    :

                                    <View style={styles.body}>
                                        <Text style={styles.bodyText}>Total : </Text>
                                        <Text style={styles.product_price_type}>HKD ${this.state.totalPrice}</Text>
                                    </View>
                                }

                                {this.state.remark == false ? <View></View>
                                    :
                                    <View>
                                        <View style={styles.body}>
                                            <Text style={styles.bodyText}>Delivery Address:</Text>
                                            {address_view}
                                            <Text key={i} style={styles.bodyText}> Hong Kong</Text>
                                        </View>


                                        <View style={styles.body}>
                                            <Text style={styles.bodyText}>Delivery Date Time:</Text>
                                            <Text style={styles.bodyText}>{this.state.remark.deliveryDateTime}</Text>
                                        </View>


                                        <View style={styles.body}>
                                            <Text style={styles.bodyText}>Contact Phone Number:</Text>
                                            <Text style={styles.bodyText}>{this.state.remark.phoneNumber}</Text>
                                        </View>
                                    </View>
                                }


                            </ScrollView>
                            :
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                <Text note style={{ textAlign: 'center', color: Colors.ButtonText }}>{tran.t('no_record')}</Text>
                            </View>
                    }
                </ImageBackground>
            </KeyboardAvoidingView>

        );


    }

    getData = async () => {

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
    button: {
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    text: {
        marginLeft: 10,
        marginTop: 10,
        color: Colors.BlackText,
        fontSize: 20,
        fontWeight: 'bold',
    },
    bodyText: {
        marginTop: 5,
        textAlign: 'justify',
        color: '#000',
        fontSize: 18,
    },
    body: {
        marginBottom: 10,
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderRadius: 10,
        marginHorizontal: 10,
        padding: 10,
    },
    product_image: {
        flex: 1,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT / 2,
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
        fontSize: 16,
        color: "#ff2c2e",
    },
    product_price: {
        fontSize: 50,
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

    itemList: {
        marginBottom: 10,
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderRadius: 10,
        marginHorizontal: 10,
    },
    itemButton: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemButtonText: {
        paddingLeft: 10,
        color: Colors.ButtonText,
        fontFamily: 'regular',
        fontSize: 16,
    },
    itemButtonContent: {
        // paddingLeft: 10,
        color: Colors.ButtonText,
        fontFamily: 'light',
        fontSize: 16,
    },
});
