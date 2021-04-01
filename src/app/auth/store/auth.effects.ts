import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, switchMap, map, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { User } from "../user.model";
import * as authActions from './auth.actions';

export interface AuthResponse{
    idToken:string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

const handleAuthentication = (
    expiresIn: number,
    email: string,
    userId: string,
    token: string
  ) => {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    localStorage.setItem('userData', JSON.stringify(user));
    return new authActions.Login({
      email: email,
      userId: userId,
      _token: token,
      _tokenExpirationDate: expirationDate
    });
  };

const handleError = (errorRes: any) => {
  let errorMsg = 'Ocurrio un error desconocido';
  if(!errorRes.error || !errorRes.error.error) { 
      return of(new authActions.LoginFail(errorMsg)) 
  }
  switch(errorRes.error.error.message) {
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
    return of(new authActions.LoginFail(errorMsg)) 
  }

@Injectable()

export class AuthEffects {
    @Effect()
    authSingup = this.actions$.pipe(
        ofType(authActions.LOGIN_START), 
        switchMap((authData: authActions.LoginStart) => {
            return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseKey,
        {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true
        }
        )
        .pipe( 
            map( resData => {
                return handleAuthentication(
                    +resData.email,
                    resData.localId,
                    resData.idToken ,
                    resData.expiresIn
                );
            }), 
            catchError(errorRes => {
                return handleError(errorRes);
            })
        )
        })
    );

    @Effect()
    authLogin = this.actions$.pipe(
        ofType(authActions.LOGIN_START),
        switchMap((authData: authActions.LoginStart) => {
          return this.http
            .post<AuthResponse>(
              'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' +
                environment.firebaseKey,
              {
                email: authData.payload.email,
                password: authData.payload.password,
                returnSecureToken: true
              }
            )
            .pipe(
              map(resData => {
                return handleAuthentication(
                  +resData.expiresIn,
                  resData.email,
                  resData.localId,
                  resData.idToken
                );
              }),
              catchError(errorRes => {
                return handleError(errorRes);
              })
            );
        })
      );
    
    @Effect({dispatch: false})
    authRedirect = this.actions$.pipe(
        ofType(authActions.LOGIN, authActions.LOGOUT),
        tap(() => {
            this.router.navigate(['/']);
        })
    )

    @Effect()
  autoLogin = this.actions$.pipe(
    ofType(authActions.AUTO_LOGIN),
    map(() => {
      const userData: {
        email: string;
        id: string;
        _token: string;
        _tokenExpirationDate: string;
      } = JSON.parse(localStorage.getItem('userData'));
      if (!userData) {
        return { type: 'DUMMY' };
      }

      const loadedUser = new User(
        userData.email,
        userData.id,
        userData._token,
        new Date(userData._tokenExpirationDate)
      );

      if (loadedUser.token) {
        // this.user.next(loadedUser);
        return new authActions.Login({
          email: loadedUser.mail,
          userId: loadedUser.id,
          _token: loadedUser.token,
          _tokenExpirationDate: new Date(userData._tokenExpirationDate)
        });

        // const expirationDuration =
        //   new Date(userData._tokenExpirationDate).getTime() -
        //   new Date().getTime();
        // this.autoLogout(expirationDuration);
      }
      return { type: 'DUMMY' };
    })
  );

    @Effect({dispatch:false})
    authLogout = this.actions$.pipe(ofType(authActions.LOGOUT), tap(() => {
        localStorage.removeItem('userData');
    }));

    constructor(private actions$: Actions, private http: HttpClient, private router: Router ) {

    }
}