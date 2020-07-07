import { Recipe } from './recipe.model';
import { Injectable } from "@angular/core";
import { Ingredientes } from '../shared/ingredients.model';
import { ingredientesServices } from '../shopping/shopping-edit/ingredientes.services';
import { Subject } from 'rxjs';

@Injectable ({providedIn: 'root'})
export class recipeServices{
constructor(private ingServ : ingredientesServices) {};
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
        this.ingServ.onAgregarIngredientes(listaIng);
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