import { NgModule } from '@angular/core';
import { ingredientesServices } from './shopping/shopping-edit/ingredientes.services';
import { recipeServices } from './recipes/recipes.services';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { authInterceptorService } from './auth/auth-interceptor.service';

@NgModule({
    providers:[
        ingredientesServices, 
        recipeServices,{
        provide: HTTP_INTERCEPTORS, 
        useClass: authInterceptorService, multi:true
    }
    ]
})
export class CoreModule {}