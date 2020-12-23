import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import{ Recipe } from "../recipe.model";
import { recipeServices } from '../recipes.service' ;

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  receta : Recipe;
  id:number;
  constructor(private recserv: recipeServices, private routeAct: ActivatedRoute, private route:Router ) { }

  ngOnInit() {
    this.routeAct.params.subscribe(
      (params : Params) => {this.id = +params['id'];
      this.receta = this.recserv.getRecetaID(this.id);
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
