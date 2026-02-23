const datos=[
    {
        'pais':'Bolivia',
        'precio':200
    },
    {
        'pais':'Brasil',
        'precio':200
    },
    {
        'pais':'Chile',
        'precio':200
    },
    {
        'pais':'Peru',
        'precio':200
    },
    {
        'pais':'Ecuador',
        'precio':200
    }
];
const presupuesto = 300;
let i=0;

let paisSeleccionado='';
do{
    if(datos[i].precio<presupuesto){
        paisSeleccionado=datps[i].pais;
    }
    i++;
}while(i<datos.length && paisSeleccionado=='')

    if(paisSeleccionado=='')
        console.log(`no existen pasajes disnibles`)
    else
        console.log(`puedes comprar`)