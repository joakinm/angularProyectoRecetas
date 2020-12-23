import { Action } from '@ngrx/store';
import { Ingredientes } from "src/app/shared/ingredients.model";

export const ADD_INGREDIENTE = 'ADD_INGREDIENTE';
export const ADD_INGREDIENTES = 'ADD_INGREDIENTES';

export class addIngrediente implements Action {
    readonly type = ADD_INGREDIENTE;   
    constructor (public payload: Ingredientes) {}
}

export class addIngredientes implements Action {
    readonly type = ADD_INGREDIENTES;   
    constructor (public payload: Ingredientes[]) {}
}

export type shoppingListType = addIngrediente | addIngredientes;