
import {
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: localStorage.getItem('token') ? true : false,
    
};

/* eslint import/no-anonymous-default-export: [2, {"allowAnonymousFunction": true}] */
export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            //localStorage.setItem('token', action.payload.token);
            //localStorage.setItem('token', action.payload.access)'
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false,
            };

        case AUTH_ERROR:
        case LOGIN_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
            };
        
        default:
            return state;
    }
}