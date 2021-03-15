
import {
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'), 
    //isAuthenticated: null,
    isAuthenticated: localStorage.getItem('token') ? true : false,
    //isLoading: false,
    //user: null,
};

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
            //console.log("LOGIN FAIL TRY")
            return {
                ...state,
                token: null,
                //user: null,
                isAuthenticated: false,
                //isLoading: false,
            };
        
        default:
            return state;
    }
}