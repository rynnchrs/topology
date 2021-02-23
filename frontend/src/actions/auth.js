import axios from 'axios';
import { returnErrors } from '../reducers/messages';

import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
} from './types';


// LOGIN USER
export const login = (username, password) => (dispatch) => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    // Request Body
    const body = JSON.stringify({ username, password });

    axios
        .post('http://127.0.0.1:8000/api/login/', body, config)
        .then((res) => {
            console.log('login token: ' + res.data.access)
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data,
            });
            
        })
        .catch((err) => {
            //console.log(err);
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: LOGIN_FAIL
            });
        });
};

// REGISTER USER
export const register = ( firstname, lastname, email, username, password, gender, company, position,
    address, phone, birthday) => (dispatch) => {

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    // Request Body
    const body = JSON.stringify({
        firstname, lastname, email, username, password, gender, company, position,
        address, phone, birthday
    });

    axios
        .post('http://127.0.0.1:8000/api/register/', body, config)
        .then((res) => {
            console.log(res.data)
            /*dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data,
            });*/

        })
        .catch((err) => {
            console.log(err);
            /*dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: REGISTER_FAIL
            });*/
        });
};

