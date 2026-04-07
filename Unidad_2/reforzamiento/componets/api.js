const URL_API = 'http://localhost:3001/tasks';

const obtenerTareas = () =>
    fetch(URL_API)
        .then(respuesta => {
            if (!respuesta.ok) throw new Error(`Error HTTP: ${respuesta.status}`);
            return respuesta.json();
        });

const crearTarea = (tarea) =>
    fetch(URL_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(tarea)
    })
    .then(respuesta => {
        if (!respuesta.ok) throw new Error(`Error HTTP: ${respuesta.status}`);
        return respuesta.json();
    });

const actualizarTarea = (id, tarea) =>
    fetch(`${URL_API}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(tarea)
    })
    .then(respuesta => {
        if (!respuesta.ok) throw new Error(`Error HTTP: ${respuesta.status}`);
        return respuesta.json();
    });

const eliminarTarea = (id) =>
    fetch(`${URL_API}/${id}`, { method: 'DELETE' })
        .then(respuesta => {
            if (!respuesta.ok) throw new Error(`Error HTTP: ${respuesta.status}`);
        });

export { obtenerTareas, crearTarea, actualizarTarea, eliminarTarea };
