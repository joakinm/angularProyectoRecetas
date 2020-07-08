import { Component, OnInit } from '@angular/core';
import { authService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
constructor(private auth : authService){}
ngOnInit(){
  this.auth.autoLogin();
}
}
