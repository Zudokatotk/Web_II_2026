import tresEnRaya from './tresEnRaya.js';

const labelsFalsos = {
    nombre:   'Nombre:',
    curso:    'Curso:',
    edad:     'Edad:',
    hermanos: 'Cantidad de hermanos:',
    ciudad:   'Ciudad de nacimiento:',
};

const placeholdersFalsos = {
    nombre:   'Ej: Juan Pérez',
    curso:    'Ej: Programación Web',
    edad:     'Ej: 20',
    hermanos: 'Ej: 2',
    ciudad:   'Ej: La Paz',
};

const tiposFalsos = {
    nombre:   'text',
    curso:    'text',
    edad:     'number',
    hermanos: 'number',
    ciudad:   'text',
};

const formInput = ({ id }) => {
    const wrapper = document.createElement('div');
    wrapper.classList.add('form-group');

    const lbl = document.createElement('label');
    lbl.setAttribute('for', id);
    lbl.textContent = labelsFalsos[id];

    const inputRow = document.createElement('div');
    inputRow.classList.add('input-row');

    const input = document.createElement('input');
    input.type         = tiposFalsos[id];
    input.id           = id;
    input.name         = id;
    input.placeholder  = placeholdersFalsos[id];
    input.classList.add('inputForm');
    input.autocomplete = 'off';
    input.dataset.saved = 'false';

    const saveBtn = document.createElement('button');
    saveBtn.type          = 'button';
    saveBtn.classList.add('field-save-btn');
    saveBtn.textContent   = '💾';
    saveBtn.style.display = 'none';

    const savedBadge = document.createElement('span');
    savedBadge.classList.add('saved-badge');
    savedBadge.textContent   = '✔';
    savedBadge.style.display = 'none';

    input.addEventListener('input', () => {
        if (input.dataset.saved === 'true') {
            input.dataset.saved = 'false';
            input.readOnly = false;
            input.classList.remove('input-saved');
            savedBadge.style.display = 'none';
        }
        saveBtn.style.display = input.value.trim() !== '' ? 'inline-block' : 'none';
    });

    saveBtn.addEventListener('click', () => {
        if (!input.value.trim()) return;
        const modal = tresEnRaya(() => {
            input.dataset.saved  = 'true';
            input.readOnly       = true;
            input.classList.add('input-saved');
            saveBtn.style.display    = 'none';
            savedBadge.style.display = 'inline-block';
        });
        document.body.appendChild(modal);
    });

    input.addEventListener('focus', () => { });
    input.addEventListener('blur', () => { wrapper.style.transform = ''; });

    inputRow.appendChild(input);
    inputRow.appendChild(saveBtn);
    inputRow.appendChild(savedBadge);
    wrapper.appendChild(lbl);
    wrapper.appendChild(inputRow);
    return wrapper;
};

export default formInput;
