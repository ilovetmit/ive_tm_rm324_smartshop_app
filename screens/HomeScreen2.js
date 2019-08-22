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
} from 'react-native';
import Category from "../components/Category"


export default class HomeScreen extends Component {

    constructor(props) {
        super(props)
        this._auth();
        this.renderRow = this.renderRow.bind(this);

        this.state = {
            position: 1,
            interval: null,
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
            category: [
                {
                    "name": "Noodles",
                    "image": require('../assets/images/noodles.jpg'),

                },
                {
                    "name": "Rice",
                    "image": require('../assets/images/rice.jpg'),

                },
                {
                    "name": "Congee",
                    "image": require('../assets/images/congee.jpg'),

                },
                {
                    "name": "Drink",
                    "image": require('../assets/images/drink.jpg'),

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
    }

    componentWillUnmount() {
        clearInterval(this.state.interval);
    }


    _auth = async () => {
        const apiToken = await AsyncStorage.getItem('apiToken');
        if (!apiToken) {
            this.props.navigation.navigate('User');
        } else {
            this.setState({
                token: "Bearer " + apiToken
            })
        }
    };

    renderRow(category) {
        if (!category) {
            return null;
        }
        let { navigate } = this.props.navigation;
        return (
            <View style={styles.space}>


                <TouchableOpacity onPress={() => navigate('Food', { name: category.name, token: this.state.token })}>
                    <ImageBackground
                        styleName="large-banner"
                        source={category.image}
                    >
                        <Tile>
                            <Title styleName="md-gutter-bottom">{category.name}</Title>
                        </Tile>
                    </ImageBackground>
                </TouchableOpacity>
                <Divider styleName="line" />
            </View>

        );


    }



    render() {

        const { category } = this.state;
        const { navigation } = this.props;
        return (
            <Screen>


                <ScrollView style={{ marginTop: '5%' }}>
                    <Slideshow
                        dataSource={this.state.dataSource}
                        position={this.state.position}
                        onPositionChanged={position => this.setState({ position })} />

                    <Category
                        category="Rice"
                        navigation={navigation}
                    />

                    <ListView
                        data={category}
                        renderRow={this.renderRow}
                    />
                </ScrollView>
            </Screen>
        );


    }

    static navigationOptions = {
        title: "Category",
        headerTitleStyle: {
            textAlign: 'center',
            flexGrow: 1,
            alignSelf: 'center',
        },
    }


}

const styles = StyleSheet.create({
    space: {
        paddingBottom: '5%',
    },

});







