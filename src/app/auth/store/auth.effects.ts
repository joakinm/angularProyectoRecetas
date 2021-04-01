import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, switchMap, map, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import * as authActions from './auth.actions';

export interface RespuestaAuth{
    idToken:string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable()

export class AuthEffects {
    @Effect()
    authLogin = this.actions$.pipe(
        ofType(authActions.LOGIN_START), 
        switchMap((authData: authActions.LoginStart) => {
            return this.http.post<RespuestaAuth>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseKey,
        {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true
        }
        )
        .pipe( map( resData => {
            const expDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
            return new authActions.Login({
                mail: resData.email,
                id: resData.localId,
                _token: resData.idToken ,
                _tokenExpirationDate: expDate
            });
        }), catchError(error => {
            return of();
            })
        )
        })
    )

    @Effect({dispatch: false})
    authSuccess = this.actions$.pipe(
        ofType(authActions.LOGIN),
        tap(() => {
            this.router.navigate(['/']);
        })
    )

    constructor(private actions$: Actions, private http: HttpClient, private router: Router ) {

    }
}