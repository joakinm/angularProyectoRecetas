import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { authService } from './auth.service';
import { take, exhaustMap, map } from 'rxjs/operators';
import * as fromApp from '../store/app.reducer';
import { Store } from "@ngrx/store";

@Injectable()

export class authInterceptorService implements HttpInterceptor{
    constructor (private authServ : authService, private store: Store<fromApp.AppState>){}
    intercept(req : HttpRequest<any>, next : HttpHandler) {
        return this.store.select('auth').pipe(
            take(1),
            map(authState => {
                return authState.user;
            }),
            exhaustMap(user =>{//hecho asi para usar el token del usuario logueado
                if(!user)
                {
                    return next.handle(req)
                }
                const reqModificada = req.clone({
                    params: new HttpParams().set('auth',user.token)
                }) 
                return next.handle(reqModificada)}
            )
        )     
    }
}