import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
interface RespuestaAuth{
    idToken:string;
    email: string;
    refreshToken : string;
    expiresIn: string;
    localId : string;
}

@Injectable({providedIn:"root"})
export class authService {
    constructor(private http: HttpClient){}
    login(mail: string, pass: string){
        return this.http.post<RespuestaAuth>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC3plBd3OWTeAifQE1lbfV-Rf8cWqDz2Lw"
        ,{
            email: mail,
            password: pass,
            returnSecureToken: true
        }).pipe(catchError( errorRes=>{
            let errorMsg = 'Ocurrio un error desconocido';
            if(!errorRes.error || !errorRes.error.error){ 
                return throwError(errorMsg)
            }
            switch(errorRes.error.error.message)
            {
                case 'EMAIL_EXISTS':
                    errorMsg = 'Ese mail ya existe';
                case 'OPERATION_NOT_ALLOWED': 
                errorMsg = 'no tenes los permisos suficientes';
                case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                    errorMsg = 'actividad inusual en tu cuenta, intentalo despues';
            }
            return throwError(errorMsg)
        }
            
        ))
    }
}