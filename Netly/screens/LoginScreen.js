import React from 'react';
import { Text, View, Image, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

import Logo from '../assets/adaptive-icon.png';

const LoginScreen = () => {
    return (
        <View style={ formStyles.container }>
            <Image source={Logo} style={ formStyles.logo } />
            <TextInput style = { formStyles.input } placeholder='Email or Username' />
            <TextInput style = { formStyles.input } placeholder='Password' />
            <TouchableOpacity style={ formStyles.button } ><Text style ={{ fontWeight: '500', fontSize: 15, }} >Login</Text></TouchableOpacity>
        </View>
    )
};

const formStyles = StyleSheet.create({
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
        width: 125,
        height: 125,
        alignSelf: 'center',
        marginBottom: 50,
        marginTop: 50,
    },
    input: {
        color: 'white',
        fontSize: 15,
        width: '70%',
        height: 'auto',
        padding: "4%",
        backgroundColor: 'rgb(20, 153, 133)',
        margin: 15,
        borderRadius: 10,
        fontWeight: '500',
    },
    button: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontWeight: '800',
        fontSize: 15,
        width: '70%',
        height: 'auto',
        padding: "4%",
        backgroundColor: 'rgb(20, 153, 133)',
        margin: 15,
        borderRadius: 10,
    },
});

export default LoginScreen
