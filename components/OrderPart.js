
import React, { Component } from 'react';
import { Caption, Row, Image, Card, Button, Heading, Screen, ListView, Tile, Subtitle } from '@shoutem/ui';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
    TouchableOpacity,
} from 'react-native';


export default class OrderPart extends Component {


    render() {

        return (

            <Row>
                <View styleName="notification-dot" />
                <Image
                        styleName="small rounded-corners"
                    source={{ uri: this.props.value.url }}
                    />
                <View styleName="vertical stretch space-between">
                    <Subtitle>{this.props.value.name}</Subtitle>
                    <Caption>Quantity: {this.props.value.quantity}</Caption>
                </View>
            </Row>

        );
    }
}

const styles = StyleSheet.create({


});