import * as React from 'react';
import {Text, View, StyleSheet, Button, ScrollView, AsyncStorage} from 'react-native';

import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator, HeaderBackButton} from 'react-navigation-stack';

import HomeScreen from "../views/Home/HomeScreen";

import MainTabNavigator from './MainTabNavigator';
import ContactUsScreen from "../views/ContactUs/ContactUsScreen";
import SettingsScreen from "../views/Settings/SettingsScreen";
import AboutScreen from "../views/About/AboutScreen";


import DrawerMenu from "./DrawerMenu";
import BankingScreen from "../views/Banking/BankingScreen";
import MeScreen from "../views/Me/MeScreen";
import LockerScreen from "../views/Locker/LockerScreen";
import ShopScreen from "../views/Shop/ShopScreen";
import VendingScreen from "../views/Vending/VendingScreen";

const Drawer = createDrawerNavigator(
    {
        Main: MainTabNavigator,

        // Drawer Item
        // Home: HomeScreen,
        // Me: MeScreen,

        //S-Shop
        Shop:ShopScreen,
        //S-Bank
        Banking: BankingScreen,
        Locker: LockerScreen,
        //S-Vending
        Vending:VendingScreen,

        ContactUs: ContactUsScreen,
        About: AboutScreen,
        Settings: SettingsScreen,

    },
    {
        headerMode: 'none',
        navigationOptions: ({ navigation }) => {
            return {
                headerVisible: false,
            }
        },
        initialRouteName:'Main',
        contentComponent: props => <DrawerMenu {...props} />,
        drawerType:'slide',
        backBehavior:'initialRoute',
    }
);


export default createAppContainer(Drawer);


