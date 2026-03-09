import checkComplete from './components/checkComplet.js';
import deleteIcon from './components/deleteIcon.js';

(() => {
  const btn = document.querySelector('[data-form-btn]');

  const createTask = (event) => {
    event.preventDefault();
    const input = document.querySelector('[data-form-input]');
    const value = input.value;
    const list = document.querySelector('[data-list]');
    
    if (value === "") return;

    const task = document.createElement('li');
    task.classList.add('card');
    input.value = '';

    const contTask = document.createElement('div');
    contTask.appendChild(checkComplete()); // Usamos el componente importado
    
    const titleTask = document.createElement('span');
    titleTask.classList.add('task');
    titleTask.innerText = value;
    contTask.appendChild(titleTask);

    task.appendChild(contTask);
    task.appendChild(deleteIcon()); // Usamos el componente importado
    list.appendChild(task);
  };

  btn.addEventListener('click', createTask);
})();