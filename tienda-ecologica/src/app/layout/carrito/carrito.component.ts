
import { Component, OnInit, Input } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Carrito } from '../../modelos/modelos';

@Component({
    selector: 'app-carrito',
    templateUrl: './carrito.component.html',
    styleUrls: ['./carrito.component.less']
})

export class CarritoComponent implements OnInit {

    // variables que almacenan los calculos de gastos
    total: number = 0;
    gastosEnvio: number = 0;
    totalConGastosEnvio: number = 0;

    // array de elementos Carrito
    public listaCarrito: Carrito[] = [];

    // seter para opcionMenu, cada vez que cambia opcionMenu llama a getElementosCarrito.
    @Input() set opcionMenu(v: string) {
        if (v === "carrito") {
            this.getElementosCarrito();
        }
    }

    constructor(public appService: AppService, private http: HttpClient) { }

    ngOnInit(): void {
        this.getElementosCarrito();
    }

    borrarElementoCarrito(elemento) {
        return this.http.delete('http://localhost:3000/carrito/' + elemento.id)
            .subscribe(
                data => {
                    this.appService.mostrarMensaje({ 'mensaje': 'Se ha eliminado el producto del carrito', 'tipo': 'ok' });
                    //cargamos de nuevo el carrito para que se actualice
                    this.opcionMenu = "carrito";
                },
                (err: HttpErrorResponse) => {
                    this.appService.mostrarMensaje({ 'mensaje': 'Se ha producido un error', 'tipo': 'error' });
                }
            )
    }

    //obtener los elementos del carrito para el usuario conectado
    getElementosCarrito() {
        this.listaCarrito = [];
        return this.http.get('http://localhost:3000/carrito?email=' + this.appService.usuarioConectado)
            .subscribe(
                (data: any) => {
                    this.listaCarrito = data;
                    this.calcularTotalSinGastosEnvio();
                },
                (err: HttpErrorResponse) => {
                    this.appService.mostrarMensaje({ 'mensaje': 'Se ha producido un error', 'tipo': 'error' });
                });
    }

    // suma todos los precios oferta de los productos.
    // el precioOferta siempre va relleno, puede valer lo mismo que el precio sin oferta
    calcularTotalSinGastosEnvio() {
        this.total = 0;
        for (let i = 0; i < this.listaCarrito.length; i++) {
            this.total = this.total + this.listaCarrito[i].cantidad * this.listaCarrito[i].precioProductoOferta;
        }
        return this.total;
    }

    respuestaConfirma(evento) {
        if (evento) {
            this.appService.mostrarMensaje({
                'mensaje': 'Ha autorizado el pago por un importe total de: '
                    + this.total + ' le redirigimos a la pasarela de pago', 'tipo': 'ok'
            });

        } else {
            this.appService.mostrarMensaje({
                'mensaje': 'No ha autorizado el pago por un importe total de: '
                    + this.total + '. Cancelamos la operación ', 'tipo': 'ok'
            });
        }
    }
}