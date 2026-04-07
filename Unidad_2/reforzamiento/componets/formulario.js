const Form = (() => {
    const form         = document.querySelector('[data-form]');
    const inputTask    = document.querySelector('[data-input-task]');
    const inputDesc    = document.querySelector('[data-input-descripcion]');
    const inputFecha   = document.querySelector('[data-input-fecha]');
    const inputPrior   = document.querySelector('[data-input-prioridad]');
    const inputCat     = document.querySelector('[data-input-categoria]');
    const inputResp    = document.querySelector('[data-input-responsable]');
    const inputLugar   = document.querySelector('[data-input-lugar]');

    const getDatos = () => ({
        task:        inputTask.value.trim(),
        description: inputDesc.value.trim(),
        date:        inputFecha.value.trim(),
        priority:    inputPrior.value.trim(),
        category:    inputCat.value.trim(),
        responsable: inputResp.value.trim(),
        location:    inputLugar.value.trim(),
        completed:   false
    });

    const reset = () => form.reset();

    const setDatos = (callback) => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const datos = getDatos();
            callback(datos);
            reset();
        });
    };

    return { setDatos };
})();

export default Form;
