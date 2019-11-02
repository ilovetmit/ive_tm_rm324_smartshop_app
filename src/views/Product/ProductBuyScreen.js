import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ImageBackground,
    Dimensions,
    Platform,
    KeyboardAvoidingView,
    BackHandler,
    ScrollView,
    ActivityIndicator, LayoutAnimation, Alert, AsyncStorage,
} from 'react-native';
import {Input, Button, Text, Icon, Header, Image,Badge} from 'react-native-elements';
import Axios from "axios";
import Toast from "react-native-root-toast";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const BG_IMAGE = require('../../../assets/images/bg_second.jpg');

export default class ProductBuyScreen extends Component {

    static navigationOptions = { header: null };

    constructor(props) {
        super(props);
        this.init();
    }

    init() {
        this.state = {
            product: [],
            product_id: this.props.navigation.getParam("product_id"),
            isLoading:false,
            isPayLoading:false,
            password: "",
            passwordValid: true,
            firstInput:true,
            confirmPassword: false,
            confirmPasswordMessage:"",
            confirmPasswordSubMessage:"",
            passwordPass: false,
        }
    }

    componentWillMount() {
        this.getData();
    }

    validatePassword() {
        const { password } = this.state;
        const passwordValid = password.length > 0;
        LayoutAnimation.easeInEaseOut();
        this.setState({ passwordValid });
        passwordValid || this.passwordInput.shake();
        return passwordValid;
    }

