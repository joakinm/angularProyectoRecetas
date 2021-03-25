import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { Ingredientes } from '../../shared/ingredients.model';
import { ingredientesService } from './ingredientes.service';
import * as shoppingListAction from '../store/shopping-list.action';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  ingredientes: Observable< {ingredientes: Ingredientes[]} >;
  modoEdit = false;
  
  ing: Ingredientes;
  indexEdit:number;
  
  constructor(private ingserv : ingredientesService, private store: Store<{shoppingList: { ingredientes: Ingredientes[]} }>) {}
  @ViewChild("f") formulario:NgForm;
  
  
  ngOnInit(): void {
    this.ingredientes = this.store.select('shoppingList');
    this.store.select('shoppingList').subscribe();
  }

  ngOnDestroy() {
  }

  onAgregarDatos(f: NgForm) {
    const value = f.value;
    const nuevoIng = new Ingredientes(value.nombre, value.valor);
    if(this.modoEdit == true) {
      this.store.dispatch(
        new shoppingListAction.updateIngredients({
          index: this.indexEdit, 
          ingrediente: nuevoIng
        }));
    }
    else
    {
      this.store.dispatch(new shoppingListAction.addIngredient(nuevoIng));
    }
  }
  eliminarIngrediente() {
    this.store.dispatch(new shoppingListAction.deleteIngredientes(this.indexEdit));
    this.formulario.reset();
  }

  limpiarInputs(f: NgForm) {
  this.formulario.reset();
  this.modoEdit = false;
  }
}
  
