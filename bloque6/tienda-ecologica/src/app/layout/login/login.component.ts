// Creado por Marta Lara Mayo 2021
// Revisado por Pepe Millan Mayo 2021
import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AppService } from '../../app.service';
// Pregunta 6. ¿Qué debemos escribir en la la siguiente linea para importar el modelo de Usuario? /??????
// ??????????????




@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less']
})
export class LoginComponent {

    // variables para formulario de login
    email: string;
    password: string;
    // variables para formulario de registro
    email2: string;
    password2: string;
    confirmaPassword: string;

    //array de usuarios que recuperamos del api para comprobar si el usuario que se quiere logar existe
    usuarios: Usuario[] = [];
    // objeto de tipo usuario para dar de alta
    usuario: Usuario = new Usuario();

    constructor(private http: HttpClient, public appService: AppService) { }

    // comprobamos si existe el par usuario-contraseña del formulario de login
    comprobarUsuario() {
        this.http.get('http://localhost:3000/usuarios?email=' + this.email + '&password=' + this.password)
            .subscribe(
                (data: any) => {
                    this.usuarios = data;
                    // si existe el par, añadimos el email a la variable usuarioConectado del servicio
                    if (this.usuarios.length != 0) {
                        this.appService.usuarioConectado = this.email;
                        this.appService.sesionCreada = true;
                        this.appService.mostrarMensaje({ 'mensaje': 'Se ha iniciado la sesión', 'tipo': 'ok' });
                        // cargamos el componente de inicio
                        this.appService.opcionMenu = "INICIO";
                    } else {
                        this.appService.mostrarMensaje({ 'mensaje': 'No existe usuario y contraseña', 'tipo': 'advertencia' });
                    }
                },
                (err: HttpErrorResponse) => {
                    this.appService.mostrarMensaje({ 'mensaje': 'Se ha producido un error', 'tipo': 'error' });
                }
            );
    }

    // creamos la nueva cuenta de usuario
    registrar() {
        this.usuario.email = this.email2;
        this.usuario.password = this.password2;
        this.http.post<Usuario>('http://localhost:3000/usuarios', this.usuario)
            .subscribe(
                data => {
                    this.appService.mostrarMensaje({ 'mensaje': 'Se ha creado la cuenta, puede iniciar sesión', 'tipo': 'ok' });
                },
                (err: HttpErrorResponse) => {
                    this.appService.mostrarMensaje({ 'mensaje': 'Se ha producido un error', 'tipo': 'error' });
                }
            );
    }

    // comprobamos si el usuario ya existe
    comprobarRegistro() {
        this.http.get('http://localhost:3000/usuarios?email=' + this.email2)
            .subscribe(
                data => {
                    for (const d of (data as any)) {
                        this.usuarios.push({
                            email: d.email,
                            password: d.password,
                            id: d.id
                        });
                    }
                    if (this.usuarios.length != 0) {
                        this.usuarios = [];
                        this.appService.mostrarMensaje({ 'mensaje': 'Ese usuario ya existe', 'tipo': 'advertencia' });
                    } else {
                        this.registrar()
                    }
                },
                (err: HttpErrorResponse) => {
                    this.appService.mostrarMensaje({ 'mensaje': 'Se ha producido un error', 'tipo': 'error' });
                }
            );
    }

}
