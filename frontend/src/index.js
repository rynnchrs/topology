import 'react-app-polyfill/ie11';
import React from 'react';
import ReactDOM from 'react-dom';

//import * as serviceWorker from './serviceWorker';
//import { HashRouter } from 'react-router-dom'
import { Route } from 'react-router-dom';
import { HashRouter as Router, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import ScrollToTop from './ScrollToTop';
import Login from './components/Login';
import App from './App';
import PrivateRoute from './components/common/PrivateRoute';

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <ScrollToTop>
                {/*<App></App>*/}
                <Switch>
                    <PrivateRoute path="/" exact component={App} />
                    <Route path="/login" exact component={Login} />
                    
                </Switch>
            </ScrollToTop>
        </Router>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();