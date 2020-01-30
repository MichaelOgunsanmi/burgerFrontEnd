import axios from 'axios';

import {AUTH_START, AUTH_SUCCESS, AUTH_FAIL, AUTH_LOGOUT, SET_AUTH_REDIRECT_PATH} from "./actionTypes";

export const authStart = () => {
  return {
      type: AUTH_START
  }
};

export const authSuccess = (token, userId) => {
    return {
        type: AUTH_SUCCESS,
        idToken: token,
        userId
    }
};

export const authFail = error => {
    return {
        type: AUTH_FAIL,
        error
    }
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');

    return {
        type: AUTH_LOGOUT
    }
};

export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime * 1000)
    }
};

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email,
            password,
            returnSecureToken: true
        };

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAdkDMTgXK8pooBjJdDPN2ll4xbxYYPCs8';

        if (isSignUp) url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAdkDMTgXK8pooBjJdDPN2ll4xbxYYPCs8';


        axios.post(url, authData)
            .then(response => {
                const {idToken, localId, expiresIn} = response.data;

                const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('token', idToken);
                localStorage.setItem('userId', localId);

                dispatch(authSuccess(idToken, localId));
                dispatch(checkAuthTimeout(expiresIn))
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error.message.toLowerCase()))
            })
    }
};

export const setAuthRedirectPath = path => {
    return {
        type: SET_AUTH_REDIRECT_PATH,
        path
    }
};

export const checkAuthState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token){
            dispatch(logout())
        }else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));

            if (expirationDate <= new Date()){
                dispatch(logout());
            }else{
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000))
            }
        }
    }
};