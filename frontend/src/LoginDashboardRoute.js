import 'react-app-polyfill/ie11';
import React from 'react';

import { Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import App from './App';
import Login from './components/Login';
import PrivateRoute from './components/common/PrivateRoute';

const LoginDashboardRoute = () => {
    return (
        <Provider store={store}>
            <PrivateRoute path="/" component={App} />
            <Route path="/login" component={Login} /> 
        </Provider>
    );
}

export default LoginDashboardRoute;