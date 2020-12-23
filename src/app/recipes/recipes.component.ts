import { Component, OnInit } from '@angular/core';
import { recipeServices } from './recipes.service';
import { dataServices } from '../shared/data.services';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {
  constructor(private data: dataServices) {}


  ngOnInit() {

  }
  onGetData(){
    this.data.getDatos();
  }
}
