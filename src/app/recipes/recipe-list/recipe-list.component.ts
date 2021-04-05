import { Component, OnInit} from '@angular/core';
import { Recipe } from '../recipe.model'
import {recipeServices } from '../recipes.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  public recipes: Recipe[];
  constructor( 
    private recetaServ: recipeServices, 
    private route: Router, 
    private routeactive: ActivatedRoute,
    private store: Store< fromApp.AppState >) {}

  ngOnInit(): void {
    this.recipes = this.recetaServ.getRecetas();
    this.store.select('recipes').pipe(
      map(recipeState => recipeState.recipes))
      .subscribe(
      ( recetas:Recipe[] ) => {this.recipes = recetas}
      );
  }

  onCrearReceta(){
    this.route.navigate(['new'],{relativeTo: this.routeactive});
    
  }
}
