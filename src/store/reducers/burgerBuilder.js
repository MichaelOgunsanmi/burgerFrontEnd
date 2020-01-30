import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    bacon: 0.7,
    meat: 1.3
};

const addIngredient = (oldState, action) => {
    const updatedIngredient = { [action.ingredientName]: oldState.ingredients[action.ingredientName] + 1 };
    const updatedIngredients = updateObject(oldState.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: oldState.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
    };

    return updateObject(oldState, updatedState);
};

const removeIngredient = (oldState, action) => {
    const updatedIngredient = { [action.ingredientName]: oldState.ingredients[action.ingredientName] - 1 };
    const updatedIngredients = updateObject(oldState.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: oldState.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
    };

    return updateObject(oldState, updatedState);
};

const setIngredients = (oldState, action) => {
    return updateObject(oldState, {
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
        },
        totalPrice: 4,
        error: false,
        building: false
    });
};

const fetchIngredientsFailed = (oldState, action) => {
    return updateObject(oldState, {error: true});
};


const burgerBuilder = (oldState = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return addIngredient(oldState, action);

        case actionTypes.REMOVE_INGREDIENT:
             return removeIngredient(oldState, action);

        case actionTypes.SET_INGREDIENTS:
            return setIngredients(oldState, action);

        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return fetchIngredientsFailed(oldState, action);

        default:
            return oldState;

    }
};

export default burgerBuilder;