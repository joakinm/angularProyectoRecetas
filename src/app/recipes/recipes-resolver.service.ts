import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe.model';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';
import * as RecipeActions from './store/recipe.actions';
import { Actions, ofType } from '@ngrx/effects';
import { take } from 'rxjs/operators';

@Injectable({providedIn:'root'})
export class recipeResolverService implements Resolve<Recipe[]>{
    constructor(private store: Store<fromApp.AppState>, private actions$: Actions) {};

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot, ) {
        this.store.dispatch(new RecipeActions.FetchRecipes());
        return this.actions$.pipe(
            ofType(RecipeActions.SET_RECIPES),
            take(1)
            );

        // const recetas = this.recServ.getRecetas();
        // if (recetas.length === 0)
        // {return this.dataSS.traerRecetas();}
        // else
        // {return recetas;}
         
    }
}