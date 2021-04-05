import { Action } from "@ngrx/store";
import { Recipe } from "../recipe.model";

export const SET_RECIPES = '[Recipes] SetRecipes';
export const GET_RECIPE = '[Recipes] GetRecipe';
export const GET_RECIPES = '[Recipes] GetRecipes';

export class SetRecipes implements Action {
    readonly type = SET_RECIPES;
    constructor(public payload: Recipe[]) {}
}

export type recipesType = SetRecipes;