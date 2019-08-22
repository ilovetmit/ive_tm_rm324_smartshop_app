import React, { Component } from 'react';
import { Image } from '@shoutem/ui';
import {
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    AsyncStorage,
} from 'react-native';

export default class RowScrollImage extends Component {

    
    
    render() {
        

        return (
            <Image
            
            style={{marginRight:5, marginTop:5}}
                styleName="small"
                source={{ uri: this.props.value.url }}
            />
               
            )
            
            
            
        

    }
}