import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// Implementation of HomeScreen, OtherScreen, LoginScreen, AuthLoadingScreen
// goes here.
import LoginScreen from '../views/Auth/LoginScreen';
import LoadingScreen from "../views/Loading/LoadingScreen";
import RegisterScreen from "../views/Auth/RegisterScreen";
import ForgotScreen from "../views/Auth/ForgotScreen";


import MainTabNavigator from './MainTabNavigator';
import LeasingServiceScreen from "../views/Service/Leasing/LeasingServiceScreen";
import SmartLockerScreen from "../views/Service/SmartLocker/SmartLockerScreen";
import TaxiBookingScreen from "../views/Service/Taxi/TaxiBookingScreen";

import FacilityBookingScreen from "../views/Service/Facility/FacilityBookingScreen";
import CreateFacilityListScreen from "../views/Service/Facility/CreateFacilityListScreen";
import CreateBookingScreen from "../views/Service/Facility/CreateBookingScreen";
import BookingDetailScreen from "../views/Service/Facility/BookingDetailScreen";

import ServiceRequestScreen from "../views/Support/ServiceRequest/ServiceRequestScreen";
import CreateServiceRequestScreen from "../views/Support/ServiceRequest/CreateServiceRequestScreen";
import ServiceRequestDetailScreen from "../views/Support/ServiceRequest/ServiceRequestDetailScreen";

import SuggestionFeedbackScreen from "../views/Support/SuggestionFeedback/SuggestionFeedbackScreen";
import CreateFeedbackScreen from "../views/Support/SuggestionFeedback/CreateFeedbackScreen";
import FeedbackDetailScreen from "../views/Support/SuggestionFeedback/FeedbackDetailScreen";

import ManagementFeeScreen from "../views/ManagementFee/ManagementFeeScreen";
import ManagementFeeDetailScreen from "../views/ManagementFee/ManagementFeeDetailScreen";

import HouseScreen from "../views/User/HouseScreen";
import ParkingSpaceScreen from "../views/User/ParkingSpaceScreen";

import UserScreen from "../views/User/UserScreen";
import EnglishNameScreen from "../views/User/UserProfile/EnglishNameScreen";
import ChineseNameScreen from "../views/User/UserProfile/ChineseNameScreen";
import PhoneScreen from "../views/User/UserProfile/PhoneScreen";
import DobScreen from "../views/User/UserProfile/DobScreen";
import GenderScreen from "../views/User/UserProfile/GenderScreen";
import PasswordScreen from "../views/User/UserProfile/PasswordScreen";

import NewsDetailScreen from "../views/News/NewsDetailScreen";
import OtherScreen from "../views/Other/OtherScreen";

import LanguageScreen from "../views/Settings/Setting/LanguageScreen";

const AuthStack = createStackNavigator({
    Login: LoginScreen,
    Register: RegisterScreen,
    Forgot: ForgotScreen,
});

const AppStack = createStackNavigator({


    MainTab: MainTabNavigator,

    // Service
    LeasingService: LeasingServiceScreen,
    SmartLocker: SmartLockerScreen,
    TaxiBooking: TaxiBookingScreen,

    FacilityBooking: FacilityBookingScreen,
    CreateFacilityList: CreateFacilityListScreen,
    CreateBooking: CreateBookingScreen,
    BookingDetail: BookingDetailScreen,

    // Support
    ServiceRequest: ServiceRequestScreen,
    CreateServiceRequest: CreateServiceRequestScreen,
    ServiceRequestDetail: ServiceRequestDetailScreen,

    SuggestionFeedback: SuggestionFeedbackScreen,
    CreateFeedback: CreateFeedbackScreen,
    FeedbackDetail: FeedbackDetailScreen,

    // Management
    ManagementFee: ManagementFeeScreen,
    ManagementFeeDetail: ManagementFeeDetailScreen,

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

    //Detail
    NewsDetail: NewsDetailScreen,

    //Settings
    Language:LanguageScreen,

    Other: OtherScreen,
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
