const tresEnRaya = (onWin) => {

    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position:fixed; inset:0; background:rgba(0,0,0,0.7);
        display:flex; align-items:center; justify-content:center; z-index:99999;
    `;

    const modal = document.createElement('div');
    modal.style.cssText = `
        background: linear-gradient(45deg,#ff00ff,#00ffff,#ffff00,#ff0000);
        background-size: 400% 400%;
        animation: rainbow-bg 5s ease infinite;
        border-radius: 20px;
        padding: 30px;
        text-align: center;
        font-family: 'Comic Sans MS', cursive;
        color: white;
        max-width: 420px;
        width: 95%;
        position: relative;
    `;

    if (!document.getElementById('ttt-keyframes')) {
        const kf = document.createElement('style');
        kf.id = 'ttt-keyframes';
        kf.textContent = `
            @keyframes rainbow-bg {
                0%   { background-position: 0% 50%; }
                50%  { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
            @keyframes ttt-spin {
                from { transform: rotate(0deg); }
                to   { transform: rotate(360deg); }
            }
            @keyframes wiggle {
                from { transform: rotateY(0deg) scale(1); }
                to   { transform: rotateY(10deg) scale(1.1); }
            }
            @keyframes bounce {
                0%,20%,50%,80%,100% { transform: translateY(0); }
                40% { transform: translateY(-10px); }
                60% { transform: translateY(-5px); }
            }
            @keyframes flash {
                0%,50%  { opacity:1; }
                25%,75% { opacity:0; }
            }
            @keyframes fall {
                to { transform: translateY(100vh) rotate(360deg); }
            }
        `;
        document.head.appendChild(kf);
    }

    const titulo = document.createElement('h1');
    titulo.textContent = '¡3 en Raya del Caos!';
    titulo.style.cssText = `
        font-size:1.8em; text-shadow:2px 2px 4px #000;
        animation: ttt-spin 2s linear infinite;
        margin-bottom: 10px;
    `;

    const instruccion = document.createElement('p');
    instruccion.textContent = '🏆 Gana como X para guardar el campo';
    instruccion.style.cssText = 'font-size:0.85em; margin-bottom:8px; color:#fff;';

    // Tablero
    const tablero = document.createElement('div');
    tablero.style.cssText = `
        display:grid;
        grid-template-columns: repeat(3,100px);
        grid-template-rows: repeat(3,100px);
        gap:10px;
        justify-content:center;
        margin:20px auto;
        perspective:1000px;
    `;

    const mensaje = document.createElement('div');
    mensaje.style.cssText = `font-size:1.5em; margin-top:10px; animation: flash 1s infinite; color:white;`;
    mensaje.textContent = 'Turno de X';

    const btnRow = document.createElement('div');
    btnRow.style.cssText = 'display:flex; gap:10px; justify-content:center; margin-top:10px;';

    const reiniciarBtn = document.createElement('button');
    reiniciarBtn.textContent = 'Reiniciar (¡Con Efectos Locos!)';
    reiniciarBtn.style.cssText = `
        background:#ff4500; color:white; border:none; padding:10px 20px;
        font-size:1em; border-radius:20px; cursor:pointer;
        animation: bounce 1s infinite; font-family:'Comic Sans MS',cursive;
        transition: all 0.3s;
    `;
    reiniciarBtn.addEventListener('mouseover', () => {
        reiniciarBtn.style.background = '#00ff00';
        reiniciarBtn.style.boxShadow = '0 0 15px #00ff00';
    });
    reiniciarBtn.addEventListener('mouseout', () => {
        reiniciarBtn.style.background = '#ff4500';
        reiniciarBtn.style.boxShadow = '';
    });

    const cancelarBtn = document.createElement('button');
    cancelarBtn.textContent = 'Cancelar';
    cancelarBtn.style.cssText = `
        background:#555; color:white; border:none; padding:10px 20px;
        font-size:1em; border-radius:20px; cursor:pointer;
        font-family:'Comic Sans MS',cursive; transition: all 0.3s;
    `;
    cancelarBtn.addEventListener('click', () => overlay.remove());

    btnRow.appendChild(reiniciarBtn);
    btnRow.appendChild(cancelarBtn);

    let turno = 'X';
    let juegoTerminado = false;
    let celdas = [];

    function getRandomEmoji() {
        const emojis = ['🌈','🍕','🚀','🐱','💥','🦄','🍔','🎉','🔥'];
        return emojis[Math.floor(Math.random() * emojis.length)];
    }

    function crearTablero() {
        tablero.innerHTML = '';
        celdas = [];
        for (let i = 0; i < 9; i++) {
            const celda = document.createElement('div');
            celda.style.cssText = `
                width:100px; height:100px;
                background: radial-gradient(circle,#ff6b6b,#4ecdc4);
                border:3px solid #fff; border-radius:50%;
                display:flex; align-items:center; justify-content:center;
                font-size:2em; cursor:pointer; transition:all 0.3s ease;
                transform-style:preserve-3d;
                animation: wiggle 1s ease-in-out infinite alternate;
            `;
            celda.dataset.index = i;
            celda.addEventListener('click', manejarClick);

            const emoji = document.createElement('span');
            emoji.textContent = getRandomEmoji();
            celda.appendChild(emoji);

            tablero.appendChild(celda);
            celdas.push(celda);
        }
    }

    function manejarClick(event) {
        if (juegoTerminado) return;
        const celda = event.currentTarget;
        if (celda.classList.contains('ocupada')) return;

        celda.innerHTML = turno;
        celda.classList.add('ocupada');
        celda.style.background = `hsl(${Math.random()*360},100%,50%)`;
        celda.style.transform   = `rotate(${Math.random()*360}deg) scale(${0.5+Math.random()})`;
        celda.style.animation   = 'none';

        if (verificarGanador()) {
            mensaje.textContent = `¡${turno} gana! ¡Explosión de confeti! 🎊`;
            mensaje.style.color = `hsl(${Math.random()*360},100%,50%)`;
            juegoTerminado = true;
            lanzarConfeti();

            if (turno === 'X') {
                cancelarBtn.style.display = 'none';
                setTimeout(() => {
                    overlay.remove();
                    onWin();
                }, 2500);
            }
            return;
        }

        if (celdas.every(c => c.classList.contains('ocupada'))) {
            mensaje.textContent = '¡Empate! ¡El mundo se acaba! 🌍💥';
            juegoTerminado = true;
            return;
        }

        turno = turno === 'X' ? 'O' : 'X';
        mensaje.textContent = `Turno de ${turno}`;
        mensaje.style.color = `hsl(${Math.random()*360},100%,50%)`;

        celdas.forEach(c => {
            c.style.borderColor = `hsl(${Math.random()*360},100%,50%)`;
        });
    }

    function verificarGanador() {
        const combinaciones = [
            [0,1,2],[3,4,5],[6,7,8],
            [0,3,6],[1,4,7],[2,5,8],
            [0,4,8],[2,4,6]
        ];
        return combinaciones.some(combo =>
            combo.every(i => celdas[i].textContent === turno)
        );
    }

    function lanzarConfeti() {
        for (let i = 0; i < 100; i++) {
            const c = document.createElement('div');
            c.textContent = '🎉';
            c.style.cssText = `
                position:fixed; pointer-events:none; z-index:999999;
                left:${Math.random()*window.innerWidth}px; top:-10px;
                font-size:${Math.random()*30+10}px;
                animation: fall ${Math.random()*3+2}s linear forwards;
            `;
            document.body.appendChild(c);
            setTimeout(() => c.remove(), 5000);
        }
    }

    reiniciarBtn.addEventListener('click', () => {
        turno = 'X';
        juegoTerminado = false;
        mensaje.textContent = 'Turno de X';
        mensaje.style.color = 'white';
        cancelarBtn.style.display = '';
        crearTablero();
        document.body.style.animationDuration = '1s';
        setTimeout(() => document.body.style.animationDuration = '5s', 1000);
    });

    crearTablero();

    modal.appendChild(titulo);
    modal.appendChild(instruccion);
    modal.appendChild(tablero);
    modal.appendChild(mensaje);
    modal.appendChild(btnRow);
    overlay.appendChild(modal);

    return overlay;
};

export default tresEnRaya;
