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



class AddToCartScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('name'),

        }
    }
    constructor(props) {
        super(props)
        const { navigation } = this.props;
        this.state = {
            name: navigation.getParam('name'),
            price: navigation.getParam('price'),
            url: navigation.getParam('url'),
            food_id: navigation.getParam('food_id'),
            description: navigation.getParam('description'),
            quantity: 0,
            total_price: 0,
        }
    }

    increaseQuantity = () => {
        this.setState({ quantity: this.state.quantity + 1 })
        this.setState({ total_price: (this.state.quantity + 1) * this.state.price })
    }

    decreaseQuantity = () => {
        if (this.state.quantity >= 1) {
            this.setState({ quantity: this.state.quantity - 1 })
            this.setState({ total_price: (this.state.quantity - 1) * this.state.price })
        }
    }


    submit = (food_id, quantity, total_price, name, url) => {
        order_part = {
            food_id: food_id,
            quantity: quantity,
            total_price: total_price,
            name: name,
            url: url,
        };
        if (quantity == 0) {
            alert("Please select the quantity")
        } else {
            Alert.alert(
                '',
                'Add product to shopping cart?',
                [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    {
                        text: 'Yes', onPress: () => {
                            this.props.addToCart(order_part, total_price, quantity);
                            this.props.navigation.goBack();
                        }
                    },
                ],
                { cancelable: false }
            );
        }




    }




    render() {
        const food = this.state;
        const window = Dimensions.get('window')
        return (
            <View>
                <View>
                    <Image style={{ height: window.height, width: window.width, position: 'absolute' }} source={require('../assets/images/foodBackground.jpg')} />
                </View>
                <ScrollView>
                    <Image styleName="large-square" source={{ uri: food.url }} />
                    <Title styleName="md-gutter-left">{food.name}</Title>
                    <Subtitle styleName="md-gutter-left">${food.price}</Subtitle>
                    <View style={{ marginTop: 20 }}>
                        <Subtitle styleName="md-gutter-left">Detail:</Subtitle>
                        <Subtitle styleName="md-gutter-left">{food.description}</Subtitle>
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: "5%" }}>
                        <View style={{ flexDirection: 'row', width: 200, justifyContent: 'space-around' }}>
                            <TouchableOpacity onPress={() => this.decreaseQuantity()}>
                                <Icon name="minus-button" />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 20 }}>{food.quantity}</Text>

                            <TouchableOpacity onPress={() => this.increaseQuantity()}>
                                <Icon name="plus-button" />
                            </TouchableOpacity>


                        </View>
                        <View styleName="horizontal" style={{ paddingTop: 10, flexDirection: 'row', justifyContent: 'center', alignContent: "center" }}>
                            <Button styleName="confirmation" style={{ flex: 1, backgroundColor: 'transparent', borderColor: 'transparent' }}>
                                <Text styleName="confirmation">Total Price: {food.total_price}</Text>
                            </Button>
                            <Button styleName="confirmation" style={{ flex: 1, backgroundColor: 'transparent', borderColor: 'transparent' }}
                                onPress={() => this.submit(food.food_id, food.quantity, food.total_price, food.name, food.url)}>
                                <Icon name="add-to-cart" />
                                <Text style={{ marginRight: 10}}>Add To Cart</Text>
                            </Button>
                        </View>
                    </View>
                </ScrollView>
            </View>

        );
    }






}

const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (order_part, total_price, quantity) => { dispatch(addToCart(order_part, total_price, quantity)) }
    }
}

export default connect(null, mapDispatchToProps)(AddToCartScreen);

const styles = StyleSheet.create({

});