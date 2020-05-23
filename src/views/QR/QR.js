import * as React from 'react';
import { View, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { Input, Button, Text, Icon, Tooltip, Avatar } from 'react-native-elements';
import Constants from 'expo-constants';
import { NavigationEvents } from 'react-navigation';
import * as Permissions from 'expo-permissions';
import { Linking } from 'expo';
import Axios from "axios";
import Toast from "react-native-root-toast";
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class QR extends React.Component {
    state = {
        hasCameraPermission: null,
        scanned: false,
    };

    static navigationOptions = {
        // title: "Scan QR Code",
        // headerStyle: {
        //     backgroundColor: 'black',
        // },
        // headerTitleStyle: {
        //     fontWeight: 'bold',
        //     fontSize:24,
        //     color:"white"
        // },
        header: null,
        drawerLockMode: 'locked-open',
    };

    async componentDidMount() {
        this.getPermissionsAsync();
        this._navListener = this.props.navigation.addListener('didFocus', () => {
            StatusBar.setBarStyle('light-content');
        });
    }

    componentWillUnmount() {
        this._navListener.remove();
    }

    getPermissionsAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    };


    render() {
        const { hasCameraPermission, scanned } = this.state;
        const { width, height } = Dimensions.get('window');


        if (hasCameraPermission === null) {
            return <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text note style={{ textAlign: 'center', color: '#000' }}>Requesting for camera permission</Text>
            </View>;
        }
        if (hasCameraPermission === false) {
            return <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text note style={{ textAlign: 'center', color: '#000' }}>No access to camera</Text>
            </View>;
        }
        return (

            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
                style={{ width, height }}
            >
                <NavigationEvents
                    onWillFocus={() => this.setState({ scanned: false })}
                    onDidFocus={() => this.setState({ scanned: false })}
                    onWillBlur={() => this.setState({ scanned: true })}
                    onDidBlur={() => this.setState({ scanned: true })}
                />
                <View style={styles.layerTop}>
                    <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.description}>Scan QR Code</Text>
                    </View>
                </View>
                <View style={styles.layerCenter}>
                    <View style={styles.layerLeft} />
                    <View style={styles.focused} />
                    <View style={styles.layerRight} />
                </View>
                <View style={styles.layerBottom}>
                    <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        {/*<Text style={styles.description}>Scan Smart Shop QR code</Text>*/}
                    </View>
                </View>
            </BarCodeScanner>

        );
    }

    checkout = async (data) => {
        await Axios.post(HOST_NAME + HOST_API_VER + "checkout", {
            token: data.toString().substr(6)
        })
            .then((response) => {
                if (response.status === 200) {
                    // console.log(response);
                    this.props.navigation.navigate("ProductList", { productList: response.data.data });
                } else {
                    Toast.show(response.data.message, {
                        duration: Toast.durations.SHORT,
                        position: Toast.positions.CENTER,
                        shadow: true,
                        animation: true,
                        hideOnPress: true,
                        delay: 0,
                    });
                }
            })
            .catch((error) => {
                console.log(error);
                Toast.show(tran.t('unexpected_error'), {
                    duration: Toast.durations.SHORT,
                    position: Toast.positions.CENTER,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                    delay: 0,
                });
            });
    }

    handleBarCodeScanned = ({ type, data }) => {
        // console.log(data);
        if (data.toString().substr(0, 8) === "PRODUCT-") {
            this.setState({ scanned: true });
            this.props.navigation.goBack();
            this.props.navigation.navigate("ProductBuy", { product_id: data });
        } else if (data.toString().substr(0, 8) === "BANKING-") {
            this.setState({ scanned: true });
            this.props.navigation.goBack();
            this.props.navigation.navigate("BankingLogin", { banking_token: data.toString().substr(8) });
        }
        else if (data.toString().substr(0, 5) === "wall-") {
            this.setState({ scanned: true });
            this.props.navigation.goBack();
            this.props.navigation.navigate("ProductBuy", { product_id: data });
        } else if (data.toString().substr(0, 23) === "http://tmit.vtc.edu.hk/") {
            this.setState({ scanned: true });
            this.props.navigation.goBack();
            Linking.openURL(data.toString());
        } else if (data.toString().substr(0, 6) === "CHECK-") {
            this.setState({ scanned: true });
            console.log(data.toString().substr(6))
            this.props.navigation.goBack();
            this.checkout(data);
        }
    };
}

const opacity = 'rgba(0, 0, 0, .6)';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    layerTop: {
        paddingTop: 60,
        flex: 2,
        backgroundColor: opacity
    },
    layerCenter: {
        flex: 5,
        flexDirection: 'row'
    },
    layerLeft: {
        flex: 1,
        backgroundColor: opacity
    },
    focused: {
        flex: 10
    },
    layerRight: {
        flex: 1,
        backgroundColor: opacity
    },
    layerBottom: {
        flex: 3,
        backgroundColor: opacity
    },
    description: {
        fontSize: 25,
        color: "white",
        fontWeight: "bold",
    }

});
