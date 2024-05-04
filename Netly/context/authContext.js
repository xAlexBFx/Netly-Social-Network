import { useState, createContext, useContext } from 'react';
import { loginRequest } from '../api/auth.js';

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error('useAuth must be used within an AuthProvider!');
    };
    return context;
}

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);

    // const signup = async (user) => {
    //     try {
    //         const res = await registerRequest(user);
    //         setUser(res.data);
    //         setIsAuthenticated(true);
    //     }catch (err) {
    //         if(Array.isArray(err.response.data.messages)) return setErrors(err.response.data.messages);
    //         setErrors([err.response.data.message]);
    //     }
    // }

    // useEffect(() => {
    //     if(errors.length >0) {
    //         const timer = setTimeout(() => {
    //             setErrors([])
    //         },5000)
    //         return () => clearTimeout(timer)
    //     }
    //     },[errors]);

    const signIn = async (user) => {
        try {
            const res = await loginRequest(
                {
                    "toFindUserData" : "alexdev@gmail.com",
                    "password" : "123456"
                });
            console.log(res.data)
            // setUser(res.data);
            // setIsAuthenticated(true);
        } catch (err){
            console.log(err)
            // if(Array.isArray(err.response.data.messages)) return setErrors(err.response.data.messages);
            // setErrors([err.response.data.message]);
        }
    }

    // const logout = () => {
    //     Cookies.remove('token')
    //     setIsAuthenticated(false);
    //     setUser(null);
    // }

    // useEffect(() => {
    //     async function checkLogin () {
    //         const cookies = Cookies.get();

    //         if(!cookies.token) {
    //             setIsAuthenticated(false)
    //             setUser(null)
    //             setIsLoading(false)
    //             return;
    //         }

    //         try {
    //             const res = await verifyTokenRequest(cookies.token);
    //             if(!res.data) {
    //                 setIsAuthenticated(false)
    //                 setUser(null)
    //                 setIsLoading(false)
    //                 return;
    //             };
                
    //             setIsAuthenticated(true);
    //             setUser(res.data);
    //             setIsLoading(false)
    //         } catch (err) {
    //             setIsLoading(false)
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
            signIn,
            errors
        }}
        >
            {children}
        </AuthContext.Provider>
    )
};