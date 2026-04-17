import { productService } from "../service/product-service.js";

const formulario = document.querySelector("form");

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  
  const nombre = document.querySelector("#nombre").value;
  const precio = document.querySelector("#precio").value;
  const description = document.querySelector("#description").value;
  
  productService.crearProducto(nombre, precio, description)
    .then((respuesta) => {
      console.log("Producto creado:", respuesta);
      window.location.href = "./lista_producto.html";
    })
    .catch((error) => {
      console.log("Error al crear producto:", error);
      window.location.href = "./error.html";
    });
});
