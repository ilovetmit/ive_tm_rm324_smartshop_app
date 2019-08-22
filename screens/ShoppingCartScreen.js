
import React, { Component } from 'react';

import { connect } from 'react-redux'
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  AsyncStorage,
  Dimensions,
  Picker,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Cart from '../components/Cart';
import { Button, Icon, Row, Image, TextInput } from '@shoutem/ui';
import { clearCart } from '../action/cartActions'
// import { deleteCartItem } from '../action/cartActions'


class ShoppingCartScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      collect: "",
      address: "",
      payment: "balance",
      content:{},

    }
  }

  componentWillMount() {
    // this.getToken()
  }

  // getToken = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('apiToken');
  //     if (value !== null) {
  //       alert("Bearer " + value)
  //       this.setState({
  //         token: "Bearer " + value
  //       })
  //     }
  //   } catch (error) {
  //     alert(error)
  //   }
  // };

  order = (customer_name, order_part, total_price) => {
    let { navigate } = this.props.navigation;
    // let orders = [];
    // orders.customer_name = customer_name;
    // orders.order_part = order_part;
    // orders.total_price = total_price;
    let orders = {
      customer_name: customer_name,
      order_part: order_part,
      total_price: total_price,
    }



    Alert.alert(
      'Take Order',
      'Confirm?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Order', onPress: () => fetch('https://ss.anchorlab.it/api/orders', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              // "Authorization": this.state.token
              "Authorization": "Bearer zs3jdLOBKJ3wgXTyeoYu77OJ41ausvy2Zu3rEqu1IuvZ4n2bKcCIMDkNLaJo"
            },
            body: JSON.stringify(orders)
          })
            .then((response) => response.json())
            .then((responseJson) => {
              if (responseJson.status === 'SUCCESS') {
                this.props.clearCart()
                navigate('Success', {method: this.state.collect})
              } else {
                alert(responseJson.msg)
              }


            })
            .catch((error) => {
              alert(error)
            })
            .done()
        },
      ],
      { cancelable: false }
    );

  }
  // deleteItem = (index, total_price) => {
  //   this.props.deleteCartItem(index, total_price)
  // }


  render() {
    const window = Dimensions.get('window')
    // let foods = this.props.order_part.map((value, index) => {
    //   return <Cart
    //     key={index}
    //     value={value}
    //     // deleteItem={() => this.deleteItem(key, value.total_price)}
    //   />
    // })

    if (this.props.order_part.length == 0) {
      

      return (

        <TouchableOpacity onPress={() => this.props.navigation.navigate('Home', {})}>
          <Text style={{ marginLeft: window.width / 2 - 80, marginTop: window.height / 2 - 80, color: "#6495ed" }}>Press here to take Order</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <View style={{ flex: 1 }}>
          <View>
            <Image style={{ height: window.height, width: window.width, position: 'absolute' }} source={require('../assets/images/foodBackground.jpg')} />
          </View>
          <ScrollView style={{ flex: 1, height: window.height - 300 }} >
            <View >
              <Image styleName="large-banner" source={{ uri: "https://www.xploree.com/wp-content/uploads/2017/01/banner_1.png" }} />


              <Row styleName="small" style={{ flex: 1, marginLeft: 10, backgroundColor:"transparent" }}>
                <Ionicons name="ios-pizza" size={30} />
                <Text style={{ marginLeft: 20, fontSize:20 }}>Here is your order</Text>
              </Row>
            </View>

            <View style={{ flex: 1, height: 200, width: window.width - 20, marginLeft: 10 }}>
              <ScrollView 
                nestedScrollEnabled={true}
                style={{ margin: 10, maxHeight: 200 }}
                >

                <Cart
                  value={this.props.order_part}
                />

              </ScrollView>
            </View>

            <View style={{ flex: 1, flexDirection: "row", marginRight: 20, marginLeft: 20, marginBottom: 20, backgroundColor:"transparent" }}>
              <View style={{ margin: 10, width: 40, alignItems: "center", backgroundColor:"transparent" }}>
                <Ionicons name="ios-home" size={30} style={{ marginTop: 5 }} />
              </View>

              <View style={this.state.collect == "home" ? { flex: 1, flexDirection: "column", backgroundColor: "transparent", height: 130 } : { flex: 1, flexDirection: "column", backgroundColor: "transparent", height:70}}>
                <View style={{ flex: 1, margin: 10, position: "absolute", borderRadius: 0.5, backgroundColor:"transparent", width:210 }}>

                  <Picker
                    selectedValue={this.state.collect}
                    style={{ height: 40, width: 220 }}
                    onValueChange={(itemValue, itemIndex) => {
                      if (itemValue != "") {
                        this.setState({ collect: itemValue })
                      }
                    }}>
                    <Picker.Item label="Select collect method" value="" />
                    <Picker.Item label="Store Shop Locker" value="locker" />
                    <Picker.Item label="Home" value="home" />
                  </Picker>
                  {this.state.collect == "home" ?
                    <View >
                      <TextInput
                        style={{ marginRight: 10, width:210 }}
                        placeholder={'Input your address'}
                        onChangeText={(text) => { this.setState({ address: text }) }}
                      />
                      </View>
                    
                    :
                    <Text style={{width:null, height:null}}></Text>
                  }
                </View>
                
              </View>
            </View>
            
            <View style={{ flex: 1, flexDirection: "row", marginRight: 20, marginLeft: 20, marginBottom: 20, backgroundColor: "transparent" }}>
              <View style={{ margin: 10, width: 40,  alignItems: "center", backgroundColor: "transparent" }}>
                <Ionicons name="ios-call" size={30}  style={{marginTop:10}}/>
              </View>

              <View style={this.state.collect == "home" ? { flex: 1, flexDirection: "column", backgroundColor: "transparent", height: 130 } : { flex: 1, flexDirection: "column", backgroundColor: "transparent", height: 70 }}>
                <View style={{ flex: 1, margin: 10, position: "absolute", borderRadius: 0.5, backgroundColor: "transparent", width: 210 }}>
                  <Text style={{ marginRight: 10, width: 210, fontSize:15 }}>Mobile</Text>
                    <View >
                      <Text style={{ marginRight: 10, width: 210 }}>+852 12345678</Text>
                    </View>
                </View>

              </View>
            </View>

            <Row style={{ flex: 1, marginTop: 10, backgroundColor:"transparent", flexDirection:"column"}}>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <View style={{ flex: 4, marginLeft:20 }}>
                  <Text style={{fontSize:15, fontWeight:"bold"}}>Delivery fee</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text>FREE</Text>
                </View>
                
              </View>
            </Row>

            <Row style={{ flex: 1, backgroundColor: "transparent", flexDirection: "column" }}>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <View style={{ flex: 4, marginLeft: 20 }}>
                  <Text style={{ fontSize: 15, fontWeight: "bold" }}>Concierge fee</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text>FREE</Text>
                </View>

              </View>
            </Row>

          </ScrollView>

          

          <View styleName="horizontal" style={{ marginTop: 10, marginBottom: 10, flexDirection: 'row', justifyContent: 'center', alignContent: "center", height: 40}}>
            <View  style={{ flex: 1, backgroundColor: '#1e90ff', borderColor: 'transparent', borderRadius:10,justifyContent:"center", alignItems:"center", marginLeft:10 }}>
              <Text style={{ fontSize: 15, fontWeight: "bold", color:"#FFF" }} >Total Price: ${this.props.total_price}</Text>
            </View>
            <Button styleName="confirmation" style={{ flex: 1, backgroundColor: '#1e90ff', borderColor: 'transparent', borderRadius: 10 }}
              onPress={() => this.order(this.props.customer_name, this.props.order_part, this.props.total_price)} >
              <Icon name="products" />
              <Text style={{ fontSize: 15, fontWeight: "bold", color: "#FFF", marginRight: 10}}>Check Out</Text>
            </Button>
          </View>



        </View>
      );
    }
  }
}






function mapStateToProps(state) {
  return {
    customer_name: state.customer_name,
    order_part: state.order_part,
    total_price: state.total_price,
  }
}
ShoppingCartScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});



const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => { dispatch(clearCart()) },
    // deleteCartItem: (index, total_price) => { dispatch(deleteCartItem(index, total_price)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartScreen);
