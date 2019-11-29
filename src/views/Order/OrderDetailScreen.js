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
import {Input, Button, Text, Icon, Header, Image} from 'react-native-elements';
import Axios from "axios";
import {RectButton} from "react-native-gesture-handler";
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
        }
    }

    componentWillMount() {
        // this.getData();
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
                            onPress={() =>this.props.navigation.goBack()}
                            underlayColor={'transparent'}
                            style={{padding:10}}
                        />
                        <Text style={styles.headerTitle}>ORDER #{this.state.order.id}</Text>
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
                        <Image
                            source={{ uri: HOST_NAME+this.state.order.product.url }}
                            style={styles.product_image}
                            PlaceholderContent={<ActivityIndicator />}
                            placeholderStyle={{backgroundColor:'#FFF'}}
                        />
                        <View style={styles.product_type}>
                            <Text style={{color:'#FFFFFF',fontWeight: "bold"}}>{this.state.order.product.category}</Text>
                        </View>
                        <View style={{ flexDirection:'column',justifyContent:'center',alignItems:'center' }}>
                            <Text h4 style={styles.text}>{this.state.order.product.name}</Text>
                        </View>
                        <View style={[styles.body,{marginTop: 5}]}>
                            <View style={{ flexDirection:'column',justifyContent:'center',alignItems:'center' }}>
                                <View style={{flexDirection:"row",alignItems: 'center'}}>
                                    {this.state.order.payment=='VitCoin'?
                                        <Icon
                                            name='coin'
                                            type='material-community'
                                            color='#ff2c2e'
                                            size={30}
                                        />:<View/>
                                    }
                                    <Text style={styles.product_price}>{this.state.order.payment=='VitCoin'?"":"$"} {this.state.order.cost}</Text>
                                </View>
                                <Text style={{opacity:0.5}}>Successful transaction</Text>
                                <Text style={{opacity:0.5}}>{this.state.order.created_at}</Text>
                            </View>
                            <Text style={[styles.bodyText,{marginTop:10}]}>{this.state.order.product.description}</Text>
                        </View>

                        {this.state.order.delivery_address===null?<View/>:
                            <View style={styles.body}>
                                <Text style={styles.bodyText}>Delivery Address:</Text>
                                <Text>{this.state.order.delivery_address}</Text>
                            </View>
                        }
                        {this.state.order.delivery_date_time===null?<View/>:
                            <View style={styles.body}>
                                <Text style={styles.bodyText}>Delivery Date Time:</Text>
                                <Text>{this.state.order.delivery_date_time}</Text>
                            </View>
                        }
                        {this.state.order.phone===null?<View/>:
                            <View style={styles.body}>
                                <Text style={styles.bodyText}>Contact Phone Number:</Text>
                                <Text>{this.state.order.phone}</Text>
                            </View>
                        }

                        <View style={styles.itemList}>
                            <RectButton
                                style={styles.itemButton}
                                onPress={() => this.props.navigation.navigate('ContactUs')}
                            >
                                <View style={{ flexDirection: 'row',alignItems: 'center',}}>
                                    <Icon
                                        name="questioncircle"
                                        type="antdesign"
                                        color={Colors.Secondary}
                                        size={20}
                                        underlayColor={'transparent'}
                                        // style={{marginRight:20}}
                                    />
                                    <Text style={styles.itemButtonText}>Have questions about this order</Text>
                                </View>
                                <View style={{ flexDirection: 'row',alignItems: 'center',}}>
                                    <View style={{ flexDirection: 'row',alignItems: 'center',}}>
                                        <Icon
                                            name="right"
                                            type="antdesign"
                                            color={Colors.Secondary}
                                            size={20}
                                            underlayColor={'transparent'}
                                            // style={{marginRight:20}}
                                        />
                                    </View>
                                </View>
                            </RectButton>
                        </View>
                    </ScrollView>
                </ImageBackground>
            </View>

        );
    }

    getData = async () => {

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
    button: {
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    text:{
        marginLeft:10,
        marginTop:10,
        color: Colors.BlackText,
        fontSize: 20,
        fontWeight: 'bold',
    },
    bodyText:{
        marginTop: 5,
        textAlign:'justify',
        color: '#000',
        fontSize: 18,
    },
    body:{
        marginBottom: 10,
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderRadius: 10,
        marginHorizontal: 10,
        padding: 10,
    },
    product_image:{
        flex:1,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT/2,
    },
    product_title:{
        marginTop: 10,
        marginLeft: 5,
        fontSize: 16,
        fontWeight: "bold",
        // fontFamily: 'regular',
        // textAlign: 'justify',
    },
    product_description:{
        marginTop: 3,
        marginLeft: 5,
        fontSize: 14,
        color:"#747474",
    },
    product_price_type:{
        fontSize: 12,
        color:"#ff2c2e",
    },
    product_price:{
        fontSize: 50,
        fontFamily: "UbuntuBold",
        color:"#ff2c2e",
    },
    product_type:{
        position: 'absolute', top: 5, right: 5,
        backgroundColor: 'rgba(255,0,0,0.6)',
        borderRadius: 8,
        paddingHorizontal: 5,
        paddingVertical: 3,
    },

    itemList:{
        marginBottom: 10,
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderRadius: 10,
        marginHorizontal: 10,
    },
    itemButton:{
        paddingHorizontal: 10,
        paddingVertical: 15,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems: 'center',
    },
    itemButtonText:{
        paddingLeft: 10,
        color:Colors.ButtonText,
        fontFamily: 'regular',
        fontSize: 16,
    },
    itemButtonContent:{
        // paddingLeft: 10,
        color:Colors.ButtonText,
        fontFamily: 'light',
        fontSize: 16,
    },
});
