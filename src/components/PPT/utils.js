// src/components/PPT/utils.js
// Funciones auxiliares puras para el juego de Piedra, Papel o Tijera

// Opciones disponibles
export const opciones = ['piedra', 'papel', 'tijera'];

// Devuelve una elección aleatoria para la computadora
export function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * opciones.length);
    return opciones[randomIndex];
}

// Determina el resultado del juego
export function getWinner(user, computer) {
    if (user === computer) return 'Empate';

    if (
        (user === 'piedra' && computer === 'tijera') ||
        (user === 'papel' && computer === 'piedra') ||
        (user === 'tijera' && computer === 'papel')
    ) {
        return 'Ganaste';
    }

    return 'Perdiste';
}
