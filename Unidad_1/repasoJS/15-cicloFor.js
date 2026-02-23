const datos = [
    { pais: 'Bolivia', precio: 200 },
    { pais: 'Brasil', precio: 300 },
    { pais: 'Chile', precio: 400 },
    { pais: 'Peru', precio: 500 },
    { pais: 'Ecuador', precio: 600 }
];

const presupuesto = 300;

// Función flecha que selecciona el primer país dentro del presupuesto
const seleccionarPais = (datos, presupuesto) => {
    const pais = datos.find(d => d.precio < presupuesto)?.pais || '';
    return pais === '' 
        ? 'No existen pasajes disponibles' 
        : `Puedes comprar pasaje a ${pais}`;
};

console.log(seleccionarPais(datos, presupuesto));