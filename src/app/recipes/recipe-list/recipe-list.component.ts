import { Component, OnInit} from '@angular/core';
import { Recipe } from '../recipe.model'
import {recipeServices } from '../recipes.services';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  constructor( private recetaServ : recipeServices, private route : Router, private routeactive: ActivatedRoute){}
recipes: Recipe[];

  ngOnInit(): void {
    this.recipes = this.recetaServ.getRecetas();
    this.recetaServ.recetasCambios.subscribe(
      (recetas:Recipe[])=> {this.recipes = recetas})
  }
  onCrearReceta(){
    this.route.navigate(['new'],{relativeTo: this.routeactive});
    
  }
}
