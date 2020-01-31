import {
    ADD_INGREDIENT,
    REMOVE_INGREDIENT,
    SET_INGREDIENTS,
    FETCH_INGREDIENTS_FAILED,
    INIT_INGREDIENTS
} from './actionTypes';

export const addIngredient = ingredientName => {
    return {
        type: ADD_INGREDIENT,
        ingredientName
    }
};

export const removeIngredient = ingredientName => {
    return {
        type: REMOVE_INGREDIENT,
        ingredientName
    }
};

export const setIngredients = ingredients => {
    return {
        type: SET_INGREDIENTS,
        ingredients
    }
};

export const fetchIngredientsFailed = () => {
    return {
        type: FETCH_INGREDIENTS_FAILED
    }
};

export const initIngredients = () => {
    return {
        type: INIT_INGREDIENTS
    }
};