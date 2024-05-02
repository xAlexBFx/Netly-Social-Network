import { StatusBar } from 'expo-status-bar';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RegisterScreen from './screens/RegisterScreen.js';
import LoginScreen from './screens/LoginScreen.js';
import ProfileScreen from './screens/ProfileScreen.js';

import Logo from './assets/adaptive-icon.png';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name='Login' 
          component={ LoginScreen } 
          options={{
            headerLeft: () => <Image source={Logo} style={{
              width: 75,
              height: 75,
            }} />,
            title: 'Netly'
          }}/>
        <Stack.Screen 
          name='Register'
          component={ RegisterScreen }/>
        <Stack.Screen
          name='Profile' 
          component={ ProfileScreen }/>
      </Stack.Navigator>
      <StatusBar />
    </NavigationContainer>
  )
};
