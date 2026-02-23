const paisDestino = "Argentina";
const paisesDisponibles = ["Argentina", "Brasil", "Chile", "Peru"];
let edadPasajero = 17;      // corregido: mayúscula consistente
let acompanante = true;
let pasaporte = true;
let casado = false;

console.log(`Verificamos si hay pasajes para ${paisDestino}`);

// Verificar disponibilidad y condiciones
if (paisesDisponibles.indexOf(paisDestino) > -1 && (edadPasajero >= 18 || acompanante) && !casado && pasaporte) {
    console.log("Pasaje disponible para venta");
} else {
    console.log("No se puede vender el pasaje");
}