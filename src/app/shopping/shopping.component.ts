import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';

import { Ingredientes } from '../shared/ingredients.model';
import{ingredientesService } from './shopping-edit/ingredientes.service';
import * as fromShoppinglist from './store/shopping-list.reducer';
import * as shoppingListActions from './store/shopping-list.action';
import * as fromApp from 'src/app/store/app.reducer';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss']
})

export class ShoppingComponent implements OnInit {
  ingredientes: Observable <fromShoppinglist.State>;
  private subsIngServ: Subscription;
  
  constructor(private ingserv: ingredientesService, 
              private store: Store<fromApp.AppState> 
    ) {}

    
  ngOnInit(): void {
    this.ingredientes = this.store.select('shoppingList');
  }

  onAgregarIngrediente($event) {
  this.ingserv.onAgregarIngrediente($event);
  }

  onEditarIngrediente(index: number) {
    this.store.dispatch(new shoppingListActions.StartEdit(index));
  }

}