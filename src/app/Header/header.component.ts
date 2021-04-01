import { Component, OnInit, OnDestroy} from '@angular/core';
import { Store } from '@ngrx/store';
import {Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { dataServices } from '../shared/data.services';
import { authService } from '../auth/auth.service';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class headerComponent implements OnInit, OnDestroy{
    private userSub : Subscription;
    logueado = false;
    constructor(private data: dataServices, private authServ: authService, private store: Store<fromApp.AppState>) {}
    
    ngOnInit() {
       this.userSub = this.store.select('auth')
       .pipe(map(authState => {
        return authState.user;
        }))
        .subscribe(
           user =>{
               this.logueado = !!user;// lo mismo que usar (!user ? false : true;)
       });
    }
    ngOnDestroy(){
        this.userSub.unsubscribe();
    }
    onGuardarDatos(){
        this.data.guardarRecetas();
    }

    onGetDatos(){
        this.data.traerRecetas().subscribe();
    }
    onLogout(){
        this.store.dispatch(new AuthActions.Logout());
    }
}