    submitOrderCredentials = async () => {
        LayoutAnimation.easeInEaseOut();
        const passwordValid = this.validatePassword();
        if (passwordValid) {
            this.setState({
                isLoading:true,
            });
            await Axios.post(HOST_NAME+HOST_API_VER+"check_password", {
                password: this.state.password
            })
                .then((response) => {
                    if (response.status === 200) {
                        // console.log(response);
                        this._createOrder();
                    } else if (response.status === 217) {
                        Toast.show(tran.t('msg_current_password_wrong'), {
                            duration: Toast.durations.SHORT,
                            position: Toast.positions.CENTER,
                            shadow: true,
                            animation: true,
                            hideOnPress: true,
                            delay: 0,
                        });
                        this.setState({password:"",isLoading:false,});
                        this.passwordInput.shake();
                        this.passwordInput.force=false;
                    } else{
                        Toast.show(response.data.message, {
                            duration: Toast.durations.SHORT,
                            position: Toast.positions.CENTER,
                            shadow: true,
                            animation: true,
                            hideOnPress: true,
                            delay: 0,
                        });
                        this.setState({password:"",isLoading:false,});
                        this.passwordInput.shake();
                        this.passwordInput.force=false;
                    }
                })
                .catch((error) => {
                    this.setState({password:"",isLoading: false});
                    // console.log(error);
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
    };

    _createOrder = async () => {
        await Axios.post(HOST_NAME+HOST_API_VER+"order", {
            product_id: this.state.product_id,
            price: this.state.product.price*100,
        })
            .then((response) => {
                if (response.status === 200) {
                    // console.log(response);
                    this.setState({
                        firstInput:false,
                        passwordPass:true,
                        confirmPasswordMessage:'System is completing the transaction...',
                        confirmPasswordSubMessage:'Payment successful!',
                    });
                    setTimeout(() => {
                        this.setState({
                            password:"",
                            isLoading:false,
                            isPayLoading:false,
                            confirmPassword:false,
                            confirmPasswordMessage:'Please enter your password',
                        });
                        this.props.navigation.replace('OrderDetail',{ order: response.data.data });
                    }, 3000);
                } else if (response.status === 233) {
                    Alert.alert(tran.t('error'), "Your account is not enough Coin");
                    this.setState({
                        password:"",
                        isLoading:false,
                        isPayLoading:false,
                        confirmPassword:false,
                        confirmPasswordMessage:'Please enter your password',
                    });
                } else{
                    Alert.alert(tran.t('error'), tran.t('unexpected_error'));
                    this.setState({
                        password:"",
                        isLoading:false,
                        isPayLoading:false,
                        confirmPassword:false,
                        confirmPasswordMessage:'Please enter your password',
                    });
                }
            })
            .catch((error) => {
                // console.log(error);
                Alert.alert(tran.t('error'), tran.t('unexpected_error'));
                this.setState({
                    password:"",
                    isLoading:false,
                    isPayLoading:false,
                    confirmPassword:false,
                    confirmPasswordMessage:'Please enter your password',
                });
            });
    };

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.content}>
                <ImageBackground source={BG_IMAGE} style={styles.bgImage}>
                    <View style={styles.header}>
                        <Icon
                            name="chevron-left"
                            type="feather"
                            color="#fff"
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
                            source={{ uri: HOST_NAME+this.state.product.url }}
                            style={styles.product_image}
                            PlaceholderContent={<ActivityIndicator />}
                            placeholderStyle={{backgroundColor:'#FFF'}}
                        />
                        <View style={styles.product_type}>
                            <Text style={{color:'#FFFFFF',fontWeight: "bold"}}>{this.state.product.category}</Text>
                        </View>
                        <Text h4 style={styles.text}>{this.state.product.name}</Text>
                        <View style={styles.body}>
                            <Text style={styles.bodyText}>{this.state.product.description}</Text>
                            <View style={{ flexDirection:'row',marginBottom:6,alignItems:'center' }}>
                                <Text style={styles.product_price_type}>HKD {this.state.product.price} = </Text>
                                <Icon
                                    name='coin'
                                    type='material-community'
                                    color='#FF8000'
                                />
                                <Text style={styles.product_price}>{this.state.product.price*100}</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row',justifyContent:'center'}}>
                            <Button
                                title="Pay"
                                activeOpacity={1}
                                underlayColor="transparent"
                                // onPress={this.submitOrderCredentials.bind(this)}
                                onPress={()=>{
                                    this.setState({
                                        confirmPasswordMessage:'Please enter your password',
                                        isPayLoading:true,
                                    });
                                    setTimeout(() => { this.setState({ confirmPassword:true }) }, 1000);}}
                                loading={this.state.isPayLoading}
                                loadingProps={{ size: 'small', color: 'white' }}
                                disabled={this.state.isPayLoading}
                                disabledStyle={styles.buyButton}
                                buttonStyle={styles.buyButton}
                                containerStyle={{ marginVertical: 10 }}
                                titleStyle={{ fontWeight: 'bold', color: 'white' }}
                            />
                        </View>
                    </ScrollView>
                    {
                        this.state.confirmPassword ?
                            <View style={styles.tabBarInfoContainer}>
                                <Icon
                                    name='close'
                                    size={30}
                                    type='evilicon'
                                    containerStyle={{ position: 'absolute', top: 10, right: 10 }}
                                    color={'#a6a6a6'}
                                    onPress={()=>!this.state.isLoading?this.setState({
                                        confirmPassword:false,
                                        confirmPasswordMessage:'Please enter your password',
                                        isPayLoading:false,
                                        password:"",
                                    }):null}
                                />
                                {this.state.firstInput ?
                                    <Icon
                                        name={'lock-outline'}
                                        size={48}
                                        type='material-community'
                                        containerStyle={{paddingTop: 10}}
                                        color={'#a6a6a6'}
                                    />:
                                    <Icon
                                        name={this.state.passwordPass ? 'check-circle' : 'close-circle'}
                                        size={48}
                                        type='material-community'
                                        style={{marginBottom: 5}}
                                        color={this.state.passwordPass ? '#0F0' : '#F00'}
                                    />}
                                <Text style={styles.tabBarInfoText}>
                                    {this.state.confirmPasswordMessage}
                                </Text>
                                {this.state.passwordPass?<Text style={styles.tabBarText}>
                                    {this.state.confirmPasswordSubMessage}
                                </Text>:<View/>}
                                {this.state.passwordPass?<ActivityIndicator style={{justifyContent: 'center',marginBottom:10,marginTop:5}} size="large" color="#0C0" />:<View/>}

                                {!this.state.passwordPass ?
                                    <KeyboardAvoidingView behavior="padding">
                                        <FormInput
                                            // label={tran.t('new_password')}
                                            refInput={input => (this.passwordInput = input)}
                                            icon="lock"
                                            value={this.state.password}
                                            onChangeText={password => this.setState({ password })}
                                            placeholder={tran.t('password')}
                                            secureTextEntry
                                            placeholderTextColor={"#000"}
                                            returnKeyType="next"
                                            errorMessage={
                                                this.state.passwordValid ? null : 'Your password can\'t be blank'
                                            }
                                            onSubmitEditing={() => {
                                                this.validatePassword();
                                            }}
                                        />
                                        <View style={{flexDirection:'row',justifyContent:'center'}}>
                                            <Button
                                                title="Submit"
                                                activeOpacity={1}
                                                underlayColor="transparent"
                                                onPress={this.submitOrderCredentials.bind(this)}
                                                // onPress={()=>this.setState({
                                                //     confirmPassword:true,
                                                //     confirmPasswordMessage:'Please enter your password',
                                                //     isLoading:true,
                                                // })}
                                                loading={this.state.isLoading}
                                                loadingProps={{ size: 'small', color: 'white' }}
                                                disabled={this.state.isLoading}
                                                disabledStyle={styles.submitButton}
                                                buttonStyle={styles.submitButton}
                                                containerStyle={{ marginVertical: 10 }}
                                                titleStyle={{ fontWeight: 'bold', color: 'white' }}
                                            />
                                        </View>
                                    </KeyboardAvoidingView>
                                    : <View/>}
                            </View>
                            :<View/>
                    }

                </ImageBackground>
            </KeyboardAvoidingView>

        );
    }

