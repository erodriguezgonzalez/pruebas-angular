// Pregunta1. ¿Por qué texto sustituimos /????????, para poder usar HttpClientModule en nuestro proyecto? 


import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
//import { ????????? } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { CheckPasswordsDirective } from './shared/check-passwords.directive';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout/layout.component';
import { FooterComponent } from './footer/footer.component';
import { InicioComponent } from './layout/inicio/inicio.component';
import { CarritoComponent } from './layout/carrito/carrito.component';
import { LoginComponent } from './layout/login/login.component';
import { ProductosComponent } from './layout/productos/productos.component';
import { ContactaComponent } from './layout/contacta/contacta.component';
import { NoticiasComponent } from './layout/noticias/noticias.component';

import { ConfirmaComponent } from './shared/confirma/confirma.component';
import { ConfirmaDirective } from './shared/confirma/confirma.directive';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        LayoutComponent,
        FooterComponent,
        CarritoComponent,
        LoginComponent,
        ProductosComponent,
        ConfirmaComponent,
        ConfirmaDirective,
        InicioComponent,
        ContactaComponent,
        NoticiasComponent,
        CheckPasswordsDirective,
    ],
    imports: [
        BrowserModule,
        //??????????
        ScrollingModule,
        FormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
