import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { AuthProvider, getUserData } from './context/authContext.js';
import { PaperProvider } from 'react-native-paper';
import { StatusBar } from 'react-native';

import AppTheme from './AppTheme.js'
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen.js';
import ProfileScreen from './screens/ProfileScreen.js';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      const userDataString = await getUserData();
      if (userDataString) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
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
            !authenticated? 
            (
              <Stack.Navigator initialRouteName='Login' screenOptions = {{
                headerShown: false,
                gestureEnabled: false,
                gestureDirection: 'horizontal',
                ...TransitionPresets.SlideFromRightIOS,
              }}>
                <Stack.Screen name='Login' component={LoginScreen} />
                <Stack.Screen name='Register' component={RegisterScreen} />
              </Stack.Navigator>
            ) : 
            (
              <Tab.Navigator initialRouteName='Profile' >
                <Tab.Screen  name='Profile' component={ProfileScreen}/>
              </Tab.Navigator>
            )
          }
        </NavigationContainer>
      </AuthProvider>
    </PaperProvider>
  );
}