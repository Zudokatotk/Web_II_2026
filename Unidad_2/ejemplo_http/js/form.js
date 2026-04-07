import formInput from './components/formInput.js';
import postCard from './components/postCard.js';

(() => {
    const form = document.querySelector('[data-post-form]');
    const list = document.querySelector('[data-posts-list]');

    // Construimos los campos del formulario con el componente formInput
    form.appendChild(formInput({ id: 'titulo',      label: 'Título',      placeholder: 'Título del post' }));
    form.appendChild(formInput({ id: 'descripcion', label: 'Descripción', placeholder: 'Descripción del post' }));
    form.appendChild(formInput({ id: 'fecha',       label: 'Fecha',       type: 'date' }));

    const btn = document.createElement('button');
    btn.type = 'submit';
    btn.classList.add('btnCreate');
    btn.innerHTML = 'Crear Post <i class="fas fa-plus-circle"></i>';
    form.appendChild(btn);

    // Cargar posts al iniciar
    const loadPosts = () => {
        fetch(API_URL)
            .then(res => res.json())
            .then(posts => {
                list.innerHTML = '';
                posts.forEach(post => list.appendChild(postCard(post)));
                showResult(posts);
            })
            .catch(err => showResult(err.message, true));
    };

    // Submit del formulario → POST
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const titulo      = document.getElementById('titulo').value.trim();
        const descripcion = document.getElementById('descripcion').value.trim();
        const fecha       = document.getElementById('fecha').value || new Date().toISOString();

        if (!titulo || !descripcion) {
            showResult('Por favor completa título y descripción', true);
            return;
        }

        fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({ titulo, descripcion, fecha })
        })
        .then(res => {
            if (!res.ok) throw new Error(`HTTP error! estado: ${res.status}`);
            return res.json();
        })
        .then(data => {
            list.appendChild(postCard(data));
            showResult(data);
            form.reset();
        })
        .catch(err => showResult(err.message, true));
    });

    // Cargamos los posts al iniciar la página
    loadPosts();

    // Exponemos loadPosts para que el botón GET también refresque la lista
    window.loadPosts = loadPosts;
})();
