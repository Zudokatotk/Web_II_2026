import Form from './componets/formulario.js';
import cards from './componets/cards.js';
import tabla from './componets/tabla.js';

(() => {
  const refresh = () => cards.update();

  Form.setDatos((task) => {
    tabla.addTask(task);
    refresh();
  });

  tabla.setOnChange(refresh);
  refresh();
})();
