import Form from './componets/formulario.js';
import cards from './componets/cards.js';
import tabla from './componets/tabla.js';
import { obtenerTareas, crearTarea } from './componets/api.js';

(() => {
    const actualizar = () => cards.update();

    obtenerTareas().then(tareas => {
        tareas.forEach(tarea => tabla.addTask(tarea));
        actualizar();
    });

    Form.setDatos((datos) => {
        crearTarea(datos).then(tareaGuardada => {
            tabla.addTask(tareaGuardada);
            actualizar();
        });
    });

    tabla.setOnChange(actualizar);
})();
