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

    //-----------------------------REGISTRO-----------------------
    registro(mail: string, pass: string) {
        return this.http.post<RespuestaAuth>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + environment.firebaseKey
        ,{
            email: mail,
            password: pass,
            returnSecureToken: true
            
        }).pipe(catchError( this.handleError),tap(resData => {
            this.handleUser(resData.email,resData.localId,resData.idToken,+resData.expiresIn);
        }))
    }
    //--------------------------------LOGIN-----------------------
    login(mail : string, pass: string) {
        return this.http.post<RespuestaAuth>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseKey,
        {
            email : mail,
            password : pass,
            returnSecureToken : true
        }).pipe(catchError( this.handleError),tap(resData => {
            this.handleUser(resData.email,resData.localId,resData.idToken,+resData.expiresIn);
        })
        )
    }
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
                mail: usuario.mail, 
                id: usuario.id, 
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
            mail: mail, 
            id: userId,
            _token: token,
            _tokenExpirationDate: new Date(expDate)
            }));
        this.user.next(user); 
        this.autologout(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
        
    }



    private handleError(errorRes : HttpErrorResponse){
        let errorMsg = 'Ocurrio un error desconocido';
        if(!errorRes.error || !errorRes.error.error){ 
            return throwError(errorMsg) 
        }
        switch(errorRes.error.error.message){
            case 'EMAIL_EXISTS':
                errorMsg = 'El mail ingresado ya existe.';
                break;
            case 'OPERATION_NOT_ALLOWED': 
                errorMsg = 'El usuario no tiene los permisos suficientes.';
                break;
            case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                errorMsg = 'Actividad inusual en la cuenta, intentalo despues.';
                break;
            case 'INVALID_PASSWORD':
                errorMsg = 'La contraseña es invalida.';
                break;
            case 'USER_DISABLED':
                errorMsg = 'El usuario fue desactivado por un administrador.';
                break;
                case 'EMAIL_NOT_FOUND':
                errorMsg = 'El mail no existe.';
                break;
        }
        return throwError(errorMsg)
    }
//---------------------------LOGOUT Y AUTOLOGOUT-------------------------
    logout(){
        this.store.dispatch(new authActions.Logout());
        this.router.navigate(['./login']);
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