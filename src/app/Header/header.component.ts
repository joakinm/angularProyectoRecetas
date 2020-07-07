import { Component} from '@angular/core';
import { dataServices } from '../shared/data.services';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class headerComponent{
    constructor(private data: dataServices) {}

    onGuardarDatos(){
        this.data.guardarRecetas();
    }

    onGetDatos(){
        this.data.traerRecetas().subscribe();
        ;
    }

}