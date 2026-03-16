import tabla from './tabla.js';

const cards = (() => {
  const taskCards = document.getElementById('taskCards');

  const update = () => {
    const tasks = tabla.getTask();
    taskCards.innerHTML = '';

    if (tasks.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'taskCard emptyCard';
      empty.innerHTML = '<p>No hay tareas registradas todavía.</p>';
      taskCards.appendChild(empty);
      return;
    }

    tasks.forEach((task) => {
      const card = document.createElement('div');
      card.className = `taskCard${task.completed ? ' taskDone' : ''}`;
      card.innerHTML = `
        <p><strong>Nombre:</strong> ${task.task}</p>
        <p><strong>Descripción:</strong> ${task.description}</p>
        <p><strong>Fecha:</strong> ${task.date}</p>
        <p><strong>Prioridad:</strong> ${task.priority}</p>
        <p><strong>Categoría:</strong> ${task.category}</p>
        <p><strong>Responsable:</strong> ${task.responsable}</p>
        <p><strong>Lugar:</strong> ${task.location}</p>
        <p><strong>Estado:</strong> ${task.completed ? 'Completada' : 'Pendiente'}</p>
      `;
      taskCards.appendChild(card);
    });
  };

  return {
    update
  };
})();

export default cards;
