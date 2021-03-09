import axios from 'axios';
import { createMessage, returnErrors } from './messages';

import {
    GET_ERRORS,
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGOUT_SUCCESS,
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
            //console.log('login token: ' + res.data.access)
            localStorage.setItem('username', username);
            dispatch(createMessage({ okayLogin: "okay" }));
            // i added delay 1.5second to make dispatch above perform the toast before the dispatch below
            setTimeout(() => {
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: res.data,
                });
            }, 1500)
            /*dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data,
            });*/
        })
        .catch((err) => {
            console.log(err.response);
            const errors = {
                msg: err.response.data,
                status: err.response.status
            }
            //dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                //type: LOGIN_FAIL,
                type: GET_ERRORS,
                payload: errors
            });
            dispatch({
                type: LOGIN_FAIL,
                payload: errors
            });
        });
};






