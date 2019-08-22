import React, { Component } from 'react';
import { ImageBackground, NavigationBar, Title, Heading, Screen, ListView, Tile, Subtitle, Divider, Overlay, Caption, Row } from '@shoutem/ui';
import {
    ScrollView,
    StyleSheet,
    View,
    Text
} from 'react-native';
import OrderPart from '../components/OrderPart';
import Stepper from '../components/Stepper';
import { Ionicons } from '@expo/vector-icons';

export default class OrderDetailScreen extends Component {

    constructor(props) {
        super(props)
        const { navigation } = this.props;
        this.state = {
            order_id: navigation.getParam('order_id'),
            order_part: navigation.getParam('order_part'),
            total_price: navigation.getParam('total_price'),
            // status: navigation.getParam('status'),
            status: "complete",
        }
    }
    static navigationOptions = ({ navigation }) => {
        return {
            title: "Order Number: " + navigation.getParam('order_id'),

        }
    }



    render() {

        let order_parts = this.state.order_part.map((value, index) => {
            return <OrderPart
                key={index}
                value={value}


            />
        })
        return (


            <ScrollView>
                <View style={{ marinTop: 5 }}>
                    <Stepper
                        status={this.state.status}
                    />
                </View>
                <ImageBackground
                    styleName="large-banner"
                    source={{ uri: 'https://shoutem.github.io/static/getting-started/restaurant-1.jpg' }}
                    style={{ marginTop: 10 }}
                >
                    {this.state.status == "prepare" ? (
                        <Tile>

                            <Title styleName="md-gutter-bottom">Please Wait</Title>
                            <Caption>We are preparing your meal</Caption>

                        </Tile>
                    )
                        :
                        (
                            <Tile>

                                <Title styleName="md-gutter-bottom">Please Enjoy</Title>
                                <Caption>Hope to see you next time</Caption>

                            </Tile>
                        )

                    }
                </ImageBackground>
                <View style={{ margin: 20, flex: 1 , borderWidth:1,borderColor:"#d3d3d3", borderRadius:10}}>
                    <Row styleName="small" style={{ flex: 1, marginLeft: 10, backgroundColor: "transparent" }}>
                        <Ionicons name="ios-pizza" size={30} />
                        <Text style={{ marginLeft: 20, fontSize: 20 }}>Fullfilled Items</Text>
                    </Row>
                    <Divider styleName="line" />
                    {order_parts}
                    <Divider styleName="line" />
                    <View style={{alignItems:"center"}}>
                    <Text style={{ margin: 10 }}>Total Price: {this.state.total_price}</Text>
                    </View>
                </View>
            </ScrollView>

        );
    }
}

