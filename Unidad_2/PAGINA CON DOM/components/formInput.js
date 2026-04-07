import tresEnRaya from './tresEnRaya.js';

const labelsFalsos = {
    nombre:   '¿Cuál es tu número favorito?',
    curso:    'Ingresa tu fecha de nacimiento:',
    edad:     'Escribe el nombre de tu mascota:',
    hermanos: 'Dirección de correo electrónico:',
    ciudad:   'Número de teléfono (sin guiones):',
};

const placeholdersFalsos = {
    nombre:   'Ej: 42 (no escribas tu nombre)',
    curso:    'DD/MM/AAAA o lo que quieras',
    edad:     'Solo letras mayúsculas por favor',
    hermanos: 'ejemplo@ejemplo.com',
    ciudad:   '+591 7XXXXXXX',
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

    input.addEventListener('focus', () => {
        if (input.readOnly) return;
        const rx = (Math.random() - 0.5) * 30;
        const ry = (Math.random() - 0.5) * 10;
        wrapper.style.transform = `translate(${rx}px,${ry}px) rotate(${(Math.random()-0.5)*6}deg)`;
    });
    input.addEventListener('blur', () => { wrapper.style.transform = ''; });

    inputRow.appendChild(input);
    inputRow.appendChild(saveBtn);
    inputRow.appendChild(savedBadge);
    wrapper.appendChild(lbl);
    wrapper.appendChild(inputRow);
    return wrapper;
};

export default formInput;
