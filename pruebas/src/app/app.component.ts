import { Component } from '@angular/core';
import { empty } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public valor1: number
  public valor2: number
  public valor3: number
  public resultado: string
  


  constructor() {
    this.valor1 = this.retornarAleatorio()
    this.valor2 = this.retornarAleatorio()
    this.valor3 = this.retornarAleatorio()
    this.resultado = ""
  }
  
  private retornarAleatorio() { return Math.trunc(Math.random() * 6) + 1 }

  public tirar() {
    this.valor1 = this.retornarAleatorio()
    this.valor2 = this.retornarAleatorio()
    this.valor3 = this.retornarAleatorio()
    this.resultado = (this.valor1 == this.valor2 && this.valor2 == this.valor3) ? 'Has Ganado' : 'Has Perdido'
  }

} // AppComponent
