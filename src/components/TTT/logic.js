export const verificarGanador = (tablero) => {
    const combinacionesGanadoras = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // filas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columnas
        [0, 4, 8], [2, 4, 6]            // diagonales
    ];

    for (let [a, b, c] of combinacionesGanadoras) {
        if (tablero[a] && tablero[a] === tablero[b] && tablero[a] === tablero[c]) {
            return tablero[a]; // 'X' o 'O'
        }
    }

    return null;
};

export const esEmpate = (tablero) => {
    return tablero.every(celda => celda !== null) && !verificarGanador(tablero);
};

export const obtenerMovimientoComputadora = (tablero) => {
    const cpu = 'O';
    const jugador = 'X';
    const combinacionesGanadoras = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    // 1. Intentar ganar
    for (let combo of combinacionesGanadoras) {
        const [a, b, c] = combo;
        const valores = [tablero[a], tablero[b], tablero[c]];
        if (valores.filter(v => v === cpu).length === 2 && valores.includes(null)) {
            return combo[valores.indexOf(null)];
        }
    }

    // 2. Bloquear al jugador si va a ganar
    for (let combo of combinacionesGanadoras) {
        const [a, b, c] = combo;
        const valores = [tablero[a], tablero[b], tablero[c]];
        if (valores.filter(v => v === jugador).length === 2 && valores.includes(null)) {
            return combo[valores.indexOf(null)];
        }
    }

    // 3. Tomar el centro
    if (tablero[4] === null) return 4;

    // 4. Tomar una esquina libre
    const esquinas = [0, 2, 6, 8];
    const esquinaLibre = esquinas.find(i => tablero[i] === null);
    if (esquinaLibre !== undefined) return esquinaLibre;

    // 5. Cualquier celda libre
    const disponibles = tablero
        .map((valor, indice) => (valor === null ? indice : null))
        .filter(indice => indice !== null);

    if (disponibles.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * disponibles.length);
    return disponibles[randomIndex];
};
