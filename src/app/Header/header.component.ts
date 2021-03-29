import { Component, OnInit, OnDestroy} from '@angular/core';
import { dataServices } from '../shared/data.services';
import {Subscription } from 'rxjs';
import { authService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import { map } from 'rxjs/operators';

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
        this.authServ.logout();
    }
}