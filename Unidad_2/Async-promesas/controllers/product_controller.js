import { productService } from "../service/product-service.js";

const crearFila = (nombre, precio, description, id) => {
  const fila = document.createElement("tr");

  const contenido = `
    <td class="td" data-td>
      ${nombre}
    </td>
    <td>${description}</td>
    <td>$${precio}</td>
    <td>
      <ul class="table__button-control">
        <li>
          <a
            href="../screens/editar_producto.html?id=${id}"
            class="simple-button simple-button--edit"
          >
            Editar
          </a>
        </li>
        <li>
          <button class="simple-button simple-button--delete" type="button" id="${id}">
            Eliminar
          </button>
        </li>
      </ul>
    </td>
  `;

  fila.innerHTML = contenido;
  const btn = fila.querySelector("button");
  btn.addEventListener("click", () => {
    const id = btn.id;
    productService.eliminarProducto(id)
      .then(() => {
        alert("Producto eliminado");
        window.location.reload();
      })
      .catch((error) => alert("Error al eliminar"));
  });

  return fila;
};

const table = document.querySelector("[data-table]");
productService
  .listar_productos()
  .then((data) => {
    data.forEach(({ nombre, precio, description, id }) => {
      const nuevaFila = crearFila(nombre, precio, description, id);
      table.appendChild(nuevaFila);
    });
  })
  .catch((error) => alert("Error al cargar productos"));