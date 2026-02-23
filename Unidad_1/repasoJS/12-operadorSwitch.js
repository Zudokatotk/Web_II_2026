const paisDestino = "Argentina";
c
let valorPasaje=0;
/*
if(paisDestino == "Argentina"){
    valorPasaje=100;
}else if (paisDestino == "bolivia"){
    valorPasaje=200;
}*/
switch(paisDestino){
    case "Bolivia":
        valorPasaje=200;
        break;
    case "Brasil":
        valorPasaje=250;
        break;
    case "Chile":
        valorPasaje=250;
        break;
    case "Peru":
        valorPasaje=250;
        break;
    case "Ecuador":
        valorPasaje=250;
        break;
    default:
        console.log(`no existen pasajes para esa ciudad`)
        break;
}
if (valorPasaje>0)
    console.log(`el valor del pasaje es ${valorPasaje}`);