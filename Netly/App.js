import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthContext } from './context/authContext.js';

import LoginScreen from './screens/LoginScreen.js';
import ProfileScreen from './screens/ProfileScreen.js';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () =>(
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
);


const App  = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Tab.Navigator>
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};

export default App ;