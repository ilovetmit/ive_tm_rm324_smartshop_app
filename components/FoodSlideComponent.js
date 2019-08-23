import React, { Component } from 'react';
import { Image }  from '@shoutem/ui';
import {
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    AsyncStorage,
} from 'react-native';

export default class FoodSlideComponent extends Component {
    render (){
        return(
            <View style={{  width: 130, marginRight: 20,  borderColor: "transparent",}}>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Add',
                        {
                            name: this.props.value.name,
                            url: this.props.value.url,
                            price: this.props.value.price,
                            food_id: this.props.value.food_id,
                            description: this.props.value.description
                        })}>
                <View style={{flex:2}}>
                        <Image styleName="medium"  source={{uri:this.props.value.url}}
                    
                    />
                </View>
                <View style ={{flex:1, alignItems:"center",paddingTop:"70%"}}>
                    <Text>{this.props.value.name}</Text>
                </View>
                </TouchableOpacity>
            </View>
        )

}
}