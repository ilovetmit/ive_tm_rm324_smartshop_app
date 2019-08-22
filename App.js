import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { Platform, StatusBar, StyleSheet, View, AsyncStorage} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import AppNavigator from './navigation/AppNavigator';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

// getToken = async () => {
//   try {
//     const value = await AsyncStorage.getItem('apiToken');
//     if (value !== null) {
//       alert("Bearer " + value)
//       return "Bearer " + value
//     }
//   } catch (error) {
//     alert(error)
//   }
// };


const initialState = {
  customer_name: "Test",
  order_part: [],
  total_price: 0,
  totalquantity:0,
  // token: getToken()
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return { ...state, order_part: [...state.order_part, action.order_part], 
        total_price: state.total_price + action.total_price,
            totalquantity: state.totalquantity + action.quantity}
    case 'CLEAR_CART':
      return { ...state, order_part: [], total_price:0, totalquantity:0 }
    case 'DELETE_CART_ITEM':
      let filterIndex = state.order_part.filter(function (item, index, array) {
        return item.name != action.name ;       
      });
      
      return {
        ...state, order_part: filterIndex, total_price: state.total_price - action.total_price, 
              totalquantity: state.totalquantity - action.quantity }

  }
  return state;
}
const store = createStore(reducer)



export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return (
      <Provider store={store}>
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <AppNavigator />
      </View>
      </Provider>
    );
  }
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require('./assets/images/robot-dev.png'),
      require('./assets/images/robot-prod.png'),
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      'Rubik-Regular': require('./assets/fonts/arial.ttf'),
      'rubicon-icon-font': require('./assets/fonts/rubicon-icon-font.ttf'),
    }),
  ]);
}

function handleLoadingError(error: Error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});


