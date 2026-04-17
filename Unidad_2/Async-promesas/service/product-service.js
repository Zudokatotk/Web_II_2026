const listar_productos = () => {
  return fetch("http://localhost:3001/productos")
    .then((respuesta) => respuesta.json())
    .catch((err) => console.log("Error al listar productos:", err));
};

const crearProducto = (nombre, precio, description) => {
  return fetch("http://localhost:3001/productos", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ nombre, precio, description, id: uuid.v4() }),
  });
};

const ActualizarProducto = (nombre, precio, description, id) => {
  return fetch(`http://localhost:3001/productos/${id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ nombre, precio, description }),
  });
};

const eliminarProducto = (id) => {
  console.log("Eliminar producto:", id);
  return fetch(`http://localhost:3001/productos/${id}`, {
    method: "DELETE",
  });
};

const obtenerProducto = (id) => {
  return fetch(`http://localhost:3001/productos/${id}`)
    .then((respuesta) => respuesta.json())
    .catch((err) => console.log("Error al obtener producto:", err));
};

export const productService = {
  listar_productos,
  crearProducto,
  eliminarProducto,
  ActualizarProducto,
  obtenerProducto,
};
