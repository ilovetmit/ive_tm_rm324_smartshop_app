import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Platform,
    Linking,
    Dimensions,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView,
    BackHandler,
    ScrollView,
    ActivityIndicator, StatusBar,
} from 'react-native';
import {Input, Button, Icon, Header,Avatar,} from 'react-native-elements';
import Constants from 'expo-constants';
import Colors from '../../constants/Colors';
import {RectButton} from "react-native-gesture-handler";
import Carousel,{ParallaxImage,Pagination} from 'react-native-snap-carousel';
import { Placeholder, PlaceholderMedia,PlaceholderLine, Fade } from 'rn-placeholder';
import Axios from "axios";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const BG_IMAGE = require('../../../assets/images/bg_second.jpg');
const ICON_IMAGE = require('../../../assets/icon.png');

export default class AboutScreen extends Component {

    static navigationOptions = { header: null };

    constructor(props) {
        super(props);
        this.init();
    }

    init() {
        this._carousel = {};
        this.state = {
            adsArray: [],
            refreshing: false,
            isLoading: false,
            slider1ActiveSlide: 1,
        }
    }

    componentDidMount() {
        this.getData()
    }

    // _renderItem ({item, index}) {
    //     console.log(HOST_NAME + "/" +item.image);
    //     return (
    //         <SliderEntry
    //             data={item}
    //             even={(index + 1) % 2 === 0}
    //             parallax={true}
    //             parallaxProps={parallaxProps}
    //         />
    //     );}


    _renderItemWithParallax = ({item, index}, parallaxProps) => {
        const even = (index + 1) % 2 === 0;
        return (
            <TouchableOpacity
                key={index}
                activeOpacity={1}
                style={styles.slideInnerContainer}
                // onPress={() => this.props.navigation.navigate('Shop')}
            >
                <View style={styles.shadow} />
                <View style={[styles.imageContainer, even ? styles.imageContainerEven : {}]}>
                    <ParallaxImage
                        source={{uri: item.image}}
                        containerStyle={[styles.imageContainer, even ? styles.imageContainerEven : {}]}
                        style={styles.image}
                        parallaxFactor={0.1}
                        showSpinner={true}
                        resizeMode={'contain'}
                        PlaceholderContent={<ActivityIndicator />}
                        spinnerColor={even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
                        {...parallaxProps}
                    />
                    <View style={[styles.radiusMask, even ? styles.radiusMaskEven : {}]} />
                </View>
                <View style={[styles.textContainer, even ? styles.textContainerEven : {}]}>
                    <Text
                        style={[styles.title, even ? styles.titleEven : {}]}
                        numberOfLines={2}
                    >
                        {item.title.toUpperCase()}
                    </Text>
                    <Text
                        style={[styles.subtitle, even ? styles.subtitleEven : {}]}
                        numberOfLines={2}
                    >
                        {item.description}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };



    render() {
        const { slider1ActiveSlide } = this.state;

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
                            onPress={() =>this.props.navigation.openDrawer()}
                            underlayColor={'transparent'}
                        />
                        <Text style={styles.headerTitle}>S-SHOP@TMIT</Text>
                        <Icon
                            name="options"
                            type="simple-line-icon"
                            color="rgba(255,255,255,0)" // hide logo
                            size= {30}
                            // onPress={() =>alert('In Developing...')}
                            underlayColor={'transparent'}
                            style={{padding:10}}
                        />
                    </View>
                    <View style={{paddingBottom: 30}}>
                        {/*<Text style={styles.title}>AD</Text>*/}
                        {/*<Text style={styles.subtitle}>ADs</Text>*/}
                        {this.state.isLoading?
                            <TouchableOpacity
                                activeOpacity={1}
                                style={[styles.slider,{paddingHorizontal: 10,height:SCREEN_HEIGHT*0.7}]}
                                // onPress={() => this.props.navigation.navigate('Shop')}
                            >
                                <View style={styles.shadow} />
                                <View style={[styles.imageContainer]}>
                                    <ParallaxImage
                                        containerStyle={[styles.imageContainer]}
                                        style={styles.image}
                                        parallaxFactor={0.1}
                                        showSpinner={true}
                                        resizeMode={'contain'}
                                        PlaceholderContent={<ActivityIndicator />}
                                        spinnerColor={'rgba(0, 0, 0, 0.25)'}
                                    />
                                    <View style={[styles.radiusMask]} />
                                </View>
                                <View style={[styles.textContainer]}>
                                    <Placeholder Animation={Fade}>
                                        <PlaceholderLine width={60} />
                                        <PlaceholderLine width={80} />
                                        <PlaceholderLine width={30} />
                                    </Placeholder>
                                </View>
                            </TouchableOpacity>
                            :
                            <Carousel
                                ref={c => this._slider1Ref = c}
                                data={this.state.adsArray}
                                renderItem={this._renderItemWithParallax}
                                sliderWidth={SCREEN_WIDTH}
                                itemWidth={wp(75)+wp(2)*2}
                                hasParallaxImages={true}
                                firstItem={1}
                                inactiveSlideScale={0.94}
                                inactiveSlideOpacity={0.7}
                                // inactiveSlideShift={20}
                                containerCustomStyle={styles.slider}
                                contentContainerCustomStyle={{paddingVertical: 10}}
                                loop={true}
                                loopClonesPerSide={2}
                                autoplay={true}
                                autoplayDelay={500}
                                autoplayInterval={3000}
                                onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index }) }
                                // layout={'tinder'}
                                // layoutCardOffset={`9`}
                            />
                        }

