import { Action } from '@ngrx/store';
import { Ingredientes } from "src/app/shared/ingredients.model";

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const UPDATE_INGREDIENTS = 'UPDATE_INGREDIENTS';
export const DELETE_INGREDIENTS = 'DELETE_INGREDIENTS';
export const START_EDIT = 'START_EDIT';
export const STOP_EDIT = 'STOP_EDIT';


export class AddIngredient implements Action {
    readonly type = ADD_INGREDIENT;   
    constructor (public payload: Ingredientes) {}
}

export class AddIngredients implements Action {
    readonly type = ADD_INGREDIENTS;   
    constructor (public payload: Ingredientes[]) {}
}

export class UpdateIngredients implements Action {
    readonly type = UPDATE_INGREDIENTS;   
    constructor (public payload: Ingredientes) {
    }
}

export class DeleteIngredientes implements Action {
    readonly type = DELETE_INGREDIENTS;
}

export class StartEdit implements Action {
    readonly type = START_EDIT;
    constructor (public payload: number) {}
}

export class StopEdit implements Action {
    readonly type = STOP_EDIT;
}


export type shoppingListType = 
| AddIngredient 
| AddIngredients 
| UpdateIngredients 
| DeleteIngredientes
| StartEdit
| StopEdit;