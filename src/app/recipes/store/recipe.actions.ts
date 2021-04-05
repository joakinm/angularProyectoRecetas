import { Action } from "@ngrx/store";
import { Recipe } from "../recipe.model";

export const SET_RECIPES = '[Recipes] SetRecipes';
export const FETCH_RECIPE = '[Recipes] GetRecipe';
export const FETCH_RECIPES = '[Recipes] FetchRecipes';

export class SetRecipes implements Action {
    readonly type = SET_RECIPES;
    constructor(public payload: Recipe[]) {}
}

export class FetchRecipes implements Action {
    readonly type = FETCH_RECIPES;
}

export type recipesType = SetRecipes;