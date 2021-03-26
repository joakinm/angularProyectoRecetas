import * as authActions from './auth.action';
import { User } from "../user.model";

export interface State {
    user: User;
}

const initialState: State = {
    user: null
}

export function AuthReducer(
    state: State = initialState, 
    action: authActions.authType) {

    switch (action.type) {
        case authActions.LOGIN:
            const user = new User(
                action.payload.mail,
                action.payload.id,
                action.payload._token,
                action.payload._tokenExpirationDate
            );
            return {
                ...state,
                user: user
            }

        case authActions.LOGOUT:
            return {
                ...state,
                user: null
            }
        default:
            return state;
    }
}