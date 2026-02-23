const datos = [
    { 
        pais: 'Bolivia',
        precio: 200 
    },
    { 
        pais: 'Brasil',
         precio: 300 
        },
    { 
        pais: 'Chile',
         precio: 400 
        },
    { 
        pais: 'Peru',
         precio: 500 
        },
    { 
        pais: 'Ecuador',
         precio: 600 
    }
];

const presupuesto = 300;
let paisSeleccionado = '';

for (let i = 0; i < datos.length && paisSeleccionado === ''; i++) {
    if (datos[i].precio < presupuesto) {
        paisSeleccionado = datos[i].pais;
    }
}

if (paisSeleccionado === '')
    console.log('no existen pasajes disponibles');
else
    console.log('puedes comprar');