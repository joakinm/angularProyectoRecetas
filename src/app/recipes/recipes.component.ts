import { Component, OnInit } from '@angular/core';
import { recipeServices } from './recipes.services';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {
  constructor() { }


  ngOnInit() {
  }

}
