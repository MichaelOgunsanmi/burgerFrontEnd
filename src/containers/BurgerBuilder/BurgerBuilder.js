import React, {Component} from 'react';
import { connect } from 'react-redux';
import axios from "../../axios-orders";

import {addIngredient, initIngredients, purchaseInit, removeIngredient} from '../../store/actions/index';

import WithErrorHandler from "../../HigherOrderComponents/withErrorHandler/withErrorHandler";
import Auxiliary from "../../HigherOrderComponents/Auxillary/Auxillary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Modal from "../../components/UI/Modal/Modal";
import Spinner from "../../components/UI/Spinner/Spinner";


class BurgerBuilder extends Component {
    state = {
        purchaseable: false,
        purchasing: false,
    };

    async componentDidMount() {
        this.props.onInitIngredients();
    }


    updatePurchaseState = (ingredients) => {
        const ingredientsCount = Object.keys(ingredients)
            .map(ingredient => ingredients[ingredient])
            .reduce((totalSum, ingredientValue) => totalSum += ingredientValue , 0)

        return ingredientsCount > 0;
    };

    purchaseHandler = () => {
        this.setState({purchasing: true});
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    };

    purchaseContinueHandler = async () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    };


    render() {
        const disabledInfo = {
            ...this.props.ingredients
        };

        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = <Spinner/>;

        let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner/>;

        if (this.props.ingredients) {
            burger = (
                <Auxiliary>
                    <Burger ingredients={this.props.ingredients}/>
                    <BuildControls
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientRemoved={this.props.onIngredientRemoved}
                    disabled={disabledInfo}
                    price={this.props.totalPrice}
                    purchaseable={this.updatePurchaseState(this.props.ingredients)}
                    ordered={this.purchaseHandler}
                    />
                </Auxiliary>
            );

            orderSummary = <OrderSummary
                price={this.props.totalPrice}
                ingredients={this.props.ingredients}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
            />;
        }

        return (
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxiliary>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients : state.BURGERBUILDER.ingredients,
        totalPrice: state.BURGERBUILDER.totalPrice,
        error: state.BURGERBUILDER.error
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingredientName) => dispatch(addIngredient(ingredientName)),
        onIngredientRemoved: (ingredientName) => dispatch(removeIngredient(ingredientName)),
        onInitIngredients: () => dispatch(initIngredients()),
        onInitPurchase: () => dispatch(purchaseInit())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios));