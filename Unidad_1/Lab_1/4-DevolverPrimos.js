const numeros2 = [1, 2, 3, 4, 5, 6, 7, 11, 15, 17];

// Función tradicional
function esPrimo(num) {
  if (num <= 1) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

function filtrarPrimos(array) {
  return array.filter(esPrimo);
}
console.log("Funcion Tradicional");
console.log(filtrarPrimos(numeros2));

// Función flecha
const esPrimoArrow = (num) => {
  if (num <= 1) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
};

const filtrarPrimosArrow = (array) => array.filter(esPrimoArrow);
console.log("Funcion Flecha");
console.log(filtrarPrimosArrow(numeros2));