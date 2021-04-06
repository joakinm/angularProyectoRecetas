import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { recipeServices } from '../recipes.service';
import * as fromApp from '../../store/app.reducer';
import * as recipesActions from '../store/recipe.actions';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  titulo: string;
  descripcion: string;
  foto: string;
  storeSubs = new Subscription();

  form: FormGroup;
  constructor(
    private rutaActivada: ActivatedRoute,
    private router: Router, 
    private recetaServicio: recipeServices,
    private store: Store<fromApp.AppState>) { }
  
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

  ngOnDestroy() {
    if (this.storeSubs) {
      this.storeSubs.unsubscribe();
    }
  }

  private initForm() {
    let recetaNombre = '';
    let recetaImg = '';
    let recetaDesc = '';
    let recetaingredientes = new FormArray([]);

    if (this.editMode) {
      this.storeSubs = this.store.select('recipes').pipe(map( recipeState => {
        return recipeState.recipes.find((rec,index) => {
          return index === this.id;
        })
      })).subscribe(recipe => {
        recetaNombre = recipe.nombre;
        recetaImg = recipe.imagen;
        recetaDesc = recipe.descripcion;
        if (recipe.ingredientes) {
          for( let ingrediente of recipe.ingredientes){
            recetaingredientes.push(
              new FormGroup({            
              'nombre' : new FormControl(ingrediente.nombre, Validators.required),
              'valor' : new FormControl(ingrediente.valor, [Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
              })
            );
          }
        }
      })
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

  onagregarIngrediente() {
    (<FormArray>this.form.get('ingredientes')).push(
      new FormGroup({
        'nombre' : new FormControl(null, Validators.required),
        'valor' : new FormControl(null, [Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
    }))
  }

  onSubmit() {
    if (this.editMode) {
      this.store.dispatch(new recipesActions.UpdateRecipe({
        newRecipe: this.form.value, 
        index: this.id
      }));
    } else {
      this.store.dispatch(new recipesActions.AddRecipe(this.form.value));
    }
    this.cerrarForm();
  
  }

  cerrarForm() {
    this.router.navigate(['../'], {relativeTo: this.rutaActivada});
  }

  borrarIng(i: number ) {
    (<FormArray>this.form.get('ingredientes')).removeAt(i);
  }
}
