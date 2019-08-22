import React, { Component } from 'react';
import { ImageBackground, NavigationBar, Title, Heading, Screen, ListView, Tile, Subtitle, Divider, Card, Image} from '@shoutem/ui';
import {
    ScrollView,
    StyleSheet,
    Alert,
    Dimensions,
    View,
} from 'react-native';
import OrderList from '../components/OrderList';
import OrderListNew from '../components/OrderListNew';

export default class OrderScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            orderArray: [],
        }

    }
    static navigationOptions = {
        title: "Order",
        headerTitleStyle: {
            textAlign: 'center',
            flexGrow: 1,
            alignSelf: 'center',
        },
    }

    componentDidMount() {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', () => {
            // alert('123')
            this.updateReocrd()
        });

    }

    updateReocrd(){
        fetch('https://ss.anchorlab.it/api/orders'
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
                        orderArray: responseJson.data
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

    
    

    deleteMethod(id) {

        Alert.alert(
            'Delete Record',
            'Confirm?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'OK', onPress: () => fetch('https://ss.anchorlab.it/api/orders/' + id, {
                        method: "DELETE",
                        headers: {
                            "Authorization": "Bearer zs3jdLOBKJ3wgXTyeoYu77OJ41ausvy2Zu3rEqu1IuvZ4n2bKcCIMDkNLaJo"
                        }
                    })
                        .then((response) => response.json())
                        .then((responseJson) => {
                            if (responseJson.status === 'SUCCESS') {
                                alert('Delete Success')
                                this.updateReocrd()
                            } else {
                                alert(responseJson.msg)
                            }
                            

                        })
                        .catch((error) => {
                            alert('Delete Fail, Please Try Again')
                        })
                        .done() 
                    },
            ],
            { cancelable: false }
        );

        
    }

    

    render() {
        const { navigation } = this.props;
        const window = Dimensions.get('window')
        let orders = this.state.orderArray.map((value, index) => {
            return <OrderListNew
                key={index}
                value={value}
                navigation={navigation}
                deleteMethod={() => this.deleteMethod(value.order_id)}
            />
        })
        return (
            <View>
            <View>
                <Image style={{ height: window.height, width: window.width, position: 'absolute' }} source={require('../assets/images/foodBackground.jpg')} />
            </View>
            <ScrollView>
                
                {orders}
                
            </ScrollView>
            </View>
        );
    }
}

