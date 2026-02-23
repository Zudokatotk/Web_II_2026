const paisDestino = "Argentina";
const paisesdisponibles = ["Argentina", "Brasil", "Chile", "Peru"];
let edadpasajero = 17;
let acompanante = true;
if (paisesdisponibles.indexOf(paisDestino) !== -1) {
    if (edadpasajero >= 18) {
        console.log("Pasaje disponible para venta.");
    } else {
        if (acompanante) {
            console.log("Pasaje disponible para venta.");
        } else {
            console.log("Pasaje no disponible para venta.");
        }
    }
} else {
    console.log("Pasaje no disponible para venta.");
}