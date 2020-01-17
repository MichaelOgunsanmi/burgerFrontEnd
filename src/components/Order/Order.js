import React from 'react';

import styles from './Order.module.css'
import BurgerIngredients from "../Burger/BurgerIngredients/BurgerIngredients";

const Order = (props) => {
    const transformedIngredients = [];

    for (const ingredient in props.ingredients)
        transformedIngredients.push({
            name: ingredient,
            amount: props.ingredients[ingredient]
        });


    const ingredientsOutput = transformedIngredients.map(ingredient => {
        return <span
            key={ingredient.name}
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'

            }}
        >{ingredient.name} ({ingredient.amount})</span>
    });

    return (
        <div className={styles.Order}>
            <p>Ingredients: {ingredientsOutput}</p>
            <p>Price: <strong>USD {props.price.toFixed(2)}</strong></p>
        </div>
    );
};

export default Order;