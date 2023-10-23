// Creado por Marta Lara Mayo 2021
// Revisado por Pepe Millan Mayo 2021
import { Component, OnInit } from '@angular/core';
import {AppService} from '../app.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.less']
})
export class FooterComponent implements OnInit {

  constructor(public appService:AppService) { }

  ngOnInit(): void {
  }
  mostrarNoticias(){
    this.appService.opcionMenu = 'NOTICIAS'
  }
}
