import { NgModule } from '@angular/core';
import { DropdownDirective } from './dropdown.directive';
import { LoadingSpinner } from './loading-spinner.component';
import { AlertComponent } from './alert/alert.component';
import { placeHolderDirective } from './placeholder/placeholder.directive';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations:[
    DropdownDirective,
    LoadingSpinner,
    AlertComponent,
    placeHolderDirective,
    ], 
    imports:[
    CommonModule
    ],
    exports:[
    DropdownDirective,
    LoadingSpinner,
    AlertComponent,
    placeHolderDirective,
    CommonModule
    ]
})
export class SharedModule{

}