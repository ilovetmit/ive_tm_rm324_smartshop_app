import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ImageBackground,
    Dimensions,
    ScrollView,
    RefreshControl,
    Alert,
    AsyncStorage,
    ActivityIndicator
} from 'react-native';
import { Input, Button, Text, Icon, Tooltip, Avatar, ListItem } from 'react-native-elements';
import TouchableScale from "react-native-touchable-scale";
import Axios from "axios";
import Toast from 'react-native-root-toast';
import { Updates } from "expo";
import Colors from '../../../constants/Colors';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const BG_IMAGE = require('../../../../assets/images/bg_second.jpg');

export default class TransactionScreen extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.init();
    }

    init() {
        this.state = {
            transactions: [],
            refreshing: false,
            isLoading: true,
        }
    }

    UNSAFE_componentWillMount() {
        this.getData();
    }

    render() {

        let transactions = this.state.transactions.map((value, index) => {
            let currString = "";
            if (value.currency == 2) {
                currString = "Vitcoin";
            } else if (value.currency == 1) {
                currString = "Saving";
            } else if (value.currency == 0) {
                currString = "Current";
            }
            return (
                <ListItem
                    key={index}
                    // Component={TouchableScale}
                    containerStyle={{
                        marginTop: 5,
                        marginBottom: 10,
                        marginHorizontal: 10,
                        borderRadius: 10,
                    }}
                    friction={90} //
                    tension={100} // These props are passed to the parent component (here TouchableScale)
                    activeScale={0.95} //
                    linearGradientProps={{
                        colors: [Colors.Primary, Colors.Primary],
                        start: [1, 0],
                        end: [0.2, 0],
                    }}
                    leftAvatar={{ rounded: true, icon: { name: 'clipboard-check', type: 'material-community' }, overlayContainerStyle: { backgroundColor: "#00c800" } }}
                    title={<View>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{value.header}</Text>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{(value.currency === 2 ? "" : "$") + value.amount + " (" + currString + ")"}</Text>
                    </View>}
                    titleStyle={{ color: Colors.ButtonText, fontWeight: 'bold' }}
                    titleProps={{ numberOfLines: 1, }}
                    subtitleStyle={{ color: Colors.ButtonText }}
                    subtitle={value.created_at}
                />
            )

        });


        return (
            <View style={styles.content}>
                <ImageBackground source={BG_IMAGE} style={styles.bgImage}>
                    <View style={styles.header}>
                        <Icon
                            name="chevron-left"
                            type="feather"
                            color={Colors.BlackText}
                            size={40}
                            onPress={() => this.props.navigation.goBack()}
                            underlayColor={'transparent'}
                            style={{ padding: 10 }}
                        />
                        <Text style={styles.headerTitle}>TRANSACTION RECORD</Text>
                        <Icon
                            name="options"
                            type="simple-line-icon"
                            color="rgba(255,255,255,0)"
                            size={30}
                            // onPress={() =>alert('In Developing...')}
                            underlayColor={'transparent'}
                            style={{ padding: 10 }}
                        />
                    </View>
                    {this.state.isLoading ?
                        <View style={styles.loading}>
                            <ActivityIndicator style={styles.indicator} size="large" color={Colors.BlackText} />
                        </View>
                        :
                        (transactions.length !== 0) ?
                            <ScrollView refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={() => this._onRefresh()}
                                />
                            }>
                                {transactions}
                            </ScrollView>
                            :
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                <Text note style={{ textAlign: 'center', color: Colors.ButtonText }}>{tran.t('no_record')}</Text>
                            </View>
                    }
                </ImageBackground>
            </View>

        );
    }

    _onRefresh = () => {
        this.setState({ refreshing: true });
        this.getData().then(() => {
            setTimeout(() => { this.setState({ refreshing: false }) }, 1000);
        });
    };

    getData = async () => {
        this.setState({
            isLoading: true,
        });
        Axios.get(HOST_NAME + HOST_API_VER + "transaction")
            .then((response) => {
                this.setState({
                    transactions: response.data.data,
                    isLoading: false,
                })
            })
            .catch((error) => {
                // console.log(error);
                Toast.show(tran.t('msg_network_error'), {
                    duration: Toast.durations.SHORT,
                    position: Toast.positions.BOTTOM,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                    delay: 0,
                });
            });
    };

}


const styles = StyleSheet.create({
    loading: {
        justifyContent: 'center',
        alignContent: 'center',
        width: '100%',
        height: '100%'
    },
    content: {
        flex: 1,
    },
    bgImage: {
        flex: 1,
        top: 0,
        left: 0,
    },
    header: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'transparent',
        marginTop: 25,
        padding: 10,
    },
    headerTitle: {
        color: Colors.BlackText,
        fontSize: 16,
        fontFamily: 'bold',
    },
    subtitle: {
        color: Colors.BlackText,
        fontSize: 15,
        left: 10,
    },
});
