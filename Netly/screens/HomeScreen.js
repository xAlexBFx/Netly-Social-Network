import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useAuth } from '../context/authContext';

const HomeScreen = () => {
    const { logout, user, recoverUserData } = useAuth();
    const onPress = async() => await logout();

    const searchUserData = async()=> {
        await recoverUserData();
    };
    if(!user.username) searchUserData();

    return (
        <View style= {HomeStyles.container}>
            <Text>Hello {user.username}!</Text>
            <Button onPress = {onPress} title='Logout'></Button>
        </View>
    )
};

const HomeStyles = StyleSheet.create({
    container: {
            alignItems: 'center',
            flexDirection: 'column',
            alignSelf: 'center',
            width: '100%',
            height: '100%',
            padding: '5%',
            backgroundColor: 'rgb(36, 40, 27)',
        },
});


export default HomeScreen