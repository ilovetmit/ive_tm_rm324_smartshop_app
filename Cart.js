// import React, { Component } from 'react';
// import { ImageBackground, NavigationBar, Title, Heading, Screen, ListView, Tile, Subtitle, Button, TextInput, Icon, Image } from '@shoutem/ui';
// import {
//     Platform,
//     ScrollView,
//     StyleSheet,
//     Text,
//     TouchableOpacity,
//     View,
// } from 'react-native';

// import AddToCartScreen from './screens/AddToCartScreen'
// import ShoppingCartScreen from './screens/ShoppingCartScreen'
// import {createStore} from 'redux';
// import {Provider} from 'react-redux';

// const initialState = {
//     customer_name: "Test",
//     order_part: [],
//     total_price: 10,
// }
// const reducer = (state = initialState,action) => {
//     switch(action.type){
//         case 'ADD_TO_CART':
            
//     }
//     return state;
// }
// const store = createStore(reducer)

// export default class Cart extends Component{
//     render() {
//         return (
//             <Provider store={store}>
//                 <ShoppingCartScreen />
//             </Provider>
//         );
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#F5FCFF',
//     },
// });