import { useState, createContext, useContext } from 'react';
// import { registerRequest, loginRequest } from '../api/auth.js';

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
    // const [isLoading, setIsLoading] = useState(true);

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

    // const signin = async (user) => {
    //     try {
    //         const res = await loginRequest(user);
    //         setUser(res.data);
    //         setIsAuthenticated(true);
    //     } catch (err){
    //         if(Array.isArray(err.response.data.messages)) return setErrors(err.response.data.messages);
    //         setErrors([err.response.data.message]);
    //     }
    // }

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
        }}
        >
            {children}
        </AuthContext.Provider>
    )
};