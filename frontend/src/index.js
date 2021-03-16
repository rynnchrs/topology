import 'react-app-polyfill/ie11';
import React from 'react';
import ReactDOM from 'react-dom';
//import * as serviceWorker from './serviceWorker';
//import { HashRouter as Router, Switch, Redirect } from 'react-router-dom';
import { HashRouter as Router } from 'react-router-dom';

import ScrollToTop from './ScrollToTop';
import LoginDashboardRoute from './LoginDashboardRoute';

ReactDOM.render(
    <Router>
        <ScrollToTop>
            <LoginDashboardRoute />
        </ScrollToTop>
    </Router>,
    document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();