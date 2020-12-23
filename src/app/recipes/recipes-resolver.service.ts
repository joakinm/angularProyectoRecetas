import { Injectable } from '@angular/core';
import { Resolve, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe.model';
import { dataServices } from '../shared/data.services';
import { recipeServices } from './recipes.service';


@Injectable({providedIn:'root'})
export class recipeResolverService implements Resolve<Recipe[]>{
    constructor(private dataSS: dataServices , private recServ : recipeServices){};

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot ){
        const recetas = this.recServ.getRecetas();
        if (recetas.length === 0)
        {return this.dataSS.traerRecetas();}
        else
        {return recetas;}
         
    }
}