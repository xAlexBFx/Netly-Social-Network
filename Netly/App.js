import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { AuthProvider } from './context/authContext.js';
import { PaperProvider } from 'react-native-paper';
import { StatusBar } from 'react-native';

import AppTheme from './AppTheme.js'
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen.js'
import ProfileScreen from './screens/ProfileScreen.js'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  const isSignIn = false;
  return (
    <PaperProvider theme={AppTheme}>
      <AuthProvider>
        <StatusBar barStyle= 'light-content' backgroundColor='rgb(36, 40, 27)'/>
        <NavigationContainer>
          {
            isSignIn ? 
            (
              <Tab.Navigator initialRouteName='Profile' >
                <Tab.Screen name='Profile' component={ProfileScreen}/>
              </Tab.Navigator>
            ) : 
            (
              <Stack.Navigator initialRouteName='Login' screenOptions = {{
                headerShown: false,
                gestureEnabled: false,
                gestureDirection: 'horizontal',
                ...TransitionPresets.SlideFromRightIOS,
              }}>
                <Stack.Screen name='Login' component={LoginScreen}/>
                <Stack.Screen name='Register' component={RegisterScreen}/>
            </Stack.Navigator>
            )
          }
        </NavigationContainer>
      </AuthProvider>
    </PaperProvider>
  );
}