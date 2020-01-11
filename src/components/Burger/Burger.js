import React from 'react';

import styles from './Burger.module.css'
import BurgerIngredients from "./BurgerIngredients/BurgerIngredients";

const Burger = (props) => {
    let transformedIngredients = [];
    for (const ingredient in props.ingredients) {
        let count = 0;
        while (count < props.ingredients[ingredient]) {
            transformedIngredients.push(<BurgerIngredients type={ingredient} key={ingredient+count}/>);
            count++;
        }
    }

    // //Another way of getting transformedIngredients howbeit unnecessary
    // const transformedIngredients2 = Object.keys(props.ingredients).map(ingredient => {
    //     return [...Array(props.ingredients[ingredient])].map((_, index) => {
    //         return <BurgerIngredients type={ingredient} key={ingredient + index}/>
    //     })
    // }).reduce((returnedArray, currentArray) => {return returnedArray.concat(currentArray)}, []);


    if (transformedIngredients.length === 0) transformedIngredients = <p> Please start adding ingredients </p>;

    
    return (
        <div className={styles.Burger}>
            <BurgerIngredients type={"bread-top"}/>
            {transformedIngredients}
            <BurgerIngredients type={"bread-bottom"}/>
        </div>
    );
};

export default Burger;