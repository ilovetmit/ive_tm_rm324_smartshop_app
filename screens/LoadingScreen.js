import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    View,
    StyleSheet,
    Dimensions,
    Image
} from 'react-native';


export default class LoadingScreen extends React.Component {

    constructor(props) {
        super(props);
        this._bootstrapAsync();

    }


    _bootstrapAsync = async () => {
        const token = await AsyncStorage.getItem('apiToken');
        // if (token)
        //     Axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

        // const resetAction = StackActions.reset({
        //     index: 0,
        //     actions: [NavigationActions.navigate((token) ? { routeName: 'App' } : { routeName: 'Auth' })],
        // });

        
            // this.props.navigation.dispatch(resetAction);
            this.props.navigation.navigate(token ? 'Main' : 'User');
        

    };

    // Render any loading content that you like here
    render() {
        const window = Dimensions.get('window')
        return (
            <View>
            <View>
                <Image style={{ height: window.height, width: window.width, position: 'absolute' }} source={require('../assets/images/foodBackground.jpg')} />
            </View>
            <View style={styles.container}>
                
                <ActivityIndicator style={styles.indicator} size="large" color="#ff9000" />
                <StatusBar barStyle="default" />
            </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        width: '100%',
        height: '100%'
    },
    indicator: {
        justifyContent: 'center',

    }
});