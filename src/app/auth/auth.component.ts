import { Component, OnInit, ViewChild, ComponentFactoryResolver, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { authService } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { placeHolderDirective } from '../shared/placeholder/placeholder.directive';
import * as fromApp from '../store/app.reducer';
import * as authActions from './store/auth.actions';
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
  constructor(private authserv : authService, private router : Router, private cmpFactoryResolver : ComponentFactoryResolver, private store: Store<fromApp.AppState>) { }
  private closeSubscription : Subscription;
  ngOnInit(): void {
    this.store.select('auth').subscribe(authState => {
      this.isLogin = authState.loading;
      this.error = authState.authError;
      if (this.error) {
        this.showErrorAlert(this.error);
      }
    });
  }
  ngOnDestroy() {
    if(this.closeSubscription){
      this.closeSubscription.unsubscribe();
    }
  }

  onCambiarModo() {
    this.modoLogin = !this.modoLogin;
  }
  
  
  onSubmitForm(form : NgForm) {
    const mail = form.value.mail;
    const pass = form.value.password;
    if (!form.valid) {
      return
    }
    this.isLogin = true;
    if(this.modoLogin) {
      this.store.dispatch(new authActions.LoginStart({email: mail, password: pass}));
      // auth = this.authserv.login(mail,pass)
    } else {
      this.store.dispatch(new authActions.SingupStart({email: mail, password: pass}));
    }
    // auth.subscribe(resData => {
    //   this.isLogin = false;
    //   this.router.navigate(['/recipes']);
    // }, err => {
    //   this.error = err;
    //   this.showErrorAlert(err);
    //   this.isLogin = false;
    // });
    form.reset();
  }

  onHandleError() {
    this.store.dispatch(new authActions.ClearError());
  }
  
  private showErrorAlert(message:string) {
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
