import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ImageBackground,
    Dimensions,
    KeyboardAvoidingView,
    BackHandler,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import {Input, Button, Text, Icon, Header, Image} from 'react-native-elements';
import Axios from "axios";
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import Colors from '../../../../constants/Colors';
import Toast from "react-native-root-toast";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const BG_IMAGE = require('../../../../../assets/images/bg_second.jpg');

export default class StockDetailScreen extends Component {

    static navigationOptions = { header: null };

    constructor(props) {
        super(props);
        this.init();
    }

    init() {
        this.state = {
            product: [],
            image: "image.jpg",
            data: [0,0,0,0,0,0,0,0,0,0,0],
            product_id: this.props.navigation.getParam("product_id"),
        }
    }

    componentDidMount() {
        this.getData();
    }

    render() {

        const data = {
            labels: ["JUN", "JUL", "AUG", "SEP", "OCT", "NOV"],
            datasets: [
                {
                    data: this.state.data,
                    color: (opacity = 1) => `rgba(255,0,0, ${opacity})`, // optional
                    strokeWidth: 2 // optional
                }
            ]
        };

        const chartConfig = {
            backgroundGradientFrom: Colors.Primary,
            backgroundGradientFromOpacity: 1,
            backgroundGradientTo: Colors.Primary,
            backgroundGradientToOpacity: 1,
            color: (opacity = 1) => `rgba(255,0,0, ${opacity})`,
            strokeWidth: 2, // optional, default 3
            barPercentage: 0.5,
        };

        return (

            <View style={styles.content}>
                <ImageBackground source={BG_IMAGE} style={styles.bgImage}>
                    <View style={styles.header}>
                        <Icon
                            name="chevron-left"
                            type="feather"
                            color={Colors.BlackText}
                            size={40}
                            onPress={() =>this.props.navigation.goBack()}
                            underlayColor={'transparent'}
                            style={{padding:10}}
                        />
                        <Text style={styles.headerTitle}>PRODUCT</Text>
                        <Icon
                            name="options"
                            type="simple-line-icon"
                            color="rgba(255,255,255,0)"
                            size= {30}
                            // onPress={() =>alert('In Developing...')}
                            underlayColor={'transparent'}
                            style={{padding:10}}
                        />
                    </View>
                    <ScrollView>
                        <Image
                            source={{ uri: this.state.image }}
                            style={styles.product_image}
                            PlaceholderContent={<ActivityIndicator />}
                            placeholderStyle={{backgroundColor:'#FFF'}}
                            resizeMode="contain"
                        />
                        <View style={styles.product_type}>
                            <Text style={{color:'#FFFFFF',fontWeight: "bold"}}>{this.state.product.code}</Text>
                        </View>
                        <Text h4 style={styles.product_text}>{this.state.product.name}</Text>
                        <View style={styles.body}>
                            <Text style={styles.bodyText}>{this.state.product.code+".HK"}</Text>
                            <View style={{ flexDirection:'row',marginBottom:6 }}>
                                <Text style={styles.product_price_type}>▼  </Text>
                                <Text style={styles.product_price}>{this.state.data[0]}</Text>
                            </View>
                        </View>
                        <LineChart
                            data={data}
                            width={SCREEN_WIDTH}
                            height={220}
                            chartConfig={chartConfig}
                            withDots={false}
                            withInnerLines={false}
                        />
                    </ScrollView>
                </ImageBackground>
            </View>

        );
    }

    getData() {
        Axios.get(HOST_NAME+HOST_API_VER+"stock/view/"+this.state.product_id)
            .then((response) => {
                //console.log(response.data.data);
                if (response.status === 200) {
                    this.setState({
                        product: response.data.data,
                        data: response.data.data.data,
                        image: response.data.data.image[0]
                    });
                    //console.log(this.state.data)
                }
            })
            .catch((error) => {
                Toast.show(tran.t('unexpected_error'), {
                    duration: Toast.durations.SHORT,
                    position: Toast.positions.BOTTOM,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                    delay: 0,
                });
                this.props.navigation.goBack();
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
        color: Colors.BlackText,
        fontSize: 20,
        fontFamily: 'bold',
    },
    button: {
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    text:{
        padding: 10,
        color: Colors.BlackText,
        fontSize: 20,
    },
    bodyText:{
        textAlign:'justify',
        color: '#000',
        fontSize: 18,
    },
    body:{
        marginTop: 5,
        marginBottom: 10,
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderRadius: 10,
        marginHorizontal: 10,
        padding: 10,
    },
    product_text:{
        padding: 10,
        fontWeight: 'bold',
        color: Colors.BlackText,
        textAlign:'center',
        fontSize: 22,
    },
    product_image:{
        flex:1,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT/3,
    },
    product_title:{
        marginTop: 10,
        marginLeft: 5,
        fontSize: 16,
        fontWeight: "bold",
        // fontFamily: 'regular',
        // textAlign: 'justify',
    },
    buyButton:{
        height: 50,
        width: 100,
        backgroundColor: Colors.Secondary,
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 5,
        marginBottom: 5,
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
