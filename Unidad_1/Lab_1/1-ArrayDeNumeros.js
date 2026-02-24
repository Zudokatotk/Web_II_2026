const numeros1 = [1, 2, 3, 4, 5, 6, 7, 8];

// Función tradicional
function contarParesImpares(array) {
  let resultado = { pares: 0, impares: 0 };

  for (let numero of array) {
    numero % 2 === 0 ? resultado.pares++ : resultado.impares++;
  }

  return resultado;
}
console.log("Funcion Tradicional")
console.log(contarParesImpares(numeros1));

// Función flecha
const contarParesImparesArrow = (array) => {
  let resultado = { pares: 0, impares: 0 };

  array.forEach(numero => {
    numero % 2 === 0 ? resultado.pares++ : resultado.impares++;
  });

  return resultado;
};
console.log("Funcion Flecha")
console.log(contarParesImparesArrow(numeros1));