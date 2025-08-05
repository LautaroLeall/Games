// src/components/GSM/memoryLogic.js

// Import audios
import Sound1 from './sound/sound-1.mp3';
import Sound2 from './sound/sound-2.mp3';
import Sound3 from './sound/sound-3.mp3';
import Sound4 from './sound/sound-4.mp3';

// Devuelve un número aleatorio entre 1 y 4, representando un color.
export const getRandomColor = () => Math.floor(Math.random() * 4) + 1;

// Sonidos por color
const sounds = {
    1: new Audio(Sound1),
    2: new Audio(Sound2),
    3: new Audio(Sound3),
    4: new Audio(Sound4),
};

// Reproduce el sonido correspondiente al id de color.
export const playSound = (id) => {
    const audio = sounds[id];
    audio.currentTime = 0;
    audio.play();
};

// Ilumina el botón (vía setHighlight) y reproduce su sonido.
export const flashButton = (id, setHighlight) => {
    setHighlight(id);
    playSound(id);
    setTimeout(() => setHighlight(null), 500);
};

// Reproduce toda la secuencia de colores de forma asíncrona.
// Comprueba en cada paso si el juego sigue activo (getActive()).
export const playSequence = async (sequence, flashButtonFn, setLockInput, getActive) => {
    setLockInput(true);
    for (let i = 0; i < sequence.length; i++) {
        // Si reiniciaron, cancelamos
        if (!getActive()) return;
        await new Promise((res) => setTimeout(res, 700));
        if (!getActive()) return;
        flashButtonFn(sequence[i]);
    }
    // Desbloquea input sólo si sigue activo
    setTimeout(() => {
        if (getActive()) setLockInput(false);
    }, 700);
};
