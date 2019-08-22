
import React, { Component } from 'react';
import { Caption, Row, InlineGallery, Card, Button, Heading, Screen, ListView, Tile, Subtitle, Title, Divider } from '@shoutem/ui';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { WebView } from 'react-native-web';
import { Icon } from 'native-base';


export default class Stepper extends Component {

    render() {

        return (

            <View style={{ flex: 1, flexDirection: "row", marginTop: 5 }}>
                <View style={{ flex: 1, flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <View style={styles.yescontainer}>
                        {/* <Text style={{ color: "#FFFFFF", fontWeight: "bold" }}>1</Text> */}
                        <Icon name="check" type="FontAwesome5" style={{color:"white"}} />
                    </View>


                    <Text style={{ marginTop: 5 }}>Confirm</Text>

                </View>
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <View style={styles.yesborder}>

                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <View style={styles.yescontainer}>
                        {/* <Text style={{ color: "#FFFFFF", fontWeight: "bold" }}>2</Text> */}
                        <Icon name="package" type="Feather" style={{ color: "white" }} />
                    </View>


                    <Text style={{ marginTop: 5 }}>Preparing</Text>

                </View>

                <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <View style={this.props.status != "prepare" ? styles.yesborder : styles.noborder}>

                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <View style={this.props.status != "prepare" ? styles.yescontainer : styles.nocontainer}>
                        {/* <Text style={{ color: "#FFFFFF", fontWeight: "bold" }}>3</Text> */}
                        <Icon name="people-carry" type="FontAwesome5" style={{ color: "white" }}/>
                    </View>


                    <Text style={this.props.status != "prepare" ? styles.yesText : styles.noText}>Ready</Text>

                </View>

                <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <View style={this.props.status == "complete" ? styles.yesborder : styles.noborder}>

                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <View style={this.props.status == "complete" ? styles.yescontainer : styles.nocontainer}>
                        {/* <Text style={{ color: "#FFFFFF", fontWeight: "bold" }}>4</Text> */}
                        <Icon name="food" type="MaterialCommunityIcons" style={{ color: "white" }}/>
                    </View>


                    <Text style={this.props.status == "complete" ? styles.yesText : styles.noText}>Complete</Text>

                </View>

            </View>



        );
    }
}

const styles = StyleSheet.create({
    yescontainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
        borderColor: "#d3d3d3",
        height: 40,
        width: 40,
        backgroundColor: "#000000"
    },
    nocontainer: {

        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
        borderColor: "#d3d3d3",
        height: 40,
        width: 40,
        backgroundColor: "#000000",
        opacity: 0.3

    },
    yesText: {
        marginTop: 5,
    },
    noText: {
        marginTop: 5,
        opacity: 0.3
    },
    yesborder: { height: 1, borderWidth: 1, width: 20, marginBottom:20 },
    noborder: { height: 1, borderWidth: 1, width: 20, opacity: 0.3, marginBottom: 20}


});