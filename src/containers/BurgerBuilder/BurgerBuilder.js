import React, {Component} from 'react';
import axios from "../../axios-orders";
import { connect } from 'react-redux';

import * as actionTypes from '../../store/actions';

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
        loading: false,
        error: false
    };

    async componentDidMount() {
        const ingredients = {
            salad: 0,
            cheese: 0,
            bacon: 0,
            meat: 0
        };

        this.setState({ingredients: ingredients});
        // try{
        //     const ingredients = await axios.get('https://burger-f05dc.firebaseio.com/ingredients.json');
        //     this.setState({ingredients: ingredients.data})
        // }catch (error) {
        //     this.setState({error: true})
        // }
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

        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner/>;

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

        if (this.state.loading) orderSummary = <Spinner/>;

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
        ingredients : state.ingredients,
        totalPrice: state.totalPrice
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingredientName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingredientName}),
        onIngredientRemoved: (ingredientName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingredientName })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios));