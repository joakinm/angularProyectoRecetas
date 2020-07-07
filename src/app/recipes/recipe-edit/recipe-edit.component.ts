import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { recipeServices } from '../recipes.services';


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  // @ViewChild('f',{static:false}) singupform: NgForm;
  titulo: string;
  descripcion: string;
  foto: string;

  form: FormGroup;
  constructor(private rutaActivada : ActivatedRoute, private router: Router, private recetaServicio: recipeServices) { }
  
  id : number;
  editMode: boolean;

  ngOnInit(): void {
    this.rutaActivada.params.subscribe(
    ( params: Params ) => { 
      this.id = +params['id']; 
      this.editMode = params['id'] != null;
      this.initForm();
    }
    );
  }

  private initForm(){
    let recetaNombre = '';
    let recetaImg = '';
    let recetaDesc = '';
    let recetaingredientes = new FormArray([]);

    if(this.editMode){
      const receta = this.recetaServicio.getRecetaID(this.id);
      recetaNombre = receta.nombre;
      recetaImg = receta.imagen;
      recetaDesc = receta.descripcion;
      if (receta.ingredientes){
        for( let ingrediente of receta.ingredientes){
          recetaingredientes.push(
            new FormGroup({            
            'nombre' : new FormControl(ingrediente.nombre, Validators.required),
            'valor' : new FormControl(ingrediente.valor, [Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          );
        }
      }
    }

    this.form = new FormGroup({
      'nombre' : new FormControl(recetaNombre, Validators.required),
      'descripcion': new FormControl(recetaDesc, Validators.required),
      'imagen' : new FormControl(recetaImg, Validators.required),
      'ingredientes' : recetaingredientes
    });
    
  }
  
  get controls() { // a getter!
    return (<FormArray>this.form.get('ingredientes')).controls;
  }

  onagregarIngrediente(){
    (<FormArray>this.form.get('ingredientes')).push(
      new FormGroup({
        'nombre' : new FormControl(null, Validators.required),
        'valor' : new FormControl(null, [Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
    }))
  }

  onSubmit(){
    if (this.editMode)
    {this.recetaServicio.editarReceta(this.form.value,this.id);}
    else
    {this.recetaServicio.agregarReceta(this.form.value);}
    this.cerrarForm();
  }

  cerrarForm(){
    this.router.navigate(['../'], {relativeTo: this.rutaActivada});
  }

  borrarIng(i : number){
    (<FormArray>this.form.get('ingredientes')).removeAt(i);
  }
}
