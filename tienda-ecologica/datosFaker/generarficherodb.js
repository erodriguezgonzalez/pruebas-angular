let dataObj = generarDatosTiendaEcologica();
fs.writeFileSync('datosFaker/db.json', JSON.stringify(dataObj, null, '\t'));