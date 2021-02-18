import axios from 'axios';

import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
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
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data,
            });
        })
        .catch((err) => {
            
            dispatch({
                type: LOGIN_FAIL
            });
        });
};