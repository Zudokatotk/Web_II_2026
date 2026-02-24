const numeroDecimal = 23;

//función tradicional
function decimalABinario(numero) {
  if (numero === 0) return "0";

  let n = numero;
  let binario = "";

  while (n > 0) {
    let residuo = n % 2; 
    binario = residuo + binario;
    n = Math.floor(n / 2);  
  }

  return binario;
}

console.log("Funcion Tradicional");
console.log(decimalABinario(numeroDecimal));


//Función flecha
const decimalABinarioArrow = (numero) => {
  if (numero === 0) return "0";

  let n = numero;
  let binario = "";

  while (n > 0) {
    let residuo = n % 2;
    binario = residuo + binario;
    n = Math.floor(n / 2);
  }

  return binario;
};

console.log("Funcion Flecha");
console.log(decimalABinarioArrow(numeroDecimal));