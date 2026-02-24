const numeroInvertir = 9876;

//Función tradicional
function invertirNumero(numero) {
  let numeroAbsoluto = Math.abs(numero);
  let invertido = 0;

  for (; numeroAbsoluto > 0; ) {
    let digito = numeroAbsoluto % 10;
    invertido = invertido * 10 + digito;
    numeroAbsoluto = Math.floor(numeroAbsoluto / 10);
  }

  return invertido * Math.sign(numero);
}

console.log("Funcion Tradicional");
console.log(invertirNumero(numeroInvertir));


//Función flecha
const invertirNumeroArrow = (numero) => {
  let numeroAbsoluto = Math.abs(numero);
  let invertido = 0;

  for (; numeroAbsoluto > 0; ) {
    let digito = numeroAbsoluto % 10;
    invertido = invertido * 10 + digito;
    numeroAbsoluto = Math.floor(numeroAbsoluto / 10);
  }

  return invertido * Math.sign(numero);
};

console.log("Funcion Flecha");
console.log(invertirNumeroArrow(numeroInvertir));