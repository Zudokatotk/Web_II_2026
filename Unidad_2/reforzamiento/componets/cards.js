import { obtenerTareas } from './api.js';

const cards = (() => {
    const contenedorCards = document.getElementById('taskCards');

    const update = () => {
        obtenerTareas().then(tareas => {
            contenedorCards.innerHTML = '';

            if (tareas.length === 0) {
                const vacio = document.createElement('div');
                vacio.className = 'taskCard emptyCard';
                vacio.innerHTML = '<p>No hay tareas registradas todavía.</p>';
                contenedorCards.appendChild(vacio);
                return;
            }

            tareas.forEach(tarea => {
                const card = document.createElement('div');
                card.className = `taskCard${tarea.completed ? ' taskDone' : ''}`;
                card.innerHTML = `
                    <p><strong>Nombre:</strong> ${tarea.task}</p>
                    <p><strong>Descripción:</strong> ${tarea.description}</p>
                    <p><strong>Fecha:</strong> ${tarea.date}</p>
                    <p><strong>Prioridad:</strong> ${tarea.priority}</p>
                    <p><strong>Categoría:</strong> ${tarea.category}</p>
                    <p><strong>Responsable:</strong> ${tarea.responsable}</p>
                    <p><strong>Lugar:</strong> ${tarea.location}</p>
                    <p><strong>Estado:</strong> ${tarea.completed ? 'Completada' : 'Pendiente'}</p>
                `;
                contenedorCards.appendChild(card);
            });
        });
    };

    return { update };
})();

export default cards;
