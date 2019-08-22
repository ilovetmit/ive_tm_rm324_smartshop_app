
import React, { Component } from 'react';
import { ImageBackground, NavigationBar, Title, Heading, Screen, ListView, Tile, Subtitle, Divider, View, Image} from '@shoutem/ui';
import {
    ScrollView,
    StyleSheet,
    AsyncStorage,
    Dimensions,
} from 'react-native';

import Food from '../components/Food';

export default class FoodListScreen extends Component {

    constructor(props) {
        super(props)
        const { navigation } = this.props;
        this.state = {
            name: navigation.getParam('name'),
            foodArray: [],
            token: navigation.getParam('token')

        }

    }

    // getToken = async () => {
    //     try {
    //         const value = await AsyncStorage.getItem('apiToken');
    //         if (value !== null) {
    //             alert("Bearer " + value)
    //             this.setState({
    //                 token: "Bearer " + value
    //             })           
    //         }
    //     } catch (error) {
    //         alert(error)
    //     }
    // };

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('name').charAt(0).toUpperCase() + navigation.getParam('name').slice(1),
            
        }
    }

    componentWillMount() {
        // this.getToken()
        
    }
    componentDidMount(){
        fetch('https://ss.anchorlab.it/api/foods/' + this.state.name
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
                        foodArray: responseJson.data
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


    

    render() {
        const { navigation } = this.props;
        let foods = this.state.foodArray.map((value, index) => {
            return <Food
                key={index}
                value={value}
                navigation={navigation}
            />
        })
        const window = Dimensions.get('window')
        return (
            <View>
                <View>
                    <Image style={{ height: window.height, width: window.width, position: 'absolute' }} source={require('../assets/images/foodBackground.jpg')} />
                </View>
            <ScrollView>
                {foods}
            </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({

});