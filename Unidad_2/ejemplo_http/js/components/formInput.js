// Componente que crea un campo de input con label
const formInput = ({ id, label, type = 'text', placeholder }) => {
    const wrapper = document.createElement('div');
    wrapper.classList.add('form-group');

    const lbl = document.createElement('label');
    lbl.setAttribute('for', id);
    lbl.textContent = label;

    const input = document.createElement('input');
    input.type = type;
    input.id = id;
    input.name = id;
    input.placeholder = placeholder;
    input.classList.add('inputForm');
    input.autocomplete = 'off';

    wrapper.appendChild(lbl);
    wrapper.appendChild(input);
    return wrapper;
};

export default formInput;
