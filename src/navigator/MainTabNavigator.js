import React from 'react';
import {AsyncStorage, Text, View} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import HomeScreen from "../views/Home/HomeScreen";
import NewsScreen from "../views/News/NewsScreen";
import MeScreen from "../views/Me/MeScreen";
import Axios from "axios";
import i18n from "i18n-js";
import zh_hk from "../locales/zh_hk";
import en_us from "../locales/en_us";
import zh_cn from "../locales/zh_cn";

class IconWithBadge extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newsCount: 0,
        };
    }

    componentDidMount() {
        const { badgeCount } = this.props;
        // TODO have bug
        // if(badgeCount){
        //     setInterval(() => {
        //         this.getCount();
        //     },4000);
        // }
    }

    componentWillUnmount(){

    }

    getCount = async() =>{
        await Axios.get(HOST_NAME + 'news/count')
            .then((response) => {
                this.setState({newsCount: response.data.data.news_urgent})
            })
            .catch((error) => {
                // console.log(error);
            });
    };

    render() {
        const { name, badgeCount, color, size } = this.props;
        return (
            <View style={{ width: 24, height: 24, margin: 5 }}>
                <MaterialIcons name={name} size={size} color={color} />
                {this.state.newsCount > 0 && (
                    <View
                        style={{
                            position: 'absolute',
                            right: -6,
                            top: -3,
                            backgroundColor: 'red',
                            borderRadius: 6,
                            width: 12,
                            height: 12,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
                            {this.state.newsCount}
                        </Text>
                    </View>
                )}
            </View>
        );
    }
}

const NewsIconWithBadge = props => {
    return <IconWithBadge {...props} badgeCount={true} />;
};

const getTabBarIcon = (navigation, focused, tintColor) => {
    const { routeName } = navigation.state;
    let IconComponent = MaterialIcons;
    let iconName;
    if (routeName === 'Home') {
        iconName = `home`;
    } else if (routeName === 'News') {
        iconName = `speaker-notes`;
        // add badges
        IconComponent = NewsIconWithBadge;
    } else if (routeName === 'Me') {
        iconName = `person${focused ? '' : '-outline'}`;
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
        News: { screen: NewsScreen,
            navigationOptions: ({ navigation, navigationOptions }) => ({
                tabBarLabel: tran.t('news')
            }),
        },
        Me: { screen: MeScreen,
            navigationOptions: ({ navigation, navigationOptions }) => ({
                tabBarLabel: tran.t('me')
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
            activeTintColor: '#FFFFFF',
            inactiveTintColor: '#B27ACF',
            style:{
                backgroundColor: '#4F0B72',
                borderColor: '#4F0B72',
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
