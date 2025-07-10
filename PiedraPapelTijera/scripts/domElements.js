// domElements.js
// Contiene todas las referencias a elementos del DOM que se usan en el juego.
export const btnPlay = document.querySelector('.btn-play');
export const gameContainer = document.querySelector('.game');
export const optionsContainer = document.querySelector('.options-img');
export const instructions = document.querySelector('.instructions');
export const scoreUser = document.querySelector('.points-user');
export const scoreComputer = document.querySelector('.points-computer');

// Botones adicionales
export const btnReset = document.createElement('button');
btnReset.textContent = 'VOLVER A JUGAR';
btnReset.className = 'btn btn-play btn-reset';
btnReset.style.display = 'none';

export const btnExit = document.createElement('button');
btnExit.textContent = 'SALIR';
btnExit.className = 'btn btn-play btn-exit';
btnExit.style.display = 'none';

gameContainer.appendChild(btnReset);
gameContainer.appendChild(btnExit);
