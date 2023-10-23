import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-mensaje',
  templateUrl: './mensaje.component.html',
  styleUrls: ['./mensaje.component.less']
})
export class MensajeComponent implements OnInit {

  constructor() { }
  // Pregunta 9. En la siguiente línea, ¿por qué sustituimos /???? para indicar que datos es una entrada desde el antecesor?
  // ???????? datos:any;


  destroy: Function;

  ngOnInit() {
      this.establecerDuracionVentanaAbierta();      
      this.establecerPosicionVentana();
  }

  // Se establece la duración de la ventana abierta
  establecerDuracionVentanaAbierta() {
      let tiempoEspera = 2000; // Mensaje de ok
      if (this.datos.tipo == 'advertencia') tiempoEspera = 6000
      setTimeout(() => {
          if (this.datos.tipo != 'error')
              this.close(); //cerramos el mensaje a los 2 segundos
      }, tiempoEspera);
  }

  // Se establece la posición de las ventanas emergentes, incluso cuando hay varias simultaneas
  establecerPosicionVentana() {
      //calculamos la posición en base a los mensajes ya existentes en el DOM
      if (document.querySelectorAll('app-mensaje')) {
          let mensajes = document.querySelectorAll('app-mensaje');
          let posicionTop = 0;
          var mensaje: any;
          if (mensajes.length > 0) {
              for (var i = 0; i < mensajes.length; i++) {
                  mensaje = mensajes[i];
                  posicionTop = (mensajes.length - i) * 100;
                  mensaje.style.top = posicionTop.toString() + "px";
              }
          }
      }     
  }

  close() {
      this.destroy();
  }

  obtenerIconos(tipo) {
      let clase = "";
      switch (tipo) {
          case "ok": {
              clase += ' ok ';
              break;
          }
          case "error": {
              clase += ' error ';
              break;
          }
          case "advertencia":  {
              clase += ' advertencia ';
              break;
          }
      }
      return clase;
  }
}
