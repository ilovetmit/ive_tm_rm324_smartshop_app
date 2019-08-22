
import React, { Component } from 'react';
import { Caption, Row, InlineGallery, Card, Button, Heading, Screen, ListView, Tile, Subtitle, Icon, Title, Divider } from '@shoutem/ui';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import RowScrollImage from './RowScrollImage';


export default class OrderListNew extends Component {
    constructor(props) {
        super(props)




    }

    render() {

        let photos = this.props.value.order_part.map((value, index) => {
            return <RowScrollImage
                value={value}
                key={index}
            />
        })

        return (

            <View styleName="vertical" style={{ flex: 1, flexDirection: "column", borderWidth: 1, borderRadius: 10, borderColor: '#FFFFFF', margin: 20, backgroundColor: "#f8f8ff" }}>
                <View style={{ flex: 1, flexDirection: "row", margin: 7 }}>
                    <View style={{ flex: 4, marginLeft: 10 }}>
                        <Text style={{ fontSize: 16, fontWeight: "bold" }}>#{this.props.value.order_id} </Text>
                    </View>
                    <View style={{ flex: 1, borderWidth: 0.5, borderRadius: 10, borderColor: '#FFFFFF', backgroundColor: "#FFFFFF", justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontSize: 10 }}>status</Text>
                    </View>
                </View>

                <Divider styleName="line" />

                <View style={{ height: 70 }}>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        {photos}
                    </ScrollView>
                </View>

                <Divider styleName="line" />



                <View style={{ flex: 1, flexDirection: "row", margin: 7 }}>
                    <View style={{ flex: 4, marginLeft: 10 }}>
                        <Text style={{ fontSize: 16 }}>Total: ${this.props.value.total_price} </Text>
                    </View>

                    <Button style={{ flex: 1, borderWidth: 0.5, borderRadius: 5, borderColor: '#d3d3d3', backgroundColor: "#90ee90", justifyContent: "center", alignItems: "center" }}
                        onPress={() => this.props.navigation.navigate('OrderDetail',
                            {
                                order_id: this.props.value.order_id,
                                order_part: this.props.value.order_part,
                                total_price: this.props.value.total_price,
                                status: this.props.value.status,
                            })}>
                        <Text style={{ fontSize: 10, color: "#FFFFFF" }}>Details</Text>
                    </Button>

                </View>


            </View>
        );
    }
}

const styles = StyleSheet.create({


});