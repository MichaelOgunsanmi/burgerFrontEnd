import {put} from 'redux-saga/effects'

import axios from "../../axios-orders";
import {fetchIngredientsFailed, setIngredients} from "../actions";

export function* initIngredientsSaga(action){
    try {
        const ingredients = yield axios.get('https://burger-f05dc.firebaseio.com/ingredients.json');
        yield put(setIngredients(ingredients.data))

    }catch(error) {
            yield put(fetchIngredientsFailed())
    }
}