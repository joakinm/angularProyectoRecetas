import { Injectable } from '@angular/core';
import { recipeServices } from '../recipes/recipes.service';
import {ingredientesService} from '../shopping/shopping-edit/ingredientes.service';
import { Recipe } from '../recipes/recipe.model';
import {HttpClient} from '@angular/common/http';
import { throwError, Subject, } from 'rxjs';
import { map, tap, catchError, take, exhaustMap } from 'rxjs/operators';
import { authService } from '../auth/auth.service';

@Injectable ({providedIn: 'root'})

export class dataServices {
    rec: Recipe[];
    error = new Subject<string>();
    constructor(private recServ:recipeServices , private ingServ : ingredientesService,
                private http: HttpClient, private authServ : authService){}
                
    guardarRecetas(){
        this.rec = this.recServ.getRecetas();
        this.http.put('https://recetasproyecto-104e7.firebaseio.com/recipes.json',
            this.rec
            )
        .subscribe(responseData => {
            alert('datos guardados correctamente');
        }, err=>{alert('Hubo un error al ingresar datos');this.error.next(err.message); } //haciendo un subscribe del error y copiando el mensaje del error
        );
    }

    traerRecetas(){
        return  this.http.get<Recipe[]>('https://recetasproyecto-104e7.firebaseio.com/recipes.json')
        .pipe(map(recipes =>{
            return recipes.map( recipe =>{
                return{...recipe, ingredientes: recipe.ingredientes ? recipe.ingredientes: []};
            });
        }),
        tap(recetas =>{
            this.recServ.agregarRecetas(recetas);
        })
        );
    }

    getDatos(){
        
        return this.http.get <{name : string}>('https://recetasproyecto-104e7.firebaseio.com/recipes.json')
        .pipe(map( responseData => {
            const arr = [];
            for(const key in responseData){
            if(responseData.hasOwnProperty(key)){
                arr.push({...responseData[key],id: key});
            }
            }
            return arr;
        }
        ,catchError( errorRes=>{
            return throwError(errorRes); //haciendo un throw del error para enviarlo donde quiera
        })//por ejemplo, enviarlo a otro lado para estudiarlo
        ));
    }
}