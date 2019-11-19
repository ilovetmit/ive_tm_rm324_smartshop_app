import React, { Component } from 'react';
import {AsyncStorage,Dimensions,ImageBackground,StyleSheet,View,ScrollView,TouchableOpacity,Platform,StatusBar,Alert,ActivityIndicator,RefreshControl} from 'react-native';
import {Button, Text, Icon, Tooltip,Avatar,Overlay,Image,Badge} from 'react-native-elements';
import { Notifications } from 'expo';
import Axios from "axios";
import Toast from 'react-native-root-toast';
import Waterfall from 'react-native-waterfall'
import Colors from '../../constants/Colors';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const BG_IMAGE = require('../../../assets/images/bg_primary.jpg');

export default class HomeScreen extends Component {

    static navigationOptions = { header: null, };
    constructor(props) {
        super(props);
        this.init();
    }

    init() {
        this.data = [];
        this.page = 1;
        this.state = {
            isRefreshing: false,
            isLoadingMore: false,
            endPage: 1,
        }
    }

    componentWillMount() {
        this.getData();
    }

    renderItem = (itemData,itemIdx,itemContainer)=>{
        return (
            (itemData.product.End)?
                <TouchableOpacity style={styles.product_body}>
                    <View style={{alignItems: 'center',}}>
                        <Text style={{
                            padding:5,
                            fontSize: 16,
                        }}>No more products</Text>
                    </View>
                    <Icon
                        name="cloud-done"
                        type="material"
                        color="#0C6"
                        size={50}
                        underlayColor={'transparent'}
                        containerStyle={{paddingBottom:10}}
                    />
                </TouchableOpacity>:
                <TouchableOpacity style={styles.product_body} key={"product"+itemIdx} activeOpacity={1}
                onPress={() => this.props.navigation.navigate('ProductDetail',{ product_id: itemData.product.qrcode})}
            >
                <Image
                    source={{ uri: HOST_NAME+itemData.product.url }}
                    style={styles.product_image}
                    PlaceholderContent={<ActivityIndicator />}
                    placeholderStyle={{backgroundColor:'#FFF'}}
                />
                <View style={styles.product_type}>
                    <Text style={{color:'#FFFFFF',fontWeight: "bold"}}>{itemData.product.category}</Text>
                </View>
                <Text style={styles.product_title} numberOfLines={1}>{itemData.product.name}</Text>
                <Text style={styles.product_description} numberOfLines={2}>{itemData.product.description}</Text>
                <View style={{ flexDirection:'row',marginBottom:5 }}>
                    <Text style={styles.product_price_type}>HKD </Text>
                    <Text style={styles.product_price}>{itemData.product.price}</Text>
                </View>
            </TouchableOpacity>
        )
    };

    render() {

        return (
            <View style={styles.content}>
                <StatusBar barStyle="light-content" translucent={true} />
                <ImageBackground source={BG_IMAGE} style={styles.bgImage}>
                    <View style={styles.header}>
                        <Icon
                            name="menu"
                            type="feather"
                            color="#fff"
                            size={35}
                            onPress={() =>this.props.navigation.openDrawer()}
                            underlayColor={'transparent'}
                        />
                        <Text style={styles.headerTitle}>SMART SHOP +</Text>
                        <Icon
                            name="dots-three-horizontal"
                            type="entypo"
                            color="rgba(255,255,255,0)"
                            size= {30}
                            // onPress={() =>alert('In Developing...')}
                            underlayColor={'transparent'}
                        />
                    </View>
                    {/*<View style={{ flexDirection:'row',left: 10, marginTop:10,alignItems: 'center',}}>*/}
                    {/*    <Icon*/}
                    {/*        name="book"*/}
                    {/*        type="antdesign"*/}
                    {/*        color="#fff"*/}
                    {/*        size={25}*/}
                    {/*        underlayColor={'transparent'}*/}
                    {/*    />*/}
                    {/*    <Text style={styles.subtitle}>{tran.t('housing_estate_info')}</Text>*/}
                    {/*</View>*/}
                    <Waterfall
                        style={styles.product}
                        contentContainerStyle={{paddingBottom:10}}
                        data={this.data}
                        gap={10}
                        numberOfColumns={2}
                        expansionOfScope={200}
                        onEndReachedThreshold={10000}
                        onEndReached={()=>{
                            if (this.page < this.state.endPage) {
                                this.setState({ isLoadingMore: true });
                                ++this.page;
                                // console.log("onEndReached"+this.page);
                                setTimeout(() => {
                                    this.setState({
                                        isLoadingMore: false
                                    });
                                    this.getData();
                                }, 1000)
                            }
                        }}
                        renderItem={this.renderItem}
                        refreshControl={
                            <RefreshControl
                                progressBackgroundColor={"#B27ACF"}
                                tintColor={"#FFF"}
                                refreshing = {this.state.isRefreshing}
                                onRefresh = {this._onRefresh}
                            />
                        }/>

                    {/*<View style={styles.product}>*/}
                    {/*    {products}*/}
                    {/*</View>*/}

                </ImageBackground>
            </View>
        );
    }

    _onRefresh = () => {
        if(this.state.isRefreshing || this.state.isLoadingMore){
            return;
        }
        this.data = [];
        this.setState({
            isRefreshing:true,
            endPage: 1,
        });
        this.page = 1;
        // console.log("_onRefresh"+this.page);
        this.getData().then(() => {
            setTimeout(() => { this.setState({ isRefreshing: false }) }, 1000);
        });
    };

    getData = async () => {
        await Axios.get(HOST_NAME+HOST_API_VER+"products?page="+this.page)
            .then((response) => {
                var products = response.data.data.data;
                for(var i=0;i<products.length;++i){
                    this.data.push({
                        product: products[i],
                    });
                }
                if(this.page===response.data.data.last_page){
                    this.data.push({
                        product: {
                            End: true,
                        }
                    });
                }
                this.setState({
                    endPage: response.data.data.last_page,
                });

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
    content:{
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
        justifyContent:'space-between',
        alignItems: 'center',
        flexDirection:'row',
        backgroundColor: 'transparent',
        marginTop:25,
        padding: 10,
    },
    headerTitle:{
        color: 'white',
        fontSize: 20,
        fontFamily: 'bold',
    },
    subtitle:{
        color: 'white',
        fontSize: 15,
        left: 10,
    },
    product:{
        flex: 1,
    },
    product_body:{
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderRadius: 10,
        flexBasis: (SCREEN_WIDTH-30)/2,
        overflow: "hidden",
    },
    product_image:{
        flex:1,
        width: (SCREEN_WIDTH-30)/2,
        height: (SCREEN_WIDTH-30)/2,
    },
    product_title:{
        marginTop: 10,
        marginLeft: 5,
        fontSize: 16,
        fontWeight: "bold",
        // fontFamily: 'regular',
        // textAlign: 'justify',
    },
    product_description:{
        marginTop: 3,
        marginLeft: 5,
        fontSize: 14,
        color:"#747474",
    },
    product_price_type:{
        paddingTop: 8,
        marginLeft: 5,
        fontSize: 12,
        color:"#ff2c2e",
    },
    product_price:{
        marginLeft: 1,
        fontSize: 24,
        fontFamily: "UbuntuBold",
        color:"#ff2c2e",
    },
    product_type:{
        position: 'absolute', top: 5, right: 5,
        backgroundColor: 'rgba(255,0,0,0.6)',
        borderRadius: 8,
        paddingHorizontal: 5,
        paddingVertical: 3,
    },
});
