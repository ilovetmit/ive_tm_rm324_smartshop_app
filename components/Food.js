import React, { Component } from 'react';
import { Image, Card, Button, Heading, Screen, ListView, Tile, Subtitle, Row, Caption, Title } from '@shoutem/ui';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
    TouchableOpacity,
} from 'react-native';


export default class Food extends Component {


    render() {

        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Add',
                {
                    name: this.props.value.name,
                    url: this.props.value.url,
                    price: this.props.value.price,
                    food_id: this.props.value.food_id,
                    description: this.props.value.description
                })}>
                <View key={this.props.index} style={{ paddingBottom: "5%" , backgroundColor:"transparent", borderBottomWidth:0.5}}>
                    <Row style={{ backgroundColor: "transparent", margin:10}}>
                        
                        <View styleName="vertical stretch space-between" style={{ flex: 1 }}>
                            <Title>{this.props.value.name}</Title>
                            <View styleName="horizontal space-between">
                                <Subtitle>{this.props.value.description}</Subtitle>
                                <Caption>${this.props.value.price}</Caption>

                            </View>
                        </View>
                        <View style={{flex:1, marginLeft:10}}>
                        <Image 
                                styleName="medium-square"
                            source={{ uri: this.props.value.url }}
                            style={{paddingLeft:10}}
                        />
                        </View>
                    </Row>


                    
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({


});
