import React from 'react';

import Auxiliary from "../../../HigherOrderComponents/Auxillary";
import Button from "../../UI/Button/Button";

const OrderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(ingredient => (
            <li key={ingredient}>
                <span style={{textTransform: 'capitalize'}}> {ingredient} </span>: {props.ingredients[ingredient]}
            </li>));

    return (
        <Auxiliary>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients: </p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType={"Danger"} clicked={props.purchaseCancelled}> CANCEL </Button>
            <Button btnType={"Success"} clicked={props.purchaseContinued}> CONTINUE </Button>
        </Auxiliary>
    );
};

export default OrderSummary;