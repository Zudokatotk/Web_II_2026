const listar_pets = () => {
  return fetch("http://localhost:3001/pets")
    .then((respuesta) => respuesta.json())
    .catch((err) => console.log("Error al listar pets:", err));
};

const crearPet = (nombre, edad, peso, raza, id_dueno) => {
  return fetch("http://localhost:3001/pets", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ nombre, edad, peso, raza, id_dueno, id: uuid.v4() }),
  });
};

const ActualizarPet = (nombre, edad, peso, raza, id_dueno, id) => {
  return fetch(`http://localhost:3001/pets/${id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ nombre, edad, peso, raza, id_dueno }),
  });
};

const eliminarPet = (id) => {
  console.log("Eliminar pet:", id);
  return fetch(`http://localhost:3001/pets/${id}`, {
    method: "DELETE",
  });
};

const obtenerPet = (id) => {
  return fetch(`http://localhost:3001/pets/${id}`)
    .then((respuesta) => respuesta.json())
    .catch((err) => console.log("Error al obtener pet:", err));
};

export const petService = {
  listar_pets,
  crearPet,
  eliminarPet,
  ActualizarPet,
  obtenerPet,
};
