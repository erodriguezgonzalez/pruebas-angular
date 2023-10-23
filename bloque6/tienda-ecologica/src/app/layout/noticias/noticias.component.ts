// Creado por Marta Lara Mayo 2021
// Revisado por Pepe Millan Mayo 2021
// el boletín de noticias simula una subscripción a un servidor externo de noticias
import { Component, OnInit } from '@angular/core';
import { Noticia } from '../../modelos/modelos';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AppService } from '../../app.service';

@Component({
    selector: 'app-noticias',
    templateUrl: './noticias.component.html',
    styleUrls: ['./noticias.component.less']
})
export class NoticiasComponent implements OnInit {
    noticias: Noticia[] = [];
    constructor(private http: HttpClient, public appService: AppService) { }
    ngOnInit(): void {
        this.obtenerNoticias();
    }

    // obtener noticias
    obtenerNoticias() {
        let that = this;
        this.http.get('http://localhost:3000/noticias')
            .subscribe((data: any) => {
                that.noticias = data;
                // for (const d of (data as any)) {
                //   this.noticias.push({
                //     idNoticia: d.idNoticia,
                //     textoNoticia: d.textoNoticia,
                //     tituloNoticia: d.tituloNoticia,
                //     imagenNoticia: d.imagenNoticia
                //   });
                // }
            },
            // Pregunta 8. En la siguiente línea, ¿Por qué sustituimos las /????? para indicar el tipo correcto de la variable err (no sirve el tipo any genérico )?
                // (err:??????????????) => {
                    this.appService.mostrarMensaje({ 'mensaje': 'Se ha producido un error', 'tipo': 'error' });
                });
    }
}
