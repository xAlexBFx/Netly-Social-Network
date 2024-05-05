import React, { useEffect } from 'react';
import { Text, View, Image, TextInput, StyleSheet, TouchableOpacity, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import { useAuth } from '../context/authContext.js';

import Logo from '../assets/adaptive-icon.png';

const LoginScreen = () => {
    const navigation = useNavigation();
    const { signIn, errors, setErrors } = useAuth();

    const onSubmit = data => {
        if(!data.toFindUserData) return setErrors(['Email or Username Required'])
        if(!data.password) return setErrors(['Password Required'])
        signIn(data);
    }

    useEffect(()=> {
        if(errors.length > 0) Alert.alert(errors[0],'', [
            {
                text: 'OK'
            }
            ]);;
    }, [errors])

    return (
        <View style={ formStyles.container }>
            <Image source={Logo} style={ formStyles.logo } />
            <Formik  
                initialValues={{ toFindUserData: '', password: '' }}
                onSubmit={onSubmit}>
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                    <View style = { formStyles.container}>
                        <TextInput 
                            contextMenuHidden = {true}
                            inputMode='email'
                            textAlign='left'
                            autoComplete='email'
                            keyboardType='email-address'
                            style ={ formStyles.input }
                            placeholderTextColor='rgb(149, 228, 196)'
                            placeholder='Email or Username'
                            onChangeText={handleChange('toFindUserData')}
                            onBlur={handleBlur('toFindUserData')}
                            value={values.toFindUserData}
                        />
                        <TextInput 
                            textAlign='left'
                            secureTextEntry= {true}
                            style ={ formStyles.input }
                            keyboardType='default'
                            placeholderTextColor='rgb(149, 228, 196)'
                            placeholder='Password'
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                        />
                        <TouchableOpacity
                                style={ formStyles.button }
                                onPress={handleSubmit}>
                                <Text
                                    style ={{ fontWeight: '500', fontSize: 16, color: 'rgb(149, 228, 196)', borderColor : 'rgb(149, 228, 196)' }}>
                                    Login
                                </Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text
                                style={ {fontSize: 16, fontWeight: 600, color: 'rgb(149, 228, 196)', marginTop: 15} }
                                >Forgot Password?
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={formStyles.createButton}
                            onPress={()=> navigation.navigate('Login')}>
                                <Text style ={{ fontWeight: '500', fontSize: 16, color: 'rgb(149, 228, 196)' }} >Create Account</Text>
                        </TouchableOpacity>
                        </View>
                    )}
            </Formik>
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
        marginTop: 10,
        resizeMode: 'cover',
    },
    input: {
        fontSize: 16,
        width: '90%',
        height: '20',
        padding: "3%",
        borderWidth: 1,
        borderColor:'rgb(149, 228, 196)', 
        backgroundColor:'rgba(44, 73, 48, 0.2)', 
        margin: 15,
        borderRadius: 8,
        fontWeight: '500',
        color: 'rgb(149, 228, 196)'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        height: 'auto',
        padding: "3%",
        backgroundColor: 'rgb(44, 73, 48)',
        borderColor: 'rgb(149, 228, 196)',
        borderWidth: 1,
        margin: 20,
        borderRadius: 8,
    },
    createButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '70%',
        height: 'auto',
        padding: "3%",
        borderWidth: 1,
        borderColor:'rgb(149, 228, 196)', 
        backgroundColor:'rgba(20, 153, 133, 0.1)', 
        marginTop: 120,
        borderRadius: 8,
    },
});

export default LoginScreen