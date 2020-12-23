import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';

import { Ingredientes } from '../shared/ingredients.model';
import{ingredientesServices } from './shopping-edit/ingredientes.services';
import { shoppingListType } from './store/shopping-list.action';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss']
})

export class ShoppingComponent implements OnInit {
  
  ingredientes : Observable <{ ingredientes: Ingredientes[] }>;
  private subsIngServ : Subscription;
  
  constructor(private ingserv : ingredientesServices, 
              private store: Store<{shoppingList: {ingredientes: Ingredientes[]}}> 
    ) {}

    
  ngOnInit(): void {
    this.ingredientes = this.store.select('shoppingList');
  }

  onAgregarIngrediente($event){
  this.ingserv.onAgregarIngrediente($event);
  }
  onEditarIngrediente(index:number){
    this.ingserv.ingredienteEdicion.next(index);
  }

}