import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingComponent } from './shopping/shopping.component';
import { AuthComponent } from './auth/auth.component';


const appRoutes: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch:'full'},
  {path:'recipes', loadChildren:() => import('./recipes/recipes.module').then(m=> m.RecipesModule)}, //lazy loading RecipesModule
  {path: 'shopping', component: ShoppingComponent},
  {path: 'login',component: AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})



export class AppRoutingModule { }
