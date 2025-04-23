import React, { useEffect } from 'react';
import { Text, View, Image, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import { useAuth } from '../context/authContext.js';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Logo from '../assets/adaptive-icon.png';

const LoginScreen = () => {
    const navigation = useNavigation();
    const { signIn, error, setError } = useAuth();

    const onSubmit = async data => {
        if(!data.toFindUserData) return setError(['Email or Username Required'])
        if(!data.password) return setError(['Password Required'])
        await signIn(data)
    }

    useEffect(()=> {
        if(error[0]) Alert.alert(error[0],'', [
            {
                text: 'OK', onPress: ()=>setError([])
            }
            ]);;
    }, [error])

    return (
        <KeyboardAwareScrollView style={formStyles.scrollView} enableOnAndroid keyboardShouldPersistTaps='handled' contentContainerStyle={formStyles.OnScrollView}>
            <Image source={Logo} style={ formStyles.logo } />
            <Text style={formStyles.principalWhiteText}>
                Welcome back to Netly!
            </Text>
            <Text style={formStyles.secondaryWhiteText}>
                Wait, Are you my user?...
            </Text>
                <Formik  
                    initialValues={{ toFindUserData: '', password: '' }}
                    onSubmit={onSubmit}>
                    {({ handleChange, handleBlur, handleSubmit, values }) => (
                        <View style = { formStyles.formContainer}>
                            <TextInput 
                                autoCapitalize='none'
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
                                autoCapitalize='none'
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
                            </View>
                        )}
                </Formik>
            <TouchableOpacity>
                <Text
                    style={ {fontSize: 15, fontWeight: 600, color: 'rgba(149, 228, 196, 0.9)', marginTop: 10} }>Forgot Password?
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={formStyles.createButton}
                onPress={()=> navigation.navigate('Register1')}>
                    <Text style ={{ fontWeight: '500', fontSize: 16, color: 'rgb(149, 228, 196)' }} >Create Account</Text>
            </TouchableOpacity>
        </KeyboardAwareScrollView>
    )
};

const formStyles = StyleSheet.create({
    scrollView: {
            flexDirection: 'column',
            alignSelf: 'center',
            width: '100%',
            height: 'auto',
            backgroundColor: 'rgb(36, 40, 27)',
        },
    OnScrollView: {
        alignItems: 'center',
        flexGrow: 1,
        maxHeight: '200%',
    },
    formContainer : {
            alignItems: 'center',
            flexDirection: 'column',
            alignSelf: 'center',
            width: '100%',
            height: 'auto',
            padding: '5%',
            backgroundColor: 'transparent',
        },
    logo: {
        width: 200,
        height: 200,
        alignSelf: 'center',
        marginTop: 10,
        resizeMode: 'cover',
    },
    principalWhiteText: {
        textAlign: 'center',
        color: 'rgb(255, 255, 255)',
        fontWeight: '700',
        fontSize: 22,
        margin: 5,
        paddingHorizontal: '5%',
    },
    secondaryWhiteText: {
        textAlign: 'center',
        color: 'rgba(255, 255, 255, 0.8)',
        fontWeight: '600',
        fontSize: 16,
        margin: 5,
        paddingHorizontal: '5%',
    },
    input: {
        fontSize: 16,
        width: '90%',
        height: '20',
        padding: '3%',
        borderWidth: 1,
        borderColor:'rgb(149, 228, 196)', 
        backgroundColor:'rgba(44, 73, 48, 0.2)', 
        margin: 15,
        borderRadius: 8,
        fontWeight: '500',
        color: 'rgb(149, 228, 196)',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        height: 'auto',
        padding: '3%',
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
        padding: '3%',
        borderWidth: 1,
        borderColor:'rgb(149, 228, 196)', 
        backgroundColor:'rgba(20, 153, 133, 0.1)', 
        margin: 60,
        borderRadius: 8,
    },
});

export default LoginScreen