// Creado por Marta Lara Mayo 2021
// Revisado por Pepe Millan Mayo 2021
import { Component, ComponentFactoryResolver, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { AppService } from '../app.service';
import { fromEvent } from 'rxjs';
import { debounceTime, map, distinctUntilChanged, filter } from "rxjs/operators";
import { ProductosComponent } from '../layout/productos/productos.component';
import { InicioComponent } from '../layout/inicio/inicio.component';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.less']
})

export class HeaderComponent implements OnInit {

    // variable que contiene el texto introducido en el buscador. 
    // Luego se asigna a la variable del servicio para que esté 
    // disponible para el componente productos
    textoABuscar: string = "";
    // variable que almacena la referencia al input buscador en la vista
    @ViewChild("buscador", { static: true }) buscador: ElementRef;

    constructor(public appService: AppService,
        public vcr: ViewContainerRef,
        private cfr: ComponentFactoryResolver) { }

    ngOnInit(): void {
        this.declararObservableBuscador();
        this.appService.opcionMenu = 'INICIO';
    };

    //declarar observable buscador
    declararObservableBuscador() {
        //Cuando se carga la cabecera se declara un observable que se pone en marcha, 
        //cuando se pulsa con el teclado en el input #buscador
        //siempre que la referencia a #buscador se haya obtenido de forma satisfactoria
        //El observable sigue las siguientes reglas:
        //      primero se obtiene el valor del input #buscador
        //              se espera a tener como valor una cadena de más de 2 caracteres para evitar respuestas accidentales
        //              es espera un segunda para emitir el siguiente valor
        //              se comprueba que el valor a emitir es distinto del valor anterior

        //¿porqué no se funciona si declaramos el observable en el constructor ? 
        if (this.buscador && this.buscador.nativeElement) {
            fromEvent(this.buscador.nativeElement, 'input').pipe(

                // obtenemos el valor pulsado:
                map((event: any) => {
                    return event.target.value;
                })
                // trabajamos si se escriben más de dos caracteres:
                //, filter(res => res.length > 2)

                // esperamos 1000 milisegundos entre eventos:
                , debounceTime(1500)

                // tratamos siempre y cuando la cadena cambie 
                //, distinctUntilChanged()

                // subscription for response
            ).subscribe((texto: string) => {
                // al emitir llamamos a buscar con la cadena introducida en el buscador
                this.buscarProductos('PRODUCTOS', 'FILTRO', texto);
            });
        }
    }
    // cerramos la sesión "virtual"
    cerrarSesion() {
        this.appService.usuarioConectado = null;
        this.appService.sesionCreada = false;
    }

    buscarProductos(opcion:string, opcionProductos:string, filtro) {
        this.appService.filtroProductos = filtro;
       
        this.appService.opcionMenu = opcion.toUpperCase();
        if(this.appService.filtroProductos == '' &&  this.appService.opcionProductos  == 'FILTRO' ){
            this.appService.opcionProductos = 'todos';

        }else{
            this.appService.opcionProductos = opcionProductos;
        }  
        if( this.appService.opcionProductos  != 'FILTRO') this.textoABuscar = '';
     
    }

   
}
