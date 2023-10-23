import {
  Component,
  Input
} from '@angular/core';

@Component({
  selector: 'app-confirma',
  templateUrl: './confirma.component.html',
  styleUrls: ['./confirma.component.less']
})
export class ConfirmaComponent {
  @Input() mensaje: any;
  destroy: Function;
  comunicaEvento: Function;

  constructor() { }
  
  aceptar() {
    this.comunicaEvento(true);
  }
  cancelar() {
    this.comunicaEvento(false);
  }
  close() {
    this.destroy();
  }
}