                        <Pagination
                            dotsLength={(this.state.isLoading?1:this.state.adsArray.length)}
                            activeDotIndex={slider1ActiveSlide}
                            containerStyle={{paddingVertical: 8}}
                            dotColor={'rgba(255, 255, 255, 0.92)'}
                            dotStyle={styles.paginationDot}
                            inactiveDotColor={Colors.BlackText}
                            inactiveDotOpacity={0.4}
                            inactiveDotScale={0.6}
                            carouselRef={this._slider1Ref}
                            tappableDots={!!this._slider1Ref}
                        />
                    </View>
                </ImageBackground>
            </View>

        );
    }

    getData = async () => {
        this.setState({
            isLoading: true,
        });
        await Axios.get(HOST_NAME+HOST_API_VER+"advertisement")
            .then((response) => {
                if (response.status === 200) {
                    // console.log(response.data.data);
                    this.setState({
                        adsArray: response.data.data,
                        isLoading: false,
                    })
                }
            })
            .catch((error) => {
                console.log(error);
                this.setState({
                    // adsArray: response.data.data,
                    isLoading: true,
                })
            });
    };
}

function wp (percentage) {
    const value = (percentage * SCREEN_WIDTH) / 100;
    return Math.round(value);
}
const IS_IOS = Platform.OS === 'ios';

const styles = StyleSheet.create({
    content:{
        flex: 1,
    },
    topMenu:{
        backgroundColor:Colors.Primary,
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







    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 8
    },
    slideInnerContainer: {
        width: wp(75)+wp(2)*2,
        // height: SCREEN_HEIGHT * 0.36,
        height: SCREEN_HEIGHT * 0.7,
        paddingHorizontal: wp(2),
        paddingBottom: 5 // needed for shadow
    },
    image: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        resizeMode: 'cover',
        borderRadius: IS_IOS ? 8 : 0,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8
    },
    imageContainer: {
        flex: 1,
        marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
        backgroundColor: 'white',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8
    },
    imageContainerEven: {
        backgroundColor: Colors.BlackText
    },
    radiusMask: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 8,
        backgroundColor: 'white'
    },
    radiusMaskEven: {
        backgroundColor: Colors.BlackText
    },
    textContainer: {
        justifyContent: 'center',
        paddingTop: 20 - 8,
        paddingBottom: 20,
        paddingHorizontal: 16,
        backgroundColor: 'white',
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8
    },
    textContainerEven: {
        backgroundColor: Colors.BlackText
    },
    title: {
        color: Colors.BlackText,
        fontSize: 13,
        fontWeight: 'bold',
        letterSpacing: 0.5
    },
    titleEven: {
        color: 'white'
    },
    subtitle: {
        marginTop: 6,
        color: 'gray',
        fontSize: 12,
        fontStyle: 'italic'
    },
    subtitleEven: {
        color: 'rgba(255, 255, 255, 0.7)'
    }

});