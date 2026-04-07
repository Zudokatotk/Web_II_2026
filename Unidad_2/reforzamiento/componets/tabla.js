import { actualizarTarea, eliminarTarea } from './api.js';

const tabla = (() => {
    const cuerpoTabla = document.getElementById('taskTable').getElementsByTagName('tbody')[0];
    let alCambiar = () => {};

    const addTask = (tarea) => {
        const fila = cuerpoTabla.insertRow();
        fila.dataset.id = tarea.id;
        if (tarea.completed) fila.classList.add('completed');

        const campos = [tarea.task, tarea.description, tarea.date, tarea.priority, tarea.category, tarea.responsable, tarea.location];
        campos.forEach(valor => { fila.insertCell().textContent = valor; });

        const celdaAcciones = fila.insertCell();
        const acciones = document.createElement('div');
        acciones.className = 'actions';

        const btnHecho = document.createElement('button');
        btnHecho.textContent = 'Hecho';
        btnHecho.className = 'view';
        btnHecho.addEventListener('click', () => {
            fila.classList.toggle('completed');
            const completado = fila.classList.contains('completed');
            actualizarTarea(tarea.id, { ...tarea, completed: completado })
                .then(() => alCambiar());
        });

        const btnEditar = document.createElement('button');
        btnEditar.textContent = 'Editar';
        btnEditar.className = 'edit';
        btnEditar.addEventListener('click', () => {
            const nuevoNombre = prompt('Editar nombre:', fila.cells[0].textContent);
            if (nuevoNombre === null) return;
            const nuevaDescripcion = prompt('Editar descripción:', fila.cells[1].textContent);
            if (nuevaDescripcion === null) return;
            const nuevaFecha = prompt('Editar fecha:', fila.cells[2].textContent);
            if (nuevaFecha === null) return;
            const nuevaPrioridad = prompt('Editar prioridad:', fila.cells[3].textContent);
            if (nuevaPrioridad === null) return;
            const nuevaCategoria = prompt('Editar categoría:', fila.cells[4].textContent);
            if (nuevaCategoria === null) return;
            const nuevoResponsable = prompt('Editar responsable:', fila.cells[5].textContent);
            if (nuevoResponsable === null) return;
            const nuevoLugar = prompt('Editar lugar:', fila.cells[6].textContent);
            if (nuevoLugar === null) return;

            fila.cells[0].textContent = nuevoNombre.trim();
            fila.cells[1].textContent = nuevaDescripcion.trim();
            fila.cells[2].textContent = nuevaFecha.trim();
            fila.cells[3].textContent = nuevaPrioridad.trim();
            fila.cells[4].textContent = nuevaCategoria.trim();
            fila.cells[5].textContent = nuevoResponsable.trim();
            fila.cells[6].textContent = nuevoLugar.trim();

            actualizarTarea(tarea.id, {
                task: nuevoNombre.trim(),
                description: nuevaDescripcion.trim(),
                date: nuevaFecha.trim(),
                priority: nuevaPrioridad.trim(),
                category: nuevaCategoria.trim(),
                responsable: nuevoResponsable.trim(),
                location: nuevoLugar.trim(),
                completed: fila.classList.contains('completed')
            }).then(() => alCambiar());
        });

        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.className = 'delete';
        btnEliminar.addEventListener('click', () => {
            eliminarTarea(tarea.id).then(() => {
                fila.remove();
                alCambiar();
            });
        });

        acciones.appendChild(btnHecho);
        acciones.appendChild(btnEditar);
        acciones.appendChild(btnEliminar);
        celdaAcciones.appendChild(acciones);
    };

    const setOnChange = (callback) => {
        alCambiar = typeof callback === 'function' ? callback : () => {};
    };

    return { addTask, setOnChange };
})();

export default tabla;
