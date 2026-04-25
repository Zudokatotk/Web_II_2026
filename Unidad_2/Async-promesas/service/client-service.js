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
const API_BASE_URL='http://127.0.0.1/mypetshop/api/conexion.php?tabla=clientes'
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
  return fetch(`${API_BASE_URL}&id=${id}`,{
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
  return fetch(`${API_BASE_URL}&id=${id}`).then((respuesta)=>respuesta.json());
}
*/

//-----CON SUPABASE-----//

const URL_SUPABASE = 'https://atvjsavtpjzsqgjcefbs.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF0dmpzYXZ0cGp6c3FnamNlZmJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY2NjUwMzgsImV4cCI6MjA5MjI0MTAzOH0.ySZbk862cqiOEc40AUlwYvPcGq3Zv6u_kW6p2YFPgVQ';
const table = 'clientes';
const API_URL = `${URL_SUPABASE}/rest/v1/${table}`;

const HEADERS = {
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
};

const request = async (url, option = {}) => {
    const res = await fetch(url, { headers: HEADERS, ...option });
    const text = await res.text();
    const data = text ? JSON.parse(text) : null;
    if (!res.ok) {
        const mensaje = data?.message ?? data?.error ?? text ?? 'Error';
        throw new Error(mensaje);
    }
    return data;
};

// GET - listar todos los clientes
const listar_clientes = () => {
    return request(`${API_URL}?select=id,nombre,email`);
};

// GET por id - obtener un cliente específico
const cliente = (id) => {
    return request(`${API_URL}?id=eq.${id}&select=id,nombre,email`)
        .then(data => data[0]);
};

// POST - crear nuevo cliente
const crearcliente = (nombre, email) => {
    return request(API_URL, {
        method: 'POST',
        body: JSON.stringify({ nombre, email, id: uuid.v4() })
    }).then(data => {
        console.log("Respuesta de Supabase:", data);
        return data?.[0] || { nombre, email };
    });
};

// PATCH - actualizar cliente
const ActualizarCliente = (nombre, email, id) => {
    return request(`${API_URL}?id=eq.${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ nombre, email })
    }).then(data => data?.[0] ?? Promise.reject(new Error('no se pudo actualizar')));
};

// DELETE - eliminar cliente
const eliminarCliente = (id) => {
    return request(`${API_URL}?id=eq.${id}`, {
        method: 'DELETE'
    }).then(data => data?.[0] ?? Promise.reject(new Error('no se pudo eliminar')));
};

export const clientService={
    listar_clientes,
    crearcliente,
    eliminarCliente,
    ActualizarCliente,
    cliente
}
