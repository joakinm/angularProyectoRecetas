import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ShoppingComponent } from './shopping.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        ShoppingComponent,
        ShoppingEditComponent
    ],
    imports:[
        SharedModule,
        FormsModule,
        AppRoutingModule,
    ]
})
export class ShoppingModule{}