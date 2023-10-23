import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: 'card.component.html',
  styleUrls: ['card.component.css']
})
export class CardComponent {

  imagenes = [
    "https://mdbootstrap.com/img/Photos/Square/1.jpg",
    "https://mdbootstrap.com/img/Photos/Square/2.jpg",
    "https://mdbootstrap.com/img/Photos/Square/3.jpg",
    "https://mdbootstrap.com/img/Photos/Square/4.jpg",
    "https://mdbootstrap.com/img/Photos/Square/5.jpg",
    "https://mdbootstrap.com/img/Photos/Square/6.jpg",
  ]
  
  private imagen = "https://mdbootstrap.com/img/Photos/Square/3.jpg"
  alt = "fotografía de tulipanes"
  encabezado = "Encabezado de la noticia"
  parrafo = "texto del párrafo"
  sizeFontHeader = "text-3xl"

  public getImageName() { return this.imagen }
  public cambiarFoto() { console.log(this.imagen = this.imagenes[Math.trunc(Math.random() * 5) + 0])}
}
