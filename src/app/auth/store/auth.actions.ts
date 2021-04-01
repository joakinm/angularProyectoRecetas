import { Action } from '@ngrx/store';
import { User } from '../user.model';

export const LOGIN = '[Auth] Login';
export const LOGIN_START = '[Auth] LoginStart';
export const LOGIN_FAIL = '[Auth] LoginFail';
export const SINGUP_START = '[Auth] SingupStart'
export const CLEAR_ERROR = '[Auth] CleanError';
export const LOGOUT = '[Auth] Logout';

export class Login implements Action {
    readonly type = LOGIN;
    constructor (public payload: {
        mail: string,
        id: string,
        _token: string,
        _tokenExpirationDate: Date
        }
    ) {}
}
export class Logout implements Action {
    readonly type = LOGOUT;
}

export class LoginStart implements Action {
    readonly type = LOGIN_START;
    constructor(public payload: {email: string, password: string}) {}
}

export class SingupStart implements Action {
    readonly type = SINGUP_START;
    constructor(public payload: {email: string, password: string}) {}
}

export class ClearError implements Action {
    readonly type = CLEAR_ERROR;
}

export class LoginFail implements Action {
    readonly type = LOGIN_FAIL;
    constructor(public payload: string) {}
}

export type authType = 
| Login 
| Logout
| LoginStart 
| LoginFail
| SingupStart
| ClearError;