import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { Ingredientes } from '../../shared/ingredients.model';
import { ingredientesService } from './ingredientes.service';
import * as shoppingListAction from '../store/shopping-list.action';
import * as fromShoppinglist from '../store/shopping-list.reducer';
import { state } from '@angular/animations';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  ingredientes: Observable< {ingredientes: Ingredientes[]} >;
  editMode = false;
  subs = new Subscription();
  
  editedIngredient: Ingredientes;
  indexEdit: number;
  
  constructor(private ingserv : ingredientesService, private store: Store<fromShoppinglist.AppState>) {}
  @ViewChild("f") form: NgForm;
  
  
  ngOnInit(): void {
    this.subs = this.store.select('shoppingList').subscribe(stateData => {
      if (stateData.editedIngredientIndex > -1) {
        this.editMode = true;
        this.indexEdit = stateData.editedIngredientIndex;
        this.editedIngredient = stateData.editedIngredient;
        this.form.setValue({
          name: this.editedIngredient.nombre,
          value: this.editedIngredient.valor
        })
      } else {
        this.editMode = false;
      }
    });
    // this.ingredientes = this.store.select('shoppingList');
    this.store.select('shoppingList').subscribe();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  onAgregarDatos(f: NgForm) {
    const value = f.value;
    const nuevoIng = new Ingredientes(value.nombre, value.valor);
    if(this.editMode == true) {
      this.store.dispatch(
        new shoppingListAction.UpdateIngredients({
          index: this.indexEdit, 
          ingrediente: nuevoIng
        }));
    }
    else
    {
      this.store.dispatch(new shoppingListAction.AddIngredient(nuevoIng));
    }
  }

  eliminarIngrediente() {
    this.store.dispatch(new shoppingListAction.DeleteIngredientes(this.indexEdit));
    this.form.reset();
  }

  limpiarInputs(f: NgForm) {
  this.form.reset();
  this.editMode = false;
  this.store.dispatch(new shoppingListAction.StopEdit());
  }
}
  
