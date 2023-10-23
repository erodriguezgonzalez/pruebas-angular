// Creado por Marta Lara Mayo 2021
// Revisado por Pepe Millan Mayo 2021
//componente que muestra una lista de productos en base a la categorìa o al
//contenido del buscador
//tambien están en este componente los métodos de modificar y añadir al carrito
import { Component, Input, ViewChild } from '@angular/core';
import { AppService } from '../../app.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Carrito, Producto } from '../../modelos/modelos';

@Component({
    selector: 'app-productos',
    templateUrl: './productos.component.html',
    styleUrls: ['./productos.component.less']
})
export class ProductosComponent  {

    //vista de lista o vista de rejilla, según el icono seleccionado en la vista
    vistaLista: boolean = true;
    // url de la API a la que llamamos en función de lo que queremos mostrar
    url: string = '';
    // texto de cabecera en función de lo que se  muestra en la página
    textoCabecera: string = '';
    // array de meses para obtener el mes en texto
    meses: string[] = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    // si es true, queremos mostrar oferta del día. 
    esOfertaDelDia: boolean = false;
    // objeto Carrito para añadir al carrito a través de la API
    nuevoElementoCarrito: Carrito;
    // array de productos
    listaProductosCompleta: Producto[] = [];
    listaProductos: Producto[] = [];

    constructor(private http: HttpClient, public appService: AppService) {
    }
    @ViewChild('lista') lista;
    @Input() set opcion(v: string) {
        console.log('pasa por el input opcion ' + v );
         if(v == 'ofertaDelDia') this.esOfertaDelDia = true;
        else this.esOfertaDelDia = false;
        this.buscarProductos(v);
    }
    @Input() set filtro(v: string) {
        console.log('pasa por el input filtro ' + v);
        if(v !='') {
            console.log('va a filtrar ' + v);
            this.filtrarProductos(v);
        }
   }
   
    cambiarVista(){
        this.vistaLista = !this.vistaLista;
        return  this.vistaLista;
    }

    buscarProductos(tipoProducto) {
        // en función del parametro (tipoProducto) construye la URL de la API y el texto de la cabecera
        // despues llama a la API y el resultado lo mete en listaProductos[]
        switch (tipoProducto) {
            case 'ofertaDelDia': {
                this.appService.urlProductos = 'http://localhost:3000/productos?ofertaDelDia=true';
                this.textoCabecera = 'Oferta del día';
                break;
            }
            case 'ofertas': {
                this.appService.urlProductos = 'http://localhost:3000/productos?oferta=true';
                this.textoCabecera = 'en oferta';
                break;
            }
            case ('Jardin'): {
                this.appService.urlProductos = 'http://localhost:3000/productos?categoriaProducto=' + tipoProducto;
                this.textoCabecera = 'encontrados en categoría: ' + tipoProducto;
                break;
            }
            case ('Comida'): {
                this.appService.urlProductos = 'http://localhost:3000/productos?categoriaProducto=' + tipoProducto;
                this.textoCabecera = 'encontrados en categoría: ' + tipoProducto;
                break;
            }
            case ('Ropa'): {
                this.appService.urlProductos = 'http://localhost:3000/productos?categoriaProducto=' + tipoProducto;
                this.textoCabecera = 'encontrados en categoría: ' + tipoProducto;
                break;
            }
            case ('productos'): {
                this.appService.urlProductos = 'http://localhost:3000/productos';
                this.textoCabecera = '';
                break;
            }
            case (this.appService.mesActual): {
                this.appService.urlProductos = 'http://localhost:3000/productos?categoria=Jardin&mes=' + this.appService.mesActual;
                this.textoCabecera = 'que puedes plantar en el mes: ' + this.meses[this.appService.mesActual];
                break;
            }
            default: {
                this.appService.urlProductos = 'http://localhost:3000/productos';
                this.textoCabecera = '';
                break;
            }
        }
        this.obtenerProductos();
    };

