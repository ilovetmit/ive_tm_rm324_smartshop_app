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

import HouseScreen from "../views/User/HouseScreen";
import ParkingSpaceScreen from "../views/User/ParkingSpaceScreen";

import UserScreen from "../views/User/UserScreen";
import EnglishNameScreen from "../views/User/UserProfile/EnglishNameScreen";
import ChineseNameScreen from "../views/User/UserProfile/ChineseNameScreen";
import PhoneScreen from "../views/User/UserProfile/PhoneScreen";
import DobScreen from "../views/User/UserProfile/DobScreen";
import GenderScreen from "../views/User/UserProfile/GenderScreen";
import PasswordScreen from "../views/User/UserProfile/PasswordScreen";


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
    House: HouseScreen,
    ParkingSpace: ParkingSpaceScreen,

    User: UserScreen,
    EnglishName: EnglishNameScreen,
    ChineseName: ChineseNameScreen,
    Phone:PhoneScreen,
    Dob:DobScreen,
    Gender:GenderScreen,
    Password:PasswordScreen,

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
