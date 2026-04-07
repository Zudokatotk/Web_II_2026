const personaCard = ({ id, nombre, curso, edad, hermanos, ciudad }, onEdit, onDelete) => {
    const li = document.createElement('li');
    li.classList.add('card');
    li.dataset.id = id;

    const info = document.createElement('div');
    info.classList.add('card-info');

    const fields = [
        { label: 'Nombre',         value: nombre },
        { label: 'Curso',          value: curso },
        { label: 'Edad',           value: `${edad} años` },
        { label: 'Hermanos',       value: hermanos },
        { label: 'Ciudad de nac.', value: ciudad },
    ];

    fields.forEach(({ label, value }) => {
        const row = document.createElement('p');
        row.innerHTML = `<strong>${label}:</strong> ${value}`;
        info.appendChild(row);
    });

    const actions = document.createElement('div');
    actions.classList.add('card-actions');

    const editBtn = document.createElement('i');
    editBtn.classList.add('fas', 'fa-edit', 'icon', 'icon-edit');
    editBtn.addEventListener('click', () => onEdit(li));

    const deleteBtn = document.createElement('i');
    deleteBtn.classList.add('fas', 'fa-trash', 'icon', 'icon-delete');
    deleteBtn.addEventListener('click', () => onDelete(li));

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);
    li.appendChild(info);
    li.appendChild(actions);
    return li;
};

export default personaCard;