    getData = async () => {
        await Axios.get(HOST_NAME+HOST_API_VER+"product/view/"+this.state.product_id)
            .then((response) => {
                if (response.status === 200) {
                    this.setState({
                        product: response.data.data,
                    });
                }
            })
            .catch((error) => {

            });
    };
}

export const FormInput = props => {
    const { icon, refInput, ...otherProps } = props;
    return (
        <Input
            {...otherProps}
            ref={refInput}
            inputContainerStyle={styles.inputContainer}
            leftIcon={
                <Icon name={icon} type={'simple-line-icon'} color="#B27ACF" size={18} />
            }
            inputStyle={styles.inputStyle}
            autoFocus={false}
            autoCapitalize="none"
            keyboardAppearance="dark"
            errorStyle={styles.errorInputStyle}
            autoCorrect={false}
            blurOnSubmit={false}
            placeholderTextColor="#691594"
            labelStyle={styles.inputLabelStyle}
        />
    );
};

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
    button: {
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    text:{
        padding: 10,
        color: 'white',
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
    product_image:{
        flex:1,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT/2,
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
    buyButton:{
        height: 50,
        width: 200,
        backgroundColor: '#ff622b',
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 5,
        marginBottom: 5,
    },
    submitButton:{
        height: 50,
        width: 200,
        backgroundColor: '#3a67ff',
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 5,
        marginBottom: 5,
    },



    tabBarInfoContainer: {
        // flex:1,
        // position: 'absolute',
        // bottom: 0,
        // left: 0,
        // right: 0,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { width: 0, height: -3 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 20,
            },
        }),
        alignItems: 'center',
        backgroundColor: '#fbfbfb',
    },
    tabBarText: {
        fontSize: 24,
        color: 'rgb(37,39,48)',
        textAlign: 'center',
        marginBottom: 5,
    },
    tabBarInfoText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        textAlign: 'center',
        marginBottom: 5,
    },
    navigationFilename: {
        marginTop: 5,
    },
    inputContainer: {
        width:SCREEN_WIDTH-30,
        paddingLeft: 8,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#691594',
        height: 45,
        marginVertical: 10,
    },
    inputStyle: {
        flex: 1,
        marginLeft: 10,
        color: 'black',
        fontFamily: 'UbuntuLight',
        fontSize: 16,
    },
    inputLabelStyle:{
        color:'#691594'
    },
    errorInputStyle: {
        marginTop: 0,
        textAlign: 'center',
        color: '#FF7575',
    },
});
