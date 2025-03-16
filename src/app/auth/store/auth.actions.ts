import { Action } from '@ngrx/store';

export const LOGIN = '[Auth] Login';
export const LOGIN_START = '[Auth] LoginStart';
export const LOGIN_FAIL = '[Auth] LoginFail';
export const SINGUP_START = '[Auth] SingupStart'
export const CLEAR_ERROR = '[Auth] CleanError';
export const AUTO_LOGIN = '[Auth] AutoLogin';
export const LOGOUT = '[Auth] Logout';

export class Login implements Action {
    readonly type = LOGIN;
    constructor (public payload: {
        email: string,
        userId: string,
        _token: string,
        _tokenExpirationDate: Date,
        redirect: boolean
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

export class AutoLogin implements Action {
    readonly type = AUTO_LOGIN;
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
| ClearError
| AutoLogin;