import { Component, OnInit, OnDestroy} from '@angular/core';
import { dataServices } from '../shared/data.services';
import {Subscription } from 'rxjs';
import { authService } from '../auth/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class headerComponent implements OnInit, OnDestroy{
    private userSub : Subscription;
    logueado = false;
    constructor(private data: dataServices, private authServ: authService) {}
    
    ngOnInit(){
       this.userSub = this.authServ.user.subscribe(
           user =>{
               this.logueado = !!user;// lo mismo que usar (!user ? false : true;)
               console.log(!user);
               console.log (!!user);
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
        ;
    }
    onLogout(){
        this.authServ.logout();
    }
}