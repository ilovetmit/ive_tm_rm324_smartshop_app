import React from 'react';
import {AsyncStorage, Text, View} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {Icon,} from 'react-native-elements';
import Colors from '../constants/Colors';

import HomeScreen from "../views/Home/HomeScreen";
import QRScreen from '../views/QR/QR'
import MeScreen from "../views/Me/MeScreen";
import Axios from "axios";
import i18n from "i18n-js";
import zh_hk from "../locales/zh_hk";
import en_us from "../locales/en_us";
import zh_cn from "../locales/zh_cn";

class IconWithBadge extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { name, badgeCount, color, size } = this.props;
        return (
            <View style={{ width: 24, height: 24, margin: 5 }}>
                <MaterialCommunityIcons name={name} size={size} color={color} />
            </View>
        );
    }
}


const getTabBarIcon = (navigation, focused, tintColor) => {
    const { routeName } = navigation.state;
    let IconComponent = MaterialCommunityIcons;
    let iconName;
    if (routeName === 'Home') {
        iconName = `home`;
    } else if (routeName === 'QR') {
        iconName = `qrcode-scan`;
    } else if (routeName === 'Me') {
        iconName = `account-circle${focused ? '' : '-outline'}`;
    }

    // return component
    return <IconComponent name={iconName} size={25} color={tintColor} />;
};

const tab = createBottomTabNavigator(
    {
        Home: {
            screen: HomeScreen,
            navigationOptions: ({ navigation, navigationOptions }) => ({
                tabBarLabel: tran.t('home')
            }),
        },
        QR: { screen: QRScreen,
            navigationOptions: ({ navigation, navigationOptions }) => ({
                tabBarLabel: "",
                title: "",
                tabBarIcon: ({ focused, tintColor }) =>
                    <View style={{
                        height: 80,
                        width: 80,
                        borderRadius: 100,
                        backgroundColor: '#FFF',
                        paddingTop: (focused ? 18 : 15),
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 3,
                        },
                        shadowOpacity: 0.27,
                        shadowRadius: 4.65,
                        elevation: 6,
                    }}>
                        <Icon name={"qrcode"+(focused ? "-scan" : "")} type="material-community" size={(focused ? 45 : 50)}/>
                    </View>,
            }),
        },
        Me: { screen: MeScreen,
            navigationOptions: ({ navigation, navigationOptions }) => ({
                tabBarLabel: "Profile"
            }),
        },
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) =>
                getTabBarIcon(navigation, focused, tintColor),
            headerVisible: false,
        }),
        tabBarOptions: {
            activeTintColor: Colors.Secondary,
            inactiveTintColor: Colors.Default,
            style:{
                backgroundColor: Colors.Primary,
                borderColor: Colors.Primary,
            }
        },
        navigationOptions:{
            headerVisible: false,
        },
        headerMode: 'none',
    }
);

export default createAppContainer(
    tab,
);
