const empleados = [
  { nombre: "Ana", salario: 1200 },
  { nombre: "Carlos", salario: 1500 },
  { nombre: "Laura", salario: 1800 }
];

//Función tradicional
function sumarPropiedad(array, propiedad) {
  let suma = 0;

  for (let i = 0; i < array.length; i++) {
    suma += array[i][propiedad];
  }

  return suma;
}

console.log("Funcion Tradicional");
console.log(sumarPropiedad(empleados, "salario"));


//Función flecha
const sumarPropiedadArrow = (array, propiedad) => {
  let suma = 0;

  for (let i = 0; i < array.length; i++) {
    suma += array[i][propiedad];
  }

  return suma;
};

console.log("Funcion Flecha");
console.log(sumarPropiedadArrow(empleados, "salario"));