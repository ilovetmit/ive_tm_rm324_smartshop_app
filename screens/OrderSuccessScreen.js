import * as WebBrowser from 'expo-web-browser';
import React, { Component } from 'react';
import { ImageBackground, NavigationBar, Title, Heading, Screen, ListView, Tile, Subtitle, Button, TextInput, Icon, Image } from '@shoutem/ui';
import {
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
    Alert,
} from 'react-native';
import { connect } from 'react-redux'
import { addToCart } from '../action/cartActions'



export default class OrderSuccessScreen extends Component {
    static navigationOptions = () => {
        return {
            header: null,

        }
    }
    constructor(props) {
        super(props)
        const { navigation } = this.props;
        this.state = {
            method: navigation.getParam('method'),

            profileArray: [],
        }
    }

    componentWillMount() {
        fetch('https://ss.anchorlab.it/api/profile'
            , {
                method: 'GET',
                headers: {
                    "Authorization": "Bearer zs3jdLOBKJ3wgXTyeoYu77OJ41ausvy2Zu3rEqu1IuvZ4n2bKcCIMDkNLaJo"
                }
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status === 'SUCCESS') {
                    this.setState({
                        profileArray: responseJson.data,


                    })
                } else {
                    alert(responseJson.msg)
                }

                // console.warn(JSON.stringify(this.state.orderArray))
            })
            .catch((error) => {
                alert('Update Fail, Please Try Again')
            })
            .done();
    }












    render() {

        const window = Dimensions.get('window')
        return (
            <View>
                <View>
                    <Image styleName="large-banner" source={{ uri: "https://cdn.xl.thumbs.canstockphoto.ca/burger-food-mascot-cartoon-character-a-cartoon-character-burger-food-mascot-giving-a-thumbs-up-vector-clipart_csp51928202.jpg" }} />
                </View>
                <Text style={{ fontSize: 15, marginLeft: 10, marginTop: 40 }}>Sweet! Thank you for ordering with us.</Text>
                <Text style={{ fontSize: 20, marginLeft: 30, marginTop: 20 }}>

                    <Text style={{ fontSize: 30, fontWeight: "bold" }}>{this.state.profileArray.balance} </Text>
                    VTC coins left
                </Text>
                {this.state.method == "home" ?
                    <Text style={{ fontSize: 20, marginLeft: 10, marginTop: 20 }}>We will arrive around 30 minutes</Text>
                    :
                    <Text style={{ fontSize: 20, marginLeft: 10, marginTop: 20 }}>We will send a notification to you when it is arrived, Please do not turn it off.</Text>
                }
                <View style={{ marginTop: "35%", alignItems: "center", }}>
                    <Button style={{ width: window.width / 1.5, height: 30, backgroundColor: '#FFFFFF', borderColor: '#d3d3d3', borderWidth: 0.5, borderRadius: 10, margin: 5 }}
                        onPress={() => this.props.navigation.navigate("Order", {})}>
                        <Text style={{ fontSize: 15, color: "#7cfc00" }}>Go to Order</Text>
                    </Button>
                    <Button style={{ width: window.width / 1.5, height: 30, backgroundColor: '#7cfc00', borderColor: '#d3d3d3', borderWidth: 0.5, borderRadius: 10, margin: 5 }}
                        onPress={() => this.props.navigation.navigate("Home", {})}>
                        <Text style={{ fontSize: 15, color: "#FFFFFF" }}>Back to Home</Text>
                    </Button>
                </View>


            </View>

        );
    }






}