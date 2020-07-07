import { Injectable } from '@angular/core';
import { recipeServices } from '../recipes/recipes.services';
import {ingredientesServices} from '../shopping/shopping-edit/ingredientes.services';
import { Recipe } from '../recipes/recipe.model';
import { Ingredientes } from './ingredients.model';
import {HttpClient} from '@angular/common/http';
import { throwError, Subject, } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

@Injectable ({providedIn: 'root'})

export class dataServices {
    rec: Recipe[];
    error = new Subject<string>();
    constructor(private recServ:recipeServices , private ingServ : ingredientesServices,
                private http: HttpClient){}
                
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

    // guardarIngredientes(){
    //     this.ing = this.ingServ.getIngredientes();
    //     this.http.put(
    //         'https://recetasproyecto-104e7.firebaseio.com/ingredients.json',
    //         this.ing
    //         )
    //         .subscribe(responseData => {
    //             console.log(responseData);
    //         }, err=>{this.error.next(err.message); } //haciendo un subscribe del error y copiando el mensaje del error
    //         );
    //     }

    // guardarDatos(){
    //     this.rec = this.recServ.getRecetas();
    //     this.ing = this.ingServ.getIngredientes();
    //     let postData = {'recetas':this.rec, 'ingredientes':this.ing};
    //     this.http
    //         .post<{name : string}>(
    //         'https://recetasproyecto-104e7.firebaseio.com/',
    //         postData
    //         )
    //         .subscribe(responseData => {
    //         console.log(responseData);
    //         }, err=>{this.error.next(err.message); } //haciendo un subscribe del error y copiando el mensaje del error
    //         );
    // }

    getDatos(){
        
        return this.http.get <{name : string}>('https://recetasproyecto-104e7.firebaseio.com/recipes.json')
        .pipe(map( responseData => {
            const arr = [];
            for(const key in responseData){
            if(responseData.hasOwnProperty(key)){
                console.log(responseData); arr.push({...responseData[key],id: key});
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