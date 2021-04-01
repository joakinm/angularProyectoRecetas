import { Injectable } from '@angular/core';
import * as fromApp from '../store/app.reducer';
import * as authActions from './store/auth.actions'
import { Store } from '@ngrx/store';

@Injectable({providedIn:"root"})
export class authService {
    constructor(
                private store: Store<fromApp.AppState>
                ) {}
    tokenTimerExpiration : any;
    
    setLogoutTimer(expirationDuration: number) {
        this.tokenTimerExpiration = setTimeout(() => {
            this.store.dispatch(new authActions.Logout());
        }, expirationDuration);
    }
    
    clearLogoutTimer() {
        if (this.tokenTimerExpiration) {
            clearTimeout(this.tokenTimerExpiration);
            this.tokenTimerExpiration = null;
        }
    }
}