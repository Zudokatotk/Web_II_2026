const ciudades = ["Sucre", "La Paz", "Santa Cruz"];
const paises = ["Bolivia", "Ecuador", "Brazil", "Venezuela"];

let conteoCiudades = ciudades.length;
console.log(`El conteo total de las ciudades: ${conteoCiudades}`);

// Eliminar elementos
ciudades.shift(); // elimina el primer elemento
console.log(ciudades);

ciudades.pop(); // elimina el último elemento
console.log(ciudades);

// Trabajar con array de países
console.log(paises.join("-")); // unifica los elementos con "-"
console.log(paises.sort());     // ordena alfabéticamente