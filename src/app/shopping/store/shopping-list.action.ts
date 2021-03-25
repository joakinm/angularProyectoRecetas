import { Action } from '@ngrx/store';
import { Ingredientes } from "src/app/shared/ingredients.model";

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const UPDATE_INGREDIENTS = 'UPDATE_INGREDIENTS';
export const DELETE_INGREDIENTS = 'DELETE_INGREDIENTS';

export class addIngredient implements Action {
    readonly type = ADD_INGREDIENT;   
    constructor (public payload: Ingredientes) {}
}

export class addIngredients implements Action {
    readonly type = ADD_INGREDIENTS;   
    constructor (public payload: Ingredientes[]) {}
}

export class updateIngredients implements Action {
    readonly type = UPDATE_INGREDIENTS;   
    constructor (public payload: {index: number; ingrediente: Ingredientes}) {
    }
}

export class deleteIngredientes implements Action {
    readonly type = DELETE_INGREDIENTS;   
    constructor (public payload: number) {}
}

export type shoppingListType = addIngredient | addIngredients | updateIngredients | deleteIngredientes;