import {
    PURCHASE_BURGER_SUCCESS,
    PURCHASE_BURGER_FAIL,
    PURCHASE_BURGER_START,
    PURCHASE_INIT,
    FETCH_ORDERS_START,
    FETCH_ORDERS_SUCCESS,
    FETCH_ORDERS_FAIL
} from "./actionTypes";

import axios from "../../axios-orders";


const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData
    }
};

export const purchaseBurgerFail = error => {
    return {
        type: PURCHASE_BURGER_FAIL,
        error
    }
};

export const purchaseBurgerStart = () => {
    return{
        type: PURCHASE_BURGER_START
    }
};

export const purchaseBurger = orderData => {
    return dispatch => {
        dispatch(purchaseBurgerStart());

        axios.post('/orders.json', orderData)
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data.name, orderData))
            })
            .catch(error => {
                purchaseBurgerFail(error)
            });
    }
};

export const purchaseInit = () => {
    return{
        type: PURCHASE_INIT
    }
};


const fetchOrdersSuccess = (orders) => {
    return {
        type: FETCH_ORDERS_SUCCESS,
        orders
    }
};

export const fetchOrdersFail = error => {
    return {
        type: FETCH_ORDERS_FAIL,
        error
    }
};

export const fetchOrdersStart = () => {
    return{
        type: FETCH_ORDERS_START
    }
};

export const fetchOrders = orderData => {
    return dispatch => {
        dispatch(fetchOrdersStart());

        axios.get('/orders.json')
            .then(response => {
                const fetchedOrders = [];

                for (let key in response.data) {
                    fetchedOrders.push({
                        ...response.data[key],
                        id: key
                    })
                }

                dispatch(fetchOrdersSuccess(fetchedOrders))
            })
            .catch(error => {
                dispatch(fetchOrdersFail(error))
            });
    }
};

// export const fetchOrdersInit = () => {
//     return{
//         type: PURCHASE_INIT
//     }
// };