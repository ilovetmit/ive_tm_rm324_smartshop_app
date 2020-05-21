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

// global.HOST_NAME = 'http://ss.project.clixells.com/system';
// global.HOST_NAME_LOCAL = 'http://ss.project.clixells.com/system';
// global.HOST_NAME_CLOUD = 'http://ss.project.clixells.com/system';

global.HOST_NAME = 'http://192.168.0.107:8000';
global.HOST_NAME_LOCAL = 'http://192.168.0.107:8000';
global.HOST_NAME_CLOUD = 'http://192.168.0.107:8000';

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

global.processAuth = async (response, context, host) => {
  context.setState({
    isLoading: false,
    isCloudLoading: false,
    isQuickLoading: false,
    isFaceLoading: false,
  });
  if (response.status === 200) {
    await AsyncStorage.setItem('apiToken', response.data.token);
    await AsyncStorage.setItem('hostName', host);
    Axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;
    Toast.show("Login Success", {
      duration: Toast.durations.SHORT,
      position: Toast.positions.CENTER,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
    });
    console.log(response.data.message);
    context.props.navigation.navigate('App');
  } else {
    console.log(response.data.message);
    Toast.show(response.data.message, {
      duration: Toast.durations.SHORT,
      position: Toast.positions.CENTER,
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
      require('../assets/images/web_qrcode.png'),
      require('../assets/images/S-Shop_logo.png'),
      require('../assets/images/bg_bank.jpg'),
      require('../assets/images/bg_contact.jpg'),
      require('../assets/images/bg_insurance.jpg'),
      require('../assets/images/bg_locker.jpg'),
      require('../assets/images/bg_purchase.jpg'),
      require('../assets/images/bg_shopping.jpg'),
      require('../assets/images/bg_stock.jpg'),
      require('../assets/images/bg_transfer.jpg'),
      require('../assets/images/bg_transfer2.jpg'),
      require('../assets/images/bg_vending.jpg'),
      require('../assets/images/bg_home.jpg'),
      require('../assets/images/bg_about.jpg'),
      require('../assets/images/bg_transaction.jpg'),
      require('../assets/images/bg_whitelocker.jpg'),
      require('../assets/images/bg_takelocker.jpg'),
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
  return <AppNavigator />;

}
