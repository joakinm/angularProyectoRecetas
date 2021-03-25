import { NgModule } from '@angular/core';
import { ingredientesService } from './shopping/shopping-edit/ingredientes.service';
import { recipeServices } from './recipes/recipes.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { authInterceptorService } from './auth/auth-interceptor.service';

@NgModule({
    providers:[
        ingredientesService, 
        recipeServices,{
        provide: HTTP_INTERCEPTORS, 
        useClass: authInterceptorService, multi:true
    }
    ]
})
export class CoreModule {}