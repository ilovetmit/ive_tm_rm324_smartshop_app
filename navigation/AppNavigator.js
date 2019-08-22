import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import LoginScreen from '../Login';
import RegisterScreen from '../RegisterScreen'
import QRScreen from '../screens/QRScreen';
import LoadingScreen from '../screens/LoadingScreen';

const LoginStack = createStackNavigator({ Login: LoginScreen, Register: RegisterScreen });

export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: MainTabNavigator,
    User: LoginStack,
    Loading: LoadingScreen,
    

  }, {
      initialRouteName: 'Loading',
    }
  )
);
