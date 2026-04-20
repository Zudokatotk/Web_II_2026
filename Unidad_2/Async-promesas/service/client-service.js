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
};

const table = document.querySelector("[data-table]");*/

/*const listar_clientes = () => {
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
};*/

/*listar_clientes()
  .then((data) => {
    data.forEach((perfil) => {
      const nuevaFila = crearFila(perfil.nombre, perfil.email);
      table.appendChild(nuevaFila);
    });
  })
  .catch((error) => alert("Sin conexion"));*/

///--------optimizado-----///    
/* comentado
const listar_clientes = () =>
  fetch("http://localhost:3001/perfil").then((respuesta) => respuesta.json());

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
    return fetch(`http://localhost:3001/perfil/${id}`)
    .then((respuesta)=>respuesta.json())
    .catch((err)=>console.log('error aqui', err));
};
*/
//-----con mysql -----//
/*
const API_BASE_URL='http://127.0.0.1/API/conexion.php'
const listar_clientes=()=>{
  return fetch(API_BASE_URL).then(response=>{
    if(!response.ok)throw new Error('error clientes');
      return response.json();
    });
  };
const crearcliente = (nombre, email) => {
  return fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ nombre, email, id: uuid.v4() }),
  }).then(response=>{
    if(!response.ok)throw new Error('error clientes');
    return response.json();
  });
};
const eliminarCliente=(id)=>{
  return fetch(`${API_BASE_URL}?id=${id}`,{
    method:"DELETE"
  })

  //.then((respuesta)=>respuesta.json())
}
const ActualizarCliente=(nombre,email,id)=>{
  return fetch(API_BASE_URL, {
    method:"PUT",
    headers:{
      "content-Type":"application/json"
    },
    body:JSON.stringify({nombre,email,id})
  }).then(respuesta=>console.log(respuesta)).catch((err)=>console.log(err));
};
const cliente=(id)=>{
  return fetch(`${API_BASE_URL}?id=${id}`).then((respuesta)=>respuesta.json());
}*/

//-----CON SUPABASE-----//
const URL_SUPABASE='https://atvjsavtpjzsqgjcefbs.supabase.co';
const SUPABASE_KEY='sb_publishable__S0l2jhOsbM3LfJZNVYa7g_NGfsYLOX';
const table='clientes';
const API_URL=`${URL_SUPABASE}/rest/v1/${table}`
export const clientService={
    listar_clientes,
    crearcliente,
    eliminarCliente,
    ActualizarCliente,
    cliente
}
