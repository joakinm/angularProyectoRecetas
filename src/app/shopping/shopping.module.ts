import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingComponent } from './shopping.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
    declarations: [
        ShoppingComponent,
        ShoppingEditComponent
    ],
    imports:[
        CommonModule,
        FormsModule,
        AppRoutingModule,
    ]
})
export class ShoppingModule{}