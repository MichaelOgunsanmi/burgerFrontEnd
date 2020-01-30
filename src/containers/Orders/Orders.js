import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from '../../axios-orders';

import {fetchOrders} from "../../store/actions";

import WithErrorHandler from "../../HigherOrderComponents/withErrorHandler/withErrorHandler";
import Order from "../../components/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";


class Orders extends Component {

    componentDidMount() {
        this.props.onFetchOrders(this.props.token, this.props.userId)
    }

    render() {
        let orders = <Spinner/>;
        if (!this.props.loading)
            orders = this.props.orders.map( order => (
                        <Order
                            key={order.id}
                            ingredients={order.ingredients}
                            price={+order.price}
                        />
                    ))
            ;
        return (
            <div>
                {orders}
            </div>
        );
    }
}

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