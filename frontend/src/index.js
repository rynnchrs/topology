import 'react-app-polyfill/ie11';
import React from 'react';
import ReactDOM from 'react-dom';

//import * as serviceWorker from './serviceWorker';
import { HashRouter } from 'react-router-dom'
import { Route } from 'react-router-dom';
//import { HashRouter as Router, Switch, Redirect } from 'react-router-dom';
import { HashRouter as Router, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import ScrollToTop from './ScrollToTop';
import App from './App';
import Login from './components/Login';
import PrivateRoute from './components/common/PrivateRoute';

import LoginDashboardRoute from './LoginDashboardRoute';

/*ReactDOM.render(
    <Provider store={store}>
        <Router>
            <ScrollToTop>
                <Switch>
                    <PrivateRoute exact path="/" component={App} />
                    <Route exact path="/login" component={Login} />
                    </Switch>

                <Switch>
                    <Route path="/register" component={Register} />
                    <Route path="/vehicles" component={Vehicles} />
                    <Route path="/driverinspectionreport" component={DriverInspectionReport} />
                    <Route path="/register" component={Register} />
                    <Route path="/try" component={Try} />
                    <Route path="/inspectionreport" component={InspectionReport} />
                </Switch>
            </ScrollToTop>
        </Router>
    </Provider>,
    document.getElementById('root')
);*/

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