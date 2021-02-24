import 'react-app-polyfill/ie11';
import React from 'react';
import ReactDOM from 'react-dom';

//import { HashRouter } from 'react-router-dom'
import { Route } from 'react-router-dom';
//import { HashRouter as Router, Switch, Redirect } from 'react-router-dom';
import { HashRouter as Router, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import App from './App';
import Login from './components/Login';
import PrivateRoute from './components/common/PrivateRoute';

const LoginDashboardRoute = () => {

    
    return (
        <Provider store={store}>
            <Router>
                
                    <PrivateRoute exact path="/" component={App} />
                    <Route path="/login" component={Login} />
                
                
            </Router>
        </Provider>
    );
}

export default LoginDashboardRoute;