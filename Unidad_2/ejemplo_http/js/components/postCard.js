// Componente que renderiza una card de post en la lista
const postCard = ({ id, titulo, descripcion, fecha }) => {
    const li = document.createElement('li');
    li.classList.add('card');
    li.dataset.id = id;

    const info = document.createElement('div');
    info.classList.add('card-info');

    const title = document.createElement('span');
    title.classList.add('card-titulo');
    title.textContent = titulo;

    const desc = document.createElement('span');
    desc.classList.add('card-desc');
    desc.textContent = descripcion;

    const date = document.createElement('span');
    date.classList.add('card-fecha');
    date.textContent = new Date(fecha).toLocaleDateString();

    info.appendChild(title);
    info.appendChild(desc);
    info.appendChild(date);

    // Ícono de eliminar
    const trashIcon = document.createElement('i');
    trashIcon.classList.add('fa', 'fa-solid', 'fa-trash', 'icon');
    trashIcon.addEventListener('click', () => {
        fetch(`${API_URL}/${id}`, { method: 'DELETE' })
            .then(res => {
                if (!res.ok) throw new Error(`Error: ${res.status}`);
                li.remove();
                showResult({ message: `Post "${titulo}" eliminado`, id });
            })
            .catch(err => showResult(err.message, true));
    });

    li.appendChild(info);
    li.appendChild(trashIcon);
    return li;
};

export default postCard;
