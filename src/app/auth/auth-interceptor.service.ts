import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { authService } from './auth.service';
import { take, exhaustMap } from 'rxjs/operators';

@Injectable()

export class authInterceptorService implements HttpInterceptor{
    constructor (private authServ : authService){}
    intercept(req : HttpRequest<any>, next : HttpHandler){
        return this.authServ.user.pipe(take(1),
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