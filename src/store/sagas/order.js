import {put} from 'redux-saga/effects';

import axios from "../../axios-orders";
import {purchaseBurgerFail,
    purchaseBurgerStart,
    purchaseBurgerSuccess,
    fetchOrdersStart,
    fetchOrdersFail,
    fetchOrdersSuccess
} from "../actions";

export function* purchaseBurgerSaga(action){
        yield put(purchaseBurgerStart());

        try {
            const orderData = yield axios.post('/orders.json?auth=' + action.token, action.orderData);
            yield put(purchaseBurgerSuccess(orderData.data.name, action.orderData))
        }catch(error) {
                yield put(purchaseBurgerFail(error))
        }
}

export function* fetchOrdersSaga(action){

    yield put(fetchOrdersStart());

    const queryParams = `?auth=${action.token}&orderBy="userId"&equalTo="${action.userId}"`;

    try {
        const orders = yield axios.get('/orders.json' + queryParams);
        const fetchedOrders = [];

        for (let key in orders.data) {
            fetchedOrders.push({
                ...orders.data[key],
                id: key
            })
        }

        yield put(fetchOrdersSuccess(fetchedOrders));
    }catch(error) {
        yield put(fetchOrdersFail(error))
    }
}