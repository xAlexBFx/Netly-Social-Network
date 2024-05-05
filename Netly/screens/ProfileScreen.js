import React from 'react';
import { Text, View, Button } from 'react-native';
import { useAuth } from '../context/authContext';
const ProfileScreen = () => {
    const { logout } = useAuth();
    const onPress = async() => await logout();
    return (
        <View>
            <Text>Profile!</Text>
            <Button onPress = {onPress} title='Logout'></Button>
        </View>
    )
};

export default ProfileScreen