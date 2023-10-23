import { Component } from '@angular/core';
import {AppService} from '../../app.service';


@Component({
  selector: 'app-contacta',
  templateUrl: './contacta.component.html',
  styleUrls: ['./contacta.component.less']
})
export class ContactaComponent{

  constructor(public appService:AppService) { }

  mensaje:string;
  email:string;
  nombre:string;

  // Para enviar correo simplemente usamos la herramienta cliente que tenga instalada el dispositivo
  // Podríamos instalar un backend para enviar correo como nodemailer https://mailtrap.io/blog/angular-send-email/
  onSubmit() { 
    window.open('mailto:'+this.email+'?subject='+this.nombre+' dice&body='+this.mensaje);
  }

}
