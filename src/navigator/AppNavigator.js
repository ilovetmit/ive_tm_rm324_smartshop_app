import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// Implementation of HomeScreen, OtherScreen, LoginScreen, AuthLoadingScreen
// goes here.
import LoginScreen from '../views/Auth/LoginScreen';
import LoadingScreen from "../views/Loading/LoadingScreen";
import RegisterScreen from "../views/Auth/RegisterScreen";
import ForgotScreen from "../views/Auth/ForgotScreen";

import DrawerNavigator from './DrawerNavigator';
import MainTabNavigator from './MainTabNavigator';

import ProductDetailScreen from "../views/Product/ProductDetailScreen";
import ProductBuyScreen from "../views/Product/ProductBuyScreen";

import UserScreen from "../views/User/UserScreen";
import NameScreen from "../views/User/UserProfile/NameScreen";
import PasswordScreen from "../views/User/UserProfile/PasswordScreen";

import OrderScreen from "../views/Order/OrderScreen";
import OrderDetailScreen from "../views/Order/OrderDetailScreen";

import BankingLoginScreen from "../views/Banking/BankingLoginScreen";

import ContactUsScreen from "../views/ContactUs/ContactUsScreen";
import AboutScreen from "../views/About/AboutScreen";

import LanguageScreen from "../views/Settings/Setting/LanguageScreen";
import PrivacyPolicyScreen from "../views/About/PrivacyPolicyScreen";
import TermConditionsScreen from "../views/About/TermConditionsScreen";
import IVE_TM_IT_Screen from "../views/About/IVE_TM_IT_Screen";
import C_Group_Limited_Screen from "../views/About/C_Group_Limited_Screen";
import DevelopmentTeamScreen from "../views/About/DevelopmentTeamScreen";
import AcknowledgementScreen from "../views/About/AcknowledgementScreen";
import ShopScreen from "../views/Shop/ShopScreen";
import VendingScreen from "../views/Vending/VendingScreen";
import InsuranceScreen from "../views/Banking/Bank/Insurance/InsuranceScreen";
import StockScreen from "../views/Banking/Bank/Stock/StockScreen";
import TransactionScreen from "../views/Banking/Bank/TransactionScreen";
import TransferScreen from "../views/Banking/Bank/TransferScreen";
import VendingBuyScreen from "../views/Vending/VendingBuyScreen";
import InsuranceDetailScreen from "../views/Banking/Bank/Insurance/InsuranceDetailScreen";
import StockDetailScreen from "../views/Banking/Bank/Stock/StockDetailScreen";
import LoginDemoScreen from "../views/Auth/LoginDemoScreen";
import LockerFormScreen from "../views/Locker/LockerFormScreen";
import LockerRecordScreen from "../views/Locker/LockerRecordScreen";
import LockerTestScreen from "../views/Locker/LockerTestScreen";
import IncrementScreen from "../views/Banking/Bank/IncrementScreen";
import TestScreen from "../views/Test/TestScreen";

const AuthStack = createStackNavigator({
    Login: LoginScreen,
    LoginDemo: LoginDemoScreen,
    Register: RegisterScreen,
    Forgot: ForgotScreen,
});

const AppStack = createStackNavigator({


    Drawer: DrawerNavigator,

    //Product
    ProductDetail: ProductDetailScreen,
    ProductBuy: ProductBuyScreen,

    // User
    User: UserScreen,
    Name: NameScreen,
    Password:PasswordScreen,

    //Me
    ContactUs: ContactUsScreen,

    //S-Bank
    BankingLogin: BankingLoginScreen,
    Transaction: TransactionScreen,
    Insurance: InsuranceScreen,
    InsuranceDetail:InsuranceDetailScreen,
    Stock: StockScreen,
    StockDetail: StockDetailScreen,
    Transfer: TransferScreen,
    Increment:IncrementScreen,

    //S-Vending
    VendingBuy:VendingBuyScreen,

    //Locker
    LockerForm:LockerFormScreen,
    LockerRecord:LockerRecordScreen,
    LockerTest:LockerTestScreen,

    //Order
    Order: OrderScreen,
    OrderDetail: OrderDetailScreen,

    //About
    About: AboutScreen,
    PrivacyPolicy: PrivacyPolicyScreen,
    TermCondition: TermConditionsScreen,
    IVE_TM_IT: IVE_TM_IT_Screen,
    C_Group_Limited: C_Group_Limited_Screen,
    DevelopmentTeam: DevelopmentTeamScreen,
    Acknowledgement: AcknowledgementScreen,

    //Settings
    Language:LanguageScreen,

    //Test
    Test:TestScreen,

},{
    initialRouteName: 'Drawer',
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
