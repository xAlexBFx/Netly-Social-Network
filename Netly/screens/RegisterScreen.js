import React, { useEffect } from 'react';
import { Text, View, Image, TextInput, StyleSheet, TouchableOpacity, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import { useAuth } from '../context/authContext.js';

import Logo from '../assets/adaptive-icon.png';

const LoginScreen = () => {
    const navigation = useNavigation();
    const { signup, error, setError } = useAuth();
    const onSubmit = data => {
        if(!data.username) return setError(['Username Required'])
        if(!data.email) return setError(['Email Required'])
        if(!data.password) return setError(['Password Required'])
        if(!data.confirmPassword) return setError(['Confirm Password Required'])
        if(data.password !== data.confirmPassword) return setError(['Two different passwords typed!'])
        data.nationality = 'United States'
        data.gender = 'masculine'

        const birthDate = '2007-09-07'
        const date = new Date(birthDate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        data.birthDate = `${year}-${month}-${day}`;
        signup(data);
    }

    useEffect(()=> {
        if(error[0]) Alert.alert(error[0],'', [
            {
                text: 'OK', onPress: ()=>{}
            }
            ]);;
    }, [error])

    return (
        <View style={ formStyles.container }>
            <Image source={Logo} style={ formStyles.logo } />
            <Formik  
                initialValues={{ username: '', password: '', email: '', confirmPassword: '' }}
                onSubmit={onSubmit}>
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                    <View style = { formStyles.formContainer}>
                        <TextInput 
                            contextMenuHidden = {true}
                            inputMode='text'
                            textAlign='left'
                            autoComplete='username'
                            keyboardType='default'
                            style ={ formStyles.input }
                            placeholderTextColor='rgb(149, 228, 196)'
                            placeholder= 'Username'
                            onChangeText={handleChange('username')}
                            onBlur={handleBlur('username')}
                            value={values.username}
                        />
                        <TextInput 
                            contextMenuHidden = {true}
                            inputMode='email'
                            textAlign='left'
                            autoComplete='email'
                            keyboardType='email-address'
                            style ={ formStyles.input }
                            placeholderTextColor='rgb(149, 228, 196)'
                            placeholder= 'Email'
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
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
                        <TextInput 
                            textAlign='left'
                            secureTextEntry= {true}
                            style ={ formStyles.input }
                            keyboardType='default'
                            placeholderTextColor='rgb(149, 228, 196)'
                            placeholder='Confirm Password'
                            onChangeText={handleChange('confirmPassword')}
                            onBlur={handleBlur('confirmPassword')}
                            value={values.confirmPassword}
                        />
                        <TouchableOpacity
                                style={ formStyles.button }
                                onPress={handleSubmit}>
                                <Text
                                    style ={{ fontWeight: '500', fontSize: 16, color: 'rgb(149, 228, 196)', borderColor : 'rgb(149, 228, 196)' }}>
                                    Create Account
                                </Text>
                        </TouchableOpacity>
                        </View>
                    )}
            </Formik>
            <TouchableOpacity
                style={formStyles.createButton}
                onPress={()=> navigation.navigate('Login')}>
                    <Text style ={{ fontWeight: '500', fontSize: 16, color: 'rgb(149, 228, 196)' }} >Login</Text>
            </TouchableOpacity>
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
            paddingHorizontal: '5%',
            backgroundColor: 'rgb(36, 40, 27)'
        },
    formContainer : {
            alignItems: 'center',
            flexDirection: 'column',
            alignSelf: 'center',
            width: '100%',
            height: 'auto',
            paddingHorizontal: '5%',
            backgroundColor: 'transparent'
        },
    logo: {
        width: 200,
        height: 200,
        alignSelf: 'center',
        marginTop: 8,
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