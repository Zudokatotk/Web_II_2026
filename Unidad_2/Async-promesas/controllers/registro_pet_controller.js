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

cargarClientes();

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  
  const nombre = document.querySelector("[data-nombre]").value;
  const edad = document.querySelector("[data-edad]").value;
  const peso = document.querySelector("[data-peso]").value;
  const raza = document.querySelector("[data-raza]").value;
  const id_dueno = document.querySelector("[data-id-dueno]").value;
  
  petService.crearPet(nombre, edad, peso, raza, id_dueno)
    .then((respuesta) => {
      console.log("Pet creado:", respuesta);
      window.location.href = "./lista_pet.html";
    })
    .catch((error) => {
      console.log("Error al crear pet:", error);
      window.location.href = "./error.html";
    });
});
