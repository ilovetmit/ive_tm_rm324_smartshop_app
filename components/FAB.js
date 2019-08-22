import React, { Component } from 'react';
import { Container, Header, View, Button, Icon, Fab } from 'native-base';


export default class FAB extends Component {
    constructor(props) {
        super(props)
        this.state = {
            active: false
        };
    }
    render() {
        return (

            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Fab
                    active={this.state.active}
                    direction="up"
                    containerStyle={{}}
                    style={{ backgroundColor: '#5067FF',width:55, height:55, justifyContent:"center", alignItems:"center" }}
                    position="bottomRight"
                    onPress={() => this.setState({ active: !this.state.active })}>
                    <Icon name="share" />
                    <Button style={{ backgroundColor: '#34A34F' }}
                        onPress={() => this.props.navigation.navigate('QR', {})}
                    >
                        <Icon name="md-qr-scanner" />
                    </Button>

                    <Button disabled style={{ backgroundColor: '#DD5144' }}>
                        <Icon name="mail" />
                    </Button>
                </Fab>
            </View>

        );
    }
}