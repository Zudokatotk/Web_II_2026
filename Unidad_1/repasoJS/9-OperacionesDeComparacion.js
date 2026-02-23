const valorPasaje = 1000;
if(valorPasaje === 1000){
    console.log(`El pasaje es correcto`);
}

const paisDestino = "Ecuador";
const paisesDisponibles = ["Bolivia","Ecuador","Brasil","Venezuela","Italia","Francia"];

let edadPasajero = 17;
let acompaniado = true;

console.log(`Pasajes para: ${paisesDisponibles.join(", ")}`);

if(paisesDisponibles.some(p => p.toLowerCase() === paisDestino.toLowerCase()) && (edadPasajero >= 18 || acompaniado)) {
    console.log("Pasaje disponible para venta");
} else {
    console.log("No se puede vender el pasaje");
}