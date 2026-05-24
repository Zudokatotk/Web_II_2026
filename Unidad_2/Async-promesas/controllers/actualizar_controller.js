import { clientService } from "../service/client-service.js";

const formulario = document.querySelector("[data-form]");

const obInfo = async () => {
    const url = new URL(window.location);
    const id = url.searchParams.get("id"); // fix: era "yrl" (typo)
    if (id == null) {
        window.location.href = "../screens/error.html";
    }
    const nombre = document.querySelector("[data-nombre]");
    const email = document.querySelector("[data-email]");
    try {
        const perfil = await clientService.cliente(id); // await espera el id del cliente
        if (perfil.nombre && perfil.email) {
            nombre.value = perfil.nombre;
            email.value = perfil.email;
        } else {
            throw new Error();
        }
    } catch (error) {
        console.log("Catch error", error);
        window.location.href = "../screens/error.html";
    }
};

obInfo(); // fix: era "obinfo()" (typo, JS es case-sensitive)

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const url = new URL(window.location);
    const id = url.searchParams.get("id"); // fix: era get(id) sin comillas
    const nombre = document.querySelector("[data-nombre]").value; // fix: era url.searchParams.get(...)
    const email = document.querySelector("[data-email]").value;
    clientService.actualizarCliente(nombre, email, id).then(() => {
        window.location.href = "../screens/edicion_concluida.html";
    });
});
