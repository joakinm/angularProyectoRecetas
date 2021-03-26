import { Action } from '@ngrx/store';
import { User } from '../user.model';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

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

export type authType = 
| Login 
| Logout;