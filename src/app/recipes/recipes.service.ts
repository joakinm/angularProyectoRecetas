import { Recipe } from './recipe.model';
import { Injectable } from "@angular/core";
import { Ingredientes } from '../shared/ingredients.model';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/store/app.reducer'
import * as shoppingListAction from '../shopping/store/shopping-list.action'
@Injectable ({providedIn: 'root'})
export class recipeServices{
constructor(private store: Store<fromApp.AppState> ) {};
    recetasCambios = new Subject<Recipe[]>();
    private recipes: Recipe[] = [];
    //-----------------------GET-----------------------------------------
    getRecetas(){
        return this.recipes.slice();
    }
    getRecetaID(id:number){
        return this.recipes[id];
    }
    onAgregarIngCarrito(listaIng : Ingredientes[]){
        this.store.dispatch(new shoppingListAction.AddIngredients(listaIng));
    }
    //-------------------AGREGAR-----------------------------------------
    agregarReceta(receta:Recipe){
        this.recipes.push(receta);
        this.recetasCambios.next(this.recipes.slice());
    }
    agregarRecetas(recetas:Recipe[]){
        this.recipes = recetas;
        this.recetasCambios.next(this.recipes.slice());
    }
    //-------------------EDITAR Y ELIMINAR--------------------------------
    editarReceta(receta:Recipe, index: number){
        this.recipes[index] = receta;
        this.recetasCambios.next(this.recipes.slice());
    }
    eliminarReceta(index:number){
        this.recipes.splice(index,1);
        this.recetasCambios.next(this.recipes.slice());
    }
}