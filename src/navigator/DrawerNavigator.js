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

const DrawerStack = createStackNavigator({

    Main: MainTabNavigator,

    // Drawer Item
    Home: HomeScreen,
    Me: MeScreen,
    Banking: BankingScreen,

    ContactUs: ContactUsScreen,
    About: AboutScreen,
    Settings: SettingsScreen,

},{
    initialRouteName: 'Main',
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    },
});


const Drawer = createDrawerNavigator(
    {
        DrawerStack: {
            screen: DrawerStack,
            headerMode: 'none',
            navigationOptions: ({ navigation }) => {
                return {
                    headerVisible: false,
                }
            }
        },
    },
    {
        contentComponent: props => <DrawerMenu {...props} />
    }
);


export default createAppContainer(Drawer);


