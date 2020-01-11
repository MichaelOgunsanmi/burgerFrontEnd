import React, {Component} from 'react';

import Auxiliary from "../../HigherOrderComponents/Auxillary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    bacon: 0.7,
    meat: 1.3
};


class BurgerBuilder extends Component {
    state = {
        ingredients:{
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchaseable: false
    };

    updatePurchaseState = (ingredients) => {
        const ingredientsCount = Object.keys(ingredients)
            .map(ingredient => ingredients[ingredient])
            .reduce((totalSum, ingredientValue) => totalSum += ingredientValue , 0)

        this.setState({purchaseable: ingredientsCount > 0});
    };


    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = oldCount + 1;

        const newPrice = INGREDIENT_PRICES[type] + this.state.totalPrice;


        this.setState( {
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });

        this.updatePurchaseState(updatedIngredients);
    };

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0) return;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = oldCount - 1;

        const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type] ;

        this.setState( {
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });

        this.updatePurchaseState(updatedIngredients);
    };


    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return (
            <Auxiliary>
                <Modal/>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchaseable={this.state.purchaseable}
                />
            </Auxiliary>
        );
    }
}

export default BurgerBuilder;