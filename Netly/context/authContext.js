import { useState, createContext, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginRequest, registerRequest } from '../api/auth.js';

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context) throw new Error('useAuth must be used within an AuthProvider!');
    return context;
};

export const verifyUserData = async () => {
    try {
        const userDataString = await AsyncStorage.getItem('userData');
        if(userDataString) return true;
        return false;
    } catch (error) {
        console.error('Error retrieving user data:', error);
        return false;
    }
};


export const AuthProvider = ({ children, checkAuthentication }) => {
    const [user, setUser] = useState({});
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const signup = async user => {
        try {
            const res = await registerRequest(user);
            await AsyncStorage.setItem('userData', JSON.stringify(res.data.user));
            setUser(res.data.user);
            setIsAuthenticated(true);
            checkAuthentication(true);
        }catch (err) {
            if(err.response.data.messages) setError([err.response.data.messages[0]]);
            if(err.response.data.message) setError([err.response.data.message]);
        }
    }
    const signIn = async user => {
        try {
            const res = await loginRequest(user);
            await AsyncStorage.setItem('userData', JSON.stringify(res.data.user));
            setUser(res.data.user);
            setIsAuthenticated(true);
            checkAuthentication(true);
        } catch (err) {
            if(err.response.data.messages) setError([err.response.data.messages[0]]);
            if(err.response.data.message) setError([err.response.data.message]);
        }
    }

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('userData');
            setIsAuthenticated(false);
            setUser({});
            checkAuthentication(false)
        } catch (error) {
            console.error('Error removing user data:', error);
            return false;
        }
    }

    const recoverUserData = async()=> {
        try {
            const userDataString = await AsyncStorage.getItem('userData');
            if(userDataString) {
                setUser(JSON.parse(userDataString));
                setIsAuthenticated(true);
                checkAuthentication(true);
                return;
            };
            await logout();
            return;
        } catch (err) {
            console.error('Error retrieving user data:', err);
            await logout();
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
            setUser,
            isAuthenticated,
            signup,
            signIn,
            logout,
            error,
            setError,
            isLoading,
            setIsLoading,
            recoverUserData,
        }}
        >
            {children}
        </AuthContext.Provider>
    )
};