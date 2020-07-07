import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { authService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  modoLogin = true;
  isLogin = false;
  error:string = null;

  constructor(private authserv : authService) { }

  ngOnInit(): void {

  }
  onCambiarModo(){
    this.modoLogin = !this.modoLogin;
  }

  onSubmitForm(form : NgForm){
    if (!form.valid){
      return
    }
    if(this.modoLogin){

    }else{
      const mail = form.value.mail;
      const pass = form.value.password;
      this.isLogin = true;
      this.authserv.login(mail,pass)
      .subscribe(resData => {
        this.isLogin = false;
      },err=>{
        this.error = err;
        this.isLogin = false;
      }
    );
    }
    form.reset();
  }
}
