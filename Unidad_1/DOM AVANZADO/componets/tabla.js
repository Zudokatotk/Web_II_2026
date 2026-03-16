const tabla = (() => {
  const cuerpoTabla = document.getElementById('taskTable').getElementsByTagName('tbody')[0];
  let onChange = () => {};

  const taskToRowData = (task) => [
    task.task,
    task.description,
    task.date,
    task.priority,
    task.category,
    task.responsable,
    task.location
  ];

  const rowToTask = (row) => ({
    task: row.cells[0].textContent,
    description: row.cells[1].textContent,
    date: row.cells[2].textContent,
    priority: row.cells[3].textContent,
    category: row.cells[4].textContent,
    responsable: row.cells[5].textContent,
    location: row.cells[6].textContent,
    completed: row.classList.contains('completed')
  });

  const editarFila = (row) => {
    const actual = rowToTask(row);

    const nuevoNombre = prompt('Editar nombre:', actual.task);
    if (nuevoNombre === null) return;

    const nuevaDescripcion = prompt('Editar descripción:', actual.description);
    if (nuevaDescripcion === null) return;

    const nuevaFecha = prompt('Editar fecha:', actual.date);
    if (nuevaFecha === null) return;

    const nuevaPrioridad = prompt('Editar prioridad:', actual.priority);
    if (nuevaPrioridad === null) return;

    const nuevaCategoria = prompt('Editar categoría:', actual.category);
    if (nuevaCategoria === null) return;

    const nuevoResponsable = prompt('Editar responsable:', actual.responsable);
    if (nuevoResponsable === null) return;

    const nuevoLugar = prompt('Editar lugar:', actual.location);
    if (nuevoLugar === null) return;

    row.cells[0].textContent = nuevoNombre.trim();
    row.cells[1].textContent = nuevaDescripcion.trim();
    row.cells[2].textContent = nuevaFecha.trim();
    row.cells[3].textContent = nuevaPrioridad.trim();
    row.cells[4].textContent = nuevaCategoria.trim();
    row.cells[5].textContent = nuevoResponsable.trim();
    row.cells[6].textContent = nuevoLugar.trim();

    onChange();
  };

  const addTask = (task) => {
    const nuevaFila = cuerpoTabla.insertRow();

    taskToRowData(task).forEach((value) => {
      nuevaFila.insertCell().textContent = value;
    });

    const accionesCell = nuevaFila.insertCell();
    const acciones = document.createElement('div');
    acciones.className = 'actions';

    const completeButton = document.createElement('button');
    completeButton.textContent = 'Hecho';
    completeButton.className = 'view';
    completeButton.addEventListener('click', () => {
      nuevaFila.classList.toggle('completed');
      onChange();
    });

    const editButton = document.createElement('button');
    editButton.textContent = 'Editar';
    editButton.className = 'edit';
    editButton.addEventListener('click', () => {
      editarFila(nuevaFila);
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.className = 'delete';
    deleteButton.addEventListener('click', () => {
      nuevaFila.remove();
      onChange();
    });

    acciones.appendChild(completeButton);
    acciones.appendChild(editButton);
    acciones.appendChild(deleteButton);
    accionesCell.appendChild(acciones);
  };

  const getTask = () => Array.from(cuerpoTabla.rows).map(rowToTask);

  const setOnChange = (callback) => {
    onChange = typeof callback === 'function' ? callback : () => {};
  };

  return {
    addTask,
    getTask,
    setOnChange
  };
})();

export default tabla;
