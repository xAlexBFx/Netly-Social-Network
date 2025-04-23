import {View, StyleSheet ,Image } from 'react-native';

import Logo from '../assets/adaptive-icon.png';

const LoadingScreen = () => {
    return (
        <View style={ LoadingStyles.container }>
            <Image source={Logo} style={ LoadingStyles.logo } />
        </View>
    )
};

const LoadingStyles = StyleSheet.create({
    container: {
            alignItems: 'center',
            flexDirection: 'column',
            alignSelf: 'center',
            width: '100%',
            height: '100%',
            padding: '5%',
            backgroundColor: 'rgb(36, 40, 27)'
        },
        logo: {
            width: 200,
            height: 200,
            alignSelf: 'center',
            marginTop: 10,
            resizeMode: 'cover',
        },
});

export default LoadingScreen