import React, { Component } from 'react';
import { Image, Card, Button, Heading, Screen, ListView, Tile, Subtitle, Icon, GridRow,Caption } from '@shoutem/ui';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { connect } from 'react-redux'
import { deleteCartItem } from '../action/cartActions'


class Cart extends Component {
    constructor(props) {
        super(props);
        this.renderRow = this.renderRow.bind(this);
        this.state = {

        }
    }

    renderRow(rowData, sectionId, index) {
        // rowData contains grouped data for one row,
        // so we need to remap it into cells and pass to GridRow
        // if (index === '0') {
        //     return (
        //         <TouchableOpacity key={index}>
        //             <ImageBackground
        //                 styleName="large"
        //                 source={{ uri: rowData[0].url }}
        //             >
        //                 <Tile>
        //                     <Title styleName="md-gutter-bottom">{rowData[0].name}</Title>
        //                     <Subtitle styleName="sm-gutter-horizontal">{rowData[0].price}</Subtitle>
        //                 </Tile>
        //             </ImageBackground>
        //             <Divider styleName="line" />
        //         </TouchableOpacity>
        //     );
        // }

        const cellViews = rowData.map((foodArray, id) => {
            return (
                <TouchableOpacity onPress={() => this.deleteItem(foodArray.name, foodArray.total_price, foodArray.quantity)}>
                    <Card styleName="flexible" key={id}>
                        <Image
                            styleName="medium-wide"
                            source={{ uri: foodArray.url }}
                            style={{ flex: 1, resizeMode: "cover" }}
                        />
                        <View styleName="content">
                            <Subtitle numberOfLines={3}>{foodArray.name}</Subtitle>
                            <View styleName="horizontal">
                                <Caption styleName="collapsible" numberOfLines={2}>Quantity: {foodArray.quantity}</Caption>
                            <Caption styleName="collapsible" numberOfLines={2}>Price: ${foodArray.total_price}</Caption>
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

    deleteItem = (name, total_price, quantity) =>{
        

        Alert.alert(
            'Delete',
            'Do you want to delete the product?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Yes', onPress: () => this.props.deleteCartItem(name, total_price, quantity)
                },
            ],
            { cancelable: false }
        );
        
        
    }

    

    render() {
        // Group the restaurants into rows with 2 columns, except for the
        // first restaurant. The first restaurant is treated as a featured restaurant
        let isFirstArticle = false;
        const groupedData = GridRow.groupByRows(this.props.value, 2, () => {
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


    // render() {

    //     return (
            
    //             <View key={this.props.index} style={{ paddingBottom: "5%" }}>
    //                 <Card >
    //                     <Image
    //                         styleName="large-banner"
    //                         source={{ uri: this.props.value.url }}
    //                     />
    //                     <View styleName="content">
    //                         <Subtitle>{this.props.value.name}</Subtitle>
    //                         <View styleName="horizontal v-center space-between">
    //                             <View styleName="horizontal">
    //                                 <Subtitle styleName="md-gutter-right">Quantity: {this.props.value.quantity}</Subtitle>
    //                             <Subtitle styleName="md-gutter-right"> ${this.props.value.total_price}</Subtitle>

    //                             </View>
    //                         <Button styleName="tight clear" onPress={() => this.deleteItem(this.props.value.name, this.props.value.total_price, this.props.value.quantity )}><Icon name="close" /></Button>
    //                         </View>
    //                     </View>
    //                 </Card>
    //             </View>
            
    //     );
    // }
}

const styles = StyleSheet.create({


});

const mapDispatchToProps = (dispatch) => {
    return {
        deleteCartItem: (name, total_price, quantity) => { dispatch(deleteCartItem(name, total_price, quantity)) }
    }
}

export default connect(null, mapDispatchToProps)(Cart)
