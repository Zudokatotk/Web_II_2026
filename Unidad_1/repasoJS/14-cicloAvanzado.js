const datos = [
    { pais: 'Bolivia', precio: 200 },
    { pais: 'Brasil', precio: 200 },
    { pais: 'Chile', precio: 200 },
    { pais: 'Peru', precio: 200 },
    { pais: 'Ecuador', precio: 200 }
];

const presupuesto = 300;
let i = 0;
let paisSeleccionado = '';

do {
    if (datos[i].precio <= presupuesto) {  // permitimos precio igual al presupuesto
        paisSeleccionado = datos[i].pais;
    }
    i++;
} while (i < datos.length && paisSeleccionado === '');

if (paisSeleccionado === '') {
    console.log("No existen pasajes disponibles");
} else {
    console.log(`Puedes comprar pasaje a ${paisSeleccionado}`);
}