import { Injectable, ApplicationRef, ComponentFactoryResolver, Injector, EmbeddedViewRef } from '@angular/core';
import { MensajeComponent } from './shared/mensaje/mensaje.component';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    //#region variables públicas
    public opcionMenu: string = "inicio";
    public mesActual: string;
    public opcionProductos:string = '';
    public urlProductos:string = '';
    public filtroProductos:string = '';
    public usuarioConectado: string;
    public sesionCreada: boolean = false;
//#endregion

    constructor(private componentFactoryResolver: ComponentFactoryResolver,
        private applicationRef: ApplicationRef,
        private injector: Injector) {
        this.mesActual = (new Date().getMonth()).toString();
    }

    //#region mensaje en el body ... se puede invocar sin necesidad de directiva, desde un método en una clase
    appendComponentToBody(datosComponente: any) {
        const componentRef = this.componentFactoryResolver.resolveComponentFactory(MensajeComponent)
            .create(this.injector);
        this.applicationRef.attachView(componentRef.hostView);
        const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
            .rootNodes[0] as HTMLElement;
        document.body.appendChild(domElem);
        componentRef.instance['datos'] = datosComponente.datos;
        componentRef.instance["destroy"] = () => {
            // this will destroy the component
            componentRef.destroy();
        };
    }

    mostrarMensaje(datosMensaje) {
        let crearComponentMensaje: any = {};
        crearComponentMensaje.datos = datosMensaje;
        this.appendComponentToBody(crearComponentMensaje)
    }
    //#endregion
}

