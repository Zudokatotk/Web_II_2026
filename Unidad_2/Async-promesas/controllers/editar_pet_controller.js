import { petService } from "../service/pet-service.js";
import { clientService } from "../service/client-service.js";

const formulario = document.querySelector("[data-form]");
const selectDueno = document.querySelector("[data-id-dueno]");

// Cargar clientes en el select
const cargarClientes = async () => {
  try {
    const clientes = await clientService.listar_clientes();
    clientes.forEach((cliente) => {
      const option = document.createElement("option");
      option.value = cliente.id;
      option.textContent = cliente.nombre;
      selectDueno.appendChild(option);
    });
  } catch (error) {
    console.log("Error al cargar clientes:", error);
  }
};

const obInfo = async () => {
  const url = new URL(window.location);
  const id = url.searchParams.get("id");
  
  if (id == null) {
    window.location.href = "../screens/error.html";
  }
  
  const nombre = document.querySelector("[data-nombre]");
  const edad = document.querySelector("[data-edad]");
  const peso = document.querySelector("[data-peso]");
  const raza = document.querySelector("[data-raza]");
  const id_dueno = document.querySelector("[data-id-dueno]");
  
  try {
    const pet = await petService.obtenerPet(id);
    if (pet.nombre && pet.edad) {
      nombre.value = pet.nombre;
      edad.value = pet.edad;
      peso.value = pet.peso;
      raza.value = pet.raza;
      id_dueno.value = pet.id_dueno;
    } else {
      throw new Error();
    }
  } catch (error) {
    window.location.href = "../screens/error.html";
  }
};

cargarClientes();
obInfo();

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const url = new URL(window.location);
  const id = url.searchParams.get("id");
  const nombre = document.querySelector("[data-nombre]").value;
  const edad = document.querySelector("[data-edad]").value;
  const peso = document.querySelector("[data-peso]").value;
  const raza = document.querySelector("[data-raza]").value;
  const id_dueno = document.querySelector("[data-id-dueno]").value;
  
  petService.ActualizarPet(nombre, edad, peso, raza, id_dueno, id).then(() => {
    window.location.href = "../screens/edicion_concluida.html";
  });
});
