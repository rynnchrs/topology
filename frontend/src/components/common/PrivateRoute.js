import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
    <Route
        {...rest}
        render={(props) => {
           /* if (auth.isLoading) {
                return <h2>Loading...</h2>;
            } else*/

            if (!auth.isAuthenticated) {
                return <Redirect to="/login" />;
                //<Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            } else {
                //return <Redirect to="/dashboard" />;
                return <Component {...props} />;
            }
        }}
    />
);

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);