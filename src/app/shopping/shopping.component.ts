import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ingredientes} from '../shared/ingredients.model';
import{ingredientesServices} from './shopping-edit/ingredientes.services';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss']
})

export class ShoppingComponent implements OnInit, OnDestroy {
  
  ingredientes : Ingredientes[];
  private subsIngServ : Subscription;
  
  constructor(private ingserv : ingredientesServices) {}

    
  ngOnInit(): void {
    this.ingredientes = this.ingserv.getIngredientes();
    this.subsIngServ = this.ingserv.ingredienteEditado.subscribe(
      (ing:Ingredientes[]) => {this.ingredientes = ing;}
    )
  }

  ngOnDestroy(){
    this.subsIngServ.unsubscribe();
  }

  onAgregarIngrediente($event){
  this.ingserv.onAgregarIngrediente($event);
  }
  onEditarIngrediente(index:number){
    this.ingserv.ingredienteEdicion.next(index);
  }
  


}
