const Form = (() => {
  const form = document.querySelector('[data-form]');
  const inputTask = document.querySelector('[data-input-task]');
  const inputDescripcion = document.querySelector('[data-input-descripcion]');
  const inputFecha = document.querySelector('[data-input-fecha]');
  const inputPrioridad = document.querySelector('[data-input-prioridad]');
  const inputCategoria = document.querySelector('[data-input-categoria]');
  const inputResponsable = document.querySelector('[data-input-responsable]');
  const inputLugar = document.querySelector('[data-input-lugar]');

  const datosForms = () => ({
    task: inputTask.value.trim(),
    description: inputDescripcion.value.trim(),
    date: inputFecha.value.trim(),
    priority: inputPrioridad.value.trim(),
    category: inputCategoria.value.trim(),
    responsable: inputResponsable.value.trim(),
    location: inputLugar.value.trim()
  });

  const reset = () => {
    inputTask.value = '';
    inputDescripcion.value = '';
    inputFecha.value = '';
    inputPrioridad.value = '';
    inputCategoria.value = '';
    inputResponsable.value = '';
    inputLugar.value = '';
  };

  const setDatos = (callback) => {
    form.addEventListener('submit', (evento) => {
      evento.preventDefault();
      const datos = datosForms();
      callback(datos);
      reset();
    });
  };

  return {
    setDatos
  };
})();

export default Form;
