import * as actionTypes from './actions';

const initialState = {
    ingredients: {
        salad: 0,
        cheese: 0,
        bacon: 0,
        meat: 0
    },
    totalPrice: 4
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    bacon: 0.7,
    meat: 1.3
};

const reducer = (oldState = initialState, action) => {
    let newState;
    let newIngredients;
    let newTotalPrice

    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            newIngredients = {
                ...oldState.ingredients,
                [action.ingredientName]: oldState.ingredients[action.ingredientName] + 1
            };

            newTotalPrice = oldState.totalPrice + INGREDIENT_PRICES[action.ingredientName];

            newState = {
                ...oldState,
                ingredients: newIngredients,
                totalPrice: newTotalPrice
            };

            return newState;

        case actionTypes.REMOVE_INGREDIENT:
             newIngredients = {
                ...oldState.ingredients,
                [action.ingredientName]: oldState.ingredients[action.ingredientName] - 1
            };

            newTotalPrice = oldState.totalPrice - INGREDIENT_PRICES[action.ingredientName];

            newState = {
                ...oldState,
                ingredients: newIngredients,
                totalPrice: newTotalPrice
            };
            return newState;

        default:
            return oldState;

    }
};

export default reducer;