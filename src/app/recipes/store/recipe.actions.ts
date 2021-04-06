import { Action } from "@ngrx/store";
import { Recipe } from "../recipe.model";

export const SET_RECIPES = '[Recipes] SetRecipes';
export const FETCH_RECIPES = '[Recipes] FetchRecipes';
export const ADD_RECIPE = '[Recipes] AddRecipes';
export const UPDATE_RECIPE = '[Recipes] UpdateRecipes';
export const DELETE_RECIPE = '[Recipes] DeleteRecipes';
export const STORE_RECIPES = '[Recipes] StoreRecipes';

export class SetRecipes implements Action {
    readonly type = SET_RECIPES;
    constructor(public payload: Recipe[]) {}
}

export class FetchRecipes implements Action {
    readonly type = FETCH_RECIPES;
}

export class AddRecipe implements Action {
    readonly type = ADD_RECIPE;
    constructor(public payload: Recipe) {}
}

export class UpdateRecipe implements Action {
    readonly type = UPDATE_RECIPE;
    constructor(public payload: {newRecipe: Recipe, index: number}) {}
}

export class DeleteRecipe implements Action {
    readonly type = DELETE_RECIPE;
    constructor(public payload: number) {}
}

export class StoreRecipes implements Action {
    readonly type = STORE_RECIPES;
}


export type recipesType = SetRecipes | UpdateRecipe | AddRecipe | DeleteRecipe | FetchRecipes | StoreRecipes;