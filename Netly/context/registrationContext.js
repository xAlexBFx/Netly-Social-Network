import { useState, createContext, useContext } from 'react';

export const RegistrationContext = createContext();

export const useRegistration = () => {
    const context = useContext(RegistrationContext);
    if(!context) throw new Error('useRegistration must be used within an RegistrationProvider!');
    return context;
};

export const RegistrationProvider = ({ children }) => {
    const [error, setError] = useState([]);

    return (
        <RegistrationContext.Provider value={{
            error,
            setError,
        }}
        >
            {children}
        </RegistrationContext.Provider>
    )
};