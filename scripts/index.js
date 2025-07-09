// Obtener elementos del DOM
let btnPlay = document.querySelector('.btn-play'); // Botón de jugar
const gameContainer = document.querySelector('.game');
const optionsContainer = document.querySelector('.options-img');
const instructions = document.querySelector('.instructions');
const scoreUser = document.querySelector('.points-user');
const scoreComputer = document.querySelector('.points-computer');

// Crear botones Reiniciar y Salir
const btnReset = document.createElement('button');
btnReset.textContent = 'VOLVER A JUGAR';
btnReset.className = 'btn btn-play btn-reset';
btnReset.style.display = 'none';

gameContainer.appendChild(btnReset);

const btnExit = document.createElement('button');
btnExit.textContent = 'SALIR';
btnExit.className = 'btn btn-play btn-exit';
btnExit.style.display = 'none';

gameContainer.appendChild(btnExit);

// Estado inicial
let puntosJugador = 0;
let puntosComputadora = 0;

// Ocultar el contenedor del juego al cargar
gameContainer.style.display = 'none';

// Opciones válidas
const opciones = ['piedra', 'papel', 'tijera'];

// Crear las opciones (imágenes)
function crearOpciones() {
    optionsContainer.innerHTML = '';

    opciones.forEach(opcion => {
        const img = document.createElement('img');
        img.src = `/assets/${opcion}.png`;
        img.alt = opcion;
        img.classList.add('opcion-img', 'animate-fade');

        Object.assign(img.style, {
            width: '10rem',
            margin: '1rem',
            borderRadius: '50%',
            padding: '1rem',
            backgroundColor: 'rgba(70, 100, 100, 0.6)',
            border: '5px solid rgb(70, 100, 100)',
            transition: 'all 0.3s ease-in-out',
            cursor: 'pointer'
        });

        img.addEventListener('click', () => manejarEleccionUsuario(opcion, img), { once: true });

        optionsContainer.appendChild(img);
    });
}

// Elección aleatoria
function getComputerChoice() {
    return opciones[Math.floor(Math.random() * opciones.length)];
}

// Determinar resultado
function getWinner(user, computer) {
    if (user === computer) return 'Empate';
    if (
        (user === 'piedra' && computer === 'tijera') ||
        (user === 'papel' && computer === 'piedra') ||
        (user === 'tijera' && computer === 'papel')
    ) {
        puntosJugador++;
        return 'Ganaste';
    }
    puntosComputadora++;
    return 'Perdiste';
}

// Manejo de selección del jugador
function manejarEleccionUsuario(userChoice, userImg) {
    instructions.style.display = 'none';
    btnPlay.style.display = 'none';

    document.querySelectorAll('.opcion-img').forEach(img => {
        img.style.pointerEvents = 'none';
        if (img !== userImg) {
            img.style.display = 'none';
        } else {
            img.classList.add('animate-shake', 'combat-left');
            img.style.marginRight = '2rem';
        }
    });

    setTimeout(() => {
        const computerChoice = getComputerChoice();

        const computerImg = document.createElement('img');
        computerImg.src = `/assets/${computerChoice}.png`;
        computerImg.alt = computerChoice;
        computerImg.classList.add('animate-fade', 'combat-right');

        Object.assign(computerImg.style, {
            width: '10rem',
            margin: '1rem',
            borderRadius: '50%',
            padding: '1rem',
            backgroundColor: 'rgba(70, 100, 100, 0.6)',
            border: '5px solid rgb(70, 100, 100)',
            transition: 'all 0.3s ease-in-out',
            transform: 'rotateY(180deg)'
        });

        optionsContainer.appendChild(computerImg);

        setTimeout(() => {
            const resultado = getWinner(userChoice, computerChoice);

            scoreUser.textContent = puntosJugador;
            scoreComputer.textContent = puntosComputadora;

            Swal.fire({
                title: resultado,
                html: `<strong>Tu elección:</strong> ${userChoice.toUpperCase()}<br><strong>Computadora:</strong> ${computerChoice.toUpperCase()}`,
                icon: resultado === 'Ganaste' ? 'success' : resultado === 'Perdiste' ? 'error' : 'info',
                showConfirmButton: false,
                allowOutsideClick: true,
                showCloseButton: true
            });

            btnReset.style.display = 'inline-block';
            btnExit.style.display = 'inline-block';
        }, 500);
    }, 1500);
}

// Reset del juego
function resetGame() {
    btnPlay.textContent = 'JUGAR';
    btnPlay.style.display = 'none';
    btnPlay.disabled = true;
    instructions.style.display = 'block';
    crearOpciones();
    btnReset.style.display = 'none';
    btnExit.style.display = 'none';
}

// Salir al inicio
function salirAlInicio() {
    puntosJugador = 0;
    puntosComputadora = 0;
    scoreUser.textContent = '0';
    scoreComputer.textContent = '0';
    btnPlay.textContent = 'JUGAR';
    btnPlay.style.display = 'inline-block';
    btnPlay.disabled = false;
    gameContainer.style.display = 'none';
    instructions.style.display = 'block';
    optionsContainer.innerHTML = '';
    btnReset.style.display = 'none';
    btnExit.style.display = 'none';
}

// 🚀 Iniciar juego
btnPlay.addEventListener('click', () => {
    gameContainer.style.display = 'flex';
    btnPlay.disabled = true;
    btnPlay.style.display = 'none';
    crearOpciones();
});

btnReset.addEventListener('click', resetGame);
btnExit.addEventListener('click', salirAlInicio);
