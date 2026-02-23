const seleccionarPaisConFor = (datos, presupuesto) => {
    let paisSeleccionado = '';

    for (let i = 0; i < datos.length && paisSeleccionado === ''; i++) {
        if (datos[i].precio < presupuesto) {
            paisSeleccionado = datos[i].pais;
        }
    }

    return paisSeleccionado === '' 
        ? 'No existen pasajes disponibles' 
        : `Puedes comprar a ${paisSeleccionado}`;
};

const datos = [
    { pais: 'Bolivia', precio: 200 },
    { pais: 'Brasil', precio: 300 },
    { pais: 'Chile', precio: 400 },
    { pais: 'Peru', precio: 500 },
    { pais: 'Ecuador', precio: 600 }
];

const presupuesto = 300;
console.log(seleccionarPaisConFor(datos, presupuesto));