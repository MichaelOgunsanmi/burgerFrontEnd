import React, {Component} from 'react';
import axios from '../../axios-orders';

import WithErrorHandler from "../../HigherOrderComponents/withErrorHandler/withErrorHandler";
import Order from "../../components/Order/Order";

class Orders extends Component {
    state = {
        loading: true,
        orders: []
    };

    async componentDidMount() {
        try {
            const response = await axios.get('/orders.json');
            const fetchedOrders = [];

            for (let key in response.data) {
                fetchedOrders.push({
                    ...response.data[key],
                    id: key
                })
            }

            this.setState({loading: false, orders: fetchedOrders})
        }catch(e){
            this.setState({loading: false});
        }
    }


    render() {
        return (
            <div>
                {this.state.orders.map( order => (
                    <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={+order.price}
                    />
                ))}
            </div>
        );
    }
}

export default WithErrorHandler(Orders, axios);