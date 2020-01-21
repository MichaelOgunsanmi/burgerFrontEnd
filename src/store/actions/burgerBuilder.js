import axios from "../../axios-orders";

import {ADD_INGREDIENT, REMOVE_INGREDIENT, SET_INGREDIENTS, FETCH_INGREDIENTS_FAILED} from './actionTypes';

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
    return dispatch => {
        axios.get('https://burger-f05dc.firebaseio.com/ingredients.json')
            .then(ingredients => {
                dispatch(setIngredients(ingredients.data))
            })
            .catch(error => {
               dispatch(fetchIngredientsFailed())
        });
    }
};