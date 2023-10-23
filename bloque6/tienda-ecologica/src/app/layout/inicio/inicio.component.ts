// Creado por Marta Lara Mayo 2021
// Revisado por Pepe Millan Mayo 2021
import { Component, ComponentFactoryResolver, ElementRef, OnInit, ViewContainerRef } from '@angular/core';
import { AppService } from '../../app.service'
import { ProductosComponent } from '../productos/productos.component';


@Component({
    selector: 'app-inicio',
    templateUrl: './inicio.component.html',
    styleUrls: ['./inicio.component.less']
})
export class InicioComponent implements OnInit {

    constructor(public appService: AppService,
        public vcr: ViewContainerRef,
        private cfr: ComponentFactoryResolver,
        private element:ElementRef) {
    }

    ngOnInit(): void {

    }
    

   
    Productos(opcion){
        this.appService.opcionMenu = 'PRODUCTOS';
        this.appService.opcionProductos = opcion;
    }
}
