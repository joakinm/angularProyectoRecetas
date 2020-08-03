import { Component, OnInit, ViewChild, ComponentFactoryResolver, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { authService, RespuestaAuth } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { placeHolderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  modoLogin = true;
  isLogin = false;
  error:string = null;
  @ViewChild (placeHolderDirective,{static: false}) alertHost: placeHolderDirective;
  constructor(private authserv : authService, private router : Router, private cmpFactoryResolver : ComponentFactoryResolver) { }
  private closeSubscription : Subscription;
  ngOnInit(): void {
    
  }
  ngOnDestroy(){
    if(this.closeSubscription){
      this.closeSubscription.unsubscribe();
    }
  }
  onCambiarModo(){
    this.modoLogin = !this.modoLogin;
  }
  
  
  onSubmitForm(form : NgForm){
    const mail = form.value.mail;
    const pass = form.value.password;
    if (!form.valid){
      return
    }
    let auth : Observable<RespuestaAuth>
    this.isLogin = true;
    if(this.modoLogin){
      auth = this.authserv.login(mail,pass)
    }else{
      auth = this.authserv.registro(mail,pass)
    }
    auth.subscribe(resData => {
      this.isLogin = false;
      this.router.navigate(['/recipes']);
    },err=>{
      this.error = err;
      this.showErrorAlert(err);
      this.isLogin = false;
    });
    form.reset();
  }
  onHandleError(){
    this.error = null;
  }
  private showErrorAlert(message:string){
    const alertCmp = this.cmpFactoryResolver.resolveComponentFactory (AlertComponent);
    //uso el factory resolver para poder crear el componente dinamicamente
    const host = this.alertHost.viewContainerRef;
    host.clear();
    //creo el componente
    const componentRef = host.createComponent(alertCmp);
    //termino de crear el componente y paso el input y el output que tenia
    componentRef.instance.message = message;
    this.closeSubscription = componentRef.instance.close.subscribe(() => {
      this.closeSubscription.unsubscribe();
      host.clear();
    });

  }
}
