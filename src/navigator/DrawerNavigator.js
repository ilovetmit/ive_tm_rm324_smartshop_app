import * as React from 'react';
import { Text, View, StyleSheet, Button, ScrollView, AsyncStorage } from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator, HeaderBackButton } from 'react-navigation-stack';

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
import MissionScreen from "../views/Mission/MissionScreen";

const Drawer = createDrawerNavigator(
    {
        Main: MainTabNavigator,

        // Drawer Item

        //S-Shop
        Shop: ShopScreen,
        //S-Bank
        Banking: BankingScreen,
        Locker: LockerScreen,
        //S-Vending
        Vending: VendingScreen,
        Mission: MissionScreen,

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
        initialRouteName: 'Mission',
        contentComponent: props => <DrawerMenu {...props} />,
        drawerType: 'slide',
        backBehavior: 'initialRoute',
    }
);


export default createAppContainer(Drawer);


