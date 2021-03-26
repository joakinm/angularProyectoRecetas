import { Action } from "@ngrx/store";
import { BehaviorSubject } from "rxjs";

import { User } from "../user.model";

export interface State {
    user: BehaviorSubject<User>;
}

const initialState: State = {
    user: null
}

export function AuthReducer(
    state: State = initialState, 
    action: Action) {
    return state;
}