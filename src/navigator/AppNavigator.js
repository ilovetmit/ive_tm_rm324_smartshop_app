import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// Implementation of HomeScreen, OtherScreen, LoginScreen, AuthLoadingScreen
// goes here.
import LoginScreen from '../views/Auth/LoginScreen';
import LoadingScreen from "../views/Loading/LoadingScreen";
import RegisterScreen from "../views/Auth/RegisterScreen";
import ForgotScreen from "../views/Auth/ForgotScreen";


import MainTabNavigator from './MainTabNavigator';

import ProductDetailScreen from "../views/Product/ProductDetailScreen";

import UserScreen from "../views/User/UserScreen";
import NameScreen from "../views/User/UserProfile/NameScreen";
import PasswordScreen from "../views/User/UserProfile/PasswordScreen";

import ContactUsScreen from "../views/ContactUs/ContactUsScreen";
import AboutScreen from "../views/About/AboutScreen";

import LanguageScreen from "../views/Settings/Setting/LanguageScreen";

const AuthStack = createStackNavigator({
    Login: LoginScreen,
    Register: RegisterScreen,
    Forgot: ForgotScreen,
});

const AppStack = createStackNavigator({


    MainTab: MainTabNavigator,

    ProductDetail: ProductDetailScreen,

    // User
    User: UserScreen,
    Name: NameScreen,
    Password:PasswordScreen,

    //Me
    ContactUs: ContactUsScreen,
    About: AboutScreen,

    //Settings
    Language:LanguageScreen,

},{
    initialRouteName: 'MainTab',
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    },
});

export default createAppContainer(
    createSwitchNavigator(
        {
            App: AppStack,
            Auth: AuthStack,
            AuthLoading: {
                screen: LoadingScreen,
                navigationOptions: () => ({ headerMode: 'none',headerVisible: false, })
            },
        },
        {
            initialRouteName: 'AuthLoading',
        }
    )
);
