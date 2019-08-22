import * as WebBrowser from 'expo-web-browser';
import React, { Component } from 'react';
import {
    ImageBackground, Image, NavigationBar, Title, Heading, Screen, ListView, Tile, Subtitle, Divider, GridRow, Card, Caption, Text,
    TouchableOpacity,
    View, } from '@shoutem/ui';
import Slideshow from 'react-native-image-slider-show';

import {
    
    Platform,
    ScrollView,
    StyleSheet,
    
    AsyncStorage,
} from 'react-native';



export default class Cardrow extends Component {
    constructor(props) {
        super(props);
        this.renderRow = this.renderRow.bind(this);
        this.state = {
            
        }
    }

    componentDidMount() {
        fetch('https://ss.anchorlab.it/api/foods/' + this.props.category
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
                alert(this.state.token)
            })
            .done();
    }

    renderRow(rowData, sectionId, index) {
        // rowData contains grouped data for one row,
        // so we need to remap it into cells and pass to GridRow
        if (index === '0') {
            return (
                <TouchableOpacity key={index}>
                    <ImageBackground
                        styleName="large"
                        source={{ uri: rowData[0].url }}
                    >
                        <Tile>
                            <Title styleName="md-gutter-bottom">{rowData[0].name}</Title>
                            <Subtitle styleName="sm-gutter-horizontal">{rowData[0].price}</Subtitle>
                        </Tile>
                    </ImageBackground>
                    <Divider styleName="line" />
                </TouchableOpacity>
            );
        }

        const cellViews = rowData.map((foodArray, id) => {
            return (
                <TouchableOpacity key={id} styleName="flexible"
                    onPress={() => this.props.navigation.navigate('Add',
                        {
                            name: foodArray.name,
                            url: foodArray.url,
                            price: foodArray.price,
                            food_id: foodArray.food_id,
                        })}>
                    <Card styleName="flexible">
                        <Image
                            styleName="medium-wide"
                            source={{ uri: foodArray.url }}
                            style={{flex:1, resizeMode: "cover"}}
                        />
                        <View styleName="content">
                            <Subtitle numberOfLines={3}>{foodArray.name}</Subtitle>
                            <View styleName="horizontal">
                                <Caption styleName="collapsible" numberOfLines={2}>${foodArray.price}</Caption>
                            </View>
                        </View>
                    </Card>
                </TouchableOpacity>
            );
        });

        return (
            <GridRow columns={2}>
                {cellViews}
            </GridRow>
        );
    }

    render() {
        // Group the restaurants into rows with 2 columns, except for the
        // first restaurant. The first restaurant is treated as a featured restaurant
        let isFirstArticle = true;
        const groupedData = GridRow.groupByRows(this.state.foodArray, 2, () => {
            if (isFirstArticle) {
                isFirstArticle = false;
                return 2;
            }
            return 1;
        });

        return (
            
                
                <ListView
                    data={groupedData}
                    renderRow={this.renderRow}
                />
                
            
        );
    }
}
    







