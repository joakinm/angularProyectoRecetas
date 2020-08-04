import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {  HttpClientModule} from '@angular/common/http';

import { headerComponent } from './Header/header.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RecipesModule } from './recipes/recipes.module';
import { ShoppingModule } from './shopping/shopping.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { AuthModule } from './auth/auth.module';


@NgModule({
  declarations: [
    AppComponent,
    headerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    RecipesModule,
    ShoppingModule,
    CoreModule, 
    AuthModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }