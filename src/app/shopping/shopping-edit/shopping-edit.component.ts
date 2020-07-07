import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import {Ingredientes} from '../../shared/ingredients.model';
import { ingredientesServices } from './ingredientes.services';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  ingredientes : Ingredientes[];
  modoEdit=false;
  
  ing: Ingredientes;
  indexEdit:number;
  
  constructor(private ingserv : ingredientesServices) {}
  @ViewChild("f") formulario:NgForm;
  
  
  ngOnInit(): void {
    this.subscription = this.ingserv.ingredienteEdicion.subscribe(
      (index:number) => {
        this.indexEdit = index;
        this.modoEdit = true;//activo el modo edicion
        this.ing = this.ingserv.getIngrediente(index);
        this.formulario.setValue({//envia el valor del ingrediente a los inputs
          nombre : this.ing.nombre, 
          valor: this.ing.valor})
      });
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  onAgregarDatos(f:NgForm) {
    const value = f.value;
    const nuevoIng = new Ingredientes (value.nombre ,value.valor );
    if(this.modoEdit == true)
    {this.ingserv.EditarIngrediente(this.indexEdit,nuevoIng);}
    else
    {this.ingserv.onAgregarIngrediente(nuevoIng);}
  }
  eliminarIngrediente(){
    this.ingserv.eliminarIngrediente(this.indexEdit);
    this.formulario.reset();
  }

  limpiarInputs(f:NgForm){
  this.formulario.reset();
  this.modoEdit=false;
  }
}
  
