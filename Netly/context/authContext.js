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
    const [errors, setErrors] = useState([]);
    // const [isLoading, setIsLoading] = useState(false);

    const signup = async (user) => {
        try {
            const res = await registerRequest(user);
            const savedSuccessfully = await AsyncStorage.setItem('userData', JSON.stringify(res.data.user));
            if(!savedSuccessfully) throw new Error('Error saving user data');
            setUser(res.data.user);
            setIsAuthenticated(true);
            checkAuthentication(true)
        }catch (err) {
            if(Array.isArray(err.response.data.messages)) return setErrors(err.response.data.messages);
            setErrors([err.response.data.message]);
        }
    }

    useEffect(() => {
        if(errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([])
            },5000)
            return () => clearTimeout(timer)
        }
        },[errors]);

    const signIn = async (user) => {
        try {
            const res = await loginRequest(user);
            await AsyncStorage.setItem('userData', JSON.stringify(res.data.user));
            setUser(res.data.user);
            setIsAuthenticated(true);
            checkAuthentication(true)
        } catch (err){
            if(!err.response) return setErrors(err);
            if(Array.isArray(err.response.data.messages)) return setErrors(err.response.data.messages);
            setErrors([err.response.data.message]);
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
            errors,
            setErrors,
        }}
        >
            {children}
        </AuthContext.Provider>
    )
};