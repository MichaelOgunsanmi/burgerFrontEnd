import { put, delay } from 'redux-saga/effects'
import axios from 'axios';

import {logoutSucceed, logout, authStart, authFail, authSuccess, checkAuthTimeout} from "../actions";


export function* logoutSaga(action){
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('userId');

    yield put(logoutSucceed())
}

export function* checkAuthTimeoutSaga(action){
    yield delay(action.expirationTime * 1000);

    yield put(logout())
}

export function* authUserSaga(action) {
    yield put(authStart());
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    };

    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAdkDMTgXK8pooBjJdDPN2ll4xbxYYPCs8';

    if (action.isSignUp) url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAdkDMTgXK8pooBjJdDPN2ll4xbxYYPCs8';

    try {
        const response = yield axios.post(url, authData);

        const {idToken, localId, expiresIn} = response.data;

        const expirationDate = yield new Date(new Date().getTime() + expiresIn * 1000);
        yield localStorage.setItem('expirationDate', expirationDate);
        yield localStorage.setItem('token', idToken);
        yield localStorage.setItem('userId', localId);

        yield put(authSuccess(idToken, localId));
        yield put(checkAuthTimeout(expiresIn));
    } catch(err){
        yield put(authFail(err.response.data.error.message.toLowerCase()))
    }
}

export function* checkAuthStateSaga(action){
        const token = yield localStorage.getItem('token');
        if (!token){
            yield put(logout())
        }else {
            const expirationDate = yield new Date(localStorage.getItem('expirationDate'));

            if (expirationDate <= new Date()){
                yield put(logout());
            }else{
                const userId = yield localStorage.getItem('userId');
                yield put(authSuccess(token, userId));
                yield put(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000))
            }
        }
}