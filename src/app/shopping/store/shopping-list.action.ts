import { Action } from '@ngrx/store';
import { Ingredientes } from "src/app/shared/ingredients.model";

export const ADD_INGREDIENT = '[Shopping] Add Ingredient';
export const ADD_INGREDIENTS = '[Shopping] Add Ingredients';
export const UPDATE_INGREDIENTS = '[Shopping] Update Ingredients';
export const DELETE_INGREDIENTS = '[Shopping] Delete Ingredients';
export const START_EDIT = '[Shopping] Start Edit';
export const STOP_EDIT = '[Shopping] Stop Edit';


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