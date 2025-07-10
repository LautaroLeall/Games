// main.js
// Se inician todos los eventos y se hace el glue code entre módulos.
import { btnPlay, gameContainer, btnReset, btnExit, instructions, optionsContainer } from './domElements.js';
import { crearOpciones, manejarEleccionUsuario } from './uiHandler.js';
import { resetScores } from './gameLogic.js';

// Iniciar juego
btnPlay.addEventListener('click', () => {
    gameContainer.style.display = 'flex';
    btnPlay.disabled = true;
    btnPlay.style.display = 'none';
    crearOpciones();
});

// Reiniciar solo ronda
btnReset.addEventListener('click', () => {
    btnPlay.textContent = 'JUGAR';
    btnPlay.style.display = 'none';
    btnPlay.disabled = true;
    instructions.style.display = 'block';
    crearOpciones();
    btnReset.style.display = 'none';
    btnExit.style.display = 'none';
});

// Volver al inicio
btnExit.addEventListener('click', () => {
    resetScores();
    document.querySelector('.points-user').textContent = '0';
    document.querySelector('.points-computer').textContent = '0';
    btnPlay.textContent = 'JUGAR';
    btnPlay.style.display = 'inline-block';
    btnPlay.disabled = false;
    gameContainer.style.display = 'none';
    instructions.style.display = 'block';
    optionsContainer.innerHTML = '';
    btnReset.style.display = 'none';
    btnExit.style.display = 'none';
});
