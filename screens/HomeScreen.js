import * as WebBrowser from 'expo-web-browser';
import React, { Component } from 'react';
import { ImageBackground, NavigationBar, Title, Heading, Screen, ListView, Tile, Subtitle, Divider } from '@shoutem/ui';
import Slideshow from 'react-native-image-slider-show';


import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage,
  Dimensions,
} from 'react-native';

import FoodSlideComponent from '../components/FoodSlideComponent';
import FAB from '../components/FAB';


export default class HomeScreen extends Component {

  constructor(props) {
    super(props)
    // this._auth();

    this.state = {
      position: 1,
      interval: null,
      riceArray: [],
      noodleArray:[],
      congeeArray:[],
      drinkArray:[],
      dataSource: [
        {
          title: 'Title 1',
          caption: 'Caption 1',
          url: 'http://placeimg.com/640/480/any',
        }, {
          title: 'Title 2',
          caption: 'Caption 2',
          url: 'http://placeimg.com/640/480/any',
        }, {
          title: 'Title 3',
          caption: 'Caption 3',
          url: 'http://placeimg.com/640/480/any',
        },
      ],
      
    }
  }

  componentWillMount() {
    this.setState({
      interval: setInterval(() => {
        this.setState({
          position: this.state.position === this.state.dataSource.length ? 0 : this.state.position + 1
        });
      }, 2000)
    });

    fetch('https://ss.anchorlab.it/api/foods/Rice'
      , {
        method: 'GET',
        headers: {
          "Authorization": "Bearer zs3jdLOBKJ3wgXTyeoYu77OJ41ausvy2Zu3rEqu1IuvZ4n2bKcCIMDkNLaJo"
          // "Authorization": this.state.token
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === 'SUCCESS') {
          this.setState({
            riceArray: responseJson.data
          });
        } else {
          alert(responseJson.msg)
        }
      })
      .catch((error) => {
        alert(error)
      })
      .done();

    fetch('https://ss.anchorlab.it/api/foods/Noodles'
      , {
        method: 'GET',
        headers: {
          "Authorization": "Bearer zs3jdLOBKJ3wgXTyeoYu77OJ41ausvy2Zu3rEqu1IuvZ4n2bKcCIMDkNLaJo"
          // "Authorization": this.state.token
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === 'SUCCESS') {
          this.setState({
            noodleArray: responseJson.data
          });
        } else {
          alert(responseJson.msg)
        }
      })
      .catch((error) => {
        alert(error)
      })
      .done();

    fetch('https://ss.anchorlab.it/api/foods/Congee'
      , {
        method: 'GET',
        headers: {
          "Authorization": "Bearer zs3jdLOBKJ3wgXTyeoYu77OJ41ausvy2Zu3rEqu1IuvZ4n2bKcCIMDkNLaJo"
          // "Authorization": this.state.token
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === 'SUCCESS') {
          this.setState({
            congeeArray: responseJson.data
          });
        } else {
          alert(responseJson.msg)
        }
      })
      .catch((error) => {
        alert('Update Fail, Please Try Again')
      })
      .done();
    
    fetch('https://ss.anchorlab.it/api/foods/Drink'
      , {
        method: 'GET',
        headers: {
          "Authorization": "Bearer zs3jdLOBKJ3wgXTyeoYu77OJ41ausvy2Zu3rEqu1IuvZ4n2bKcCIMDkNLaJo"
          // "Authorization": this.state.token
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === 'SUCCESS') {
          this.setState({
            drinkArray: responseJson.data
          });
        } else {
          alert(responseJson.msg)
        }
      })
      .catch((error) => {
        alert('Update Fail, Please Try Again')
      })
      .done();
  }

  


  componentWillUnmount() {
    clearInterval(this.state.interval);
  }


  // _auth = async () => {
  //   const apiToken = await AsyncStorage.getItem('apiToken');
  //   if (!apiToken) {
  //     this.props.navigation.navigate('User');
  //   } else {
  //     this.setState({
  //       token: "Bearer " + apiToken
  //     })
  //   }
  // };



