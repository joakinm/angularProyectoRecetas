import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Ingredientes } from '../../shared/ingredients.model';
import * as shoppingListAction from '../store/shopping-list.action';
import * as fromShoppinglist from '../store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  editMode = false;
  subs = new Subscription();
  
  editedIngredient: Ingredientes;
  
  constructor(private store: Store<fromShoppinglist.AppState>) {}
  @ViewChild("f") form: NgForm;
  
  ngOnInit(): void {
    this.subs = this.store.select('shoppingList').subscribe(stateData => {
      if (stateData.editedIngredientIndex > -1) {
        this.editMode = true;
        this.editedIngredient = stateData.editedIngredient;
        this.form.setValue({
          nombre: this.editedIngredient.nombre,
          valor: this.editedIngredient.valor
        })
      } else {
        this.editMode = false;
      }
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  onAgregarDatos(f: NgForm) {
    const value = f.value;
    const nuevoIng = new Ingredientes(value.nombre, value.valor);
    if(this.editMode == true) {
      this.store.dispatch(new shoppingListAction.UpdateIngredients(nuevoIng));
    }
    else
    {
      this.store.dispatch(new shoppingListAction.AddIngredient(nuevoIng));
    }
  }

  eliminarIngrediente() {
    this.store.dispatch(new shoppingListAction.DeleteIngredientes());
    this.form.reset();
  }

  limpiarInputs(f: NgForm) {
  this.form.reset();
  this.editMode = false;
  this.store.dispatch(new shoppingListAction.StopEdit());
  }
}
  
