import React from 'react';
import { Text, View, Button, ScrollView, StyleSheet, Image } from 'react-native';
import { Card } from 'react-native-paper';
import { useAuth } from '../context/authContext';

const ProfileScreen = () => {
    const { logout, user, recoverUserData } = useAuth();
    const onPress = async() => await logout();

    const searchUserData = async()=> {
        await recoverUserData();
    };
    if(!user.username) searchUserData();
    console.log(user)
    return (
        <ScrollView style= {ProfileStyles.scrollContainer} contentContainerStyle={{justifyContent: 'center'}}>
            <View>
                <View style={ProfileStyles.userImageContainer}>
                    <Image source={require('../assets/icon.png')} style={ProfileStyles.userImage} resizeMode='contain'></Image>
                </View>
                <Text style={[ProfileStyles.principalWhiteText, {marginBottom: 100}]}>{user.username}</Text>
            </View>
            
            <Card style={ProfileStyles.summaryCard}>
                <Card.Content style={ProfileStyles.cardContent}>
                    <View style={ProfileStyles.cardSection}>
                        <View style={ProfileStyles.userOnlineDataTab}>
                        <View style={ProfileStyles.dataTabSection}>
                            <Text style={ProfileStyles.secondaryWhiteText}>Followers</Text>
                            <Text style={ProfileStyles.secondaryWhiteText}>1.3M</Text>
                        </View>
                        <View style={ProfileStyles.dataTabSection}>
                            <Text style={ProfileStyles.secondaryWhiteText}>Posts</Text>
                            <Text style={ProfileStyles.secondaryWhiteText}>100</Text>
                        </View>
                        <View style={ProfileStyles.dataTabSection}>
                            <Text style={ProfileStyles.secondaryWhiteText}>Likes</Text>
                            <Text   Text style={ProfileStyles.secondaryWhiteText}>10.3M</Text>
                        </View>
                        </View>
                    </View>
                </Card.Content>
            </Card>

        </ScrollView>
    )
};

const ProfileStyles = StyleSheet.create({
    scrollContainer: {
        flexDirection: 'column',
        alignSelf: 'center',
        width: '100%',
        height: '100%',
        padding: '5%',
        backgroundColor: 'rgb(36, 40, 27)',
    },
    userImageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: 150,
        height: 150,
        overflow: 'hidden',
        borderRadius: 100,
        borderWidth: 1,
        borderColor: 'rgb(149, 228, 196)',
        marginTop: 25,
        marginBottom: 20
    },
    userImage: {
        width: '100%'
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
    userOnlineDataTab: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 50,
    },
    dataTabSection: {
        marginHorizontal: 5,
    },
    summaryCard : {
        flexDirection: 'column',
        alignSelf: 'center',
        width: '100%',
        height: 'auto',
        padding: '3%',
        margin: 20,
        backgroundColor: 'rgba(20, 153, 133, 0.1)',
        borderRadius: 8,
        borderColor: 'transparent',
        borderWidth: 0
    },
    cardContent: {
        display: 'flex', 
        width: '100%',
        flexDirection: 'row',
        backgroundColor: 'transparent',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    cardSection: {
        marginVertical: 20,
        backgroundColor: 'transparent'
    },
    cardDivider: {
        borderBottomColor: 'rgb(149, 228, 196)',
        borderBottomWidth: 1,
        marginVertical: 5
    },
    cardLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'rgb(149, 228, 196)',
    },
    cardValue: {
        fontSize: 16,
        color: 'rgb(255, 255, 255)'
    },
    cardCircularButton : {
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        borderRadius: 999,
        backgroundColor: 'rgb(36, 40, 27)',
        borderColor: 'rgb(149, 228, 196)',
        borderWidth: 1,
    },
});

export default ProfileScreen