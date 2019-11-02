import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import {Input, Button,Text, Icon, Tooltip, Avatar} from 'react-native-elements';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

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
        header: null
    }

    async componentDidMount() {
        this.getPermissionsAsync();
    }

    getPermissionsAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    };


    render() {
        const { hasCameraPermission, scanned } = this.state;
        const { width, height } = Dimensions.get('window');


        if (hasCameraPermission === null) {
            return <View style={{flex: 1,justifyContent: 'center'}}>
                <Text note style={{ textAlign: 'center',color:'#000' }}>Requesting for camera permission</Text>
            </View>;
        }
        if (hasCameraPermission === false) {
            return <View style={{flex: 1,justifyContent: 'center'}}>
                <Text note style={{ textAlign: 'center',color:'#000' }}>No access to camera</Text>
            </View>;
        }
        return (

            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
                style={{ width, height }}
            >
                <View style={styles.layerTop}>
                    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                        <Text style={styles.description}>Scan Product QR code</Text>
                    </View>
                </View>
                <View style={styles.layerCenter}>
                    <View style={styles.layerLeft} />
                    <View style={styles.focused} />
                    <View style={styles.layerRight} />
                </View>
                <View style={styles.layerBottom} />
            </BarCodeScanner>

        );
    }

    handleBarCodeScanned = ({ type, data }) => {
        this.setState({ scanned: true });
        //console.log(data);
        if(data.toString().substr(0,8)==="PRODUCT-"){
            this.props.navigation.navigate("ProductDetail", { product_id: data });
        }
        this.setState({ scanned: false });
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
        flex: 1,
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
        flex: 2,
        backgroundColor: opacity
    },
    description: {
        fontSize: 30,
        color: "white",
        fontWeight: "bold",
    }

});
