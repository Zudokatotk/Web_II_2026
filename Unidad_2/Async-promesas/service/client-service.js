/*const crearFila = (nombre, email) => {
  const fila = document.createElement("tr");

  const contenido = `
    <td class="td" data-td>
      ${nombre}
    </td>
    <td>${email}</td>
    <td>
      <ul class="table__button-control">
        <li>
          <a
            href="../screens/editar_cliente.html"
            class="simple-button simple-button--edit"
          >
            Editar
          </a>
        </li>
        <li>
          <button class="simple-button simple-button--delete" type="button">
            Eliminar
          </button>
        </li>
      </ul>
    </td>
  `;

  fila.innerHTML = contenido;
  return fila;
};*/

const table = document.querySelector("[data-table]");

const listar_clientes = () => {
  const promesa = new Promise((resolve, reject) => {
    const http = new XMLHttpRequest(); //variable para resquest con http
    http.open("GET", "http://localhost:3001/perfil"); //abrir la conexion con el metodo get y la url del json server
    http.send(); //enviar la peticion
    http.onload = () => {
      const response = JSON.parse(http.response); //parsear la respuesta del servidor
      if (http.response >= 400) {
        reject(response);
      } else {
        resolve(response);
      }
    };
  });
  return promesa;
};

listar_clientes()
  .then((data) => {
    data.forEach((perfil) => {
      const nuevaFila = crearFila(perfil.nombre, perfil.email);
      table.appendChild(nuevaFila);
    });
  })
  .catch((error) => alert("Sin conexion"));

///--------optimizado-----///
/*
listar_clientes = () =>
  fetch("http://localhost:3000/perfil").then((respuesta) => respuesta.json());*/

const crearcliente = (nombre, email) => {
  return fetch("http://localhost:3001/perfil", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ nombre, email, id: uuid.v4() }),
  });
};

const ActualizarCliente=(nombre, email, id)=>{ //SOLO MODIFICO EL NOMBRE Y EL EMAIL
    return fetch(`http://localhost:3001/perfil/${id}`, 
        {
        method: "PUT",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify({nombre,email})
        })
        .then(respuesta=>console.log(respuesta)).catch((err)=>console.log(err));
};
const eliminarCliente=(id)=>{
    console.log("Eliminar",id);
    return fetch(`http://localhost:3001/perfil/${id}`, {
        method:"DELETE"
    });
};
//REFERENCIA A ID
const cliente=(id)=>{
    return fetch(`http://localhost:3001/perfil/${id}`).then((respuesta)=>respuesta.json);
};

export const clientService={
    listar_clientes,
    crearcliente,
    eliminarCliente,
    ActualizarCliente,
    cliente
}