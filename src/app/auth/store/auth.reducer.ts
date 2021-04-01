import * as AuthActions from './auth.actions';
import { User } from "../user.model";

export interface State {
    user: User;
    authError: string;
    loading: boolean;
}

const initialState: State = {
    user: null,
    authError: null,
    loading: false
}

export function AuthReducer(
    state: State = initialState, 
    action: AuthActions.authType) {

    switch (action.type) {
        case AuthActions.LOGIN:
            const user = new User(
                action.payload.email,
                action.payload.userId,
                action.payload._token,
                action.payload._tokenExpirationDate
            );
            return {
                ...state,
                authError: null,
                user: user,
                loading: false
            };
        case AuthActions.LOGOUT:
            return {
                ...state,
                user: null
            };
        case AuthActions.LOGIN_START:
        case AuthActions.SINGUP_START:
            return {
                ...state,
                authError: null,
                loading: true
            };

        case AuthActions.CLEAR_ERROR:
            return {
                ... state,
                authError: null
            };

        case AuthActions.LOGIN_FAIL:
            return {
                ...state,
                user: null,
                authError: action.payload,
                loading: false
            };
        default:
            return state;
    }
}