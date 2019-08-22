import React, { Component}from "react";
import {View,
Text,
} from "react-native";

import Icon from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'

class ShoppingCartIcon extends Component {
    render(){
        return(
    <View >
        <View style={{
            position: 'absolute', height:20, width:20,
            borderRadius:15, backgroundColor:'rgba(95,197,123,0.8)',
            right:15, bottom : 15, alignItems: 'center', 
            justifyContent: 'center', zIndex: 2000,
        }}>
            <Text style={{color:'white' , fontWeight:'bold'}}>{this.props.totalquantity}</Text>
        </View>
        <Icon name="ios-cart" size={30}/>
    </View>
)}

}
function mapStateToProps(state) {
    return {
        totalquantity: state.totalquantity
    }
}
export default connect(mapStateToProps)(ShoppingCartIcon);