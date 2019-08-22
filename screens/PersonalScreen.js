import React, { Component } from 'react';
import { AsyncStorage, Dimensions, Alert } from 'react-native';
import { Button, Text, Row, Icon, Image, Subtitle, Caption, View, Title, TextInput } from '@shoutem/ui';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import UploadImage from '../src/libs/UploadImageNew';

export default class PersonalScreen extends Component {
  constructor(props) {
    super(props)
    const { navigation } = this.props;
    this.state = {
      background: "https://peakfitnessmeals.com/wp-content/uploads/2017/04/bigstock-Healthy-food-background-69442900.jpg",
      profileArray: [],
      cc_type: "",
      credit_card: "",
      bio: "",
      edit: "edit",
    }
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      // alert('123')
      this.updateReocrd()
    });

  }

  updateReocrd() {
    fetch('https://ss.anchorlab.it/api/profile'
      , {
        method: 'GET',
        headers: {
          "Authorization": "Bearer zs3jdLOBKJ3wgXTyeoYu77OJ41ausvy2Zu3rEqu1IuvZ4n2bKcCIMDkNLaJo"
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === 'SUCCESS') {
          this.setState({
            profileArray: responseJson.data,
            credit_card: responseJson.data.credit_card,
            bio: responseJson.data.bio,
            cc_type: responseJson.data.cc_type,

          })
        } else {
          alert(responseJson.msg)
        }

        // console.warn(JSON.stringify(this.state.orderArray))
      })
      .catch((error) => {
        alert('Update Fail, Please Try Again')
      })
      .done();
  }



  setStateMethod() {
    if (this.state.edit == "edit") {
      this.setState({
        edit: "submit"
      })
    } else {
      this.setState({
        edit: "edit"
      })
    }
  }

  submit(profileChange) {


    Alert.alert(
      'Update Profile',
      'Confirm?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Yes', onPress: () => fetch('https://ss.anchorlab.it/api/profile'
            , {
              method: 'POST',
              headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer zs3jdLOBKJ3wgXTyeoYu77OJ41ausvy2Zu3rEqu1IuvZ4n2bKcCIMDkNLaJo"
              },
              body: JSON.stringify(profileChange)
            })
            .then((response) => response.json())
            .then((responseJson) => {
              if (responseJson.status === 'SUCCESS') {
                alert('Update Success')
                this.setState({
                  edit: "edit"
                })
                this.updateReocrd()
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
    // this.setState({
    //   credit_card: profileChange.credit_card,
    //   bio: profileChange.bio,
    //   cc_type: profileChange.cc_type,
    //   edit:"edit"
    // })
  }

  

  // logout = async () => {
  //   await AsyncStorage.clear();
  //   this.props.navigation.navigate('User');
  // };



  render() {
    const window = Dimensions.get('window')

    function Switch_Page(props) {
      profileChange = {
        cc_type: props.cc_type,
        credit_card: props.credit_card,
        bio: props.bio,
      }

      if (props.switch == "edit") {
        return (
          <View>
            <Row style={{ backgroundColor: 'transparent' }}>
              <UploadImage
                url={props.profileArray.avatar}
              />
              <View styleName="vertical stretch space-between" style={{ paddingLeft: "5%" }}>
                <Title>{props.profileArray.name}</Title>
                <Subtitle>{props.profileArray.bio} </Subtitle>
                <View styleName="horizontal space-between">
                  <Caption></Caption>

                </View>
              </View>
            </Row>
            <Row styleName="small" style={{ backgroundColor: 'transparent' }}>
              <Ionicons name="ios-mail" size={40} />
              <Text style={{ paddingLeft: "5%" }}>{props.profileArray.email}</Text>
            </Row>
            <Row styleName="small" style={{ backgroundColor: 'transparent' }}>

              <Text>Balance: ${props.profileArray.balance}</Text>
            </Row>
            <Row style={{ backgroundColor: 'transparent' }}>
              <Ionicons name="ios-card" size={40} />
              <View styleName="vertical stretch space-between" style={{ paddingLeft: "5%" }}>
                <Subtitle>{props.profileArray.cc_type} </Subtitle>
                <Subtitle>{props.profileArray.credit_card} </Subtitle>
              </View>
            </Row>
            <View style={{
              flexDirection: 'row',
              height: 50,
              width: 350,
              padding: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Button styleName="confirmation" onPress={props.setStateMethod}>
                <Text>Edit</Text>
              </Button>
              <Button styleName="confirmation secondary">
                <Text>Add Credit</Text>
              </Button>
            </View>
          </View>

        )
      } else {
        return (
          <View>
            <Row style={{ backgroundColor: 'transparent' }}>
              <UploadImage
                url={props.profileArray.avatar}
              />
              <View styleName="vertical stretch space-between" style={{ paddingLeft: "5%" }}>
                <Title>{props.profileArray.name}</Title>
                <TextInput
                  multiline={true}
                  maxLength={30}
                  defaultValue={this.profileChange.bio}
                  onChangeText={(text) => {
                    return profileChange = {
                      bio: text,
                      credit_card: this.profileChange.credit_card,
                      cc_type: this.profileChange.cc_type
                    }
                  }}
                />
                <View styleName="horizontal space-between">
                  <Caption></Caption>

                </View>
              </View>
            </Row>
            <Row styleName="small" style={{ backgroundColor: 'transparent' }}>
              <Ionicons name="ios-mail" size={40} />
              <Text style={{ paddingLeft: "5%" }}>{props.profileArray.email}</Text>
            </Row>
            <Row styleName="small" style={{ backgroundColor: 'transparent' }}>

              <Text>Balance: ${props.profileArray.balance}</Text>
            </Row>
            <Row style={{ backgroundColor: 'transparent' }}>
              <Ionicons name="ios-card" size={40} />
              <View styleName="vertical stretch space-between" style={{ paddingLeft: "5%" }}>

                <TextInput
                  defaultValue={this.profileChange.cc_type}
                  onChangeText={(text) => {
                    return profileChange = {
                      bio: this.profileChange.bio,
                      credit_card: this.profileChange.credit_card,
                      cc_type: text
                    }
                  }}
                />
                <TextInput
                  defaultValue={this.profileChange.credit_card.toString()}
                  onChangeText={(text) => {
                    return profileChange = {
                      bio: this.profileChange.bio,
                      credit_card: text,
                      cc_type: this.profileChange.cc_type
                    }
                  }}

                />
              </View>
            </Row>
            <View style={{
              flexDirection: 'row',
              height: 50,
              width: 350,
              padding: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Button styleName="confirmation" onPress={props.setStateMethod}>
                <Text>Cancel</Text>
              </Button>
              <Button styleName="confirmation secondary" onPress={() => props.submitMethod(this.profileChange)}>
                <Text>Submit</Text>
              </Button>
            </View>
          </View>
        )
      }
    }




    return (

      <View style={{ flex: 1 }}>
        <View>
          <Image style={{ height: window.height, width: window.width, position: 'absolute' }} source={require('../assets/images/foodBackground.jpg')} />
        </View>
        <ScrollView>
          <Switch_Page
            switch={this.state.edit}
            profileArray={this.state.profileArray}
            cc_type={this.state.cc_type}
            credit_card={this.state.credit_card}
            bio={this.state.bio}
            setStateMethod={() => this.setStateMethod()}
            logoutMethod={() => this.logout()}
            submitMethod={(profileChange) => this.submit(profileChange)}
          />







        </ScrollView>
      </View >



    )
  }


}


