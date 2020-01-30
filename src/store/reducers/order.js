import * as actionTypes from '../actions/actionTypes';
import {updateObject} from "../../shared/utility";


const initialState = {
    orders: [],
    loading: false,
    purchased: false
};

const purchaseInit = (oldState, action) => {
    return updateObject(oldState, {purchased: false});

};

const purchaseBurgerStart = (oldState, action) => {
    return updateObject(oldState,{loading: true});
};

const purchaseBurgerSuccess = (oldState, action) => {
    const newOrder = updateObject(action.orderData,{id: action.orderId});

    return updateObject(oldState,{
        loading: false,
        purchased: true,
        orders: [...oldState.orders, newOrder]
    });
};

const purchaseBurgerFail = (oldState, action) => {
    return updateObject(oldState,{loading: false});
};

const fetchOrdersStart= (oldState, action) => {
    return updateObject(oldState,{loading: true});
};

const fetchOrdersSuccess = (oldState, action) => {
    return updateObject(oldState, { loading: false, orders: action.orders});
};

const fetchOrdersFail = (oldState, action) => {
    return updateObject(oldState,{loading: false});
};

const reducer = (oldState = initialState, action) => {
    switch (action.type) {

        case actionTypes.PURCHASE_INIT:
            return purchaseInit(oldState, action);

        case actionTypes.PURCHASE_BURGER_START:
            return purchaseBurgerStart(oldState, action);

        case actionTypes.PURCHASE_BURGER_SUCCESS:
            return purchaseBurgerSuccess(oldState, action);

        case actionTypes.PURCHASE_BURGER_FAIL:
            return purchaseBurgerFail(oldState, action);

        case actionTypes.FETCH_ORDERS_START:
            return fetchOrdersStart(oldState, action);

        case actionTypes.FETCH_ORDERS_SUCCESS:
            return fetchOrdersSuccess(oldState, action);

        case actionTypes.FETCH_ORDERS_FAIL:
            return fetchOrdersFail(oldState, action);

        default:
            return oldState;
    }
};

export default reducer;