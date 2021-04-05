import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { map, switchMap } from "rxjs/operators";
import { Recipe } from "../recipe.model";
import * as RecipesActions from './recipe.actions';
@Injectable()

export class RecipeEffects {
    @Effect()
    fetchRecipes = this.Actions$.pipe(
        ofType(RecipesActions.FETCH_RECIPES),
        switchMap(() => {
            return this.http.get<Recipe[]>('https://recetasproyecto-104e7.firebaseio.com/recipes.json');
        }), map(recipes => {
            return recipes.map( recipe => {
                return{...recipe, ingredientes: recipe.ingredientes ? recipe.ingredientes: []};
            });
        }), map(recipe => {
            return new RecipesActions.SetRecipes(recipe);
        })
        )
    constructor(
        private Actions$: Actions,
        private http: HttpClient) {}
}