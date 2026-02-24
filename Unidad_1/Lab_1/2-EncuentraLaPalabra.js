const frase2 = "Aprender JavaScript puede ser muy divertido";

// función tradicional
function palabraMasLarga(frase) {
  let palabras = frase.split(" ");
  let masLarga = "";

  for (let i = 0; i < palabras.length; i++) {
    if (palabras[i].length > masLarga.length) {
      masLarga = palabras[i];
    }
  }

  return masLarga;
}

console.log("Funcion Tradicional");
console.log(palabraMasLarga(frase2));


//Función flecha
const palabraMasLargaArrow = (frase) => {
  let palabras = frase.split(" ");
  let masLarga = "";

  for (let i = 0; i < palabras.length; i++) {
    if (palabras[i].length > masLarga.length) {
      masLarga = palabras[i];
    }
  }

  return masLarga;
};

console.log("Funcion Flecha");
console.log(palabraMasLargaArrow(frase2));