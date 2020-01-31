import {takeEvery} from 'redux-saga/effects';

import {logoutSaga, checkAuthTimeoutSaga, authUserSaga, checkAuthStateSaga} from "./auth";
import {
    AUTH_CHECK_STATE,
    AUTH_CHECK_TIMEOUT,
    AUTH_INITIATE_LOGOUT,
    AUTH_USER,
    FETCH_ORDERS,
    INIT_INGREDIENTS,
    PURCHASE_BURGER
} from "../actions/actionTypes";

import {initIngredientsSaga} from "./burgerBuilder";
import {fetchOrdersSaga, purchaseBurgerSaga} from "./order";

export function* watchAuth(){
    yield takeEvery(AUTH_INITIATE_LOGOUT, logoutSaga);
    yield takeEvery(AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
    yield takeEvery(AUTH_USER, authUserSaga);
    yield takeEvery(AUTH_CHECK_STATE, checkAuthStateSaga);
}

export function* watchBurgerBuilder() {
    yield takeEvery(INIT_INGREDIENTS, initIngredientsSaga)
}

export function* watchOrder() {
    yield takeEvery(PURCHASE_BURGER, purchaseBurgerSaga);
    yield takeEvery(FETCH_ORDERS, fetchOrdersSaga);
}