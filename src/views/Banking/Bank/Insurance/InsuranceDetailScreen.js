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
import { Input, Button, Text, Icon, Header, Image } from 'react-native-elements';
import Axios from "axios";
import Colors from '../../../../constants/Colors';
import Toast from "react-native-root-toast";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const BG_IMAGE = require('../../../../../assets/images/bg_insurance.jpg');

export default class InsuranceDetailScreen extends Component {

    static navigationOptions = { header: null };

    constructor(props) {
        super(props);
        this.init();
    }

    init() {
        this.state = {
            product: [],
            price: [],
            image: "",
            insurance_id: this.props.navigation.getParam("insurance_id"),
        }
    }

    UNSAFE_componentWillMount() {
        this.getData();
    }

    render() {
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
                        <Text style={styles.headerTitle}>INSURANCE</Text>
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
                    <ScrollView>
                        <Image
                            source={{ uri: HOST_NAME + "/storage/in/" + this.state.image }}
                            style={styles.product_image}
                            PlaceholderContent={<ActivityIndicator />}
                            placeholderStyle={{ backgroundColor: '#FFF' }}
                        />
                        <Text h4 style={styles.product_text}>{this.state.product.name}</Text>
                        <View style={styles.body}>
                            <Text style={styles.bodyText}>{this.state.product.description}</Text>
                            <View style={{ flexDirection: 'row', marginBottom: 6 }}>
                                <Text style={styles.product_price_type}>Monthly HKD </Text>
                                <Text style={styles.product_price}>{this.state.price.monthly}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginBottom: 6 }}>
                                <Text style={styles.product_price_type}>Quarterly HKD </Text>
                                <Text style={styles.product_price}>{this.state.price.quarterly}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginBottom: 6 }}>
                                <Text style={styles.product_price_type}>Yearly HKD </Text>
                                <Text style={styles.product_price}>{this.state.price.yearly}</Text>
                            </View>
                        </View>
                    </ScrollView>
                </ImageBackground>
            </View>

        );
    }

    getData = async () => {
        await Axios.get(HOST_NAME + HOST_API_VER + "insurance/" + this.state.insurance_id)
            .then((response) => {
                if (response.status === 200) {
                    // console.log(response.data.data);
                    this.setState({
                        product: response.data.data,
                        price: response.data.data.price,
                        image: response.data.data.image[0],
                    });
                }
            })
            .catch((error) => {
                Toast.show(tran.t('unexpected_error'), {
                    duration: Toast.durations.SHORT,
                    position: Toast.positions.BOTTOM,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                    delay: 0,
                });
                this.props.navigation.goBack();
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
    button: {
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    text: {
        padding: 10,
        color: Colors.BlackText,
        fontSize: 20,
    },
    bodyText: {
        textAlign: 'justify',
        color: '#000',
        fontSize: 18,
    },
    body: {
        marginTop: 5,
        marginBottom: 10,
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderRadius: 10,
        marginHorizontal: 10,
        padding: 10,
    },
    product_text: {
        padding: 10,
        color: Colors.BlackText,
        textAlign: 'center',
        fontSize: 22,
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
    buyButton: {
        height: 50,
        width: 100,
        backgroundColor: Colors.Secondary,
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 5,
        marginBottom: 5,
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
        fontSize: 14,
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
