const paisDestino = "Argentina"; // tu destino
let valorPasaje = 0;

/*
if(paisDestino == "Argentina"){
    valorPasaje=100;
}else if (paisDestino == "Bolivia"){
    valorPasaje=200;
}
*/

// Switch para asignar valor según país
switch (paisDestino) {
  case "Bolivia":
    valorPasaje = 200;
    break;
  case "Brasil":
  case "Chile":
  case "Peru":
  case "Ecuador":
    valorPasaje = 250;
    break;
  case "Argentina":
    valorPasaje = 100;
    break;
  default:
    console.log(`No existen pasajes para esa ciudad`);
    break;
}

// Mostrar valor si es mayor a 0
if (valorPasaje > 0) {
  console.log(`El valor del pasaje es ${valorPasaje}`);
}
