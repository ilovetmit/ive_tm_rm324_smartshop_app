import React, { Component } from 'react';
import { KeyboardAvoidingView, Dimensions, ImageBackground, StyleSheet, View, ScrollView, TouchableOpacity, Platform, StatusBar, Alert, Animated, Easing } from 'react-native';
import { Button, Text, Icon } from 'react-native-elements';
import Colors from '../../constants/Colors';
import VitcoinGateway, { Action } from '../../components/vitcoin-gateway/vitcoin-gateway.component';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const BG_IMAGE = require('../../../assets/images/bg_second.jpg');

export default class MissionScreen extends Component {

    static navigationOptions = { header: null };


    constructor(props) {
        super(props);
        this.init();

    }

    init() {
    }

    componentDidMount() {

    }

    render() {
        const { height } = Dimensions.get('window')
        let MiningButton = () => (
            <Button
                icon={
                    <Icon
                        name="hammer"
                        type="material-community"
                        color={Colors.BlackText}
                        size={25}
                        underlayColor={'transparent'}
                    />
                }
                title="Mining"
                titleStyle={styles.itemButtonText}
                buttonStyle={{ backgroundColor: "#ffb500" }}
                onPress={() => { this.refs.vitcoin.mining() }}
            />
        )
        return (
            <View style={styles.content}>
                <StatusBar barStyle="dark-content" translucent={true} />
                <ImageBackground source={BG_IMAGE} style={styles.bgImage}>
                    <View style={styles.header}>
                        <Icon
                            name="menu"
                            type="feather"
                            color={Colors.BlackText}
                            size={35}
                            onPress={() => this.props.navigation.openDrawer()}
                            underlayColor={'transparent'}
                        />
                        <Text style={styles.headerTitle}>Mission</Text>
                        <Icon
                            name="dots-three-horizontal"
                            type="entypo"
                            color="rgba(255,255,255,0)"
                            size={30}
                            underlayColor={'transparent'}
                        />
                    </View>
                    <ScrollView>
                        <View style={styles.itemList}>
                            <View
                                style={styles.itemButton}
                            >
                                <Text style={styles.itemButtonText}>Complete Profile Information</Text>
                                <MiningButton />
                            </View>
                        </View>

                        <View style={styles.itemList}>
                            <View
                                style={styles.itemButton}
                            >
                                <Text style={styles.itemButtonText}>Purchase Vending Prodcut</Text>
                                <MiningButton />
                            </View>
                        </View>

                        <View style={styles.itemList}>
                            <View
                                style={styles.itemButton}
                            >
                                <Text style={styles.itemButtonText}>Login S-Bank Via Kiosk</Text>
                                <MiningButton />
                            </View>
                        </View>
                    </ScrollView>
                    <Button
                        title="Fake Complete"
                        titleStyle={styles.itemButtonText}
                        buttonStyle={{ backgroundColor: "#ffb500", marginBottom: 100, width: 200, alignSelf: 'center' }}
                        onPress={() => { this.refs.vitcoin.fakeComplete() }}
                    />
                    <VitcoinGateway ref='vitcoin' />
                </ImageBackground>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    content: {
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
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'transparent',
        marginTop: 30,
        padding: 10,
    },
    headerTitle: {
        color: Colors.BlackText,
        fontSize: 20,
        fontFamily: 'bold',
    },
    itemList: {
        marginTop: 20,
        marginBottom: 10,
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderRadius: 10,
        marginHorizontal: 10,
    },
    itemListButton: {
        paddingLeft: 20,
        paddingVertical: 15,
        flexDirection: 'row'
    },
    itemListButtonText: {
        paddingLeft: 10,
        color: Colors.BlackText,
        fontFamily: 'regular',
        fontSize: 16,
        alignSelf: 'center'
    },
    itemButton: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemButtonColumn: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        flexDirection: 'column',
    },
    itemButtonText: {
        color: Colors.ButtonText,
        fontFamily: 'regular',
        fontSize: 16
    },
    itemButtonContent: {
        color: Colors.ButtonText,
        fontFamily: 'light',
        fontSize: 16,
    }
});
