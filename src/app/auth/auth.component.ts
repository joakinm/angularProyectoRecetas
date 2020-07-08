import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { authService, RespuestaAuth } from './auth.service';
import { Observable } from 'rxjs';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  modoLogin = true;
  isLogin = false;
  error:string = null;
  
  
  constructor(private authserv : authService, private router : Router) { }
  
  ngOnInit(): void {
    
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
      this.isLogin = false;
    });
    form.reset();
  }
}
