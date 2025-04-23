import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { AuthProvider, verifyUserData } from './context/authContext.js';
import { RegistrationProvider } from './context/registrationContext.js';
import { PaperProvider } from 'react-native-paper';
import { StatusBar, Image  } from 'react-native';

import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import Logo from './assets/adaptive-icon.png';

import AppTheme from './AppTheme.js'
import LoginScreen from './screens/LoginScreen';
import { RegisterScreen1, RegisterScreen2, RegisterScreen3, ConfirmationScreen, VerificationScreen } from './screens/RegisterScreen.js';

import LoadingScreen from './screens/LoadingScreen.js'
import HomeScreen from './screens/HomeScreen.js'
import ProfileScreen from './screens/ProfileScreen.js';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const LogoTitle = () => (
  <Image
    source={Logo}
    style={{ width: 120, height: 120}}
    resizeMode='cover'
  />
);

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      setIsLoading(true)
      const userDataString = await verifyUserData();
      if (userDataString) {
        setAuthenticated(true);
        setIsLoading(false)
      } else {
        setAuthenticated(false);
        setIsLoading(false)
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
    }
  };
  
  return (
    <PaperProvider theme={AppTheme}>
      <AuthProvider checkAuthentication={checkAuthentication}>
        <StatusBar barStyle= 'light-content' backgroundColor='rgb(36, 40, 27)'/>
        <NavigationContainer>
          {
            !isLoading? 
              !authenticated && !isLoading? 
              (
                <RegistrationProvider>
                  <Stack.Navigator initialRouteName='Login' screenOptions = {{
                    headerStyle: {backgroundColor: 'rgb(36, 40, 27)'},
                    headerTintColor: 'rgb(149, 228, 196)',
                    gestureEnabled: false,
                    gestureDirection: 'horizontal',
                    ...TransitionPresets.SlideFromRightIOS,
                  }}>
                    <Stack.Screen name='Login' component={LoginScreen} />
                    <Stack.Screen name='Register1' options= {{ headerTitle: 'Register', headerLeft: false}} component={RegisterScreen1} />
                    <Stack.Screen name='Register2' options = {{ headerTitle: 'Back'}} component={RegisterScreen2} />
                    <Stack.Screen name='Register3' options = {{ headerTitle: 'Back'}} component={RegisterScreen3} />
                    <Stack.Screen name='Confirmation' options = {{ headerTitle: 'Back'}} component={ConfirmationScreen} />
                    <Stack.Screen name='Verification' options = {{ headerTitle: 'Back'}} component={VerificationScreen} />
                  </Stack.Navigator>
                </RegistrationProvider>
              ) 
              : 
              (
                <Tab.Navigator initialRouteName='Home'  screenOptions={{
                  tabBarActiveTintColor: 'rgb(149, 228, 196)',
                  tabBarInactiveTintColor: 'gray',
                  tabBarStyle: {backgroundColor: 'rgb(36, 40, 27)'},
                  headerStyle: { backgroundColor: 'rgb(36, 40, 27)'},
                  headerTitleAlign: 'center',
                  headerTitle: props => <LogoTitle {...props} />,
                }}>
                  <Tab.Screen options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({focused, color, size })=> focused ? 
                    <Ionicons name='home-sharp' size={size} color={color} />
                    :
                    <Ionicons name='home-outline' size={size} color={color} />,
                  }}name='Home' component={HomeScreen}/>
  
                  <Tab.Screen options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({focused, color, size })=> focused ? 
                    <FontAwesome5 name='user-alt' size={size} color={color} /> 
                    :
                    <FontAwesome name='user-o' size={size} color={color} />,
                  }}name='Profile' component={ProfileScreen}/>
                </Tab.Navigator>
              )
              :
              (
                <LoadingScreen/>
              )
          }
        </NavigationContainer>
      </AuthProvider>
    </PaperProvider>
  );
}