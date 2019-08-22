
import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, Dimensions, AsyncStorage, TouchableOpacity } from 'react-native';
import { Icon, Button } from 'native-base';
import ShoppingCartIcon from '../components/ShoppingCartIcon';

export default class SideMenu extends Component {
    constructor() {
        super();

        this.state = {
            profileArray: [],

        }

        this.proileImage =
            'https://aboutreact.com/wp-content/uploads/2018/07/sample_img.png';

        this.items = [
            {
                navOptionThumb: <Icon name="home" size={25} color="#808080" />,
                navOptionName: 'Home',
                screenToNavigate: 'Home',
            },
            {
                navOptionThumb: <ShoppingCartIcon />,
                navOptionName: 'Shopping Cart',
                screenToNavigate: 'Shopping',
            },
            {
                navOptionThumb: <Icon name="clipboard" size={25} color="#808080" />,
                navOptionName: 'Order',
                screenToNavigate: 'Order',
            },
            {
                navOptionThumb: <Icon name="person" size={25} color="#808080" />,
                navOptionName: 'Me',
                screenToNavigate: 'Personal',
            },
        ];
    }

    componentWillMount() {
        this.updateReocrd()
    }


    updateReocrd() {
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

    logout = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('User');
    };


    render() {
        const window = Dimensions.get('window')
        return (
            <View style={styles.sideMenuContainer}>
                {/*Top Large Image */}
                <TouchableOpacity onPress={() => {
                    this.props.navigation.navigate("Personal");
                }}
                   >
                <Image
                    source={{ uri: this.state.profileArray.avatar }}
                    style={styles.sideMenuProfileIcon}
                />
                </TouchableOpacity>
                <Text style={{fontSize:20, marginTop:10, fontWeight:"bold"}}>{this.state.profileArray.name}</Text>
                <Button style={{ backgroundColor: '#5067FF', width: 55, height: 55, justifyContent: "center", alignItems: "center", borderRadius: 40, marginLeft: window.width * 0.5 }}
                    onPress={() => this.props.navigation.navigate('QR')}
                >
                    <Icon name="md-qr-scanner" size={25} />
                </Button>
                <View
                    style={{
                        width: '100%',
                        height: 1,
                        backgroundColor: '#e2e2e2',
                        marginTop: 15,
                    }}
                />
                {/*Setting up Navigation Options from option array using loop*/}
                <View style={{ width: '100%' }}>
                    {this.items.map((item, key) => (
                        <TouchableOpacity onPress={() => {
                            global.currentScreenIndex = key;
                            this.props.navigation.navigate(item.screenToNavigate);
                        }}
                            key={key}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    paddingTop: 10,
                                    paddingBottom: 10,
                                    backgroundColor: global.currentScreenIndex === key ? '#e0dbdb' : '#ffffff',

                                }}

                            >

                                <View style={{ marginRight: 10, marginLeft: 20 }}>
                                    {item.navOptionThumb}
                                </View>
                                <Text
                                    style={{
                                        fontSize: 15,
                                        color: global.currentScreenIndex === key ? 'red' : 'black',
                                    }}
                                >
                                    {item.navOptionName}
                                </Text>

                            </View>
                        </TouchableOpacity>
                    ))}
                    <TouchableOpacity
                        onPress={() => { this.logout() }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingTop: 10,
                                paddingBottom: 10,
                                backgroundColor: '#ffffff',
                            }}>
                            <View style={{ marginRight: 10, marginLeft: 20 }}>
                                <Icon name="log-out" type="Feather" size={25} color="#808080" />
                            </View>
                            <Text
                                style={{
                                    fontSize: 15,
                                    color: 'black',
                                }}
                            >
                                Log-Out
                        </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    sideMenuContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: 20,
    },
    sideMenuProfileIcon: {
        resizeMode: 'center',
        width: 100,
        height: 100,
        marginTop: 20,
        borderRadius: 100,
    },
});