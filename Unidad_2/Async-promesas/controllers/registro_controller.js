import { clientService } from "../service/client-service.js";

const formulario = document.querySelector("[data-form]");

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const nombre = document.querySelector("[data-nombre]").value;
    const email = document.querySelector("[data-email]").value;
    clientService.crearcliente(nombre, email) // conectado a Supabase (última conexión activa en clase)
        .then((respuesta) => {
            console.log("todo ok", respuesta);
            window.location.href = "./registro_completado.html";
        }).catch((error) => {
            console.log("todo mal", error);
        });
});
