import {
  Directive,
  HostListener,
  Input, Output,
  EventEmitter,
  ViewContainerRef,
  ComponentFactoryResolver
} from '@angular/core';
import { ConfirmaComponent } from './confirma.component';

@Directive({
  selector: '[appConfirma]'
})

export class ConfirmaDirective {

  @Input("appConfirma") datosConfirma;
  @Output() onEventRetornoConfirma = new EventEmitter();

  // Pregunta 3. ¿Qué patrón de diseño estamos implementando al añadir al constructor ViewContainerRef y ViewContainerRef de esta manera?
  constructor(private vr: ViewContainerRef,
    private cfr: ComponentFactoryResolver) { }

  @HostListener('click', ['$event'])  onMouseDown(event: MouseEvent) {
    let confirma = { vr: this.vr, datos: this.datosConfirma, clear: true };
    this.mostrarConfirma(confirma, this.onEventRetornoConfirma);
  }

  mostrarConfirma(paramDatosConfirma, evento) {
    let vcr: ViewContainerRef = paramDatosConfirma.vr;
    vcr.clear();
    let ref = vcr.createComponent(this.cfr.resolveComponentFactory(ConfirmaComponent));
    ref.instance['mensaje'] = paramDatosConfirma.datos;
    ref.instance["comunicaEvento"] = (event) => {
      if (evento) {
        evento.emit(event); //llama al evento en el padre
        ref.destroy();
      }
    }
    ref.instance["destroy"] = () => {
      ref.destroy();
    };
  }
  
}
