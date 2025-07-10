// gameLogic.js
// Contiene la lógica pura del juego: opciones, resultado, puntuación.
export const opciones = ['piedra', 'papel', 'tijera'];

let puntosJugador = 0;
let puntosComputadora = 0;

export function getComputerChoice() {
    return opciones[Math.floor(Math.random() * opciones.length)];
}

export function getWinner(user, computer) {
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

export function getScores() {
    return { puntosJugador, puntosComputadora };
}

export function resetScores() {
    puntosJugador = 0;
    puntosComputadora = 0;
}
