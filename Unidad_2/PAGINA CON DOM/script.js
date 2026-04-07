import formInput from './components/formInput.js';
import personaCard from './components/personaCard.js';

(() => {
    const form = document.querySelector('[data-form]');
    const list = document.querySelector('[data-list]');
    let editingCard = null;

    const campos = ['hermanos', 'ciudad', 'nombre', 'edad', 'curso'];
    campos.forEach(id => form.appendChild(formInput({ id })));

    const captchaBox = document.createElement('div');
    captchaBox.classList.add('captcha-box');
    const captchaCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    captchaBox.innerHTML = `
        <span class="captcha-text">${captchaCode}</span>
        <span class="captcha-label">⚠ Escribe exactamente lo que ves arriba (distingue mayúsculas)</span>
    `;
    const captchaInput = document.createElement('input');
    captchaInput.type = 'text';
    captchaInput.id = 'captcha';
    captchaInput.placeholder = 'Ingresa el captcha...';
    captchaInput.classList.add('inputForm');
    captchaInput.style.marginTop = '8px';
    captchaBox.appendChild(captchaInput);
    form.appendChild(captchaBox);

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.classList.add('btnCreate');
    btn.innerHTML = 'NO PRESIONAR <i class="fas fa-skull"></i>';
    form.appendChild(btn);

    const posiciones = [
        { top: '10%', left: '10%' },
        { top: '10%', left: '50%' },
        { top: '10%', left: '75%' },
        { top: '40%', left: '5%'  },
        { top: '40%', left: '60%' },
        { top: '70%', left: '10%' },
        { top: '70%', left: '50%' },
        { top: '70%', left: '75%' },
        { top: '85%', left: '30%' },
    ];
    let lastPos = -1;
    let huidas = 0;

    btn.addEventListener('mouseover', () => {
        if (huidas >= 5) return;
        btn.style.position = 'fixed';
        btn.style.zIndex = 9999;
        let idx;
        do { idx = Math.floor(Math.random() * posiciones.length); }
        while (idx === lastPos);
        lastPos = idx;
        btn.style.top  = posiciones[idx].top;
        btn.style.left = posiciones[idx].left;
        huidas++;
        if (huidas >= 5) {
            btn.style.position = '';
            btn.style.left = '';
            btn.style.top  = '';
            btn.innerHTML = 'Bueno ya... enviar <i class="fas fa-check"></i>';
        }
    });

    const tooltip = document.createElement('div');
    tooltip.classList.add('annoying-tooltip');
    tooltip.textContent = '¡Llena todos los campos correctamente! (o no)';
    document.body.appendChild(tooltip);
    document.addEventListener('mousemove', (e) => {
        tooltip.style.left = (e.clientX + 15) + 'px';
        tooltip.style.top  = (e.clientY + 15) + 'px';
    });

    const getValues = () => ({
        id:       Date.now().toString(),
        nombre:   document.getElementById('nombre').value.trim(),
        curso:    document.getElementById('curso').value.trim(),
        edad:     document.getElementById('edad').value.trim(),
        hermanos: document.getElementById('hermanos').value.trim(),
        ciudad:   document.getElementById('ciudad').value.trim(),
    });

    const fillForm = (data) => {
        document.getElementById('nombre').value   = data.nombre;
        document.getElementById('curso').value    = data.curso;
        document.getElementById('edad').value     = data.edad;
        document.getElementById('hermanos').value = data.hermanos;
        document.getElementById('ciudad').value   = data.ciudad;
        btn.innerHTML = 'Guardar (si puedes) <i class="fas fa-save"></i>';
        btn.classList.add('btn-edit-mode');
        huidas = 5;
        btn.style.position = '';
    };

    const resetForm = () => {
        form.reset();
        editingCard = null;
        huidas = 0;
        btn.innerHTML = 'NO PRESIONAR <i class="fas fa-skull"></i>';
        btn.classList.remove('btn-edit-mode');
        btn.style.position = '';
        btn.style.left = '';
        btn.style.top  = '';
        captchaInput.value = '';
        campos.forEach(id => {
            const input = document.getElementById(id);
            if (!input) return;
            input.readOnly = false;
            input.dataset.saved = 'false';
            input.classList.remove('input-saved');
            const badge = input.parentElement.querySelector('.saved-badge');
            if (badge) badge.style.display = 'none';
            const saveBtn = input.parentElement.querySelector('.field-save-btn');
            if (saveBtn) saveBtn.style.display = 'none';
        });
    };

    const validate = (data) =>
        data.nombre && data.curso && data.edad && data.hermanos && data.ciudad;

    const allSaved = () =>
        campos.every(id => {
            const input = document.getElementById(id);
            return input && input.dataset.saved === 'true';
        });

    const onEdit = (card) => {
        const info = card.querySelectorAll('.card-info p');
        const vals = [...info].map(p => p.querySelector('strong').nextSibling.textContent.trim());
        editingCard = card;
        fillForm({ nombre: vals[0], curso: vals[1], edad: vals[2].replace(' años',''), hermanos: vals[3], ciudad: vals[4] });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const onDelete = (card) => {
        const ok = confirm('¿Estás seguro de que NO quieres NO eliminar este registro?\n(Presiona Cancelar para eliminar, Aceptar para conservar)');
        if (!ok) {
            card.classList.add('card-removing');
            card.addEventListener('animationend', () => card.remove());
        }
    };

    btn.addEventListener('click', () => {
        const data = getValues();

        if (!validate(data)) {
            alert('⚠ ERROR 404: Formulario no encontrado.\n\nEn realidad: completa todos los campos.');
            return;
        }

        if (!allSaved()) {
            alert('⚠ Debes ganar el 3 en raya en CADA campo para poder enviar.\n\n¡No hay atajos!');
            return;
        }

        if (captchaInput.value !== captchaCode) {
            alert(`Captcha incorrecto. Intenta de nuevo.\n\n(Pista: era "${captchaCode}" pero no te lo decimos)`);
            captchaInput.value = '';
            return;
        }

        if (editingCard) {
            const updated = personaCard({ ...data, id: editingCard.dataset.id }, onEdit, onDelete);
            list.replaceChild(updated, editingCard);
        } else {
            const card = personaCard(data, onEdit, onDelete);
            card.classList.add('card-entering');
            list.appendChild(card);
        }

        resetForm();
    });
})();
