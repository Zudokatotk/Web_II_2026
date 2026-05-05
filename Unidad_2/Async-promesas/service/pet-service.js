///--------JSON SERVER (comentado)-----///
/*
const listar_pets = () => {
  return fetch("http://localhost:3001/pets")
    .then((respuesta) => respuesta.json())
    .catch((err) => console.log("Error al listar pets:", err));
};

const crearPet = (nombre, edad, peso, raza, id_dueno) => {
  return fetch("http://localhost:3001/pets", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ nombre, edad, peso, raza, id_dueno, id: uuid.v4() }),
  });
};

const ActualizarPet = (nombre, edad, peso, raza, id_dueno, id) => {
  return fetch(`http://localhost:3001/pets/${id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ nombre, edad, peso, raza, id_dueno }),
  });
};

const eliminarPet = (id) => {
  console.log("Eliminar pet:", id);
  return fetch(`http://localhost:3001/pets/${id}`, {
    method: "DELETE",
  });
};

const obtenerPet = (id) => {
  return fetch(`http://localhost:3001/pets/${id}`)
    .then((respuesta) => respuesta.json())
    .catch((err) => console.log("Error al obtener pet:", err));
};
*/

//-----con mysql -----//
/*
const API_BASE_URL='http://127.0.0.1/mypetshop/api/conexion.php?tabla=pets'
const listar_pets=()=>{
  return fetch(API_BASE_URL).then(response=>{
    if(!response.ok)throw new Error('error pets');
      return response.json();
    });
  };
const crearPet = (nombre, edad, peso, raza, id_dueno) => {
  return fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ nombre, edad, peso, raza, id_dueno, id: uuid.v4() }),
  }).then(response=>{
    if(!response.ok)throw new Error('error pets');
    return response.json();
  });
};
const eliminarPet=(id)=>{
  return fetch(`${API_BASE_URL}&id=${id}`,{
    method:"DELETE"
  })
}
const ActualizarPet=(nombre, edad, peso, raza, id_dueno, id)=>{
  return fetch(API_BASE_URL, {
    method:"PUT",
    headers:{
      "content-Type":"application/json"
    },
    body:JSON.stringify({nombre, edad, peso, raza, id_dueno, id})
  }).then(respuesta=>console.log(respuesta)).catch((err)=>console.log(err));
};
const obtenerPet=(id)=>{
  return fetch(`${API_BASE_URL}&id=${id}`).then((respuesta)=>respuesta.json());
}
*/

//-----CON EXPRESS + MYSQL (XAMPP)-----//

const API_BASE_URL = 'http://localhost:3000/api/pets';

const listar_pets = () => {
  return fetch(API_BASE_URL)
    .then(response => {
      if (!response.ok) throw new Error('Error al listar pets');
      return response.json();
    });
};

const crearPet = (nombre, edad, peso, raza, id_dueno) => {
  return fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nombre, edad, peso, raza, id_dueno, id: uuid.v4() }),
  }).then(response => {
    if (!response.ok) throw new Error('Error al crear pet');
    return response.json();
  });
};

const eliminarPet = (id) => {
  return fetch(`${API_BASE_URL}?id=${id}`, {
    method: "DELETE"
  }).then(response => {
    if (!response.ok) throw new Error('Error al eliminar pet');
    return response.json();
  });
};

const ActualizarPet = (nombre, edad, peso, raza, id_dueno, id) => {
  return fetch(API_BASE_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ nombre, edad, peso, raza, id_dueno, id })
  }).then(response => {
    if (!response.ok) throw new Error('Error al actualizar pet');
    return response.json();
  });
};

const obtenerPet = (id) => {
  return fetch(`${API_BASE_URL}?id=${id}`)
    .then(response => {
      if (!response.ok) throw new Error('Error al obtener pet');
      return response.json();
    });
};

//-----CON SUPABASE (comentado)-----//
/*
const URL_SUPABASE = 'https://atvjsavtpjzsqgjcefbs.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF0dmpzYXZ0cGp6c3FnamNlZmJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY2NjUwMzgsImV4cCI6MjA5MjI0MTAzOH0.ySZbk862cqiOEc40AUlwYvPcGq3Zv6u_kW6p2YFPgVQ';
const table = 'pets';
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

// GET - listar todos los pets
const listar_pets = () => {
    return request(`${API_URL}?select=id,nombre,edad,peso,raza,id_dueno`);
};

// GET por id - obtener un pet específico
const obtenerPet = (id) => {
    return request(`${API_URL}?id=eq.${id}&select=id,nombre,edad,peso,raza,id_dueno`)
        .then(data => data[0]);
};

// POST - crear nuevo pet
const crearPet = (nombre, edad, peso, raza, id_dueno) => {
    return request(API_URL, {
        method: 'POST',
        body: JSON.stringify({ nombre, edad, peso, raza, id_dueno, id: uuid.v4() })
    }).then(data => {
        console.log("Respuesta de Supabase:", data);
        return data?.[0] || { nombre, edad, peso, raza, id_dueno };
    });
};

// PATCH - actualizar pet
const ActualizarPet = (nombre, edad, peso, raza, id_dueno, id) => {
    return request(`${API_URL}?id=eq.${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ nombre, edad, peso, raza, id_dueno })
    }).then(data => data?.[0] ?? Promise.reject(new Error('no se pudo actualizar')));
};

// DELETE - eliminar pet
const eliminarPet = (id) => {
    return request(`${API_URL}?id=eq.${id}`, {
        method: 'DELETE'
    }).then(data => data?.[0] ?? Promise.reject(new Error('no se pudo eliminar')));
};
*/

export const petService = {
  listar_pets,
  crearPet,
  eliminarPet,
  ActualizarPet,
  obtenerPet,
};
