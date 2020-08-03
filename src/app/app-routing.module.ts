import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { authGuard } from './auth/auth.guard';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { recipeResolverService } from './recipes/recipes-resolver.service';
import { AuthComponent } from './auth/auth.component';


const appRoutes: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch:'full'},
  {path: 'shopping', component: ShoppingComponent},
  {path: 'recipes',component: RecipesComponent, canActivate:[authGuard], children: [
    {path: '', component: RecipeStartComponent},
    {path: 'new', component:RecipeEditComponent},
    {path: ':id', component: RecipeDetailComponent,resolve:[recipeResolverService]},
    {path: ':id/edit', component:RecipeEditComponent,resolve:[recipeResolverService]},
  ] },
  {path: 'login',component: AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})



export class AppRoutingModule { }
