
import React, { Component } from 'react';
import { Caption, Text, Row, InlineGallery, Card, Button, Heading, Screen, ListView, Tile, Subtitle, Icon, Title } from '@shoutem/ui';
import {
    StyleSheet,

    View,
    TextInput,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default class OrderList extends Component {

    render() {

        return (

            <View style={{ padding: "10%", borderStyle: "solid", borderRadius: 10 }}>
                <Text styleName="confirmation">
                    <Subtitle>Order ID: {this.props.value.order_id}</Subtitle>
                    <Text>      </Text>
                    <Subtitle>Total: ${this.props.value.total_price}</Subtitle>
                </Text>
                <InlineGallery
                    styleName="large-banner"

                    data={this.props.value.photo}
                />

                <View styleName="horizontal" style={{ paddingTop: 40, paddingLeft: 50, flexDirection: 'row', width: 300, justifyContent: 'space-around' }}>
                    <Button onPress={() => this.props.navigation.navigate('OrderDetail',
                        {
                            order_id: this.props.value.order_id,
                            order_part: this.props.value.order_part,
                            total_price: this.props.value.total_price
                        })}>

                        <Ionicons name="ios-list-box" size={40} />
                    </Button>
                    <Button styleName="confirmation" onPress={this.props.deleteMethod}><Ionicons name="ios-trash" size={40} /></Button>
                </View>
            </View>




        );
    }
}

const styles = StyleSheet.create({


});