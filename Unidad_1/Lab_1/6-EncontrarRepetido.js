const numeros3 = [7, 7, 6, 2, 2, 7, 8, 4, 3];

// Función tradicional
function numeroMasFrecuente(array) {
  let conteo = {};
  let max = 0;
  let frecuente;

  for (let num of array) {
    conteo[num] = (conteo[num] || 0) + 1;

    if (conteo[num] > max) {
      max = conteo[num];
      frecuente = num;
    }
  }

  return frecuente;
}
console.log("Funcion Tradicional");
console.log(numeroMasFrecuente(numeros3));

// Función flecha
const numeroMasFrecuenteArrow = (array) => {
  let conteo = {};
  let max = 0;
  let frecuente;

  array.forEach(num => {
    conteo[num] = (conteo[num] || 0) + 1;

    if (conteo[num] > max) {
      max = conteo[num];
      frecuente = num;
    }
  });

  return frecuente;
};
console.log("Funcion Flecha");
console.log(numeroMasFrecuenteArrow(numeros3));