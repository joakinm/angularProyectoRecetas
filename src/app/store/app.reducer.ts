
import * as fromShopping from 'src/app/shopping/store/shopping-list.reducer';
import * as fromAuth from 'src/app/auth/store/auth.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    shoppingList: fromShopping.State;
    auth: fromAuth.State;
}

export const appReducer: ActionReducerMap<AppState> = {
    shoppingList: fromShopping.ShoppingListReducer,
    auth: fromAuth.AuthReducer
};