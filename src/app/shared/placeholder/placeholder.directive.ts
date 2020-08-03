import { Directive, ViewContainerRef } from "@angular/core";

 @Directive({
     selector:'[appPlaceHolder]',
 })

 export class placeHolderDirective{
     constructor(public viewContainerRef:ViewContainerRef){}
 }