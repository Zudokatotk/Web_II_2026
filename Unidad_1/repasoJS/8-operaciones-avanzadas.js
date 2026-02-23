const ciudades= new Array("Sucre", "La Paz", "Santa Cruz");

//definir un arrat abreviado
const paises =("Bolivia", "Ecuador", "Brazil", "Venezuela");
let conteoCiudades = ciudades.length;
console.log(`el conteo total de las ciudades ${conteoCiudades}`);
//ejercicio con array
ciudades.shift();//elimina mi primer elemento
console.log(ciudades);
ciudades.pop();//elimina el ultimo elememto
console.log(ciudades);

console.log(paises.join("-")); //unifica los elemenots de una cadena de caracteres 
console.log(paises.sort())