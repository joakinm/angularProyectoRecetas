import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { environment } from '../../environments/environment';
import * as fromApp from '../store/app.reducer';
import * as authActions from './store/auth.actions'
import { Store } from '@ngrx/store';

export interface RespuestaAuth{
    idToken:string;
    email: string;
    refreshToken : string;
    expiresIn: string;
    localId : string;
    registered ? : boolean;
}

@Injectable({providedIn:"root"})
export class authService {

    user = new BehaviorSubject<User>(null);
    constructor(private http: HttpClient, 
                private router: Router, 
                private store: Store<fromApp.AppState>
                ) {}
    tokenTimerExpiration : any;

    autoLogin() {
        const userData: {
            mail: string;
            id: string;
            _token: string;
            _tokenExpirationDate: Date} = JSON.parse(localStorage.getItem('userData'));
        if (!userData)
        {return}
        const usuario = new User(userData.mail,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationDate)
            )
            
        if (usuario.token){
            this.store.dispatch(new authActions.Login({
                email: usuario.mail, 
                userId: usuario.id, 
                _token: usuario.token, 
                _tokenExpirationDate: new Date(userData._tokenExpirationDate)
            }));
            const duracionExpiracion = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autologout(duracionExpiracion);
            
        }
    }
    //-------------------METHODS PRIVADOS PARA USUARIO Y ERRORES---------------
    private handleUser(mail: string, userId : string, token: string, expiresIn: number) {
        const expDate = new Date(new Date().getTime() + +expiresIn * 1000);
        const user = new User(mail, userId, token, expDate);
        this.store.dispatch(new authActions.Login({
            email: mail, 
            userId: userId,
            _token: token,
            _tokenExpirationDate: new Date(expDate)
            }));
        this.user.next(user); 
        this.autologout(expiresIn * 1000);
        // localStorage.setItem('userData', JSON.stringify(user));
        
    }

//---------------------------LOGOUT Y AUTOLOGOUT-------------------------
    logout(){
        this.store.dispatch(new authActions.Logout());
        // this.router.navigate(['./login']);
        localStorage.removeItem('userData');
        if(this.tokenTimerExpiration){
            clearTimeout(this.tokenTimerExpiration);
        }
        this.tokenTimerExpiration = null;
    }
    autologout(tiempoExpiracion : number){
        this.tokenTimerExpiration = setTimeout(() => {
            this.logout();
        }, tiempoExpiracion);
    }
}