  render() {

    const window = Dimensions.get('window')
    const { navigation } = this.props;
    let rice = this.state.riceArray.map((value, index) => {
      return <FoodSlideComponent
        key={index}
        value={value}
        navigation={navigation}
      />
    })

    let noodles = this.state.noodleArray.map((value, index) => {
      return <FoodSlideComponent
        key={index}
        value={value}
        navigation={navigation}
      />
    })

    let congee = this.state.congeeArray.map((value, index) => {
      return <FoodSlideComponent
        key={index}
        value={value}
        navigation={navigation}
      />
    })

    let drink = this.state.drinkArray.map((value, index) => {
      return <FoodSlideComponent
        key={index}
        value={value}
        navigation={navigation}
      />
    })
    return (


      <Screen>
        <View>
          <Image style={{ height: window.height, width: window.width, position: 'absolute' }} source={require('../assets/images/foodBackground.jpg')} />
      </View>
      <ScrollView >
        <Slideshow
          dataSource={this.state.dataSource}
          position={this.state.position}
          onPositionChanged={position => this.setState({ position })} />

        <View style={{flex:1, borderWidth:0.5, margin:10, borderColor:"transparent"}}>
          <View style={{flex: 1, justifyContent: "center", alignContent: "center", display: "flex", flexDirection:"row"}}>
          <Title style={{ flex:3,marginLeft:10,marginTop:10,}}>Rice</Title>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Food', {name: "Rice"})}>
          <Text style={{flex:1, marginTop:12}} >More>></Text>
          </TouchableOpacity>
          </View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            automaticallyAdjustContentInsets={false}
            directionalLockEnabled = {true}
            style={{ marginTop: "5%" }}
          >
            {rice}
          </ScrollView>
        </View>

        <View style={{ flex: 1, justifyContent: "center", alignContent: "center", borderWidth: 0.5, margin: 10, borderColor: "transparent" }}>
          <View style={{ flex: 1, justifyContent: "center", alignContent: "center", display: "flex", flexDirection: "row" }}>
            <Title style={{ flex: 3, marginLeft: 10, marginTop: 10, }}>Noodles</Title>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Food', { name: "Noodles" })}>
                <Text style={{ flex: 1, marginTop: 12 }} >More>></Text>
              </TouchableOpacity>
          </View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
              automaticallyAdjustContentInsets={false}
              directionalLockEnabled={true}
            style={{ marginTop: "5%" }}
          >
            {noodles}
          </ScrollView>
        </View>

        <View style={{ flex: 1, justifyContent: "center", alignContent: "center", borderWidth: 0.5, margin: 10, borderColor: "transparent" }}>
          <View style={{ flex: 1, justifyContent: "center", alignContent: "center", display: "flex", flexDirection: "row" }}>
            <Title style={{ flex: 3, marginLeft: 10, marginTop: 10, }}>Congee</Title>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Food', { name: "Congee" })}>
                <Text style={{ flex: 1, marginTop: 12 }} >More>></Text>
              </TouchableOpacity>
          </View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              automaticallyAdjustContentInsets={false}
              directionalLockEnabled={true}
            style={{ marginTop: "5%" }}
          >
            {congee}
          </ScrollView>
        </View>

        <View style={{ flex: 1, justifyContent: "center", alignContent: "center", borderWidth: 0.5, margin: 10, borderColor: "transparent" }}>
          <View style={{ flex: 1, justifyContent: "center", alignContent: "center", display: "flex", flexDirection: "row" }}>
            <Title style={{ flex: 3, marginLeft: 10, marginTop: 10, }}>Drinks</Title>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Food', { name: "Drink" })}>
                <Text style={{ flex: 1, marginTop: 12 }} >More>></Text>
              </TouchableOpacity>
          </View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              automaticallyAdjustContentInsets={false}
              directionalLockEnabled={true}
            style={{ marginTop: "5%" }}
          >
            {drink}
          </ScrollView>
        </View>



      </ScrollView>
      
      </Screen>
    );


  }

  


}

const styles = StyleSheet.create({
  space: {
    paddingBottom: '5%',
  },

});







