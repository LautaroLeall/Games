// uiHandler.js
// Relacionado con la UI (crear imágenes, actualizar DOM, mostrar SweetAlert).
import { opciones, getComputerChoice, getWinner, getScores } from './gameLogic.js';
import {
    optionsContainer, instructions, btnPlay,
    scoreUser, scoreComputer, btnReset, btnExit
} from './domElements.js';

export function crearOpciones() {
    optionsContainer.innerHTML = '';

    opciones.forEach(opcion => {
        const img = document.createElement('img');
        img.src = `./assets/${opcion}.png`;
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

export function manejarEleccionUsuario(userChoice, userImg) {
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
        computerImg.src = `./assets/${computerChoice}.png`;
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
            const { puntosJugador, puntosComputadora } = getScores();

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
