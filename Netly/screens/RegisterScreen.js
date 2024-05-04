import React from 'react';
import { Text, View, Image, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


import Logo from '../assets/adaptive-icon.png';

const RegisterScreen = () => {
    const navigation = useNavigation();
    return (
        <View style={ formStyles.container }>
            <Image source={Logo} style={ formStyles.logo } />
            <TextInput style = { formStyles.input } placeholderTextColor='white' placeholder='Username' />
            <TextInput style = { formStyles.input } placeholderTextColor='white' placeholder='Email' />
            <TextInput style = { formStyles.input } placeholderTextColor='white' placeholder='Password' />
            <TouchableOpacity style={ formStyles.button } ><Text style ={{ fontWeight: '500', fontSize: 16, color: 'white' }} >Register</Text></TouchableOpacity>
            <Text style={{fontSize: 16, marginTop: 15, marginBottom: 5, color: 'white'}}>Already have an account?</Text>
            <TouchableOpacity onPress={()=> navigation.navigate('Login')}><Text style={ formStyles.linkText } >Log In Here!</Text></TouchableOpacity>
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
        width: '70%',
        height: '20',
        padding: "3%",
        backgroundColor: 'rgb(20, 153, 133)',
        margin: 15,
        borderRadius: 10,
        fontWeight: '500',
        color: 'white'
    },
    button: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '70%',
        height: 'auto',
        padding: "3%",
        backgroundColor: 'rgb(20, 153, 133)',
        margin: 15,
        borderRadius: 10,
    },
    linkText: {
        color: 'green',
        fontWeight: '800',
        fontSize: 16,
        textDecorationLine: 'underline',
    }
});

export default RegisterScreen
