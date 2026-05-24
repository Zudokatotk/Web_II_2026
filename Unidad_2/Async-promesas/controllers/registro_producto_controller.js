import { productService } from "../service/product-service.js";

const formulario = document.querySelector("[data-form]");

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    // fix: era document.querySelector("#nombre") — debe usar data-attributes como el resto del proyecto
    const nombre = document.querySelector("[data-nombre]").value;
    const precio = document.querySelector("[data-precio]").value;
    const description = document.querySelector("[data-description]").value;

    productService.crearProducto(nombre, precio, description)
        .then((respuesta) => {
            console.log("Producto creado:", respuesta);
            window.location.href = "./registro_completado.html";
        }).catch((error) => {
            console.log("Error al crear producto:", error);
            window.location.href = "./error.html";
        });
});
