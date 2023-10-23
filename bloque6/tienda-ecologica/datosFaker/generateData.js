// Documentación: https://www.npmjs.com/package/@faker-js/faker
// var faker = require('faker');cd
const { faker } = require('@faker-js/faker');
// let fs = require('fs');
// var contaEmpleado = 0;
//añadimos el local para que devuelva contenido en español
// faker.locale = "es";
//modelo de datos que devolverá el API: array de productos, array de usuarios, array de noticias, array carrito
const data = { productos: [], usuarios: [], contactos: [], noticias: [], carrito: [] };

function generarDatosTiendaEcologica() {
    var i = 0;
    var m, cat = "";
    // generamos 999 productos en el array productos
    for (i = 1; i <= 999; i++) {
        // el primero será un producto fijo, la ofertaDelDia, enlazada desde la home.
        if (i == 1) {
            data.productos.push({
                id: 1,
                nombreProducto: 'Tulipanes',
                descripcionProducto: 'Una docena de tulipanes de Holanda',
                precioProducto: 1.5,
                imagenProducto: './assets/imagenes/tulipanes.png',
                enStock: true,
                categoriaProducto: 'Jardin',
                oferta: true,
                ofertaDelDia: true,
                precioProductoOferta: 0.8,
                mes: ""
            })
        } else {
            // en cat almacenamos los posibles valores de las categorias de productos
            cat = faker.helpers.arrayElement(["Jardin", "Comida", "Ropa"]);
            //en el caso de Jardín, añadimos un mes para enlazar desde el banner superior de la home
            if (cat == "Jardin") {
                m = faker.helpers.arrayElement([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
            } else {
                m = "";
            }
            of = faker.datatype.boolean();
            p = faker.commerce.price({ min:100,max:200 });
            if (of) {
                po = faker.commerce.price({ min:1,max:150 });
            }
            else {
                po = p;
            }
            data.productos.push({
                id: i,
                nombreProducto: faker.commerce.productName(),
                descripcionProducto: faker.commerce.productDescription(),
                precioProducto: p,
                imagenProducto: faker.image.urlLoremFlickr({ category: 'nature' }),
                enStock: faker.datatype.boolean(),
                categoriaProducto: cat,
                oferta: of,
                ofertaDelDia: false,
                precioProductoOferta: po,
                mes: m
            });
        }
        data.noticias.push({
            idNoticia: i,
            tituloNoticia: faker.lorem.words(),
            textoNoticia: faker.lorem.paragraph(),
            imagenNoticia: faker.image.urlLoremFlickr({ category: 'business' })           
        });
    }
    // el array carrito está vacío, porque añadimos productos desde las páginas
    return data
}

module.exports = generarDatosTiendaEcologica

// let dataObj = generarDatosTiendaEcologica();
// fs.writeFileSync('datosfaker/db.json', JSON.stringify(dataObj, null, '\t'));