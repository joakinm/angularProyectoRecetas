import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {  HttpClientModule} from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { headerComponent } from './Header/header.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ShoppingModule } from './shopping/shopping.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { AuthModule } from './auth/auth.module';
import { appReducer } from './store/app.reducer';
import { AuthEffects } from './auth/store/auth.effects';
import { RecipeEffects } from './recipes/store/recipe.effects';
import { environment } from 'src/environments/environment';


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
    ShoppingModule,
    CoreModule, 
    AuthModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([AuthEffects, RecipeEffects]),
    StoreDevtoolsModule.instrument({logOnly: environment.production })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }