import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import axios from "../../axios-orders";

import {
    addIngredient,
    initIngredients,
    purchaseInit,
    removeIngredient,
    setAuthRedirectPath
} from '../../store/actions/index';

import WithErrorHandler from "../../HigherOrderComponents/withErrorHandler/withErrorHandler";
import Auxiliary from "../../HigherOrderComponents/Auxillary/Auxillary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Modal from "../../components/UI/Modal/Modal";
import Spinner from "../../components/UI/Spinner/Spinner";


export const BurgerBuilder = props => {
    const [purchasing, setPurchasingState] = useState(false);


    useEffect( () => {
        props.onInitIngredients();
    }, []);


    const updatePurchaseState = (ingredients) => {
        const ingredientsCount = Object.keys(ingredients)
            .map(ingredient => ingredients[ingredient])
            .reduce((totalSum, ingredientValue) => totalSum += ingredientValue , 0);

        return ingredientsCount > 0;
    };

    const purchaseHandler = () => {
        if (props.isAuthenticated) setPurchasingState(true);
        else {
            props.onSetAuthRedirectPath('/checkout');
            props.history.push('/auth')
        }
    };

    const purchaseCancelHandler = () => {
        setPurchasingState( false);
    };

    const purchaseContinueHandler = async () => {
        props.onInitPurchase();
        props.history.push('/checkout');
    };


    const disabledInfo = {
        ...props.ingredients
    };

    for (let key in disabledInfo){
        disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = <Spinner/>;

    let burger = props.error ? <p>Ingredients can't be loaded</p> : <Spinner/>;

    if (props.ingredients) {
        burger = (
            <Auxiliary>
                <Burger ingredients={props.ingredients}/>
                <BuildControls
                ingredientAdded={props.onIngredientAdded}
                ingredientRemoved={props.onIngredientRemoved}
                disabled={disabledInfo}
                price={props.totalPrice}
                purchaseable={updatePurchaseState(props.ingredients)}
                ordered={purchaseHandler}
                isAuth={props.isAuthenticated}
                />
            </Auxiliary>
        );

        orderSummary = <OrderSummary
            price={props.totalPrice}
            ingredients={props.ingredients}
            purchaseCancelled={purchaseCancelHandler}
            purchaseContinued={purchaseContinueHandler}
        />;
    }

    return (
        <Auxiliary>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </Auxiliary>
    );
};

const mapStateToProps = state => {
    return {
        ingredients : state.BURGERBUILDER.ingredients,
        totalPrice: state.BURGERBUILDER.totalPrice,
        error: state.BURGERBUILDER.error,
        isAuthenticated: state.AUTH.token != null
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingredientName) => dispatch(addIngredient(ingredientName)),
        onIngredientRemoved: (ingredientName) => dispatch(removeIngredient(ingredientName)),
        onInitIngredients: () => dispatch(initIngredients()),
        onInitPurchase: () => dispatch(purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(setAuthRedirectPath(path))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios));