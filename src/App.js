import React, { useState } from 'react';
import { AppLoading } from 'expo';
import { AsyncStorage } from 'react-native';
import i18n from 'i18n-js';
import Axios from 'axios';

import en_us from './locales/en_us';
import zh_hk from './locales/zh_hk';
import zh_cn from './locales/zh_cn';

import AppNavigator from './navigator/AppNavigator';
import { cacheImages, cacheFonts } from './helpers/AssetsCaching';
import vectorFonts from './helpers/vector-fonts';
import Toast from "react-native-root-toast";

global.HOST_NAME = 'http://192.168.1.108:8000';
global.HOST_API_VER = '/api/v2/';

global.tran = i18n;
tran.translations = { zh_hk, en_us, zh_cn };
selectLanguage = async () => {
  const language = await AsyncStorage.getItem('language');
  tran.locale = (language) ? language : 'en_us';
};
this.selectLanguage();


global.Axios = Axios;
Axios.defaults.headers.common['Content-Type'] = 'application/json';
Axios.defaults.headers.common['Accept'] = 'application/json';
Axios.defaults.timeout = 5000;

global.processAuth = async (response, context) => {
  if (response.status === 200) {
    await AsyncStorage.setItem('apiToken', response.data.token);
    Axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;
    // TODO Notifications token
    // const allowPush = await AsyncStorage.getItem('notification') || true;
    // if (allowPush) {
    //   const token = await Notifications.getExpoPushTokenAsync();
    //   Axios.post(API_HOST_NAME + 'modify-token-user', {
    //     expo_token: token,
    //     type: 1
    //   })
    //       .catch((error) => {
    //         alert(error);
    //       });
    // }
    context.setState({isLoading: false});
    Toast.show("Login Success", {
      duration: Toast.durations.SHORT,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
    });
    context.props.navigation.navigate('App');
  } else {
    context.setState({isLoading: false});
    console.log(response.data.message);
    Toast.show(response.data.message, {
      duration: Toast.durations.SHORT,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
    });
  }
};

export default () => {
  const [isReady, setIsReady] = useState(false);


  const loadAssetsAsync = async () => {
    const imageAssets = cacheImages([
      require('../assets/images/bg_login.jpg'),
      require('../assets/images/bg_primary.jpg'),
      require('../assets/images/bg_second.jpg'),
      require('../assets/images/user-householder.png'),
      require('../assets/images/user-proprietor.png'),
      require('../assets/images/user-tenant.png'),
      require('../assets/images/web_qrcode.png'),
    ]);

    const fontAssets = cacheFonts([
      ...vectorFonts,
      { georgia: require('../assets/fonts/Georgia.ttf') },
      { regular: require('../assets/fonts/Montserrat-Regular.ttf') },
      { light: require('../assets/fonts/Montserrat-Light.ttf') },
      { bold: require('../assets/fonts/Montserrat-Bold.ttf') },
      { UbuntuLight: require('../assets/fonts/Ubuntu-Light.ttf') },
      { UbuntuBold: require('../assets/fonts/Ubuntu-Bold.ttf') },
      { UbuntuLightItalic: require('../assets/fonts/Ubuntu-Light-Italic.ttf') },
    ]);

    await Promise.all([...imageAssets, ...fontAssets]);
  };

  if (!isReady) {
    return (
        <AppLoading
            startAsync={loadAssetsAsync}
            onFinish={() => setIsReady(true)}
            onError={console.warn}
        />
    );
  }
  return <AppNavigator/>;

}
