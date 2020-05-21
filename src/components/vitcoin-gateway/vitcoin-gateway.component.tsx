import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import Axios from "axios";
import SlidingUpPanel from 'rn-sliding-up-panel';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const MUTLICHAIN_NODE = 'http://192.168.0.107:5786';

type State = {
    animation: LottieView;
    message: string;
    isTransfer: boolean;
};

//TODO modularize multichain services, real mining
export default class VitcoinGateway extends Component<State> {

    constructor(props) {
        super(props);
    }

    state: State = {
        animation: null,
        message: null,
        isTransfer: false
    }

    transfer() {
        this.setState({ isTransfer: true })
        this._panel.show();
    }

    mining() {
        let mineAnimate = <LottieView source={require('./animation/mining.json')} speed={2.5} autoPlay style={{ height: 300 }}></LottieView>;

        this.setState({ animation: mineAnimate, message: 'Requesting Authorization...', isTransfer: false })
        this._panel.show();
        Axios.post(HOST_NAME + HOST_API_VER + "vitcoin-mining", {
            'mission': 'M-324-15'
        })
            .then((response) => {
                setTimeout(() => {
                    this.setState({ message: 'Mining...' })
                    if (response.data.isApprove === true) {
                        Axios.post(MUTLICHAIN_NODE, {
                            "method": "getaddressbalances",
                            "params": ["1UMu9S4VEgfGSscS392LkSuh7xssnEGYfbEgiG"],
                            "chain_name": "VitCoinChain"
                        }, {
                            headers: { 'Authorization': 'Basic bXVsdGljaGFpbnJwYzoyQUsxQTNkS0pDRG40cGZkTEFxM1hYNkJzRE12SmlZR2tNWjVRWE5xaFZlZw==' }
                        }).then((response) => {
                            setTimeout(() => {
                                if (response.data.error === null) {
                                    this.successAnimation('Mining Success')
                                } else {
                                    this.failAnimation('Mining Fail [Invalid Transaction]', 2000)
                                }
                            }, 2500)
                        }).catch((error) => {
                            setTimeout(() => {
                                this.failAnimation('Boardcast Error', 1500)
                            }, 1500)
                        });

                    } else {
                        this.failAnimation('Authorize Fail', 1500)
                    }
                }, 1500)

            })
            .catch((error) => {
                setTimeout(() => {
                    this.failAnimation('Network Error', 1500)
                }, 1500)
            });
    }

    fakeComplete() {
        Axios.post(HOST_NAME + HOST_API_VER + "fake-complete")
    }

    successAnimation(msg) {
        let tickAnimate = <LottieView source={require('./animation/tick.json')} autoPlay speed={1.5} loop={false} style={{ height: 250 }}></LottieView>;

        this.setState({ animation: tickAnimate, message: msg })
        setTimeout(() => {
            this._panel.hide()
        }, 1500)
    }

    failAnimation(msg, time) {
        let crossAnimate = <LottieView source={require('./animation/cross.json')} autoPlay loop={false} style={{ height: 180 }}></LottieView>;

        this.setState({ animation: crossAnimate, message: msg })
        setTimeout(() => {
            this._panel.hide()
        }, time)
    }

    render() {
        let content = null;
        if (this.state.isTransfer === true) {
            // Transfering assets require password confirmation
            content = (
                <View style={styles.bottomMenu}>
                    <View style={styles.lockIcon}>
                        <Ionicons name={Platform.OS === 'ios' ? "ios-lock" : 'md-lock'} size={60} color="gray" />
                    </View>
                    <Text style={styles.text}>Please enter your password</Text>
                </View>
            )
        } else {
            // Rending mining animation
            content = (
                <View style={styles.bottomMenu}>
                    <Text style={styles.tabBarText}>{this.state.message}</Text>
                    {this.state.animation}
                </View>
            )
        }
        return (
            <SlidingUpPanel ref={c => this._panel = c}
                height={300}
                draggableRange={{ top: SCREEN_HEIGHT * 0.35, bottom: 0 }}
                showBackdrop={false}
                containerStyle={styles.bottomMenuContainer}
                allowDragging={false}
                friction={0.7}
            >
                {content}

            </SlidingUpPanel>
        );
    }


}

const styles = StyleSheet.create({
    lockIcon: {
        marginTop: '5%'
    },
    text: {
        fontSize: 18,
        fontFamily: 'regular',
        color: 'rgb(37,39,48)',
    },
    bottomMenuContainer: {
        backgroundColor: '#fbfbfb',
        borderRadius: 20,
    },
    bottomMenu: {
        alignItems: 'center',
    },
    tabBarText: {
        fontSize: 28,
        fontFamily: 'regular',
        color: 'rgb(37,39,48)',
        textAlign: 'center',
        marginTop: 15,
    },
});