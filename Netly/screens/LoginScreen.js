import React from 'react';
import { Text, View, Image, TextInput, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Logo from '../assets/adaptive-icon.png';

const LoginScreen = () => {
    const navigation = useNavigation();
    return (
        <View style={ formStyles.container }>
            <Image source={Logo} style={ formStyles.logo } />
            <TextInput style = { formStyles.input } placeholderTextColor='white' placeholder='Email or Username' />
            <TextInput style = { formStyles.input } placeholderTextColor='white' placeholder='Password' />
            <TouchableOpacity style={ formStyles.button } ><Text style ={{ fontWeight: '500', fontSize: 16, color: 'white' }} >Login</Text></TouchableOpacity>
            <TouchableOpacity><Text style={ {fontSize: 16, fontWeight: 600, color: 'white', marginTop: 15} } >Forgot Password?</Text></TouchableOpacity>
            <TouchableOpacity style={formStyles.createButton} ><Text style ={{ fontWeight: '500', fontSize: 16, color: 'white' }} >Create Account</Text></TouchableOpacity>
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
        width: 200,
        height: 200,
        alignSelf: 'center',
        marginBottom: 50,
        marginTop: 50,
        resizeMode: 'cover',
    },
    input: {
        fontSize: 16,
        width: '90%',
        height: '20',
        padding: "3%",
        borderWidth: 1,
        borderColor:'rgb(20, 153, 133)', 
        backgroundColor:'rgba(20, 153, 133, 0.1)', 
        margin: 15,
        borderRadius: 8,
        fontWeight: '500',
        color: 'white'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        height: 'auto',
        padding: "3%",
        backgroundColor: 'rgb(20, 153, 133)',
        margin: 15,
        borderRadius: 8,
    },
    createButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '70%',
        height: 'auto',
        padding: "3%",
        borderWidth: 1,
        borderColor:'rgb(20, 153, 133)', 
        backgroundColor:'rgba(20, 153, 133, 0.1)', 
        marginTop: 120,
        borderRadius: 8,
    },
});

export default LoginScreen