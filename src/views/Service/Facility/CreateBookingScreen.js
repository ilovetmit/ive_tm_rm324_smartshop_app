import React, { Component } from 'react';
import {StyleSheet,Text,View,ImageBackground,Dimensions,LayoutAnimation,Picker,ScrollView,KeyboardAvoidingView} from 'react-native';
import {Input, Button, Icon, Header, ListItem,Slider} from 'react-native-elements';
import {RectButton} from "react-native-gesture-handler";
import Axios from "axios";
import {NavigationActions, StackActions} from "react-navigation";
import TouchableScale from "react-native-touchable-scale";
import DatePicker from "react-native-datepicker";
import moment from "moment";
import Toast from 'react-native-root-toast';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const BG_IMAGE = require('../../../../assets/images/bg_second.jpg');

export default class CreateServiceRequestScreen extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.init();
    }

    init() {
        this.state = {
            facility: this.props.navigation.getParam("facility"),
            num_of_user: 1,
            remark: "",
            booking_date: "",
            booking_time: "",
            dateValid: true,
            timeValid: true,
            numOfUserValid: true,
        }
    }

    componentWillMount() {

    }


    updateData() {
        const { booking_date,booking_time,num_of_user } = this.state;

        if(booking_date.length===0 || booking_date===""){
            alert(tran.t('bookingDateValid'));
            return;
        }else if(booking_time.length===0 || booking_time===""){
            alert(tran.t('bookingTimeValid'));
            return;
        }else{
            Axios.post(HOST_NAME+"booking", {
                facility: this.state.facility.id,
                booking_date: this.state.booking_date,
                booking_time: this.state.booking_time,
                num_of_user: this.state.num_of_user,
                remark: this.state.remark,
            })
                .then((response) => {
                    if (response.status === 200) {
                        // console.log(response);
                        Toast.show(tran.t('create_success'), {
                            duration: Toast.durations.SHORT,
                            position: Toast.positions.BOTTOM,
                            shadow: true,
                            animation: true,
                            hideOnPress: true,
                            delay: 0,
                        });
                        this.props.navigation.replace('BookingDetail',{ booking: response.data.data.booking, status:response.data.data.status.variables });
                    } else {
                        Toast.show(response.data.message, {
                            duration: Toast.durations.SHORT,
                            position: Toast.positions.BOTTOM,
                            shadow: true,
                            animation: true,
                            hideOnPress: true,
                            delay: 0,
                        });
                    }
                })
                .catch((error) => {
                    // console.log(error);
                    Toast.show(tran.t('unexpected_error'), {
                        duration: Toast.durations.SHORT,
                        position: Toast.positions.BOTTOM,
                        shadow: true,
                        animation: true,
                        hideOnPress: true,
                        delay: 0,
                    });
                });
        }
    }

    render() {

        let tomorrow = new Date();
        tomorrow = moment(tomorrow).add(1, 'day').format('YYYY-MM-DD');

        // TODO keyboard display bug

        return (

            <View style={styles.num_of_user}>
                <ImageBackground source={BG_IMAGE} style={styles.bgImage}>
                    <View style={styles.header}>
                        <Icon
                            name="chevron-left"
                            type="feather"
                            color="#fff"
                            size={40}
                            onPress={() => this.props.navigation.goBack()}
                            underlayColor={'transparent'}
                            style={{padding:10}}
                        />
                        <Text style={styles.headerTitle}>{tran.t('create_booking')}</Text>
                        <Button
                            title="Submit"
                            type="clear"
                            titleStyle={{color:'#FFF'}}
                            onPress={() => this.updateData()}
                        />
                    </View>
                    <ScrollView>
                        <View style={styles.itemList}>
                            <View style={styles.titleView}>
                                <Text style={styles.title}>{this.state.facility.facility}</Text>
                            </View>
                            <Text style={styles.inputPicker}>{'* '+tran.t('booking_date')}</Text>
                            <DatePicker
                                style={styles.datePicker}
                                date={this.state.booking_date}
                                mode="date"
                                placeholder={tran.t('choose_date')}
                                format="YYYY-MM-DD"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                showIcon={false}
                                minDate={tomorrow}
                                onDateChange={booking_date => this.setState({ booking_date })}
                                customStyles={{
                                    placeholderText: {
                                        color: '#691594',
                                    },
                                }}
                            />
                            <Text style={styles.inputPicker}>{'* '+tran.t('booking_time')}</Text>
                            <Picker
                                selectedValue={this.state.booking_time}
                                onValueChange={booking_time => this.setState({ booking_time })}
                            >
                                <Picker.Item label="Choose Time" value="" />
                                <Picker.Item label="09:00-10:00" value="09_10" />
                                <Picker.Item label="10:00-11:00" value="10_11" />
                                <Picker.Item label="11:00-12:00" value="11_12" />
                                <Picker.Item label="14:00-15:00" value="14_15" />
                                <Picker.Item label="15:00-16:00" value="15_16" />
                                <Picker.Item label="16:00-17:00" value="16_17" />
                                <Picker.Item label="17:00-18:00" value="17_18" />
                                <Picker.Item label="19:00-20:00" value="19_20" />
                                <Picker.Item label="20:00-21:00" value="20_21" />
                                <Picker.Item label="21:00-22:00" value="21_22" />
                            </Picker>
                            <Text style={styles.inputPicker}>{'* '+tran.t('num_of_user')}: {this.state.num_of_user}</Text>
                            <Slider
                                value={this.state.num_of_user}
                                onValueChange={num_of_user => this.setState({ num_of_user })}
                                maximumValue={20}
                                minimumValue={1}
                                step={1}
                                style={{marginHorizontal:10}}
                                thumbTintColor={'#4F0B72'}
                            />
                            <FormInput
                                //TODO fix input text in center bug
                                multiline
                                label={tran.t('remark')}
                                refInput={input => (this.remarkInput = input)}
                                inputContainerStyle={styles.inputContainerContent}
                                value={this.state.remark}
                                onChangeText={remark => this.setState({ remark })}
                                placeholder=""
                            />
                        </View>
                    </ScrollView>
                </ImageBackground>
            </View>
        );
    }
}

export const FormInput = props => {
    const { icon, refInput, ...otherProps } = props;
    return (
        <Input
            {...otherProps}
            ref={refInput}
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
    num_of_user:{
        flex: 1,
    },
    topMenu:{
        backgroundColor:'#4F0B72',
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
    itemList:{
        marginBottom: 10,
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderRadius: 10,
        marginHorizontal: 10,
        paddingVertical: 10,
    },
    title:{
        color:'#691594',
        fontFamily: 'UbuntuBold',
        fontSize: 20,
    },
    titleView:{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection:'row',
        flex: 1,
        marginVertical: 10,
        marginBottom: 20,
    },
    inputContainer: {
        paddingLeft: 8,
        borderRadius: 40,
        borderWidth: 1,
        borderColor: '#691594',
        height: 45,
        marginVertical: 10,
    },
    inputContainerContent: {
        paddingLeft: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#691594',
        height: 150,
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
        color:'#691594',
    },
    inputPicker:{
        color:'#691594',
        fontFamily: 'UbuntuBold',
        marginLeft: 10,
    },
    errorInputStyle: {
        marginTop: 0,
        textAlign: 'center',
        color: '#ff2c2e',
    },
    datePicker: {
        width: '100%',
        padding:10,
        borderColor: '#691594',
    },
});
