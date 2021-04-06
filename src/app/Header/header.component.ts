import { Component, OnInit, OnDestroy} from '@angular/core';
import { Store } from '@ngrx/store';
import {Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipeActions from '../recipes/store/recipe.actions';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class headerComponent implements OnInit, OnDestroy{
    private userSub: Subscription;
    logueado = false;
    constructor(private store: Store<fromApp.AppState>) {}
    
    ngOnInit() {
       this.userSub = this.store.select('auth')
       .pipe(map(authState => {
        return authState.user;
        }))
        .subscribe(
           user =>{
               this.logueado = !!user;// lo mismo que usar (!user ? false : true;)
       });
    }
    ngOnDestroy(){
        this.userSub.unsubscribe();
    }
    onGuardarDatos(){
        this.store.dispatch(new RecipeActions.StoreRecipes());
    }

    onFetchData() {
        this.store.dispatch(new RecipeActions.FetchRecipes());
    }
    onLogout(){
        this.store.dispatch(new AuthActions.Logout());
    }
}