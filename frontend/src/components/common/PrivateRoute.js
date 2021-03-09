import React  from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
    <Route
        {...rest}
        render={(props) => {
           /* if (auth.isLoading) {
                return <h2>Loading...</h2>;
            } else*/
            if (!auth.isAuthenticated) {
            //if (localStorage.getItem('token') == null) {
                return <Redirect to="/login" />;
                //<Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            } else {
                return <Component {...props} />;
            }
        }}
    />
);

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);