import axios from 'axios';

import {
    AUTH_START,
    AUTH_SUCCESS,
    AUTH_FAIL,
    AUTH_INITIATE_LOGOUT,
    SET_AUTH_REDIRECT_PATH,
    AUTH_LOGOUT,
    AUTH_CHECK_TIMEOUT,
    AUTH_USER,
    AUTH_CHECK_STATE
} from "./actionTypes";

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
    // localStorage.removeItem('token');
    // localStorage.removeItem('expirationDate');
    // localStorage.removeItem('userId');

    return {
        type: AUTH_INITIATE_LOGOUT
    }
};

export const logoutSucceed = () => {
    return {
        type: AUTH_LOGOUT
    }
};

export const checkAuthTimeout = expirationTime => {
    return {
        type: AUTH_CHECK_TIMEOUT,
        expirationTime
    }
};

export const auth = (email, password, isSignUp) => {
    return {
        type: AUTH_USER,
        email,
        password,
        isSignUp
    }
};

export const setAuthRedirectPath = path => {
    return {
        type: SET_AUTH_REDIRECT_PATH,
        path
    }
};

export const checkAuthState = () => {
    return {
        type: AUTH_CHECK_STATE
    }
};