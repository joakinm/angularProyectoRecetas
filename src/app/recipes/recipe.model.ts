import { Ingredientes } from '../shared/ingredients.model';

export class Recipe{
    public nombre : string;
    public descripcion : string;
    public imagen : string;
    public ingredientes: Ingredientes[];

    constructor(name: string, desc: string,img:string, ing : Ingredientes[]){
        this.nombre = name;
        this.descripcion = desc;
        this.imagen = img;
        this.ingredientes = ing;
    }
}