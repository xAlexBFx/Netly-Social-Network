import React, { useContext } from 'react';
import { Redirect, Route } from 'react-native';
import AuthContext from './context/auth.context.js';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { isLoggedIn } = useContext(AuthContext);

    return (
        <Route
        {...rest}
        render={(props) =>
        isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />
        }
    />
    );
};

export default ProtectedRoute;