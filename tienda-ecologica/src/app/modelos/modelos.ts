export class Noticia {
   public idNoticia: number;
   public tituloNoticia: string;
   public textoNoticia: string;
   public imagenNoticia: string;
  }

 export class Producto {
     public  id: number;
     public  nombreProducto: string;
     public  descripcionProducto: string;
     public  precioProducto: number;
     public  imagenProducto: string;
     public  enStock: boolean;
     public  categoriaProducto: string;
     public  oferta: boolean;
     public  ofertaDelDia: boolean;
     public  precioProductoOferta: number;
     public  mes: number;
 }
 
 export class Usuario {
     public id: number;
     public email: string;
     public password: string;
 }

 export class Carrito {
    // el id del carrito es el idproducto
    public id: number;
    public email:  Usuario["email"];
    public nombreProducto: Producto["nombreProducto"];
    public imagenProducto: Producto["imagenProducto"];
    public precioProductoOferta: Producto["precioProductoOferta"];
    public cantidad: number;
}

