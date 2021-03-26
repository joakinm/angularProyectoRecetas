import { NgModule } from '@angular/core';
import { recipeServices } from './recipes/recipes.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { authInterceptorService } from './auth/auth-interceptor.service';

@NgModule({
    providers:[
        recipeServices,{
        provide: HTTP_INTERCEPTORS, 
        useClass: authInterceptorService, multi:true
    }
    ]
})
export class CoreModule {}