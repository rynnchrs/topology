import axios from 'axios';
import { returnErrors } from '../reducers/messages';

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
            console.log(res.data.access)
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