    // llama a la API. Si hay texto en el buscador, llama a filtrarProductos-
    obtenerProductos() {
        let that = this;
        this.http.get(this.appService.urlProductos)
            .subscribe(
                (data: any) => {
                    that.listaProductosCompleta = data;
                    that.listaProductos = that.listaProductosCompleta
                    if (that.appService.filtroProductos != '') {
                        that.filtrarProductos(this.appService.filtroProductos);
                    }
                },
                (err: HttpErrorResponse) => {
                    that.appService.mostrarMensaje({ 'mensaje': 'Se ha producido un error', 'tipo': 'error' });
                }
            );
    }

    // del array  listaProductos obtiene sólo aquellos en los que coincide el nombre (no es sensitive case)
    filtrarProductos(v) {
        console.log(v);
        this.listaProductos = this.listaProductosCompleta.filter
            ((item: Producto) => item.nombreProducto.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").indexOf(v.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) >= 0);
    }

    comprobarProductoEnCarrito(p: Producto) {
        // comprobar si el usuario está conectado
        if (this.appService.usuarioConectado == null) {
            this.appService.mostrarMensaje({ 'mensaje': 'Inicie sesión antes de añadir productos', 'tipo': 'error' });
        }
        else {
            // comprobar si el producto ya está en el carrito para aumentar la cantidad en 1
            this.http.get('http://localhost:3000/carrito?email=' + this.appService.usuarioConectado + '&id=' + p.id)
                .subscribe(
                    (data: any) => {
                        if (data.length != 0) {
                            // como está en el carrito, debemos aumentar la cantidad
                            this.modificarCarrito(data);
                        } else {
                            //si no está en el carrito, se añade un elemento Carrito al carrito
                            this.anadirAlCarrito(p);
                        }
                    },
                    (err: HttpErrorResponse) => {
                        this.appService.mostrarMensaje({ 'mensaje': 'Se ha producido un error', 'tipo': 'error' });
                    }
                )
        }
    }

    anadirAlCarrito(p: Producto) {
        // construimos el nuevo elemento del carrito
        this.nuevoElementoCarrito = new Carrito();
        this.nuevoElementoCarrito.email = this.appService.usuarioConectado; //usuario conectado
        this.nuevoElementoCarrito.id = p.id;
        this.nuevoElementoCarrito.nombreProducto = p.nombreProducto;
        this.nuevoElementoCarrito.imagenProducto = p.imagenProducto;
        this.nuevoElementoCarrito.precioProductoOferta = p.precioProductoOferta;
        this.nuevoElementoCarrito.cantidad = 1;
        this.http.post<Carrito>('http://localhost:3000/carrito', this.nuevoElementoCarrito)
            .subscribe(
                data => {
                    this.appService.mostrarMensaje({ 'mensaje': 'Se ha añadido el producto: ' + this.nuevoElementoCarrito.nombreProducto, 'tipo': 'ok' });
                },
                (err: HttpErrorResponse) => {
                    this.appService.mostrarMensaje({ 'mensaje': 'Se ha producido un error', 'tipo': 'error' });
                }
            );
    }

    // hay que añadir 1 a la cantidad del producto. 
    modificarCarrito(c: Carrito) {
        this.http.patch('http://localhost:3000/carrito/' + c[0].id, { "cantidad": c[0].cantidad + 1 })
            .subscribe(
                data => {
                    // forzamos la conversión a number a traves de *, para que no trate como cadena y concatene
                    this.appService.mostrarMensaje({ 'mensaje': 'Hay ' + (c[0].cantidad + 1 * 1) + ' ' + c[0].nombreProducto + ' en el carrito', 'tipo': 'ok' });
                },
                (err: HttpErrorResponse) => {
                    this.appService.mostrarMensaje({ 'mensaje': 'Se ha producido un error', 'tipo': 'error' });
                }
            );
    }
}

