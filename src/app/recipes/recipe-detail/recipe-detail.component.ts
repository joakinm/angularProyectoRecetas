import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import{ Recipe } from "../recipe.model";
import { recipeServices } from '../recipes.service' ;
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  receta: Recipe;
  id: number;
  constructor(
    private recserv: recipeServices, 
    private routeAct: ActivatedRoute, 
    private route: Router,
    private store: Store<fromApp.AppState> ) { }

  ngOnInit() {
    this.store.select('recipes')
    this.routeAct.params.subscribe(
      (params : Params) => {this.id = +params['id'];
      // this.receta = this.recserv.getRecetaID(this.id);
      this.store.select('recipes').pipe(map(recipeState => {
        return recipeState.recipes.find((recipe, index) => {
          return index === this.id;
        })
      }
      )).subscribe(recipe => {
        this.receta = recipe ;
      });
    }
    )
  }
  onAgregarAlCarrito() {
    this.recserv.onAgregarIngCarrito(this.receta.ingredientes);
  }
  onEditarReceta(id){
    this.route.navigate(['edit'],{relativeTo: this.routeAct})
  }
  eliminarReceta(id:number){
    this.recserv.eliminarReceta(id);
    this.route.navigate(['../'], {relativeTo: this.routeAct});
  }

}
