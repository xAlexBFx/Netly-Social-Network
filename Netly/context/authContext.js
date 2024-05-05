import { useState, createContext, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { loginRequest, registerRequest } from '../api/auth.js';

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context) throw new Error('useAuth must be used within an AuthProvider!');
    return context;
};

export const getUserData = async () => {
    try {
        const userDataString = await AsyncStorage.getItem('userData');
        if(userDataString) return JSON.parse(userDataString);
        return null;
    } catch (error) {
        console.error('Error retrieving user data:', error);
        return null;
    }
};

export const AuthProvider = ({children, checkAuthentication}) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState([]);
    // const [isLoading, setIsLoading] = useState(false);

    const signup = async (user) => {
        try {
            delete user.confirmPassword;
            console.log(user)
            const res = await registerRequest(user);
            await AsyncStorage.setItem('userData', JSON.stringify(res.data.user));
            setUser(res.data.user);
            setIsAuthenticated(true);
            checkAuthentication(true);
        }catch (err) {
            console.log(err.response.data.messages)
            if(Array.isArray(err.response.data.messages)) return setError([err.response.data.messages[0]]);
            setError([err.response.data.message]);
        }
    }

    useEffect(() => {
        if(error[0]) {
            const timer = setTimeout(() => {
                setError([])
            },500)
            return () => clearTimeout(timer)
        }
        },[error]);

    const signIn = async (user) => {
        try {
            const res = await loginRequest(user);
            await AsyncStorage.setItem('userData', JSON.stringify(res.data.user));
            setUser(res.data.user);
            setIsAuthenticated(true);
            checkAuthentication(true);
        } catch (err){
            if(!err.response) return setError(err);
            if(Array.isArray(err.response.data.messages)) return setError(err.response.data.messages[0]);
            setError([err.response.data.message]);
        }
    }

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('userData');
            setIsAuthenticated(false);
            setUser(null);
            checkAuthentication(false)
        } catch (error) {
            console.error('Error removing user data:', error);
            return false;
        }
    }

    // useEffect(() => {
    //     async function checkLogin () {
    //         try {
    //         const userData = await getUserData();
    //         if(!userData) {
    //             setIsAuthenticated(false)
    //             setUser(null)
    //             // setIsLoading(false)
    //             return;
    //         }

    //         setIsAuthenticated(true)
    //         setUser(userData)
    //         // setIsLoading(false)
    //         } catch (err) {
    //             console.log(err)
    //             // setIsLoading(false)
    //             setIsAuthenticated(false)
    //             setUser(null)
    //         }
    //     }
    //     checkLogin()
    // },[]);

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            signup,
            signIn,
            logout,
            error,
            setError,
        }}
        >
            {children}
        </AuthContext.Provider>
    )
};