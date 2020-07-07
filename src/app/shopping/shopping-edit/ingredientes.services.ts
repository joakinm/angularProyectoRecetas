import { Subject } from 'rxjs';

import { Ingredientes} from '../../shared/ingredients.model';

export class ingredientesServices{
  ingredienteEditado = new Subject<Ingredientes[]>();
  ingredienteEdicion = new Subject<number>();
private ingredientes: Ingredientes[] = [
    new Ingredientes('tomates', 10),
    new Ingredientes('lechuga',5),
    new Ingredientes('papa',4)
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onAgregarIngrediente(ing : Ingredientes){
    this.ingredientes.push(ing);
    this.ingredienteEditado.next(this.ingredientes.slice());
  }
  onAgregarIngredientes(ing : Ingredientes[]){
    this.ingredientes.push(...ing);
    this.ingredienteEditado.next(this.ingredientes.slice());
  }

  getIngredientes(){
    return this.ingredientes.slice();
  }
  getIngrediente(index:number){ 
    return this.ingredientes[index];
  }

  EditarIngrediente(index:number, ing : Ingredientes){
    this.ingredientes[index] = ing;
    this.ingredienteEditado.next(this.ingredientes.slice());
  }
  eliminarIngrediente(index:number){
    this.ingredientes.splice(index,1);
    this.ingredienteEditado.next(this.ingredientes.slice());
  }
}