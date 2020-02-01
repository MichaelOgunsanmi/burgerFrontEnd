import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import axios from '../../axios-orders';

import {fetchOrders} from "../../store/actions";

import WithErrorHandler from "../../HigherOrderComponents/withErrorHandler/withErrorHandler";
import Order from "../../components/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";


const Orders = (props) => {

    useEffect(() => {
        props.onFetchOrders(props.token, props.userId)
    }, []);


    let orders = <Spinner/>;
    if (!props.loading)
        orders = props.orders.map( order => (
                    <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={+order.price}
                    />
                ));

    return (
        <div>
            {orders}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        orders: state.ORDER.orders,
        loading: state.ORDER.loading,
        token: state.AUTH.token,
        userId: state.AUTH.userId
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(fetchOrders(token, userId))
    }
};



export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(Orders, axios));