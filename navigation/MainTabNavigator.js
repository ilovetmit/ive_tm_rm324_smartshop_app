import React, { Component } from 'react';
import { Platform, SafeAreaView, ScrollView, Dimensions, View, TouchableOpacity, Image } from 'react-native';
import { createStackNavigator, createDrawerNavigator, DrawerItems, NavigationActions } from 'react-navigation';
import { Button, Icon } from 'native-base';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import ShoppingCartScreen from '../screens/ShoppingCartScreen';
import PersonalScreen from '../screens/PersonalScreen';
import AddToCartScreen from '../screens/AddToCartScreen';
import FoodListScreen from '../screens/FoodListScreen';
import OrderScreen from '../screens/OrderScreen';
import OrderDetailScreen from '../screens/OrderDetailScreen';
import ShoppingCartIcon from '../components/ShoppingCartIcon';
import OrderSuccessScreen from '../screens/OrderSuccessScreen';
import QRScreen from '../screens/QRScreen'
import SideMenu from '../components/SideMenu';


//Navigation Drawer Structure for all screen
class NavigationDrawerStructure extends Component {
  //Top Navigation Header with Donute Button
  toggleDrawer = () => {
    //Props to open/close the drawer
    this.props.navigationProps.toggleDrawer();
  };
  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
          {/*Donute Button Image */}
          <Image
            source={{ uri: "https://cdn4.iconfinder.com/data/icons/social-messaging-productivity-black-4/127000/18-512.png" }}
            style={{ width: 25, height: 25, marginLeft: 20 }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Home',
        headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
        headerStyle: {
          backgroundColor: '#FF9800',
        },
        headerTintColor: '#fff',
      }),
    },
    Add: {
      screen: AddToCartScreen,
      navigationOptions: ({ navigation }) => ({

        headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
        headerStyle: {
          backgroundColor: '#FF9800',
        },
        headerTintColor: '#fff',
      }),
    },
    Food: {
      screen: FoodListScreen,
      navigationOptions: ({ navigation }) => ({

        headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
        headerStyle: {
          backgroundColor: '#FF9800',
        },
        headerTintColor: '#fff',
      }),
    },


  },
  config
);

HomeStack.navigationOptions = {
  title: 'Home',
  drawerIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

HomeStack.path = '';

const ShoppingStack = createStackNavigator(
  {
    Shopping: {
      screen: ShoppingCartScreen,
      navigationOptions: ({ navigation }) => ({
        title: "Shopping Cart",
        headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
        headerStyle: {
          backgroundColor: '#FF9800',
        },
        headerTintColor: '#fff',
      }),
    },
    Success: OrderSuccessScreen,

  },
  config
);

ShoppingStack.navigationOptions = {
  title: 'Shopping Cart',
  drawerIcon: <ShoppingCartIcon />,

};

ShoppingStack.path = '';

const PersonalStack = createStackNavigator(
  {
    Personal: {
      screen: PersonalScreen,
      navigationOptions: ({ navigation }) => ({
        title: "Personal Information",
        headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
        headerStyle: {
          backgroundColor: '#FF9800',
        },
        headerTintColor: '#fff',
      }),
    },

  },
  config
);

PersonalStack.navigationOptions = {
  title: 'Me',
  drawerIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'} />
  ),
};

PersonalStack.path = '';

const OrderStack = createStackNavigator(
  {
    Order: {
      screen: OrderScreen,
      navigationOptions: ({ navigation }) => ({
        title: "Order",
        headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
        headerStyle: {
          backgroundColor: '#FF9800',
        },
        headerTintColor: '#fff',
      }),
    },
    OrderDetail: {
      screen: OrderDetailScreen,
      navigationOptions: ({ navigation }) => ({
        title: "Detail",
        headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
        headerStyle: {
          backgroundColor: '#FF9800',
        },
        headerTintColor: '#fff',
      }),
    },


  },
  config
);

OrderStack.navigationOptions = {
  title: 'Order',
  drawerIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-paper' : 'md-paper'} />
  ),
};

OrderStack.path = '';

const CustomDrawerComponent = (props) => (
  <SafeAreaView style={{ flex: 1 }}>
    <View style={{ height: 40, backgroundColor: "white" }}>

    </View>
    <Button style={{ backgroundColor: '#5067FF', width: 50, height: 50, justifyContent: "center", alignItems: "center", borderRadius: 40, marginRight: 10 }}
      onPress={() => NavigationActions.navigate('QR')}
    >
      <Icon name="md-qr-scanner" />
    </Button>
    <ScrollView>
      <DrawerItems {...props} />
    </ScrollView>
  </SafeAreaView>
)

const QRStack = createStackNavigator({ QR: QRScreen });
const window = Dimensions.get('window')

const tabNavigator = createDrawerNavigator({
  HomeStack,
  ShoppingStack,
  OrderStack,
  PersonalStack,
  QRStack
}, {
    drawerWidth: window.width * 0.7,
    contentComponent: SideMenu
  });

tabNavigator.path = '';

export default tabNavigator;
