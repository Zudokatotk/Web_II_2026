///--------JSON SERVER (comentado)-----///
/*
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
*/

//-----con mysql -----//
/*
const API_BASE_URL='http://127.0.0.1/mypetshop/api/conexion.php?tabla=productos'
const listar_productos=()=>{
  return fetch(API_BASE_URL).then(response=>{
    if(!response.ok)throw new Error('error productos');
      return response.json();
    });
  };
const crearProducto = (nombre, precio, description) => {
  return fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ nombre, precio, description, id: uuid.v4() }),
  }).then(response=>{
    if(!response.ok)throw new Error('error productos');
    return response.json();
  });
};
const eliminarProducto=(id)=>{
  return fetch(`${API_BASE_URL}&id=${id}`,{
    method:"DELETE"
  })
}
const ActualizarProducto=(nombre, precio, description, id)=>{
  return fetch(API_BASE_URL, {
    method:"PUT",
    headers:{
      "content-Type":"application/json"
    },
    body:JSON.stringify({nombre, precio, description, id})
  }).then(respuesta=>console.log(respuesta)).catch((err)=>console.log(err));
};
const obtenerProducto=(id)=>{
  return fetch(`${API_BASE_URL}&id=${id}`).then((respuesta)=>respuesta.json());
}
*/

//-----CON SUPABASE-----//

const URL_SUPABASE = 'https://atvjsavtpjzsqgjcefbs.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF0dmpzYXZ0cGp6c3FnamNlZmJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY2NjUwMzgsImV4cCI6MjA5MjI0MTAzOH0.ySZbk862cqiOEc40AUlwYvPcGq3Zv6u_kW6p2YFPgVQ';
const table = 'productos';
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

// GET - listar todos los productos
const listar_productos = () => {
    return request(`${API_URL}?select=id,nombre,precio,description`);
};

// GET por id - obtener un producto específico
const obtenerProducto = (id) => {
    return request(`${API_URL}?id=eq.${id}&select=id,nombre,precio,description`)
        .then(data => data[0]);
};

// POST - crear nuevo producto
const crearProducto = (nombre, precio, description) => {
    return request(API_URL, {
        method: 'POST',
        body: JSON.stringify({ nombre, precio, description, id: uuid.v4() })
    }).then(data => {
        console.log("Respuesta de Supabase:", data);
        return data?.[0] || { nombre, precio, description };
    });
};

// PATCH - actualizar producto
const ActualizarProducto = (nombre, precio, description, id) => {
    return request(`${API_URL}?id=eq.${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ nombre, precio, description })
    }).then(data => data?.[0] ?? Promise.reject(new Error('no se pudo actualizar')));
};

// DELETE - eliminar producto
const eliminarProducto = (id) => {
    return request(`${API_URL}?id=eq.${id}`, {
        method: 'DELETE'
    }).then(data => data?.[0] ?? Promise.reject(new Error('no se pudo eliminar')));
};

export const productService = {
  listar_productos,
  crearProducto,
  eliminarProducto,
  ActualizarProducto,
  obtenerProducto,
};
