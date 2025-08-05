// src/components/GLM/MemoryGame.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdGamepad } from "react-icons/md";
import Swal from 'sweetalert2';
import './MemoryGame.css';

// Sonidos por color
const sounds = {
    1: new Audio('https://cdn.freecodecamp.org/curriculum/take-home-projects/memory-light-game/sound-1.mp3'),
    2: new Audio('https://cdn.freecodecamp.org/curriculum/take-home-projects/memory-light-game/sound-2.mp3'),
    3: new Audio('https://cdn.freecodecamp.org/curriculum/take-home-projects/memory-light-game/sound-3.mp3'),
    4: new Audio('https://cdn.freecodecamp.org/curriculum/take-home-projects/memory-light-game/sound-4.mp3'),
};

const MemoryGame = ({ setMostrarFooter }) => {
    // Estados clave para el funcionamiento del juego
    const [sequence, setSequence] = useState([]); // Secuencia del sistema
    const [userSequence, setUserSequence] = useState([]); // Secuencia del jugador
    const [active, setActive] = useState(false); // Si el juego está activo
    const [level, setLevel] = useState(0); // Nivel actual
    const [highlight, setHighlight] = useState(null); // Color iluminado
    const [lockInput, setLockInput] = useState(true); // Bloquear clicks mientras suena
    const [strictMode, setStrictMode] = useState(false); // Modo estricto ON/OFF

    // Ocultar el footer mientras se juega
    useEffect(() => {
        setMostrarFooter(false);
    }, [setMostrarFooter]);

    // Generar número aleatorio del 1 al 4 (colores)
    const getRandomColor = () => Math.floor(Math.random() * 4) + 1;

    // Reproducir sonido al activar color
    const playSound = (id) => {
        const audio = sounds[id];
        audio.currentTime = 0;
        audio.play();
    };

    // Iluminar y reproducir un botón
    const flashButton = (id) => {
        setHighlight(id);
        playSound(id);
        setTimeout(() => setHighlight(null), 500);
    };

    // Reproducir secuencia del sistema
    const playSequence = async () => {
        setLockInput(true);
        for (let i = 0; i < sequence.length; i++) {
            await new Promise((res) => setTimeout(res, 700));
            flashButton(sequence[i]);
        }
        setTimeout(() => setLockInput(false), 700);
    };

    // Iniciar juego desde cero
    const startGame = () => {
        const start = [getRandomColor()];
        setSequence(start);
        setUserSequence([]);
        setLevel(1);
        setActive(true);
        flashButton(start[0]);
        setTimeout(() => setLockInput(false), 1000);
    };

    // Reset completo del juego
    const resetGame = () => {
        setActive(false);
        setSequence([]);
        setUserSequence([]);
        setLevel(0);
        setHighlight(null);
        setLockInput(true);
    };

    // Alternar el modo estricto
    const handleStrictToggle = () => {
        setStrictMode(!strictMode);
    };

    // Manejar click del jugador
    const handleClick = (id) => {
        if (!active || lockInput) return;

        const updatedSequence = [...userSequence, id];
        setUserSequence(updatedSequence);
        flashButton(id);

        const index = updatedSequence.length - 1;

        // Si se equivoca
        if (updatedSequence[index] !== sequence[index]) {
            if (strictMode) {
                Swal.fire({
                    icon: 'error',
                    title: '¡Modo estricto activado!',
                    text: 'Fallaste. Volvés al principio.',
                    confirmButtonText: 'Reintentar',
                    background: '#1a1a1a',
                    color: '#fff',
                }).then(() => resetGame());
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: '¡Oops!',
                    text: 'Fallaste, pero podés seguir intentando.',
                    confirmButtonText: 'Continuar',
                    background: '#1a1a1a',
                    color: '#fff',
                }).then(() => {
                    setUserSequence([]);
                    setTimeout(() => playSequence(), 1000);
                });
            }
            return;
        }

        // Si acierta toda la secuencia
        if (updatedSequence.length === sequence.length) {
            const next = [...sequence, getRandomColor()];
            setLevel(level + 1);
            setSequence(next);
            setUserSequence([]);
            setTimeout(() => playSequence(), 1000);
        }
    };

    // UI del juego
    return (
        <div className="simon-container d-flex flex-column align-items-center text-center">
            {/* Título principal */}
            <h1 className="first-title">SIMON</h1>
            <p className="description m-3">NIVEL ACTUAL: <strong>{level}</strong></p>

            {/* Control */}
            <div className="d-flex justify-content-center">
                <button
                    className={`btn btn-strict ${strictMode ? 'active-strict' : ''}`}
                    onClick={handleStrictToggle}
                >
                    {strictMode ? 'Modo Estricto: ON' : 'Modo Estricto: OFF'}
                </button>
            </div>

            {/* Zona de juego visual */}
            <div className="circle-wrapper">
                <div className={`quadrant green ${highlight === 1 ? 'active' : ''}`} onClick={() => handleClick(1)} />
                <div className={`quadrant red ${highlight === 2 ? 'active' : ''}`} onClick={() => handleClick(2)} />
                <div className={`quadrant yellow ${highlight === 3 ? 'active' : ''}`} onClick={() => handleClick(3)} />
                <div className={`quadrant blue ${highlight === 4 ? 'active' : ''}`} onClick={() => handleClick(4)} />

                {/* Círculo decorativo del centro */}
                <div className="center-circle shadow">
                    <MdGamepad />
                </div>
            </div>

            {/* Botones */}
            <div className="mt-4 d-flex gap-3 flex-wrap justify-content-center">
                <button
                    className="btn btn-play"
                    onClick={active ? resetGame : startGame}
                >
                    {active ? 'REINICIAR' : 'JUGAR'}
                </button>

                <Link to="/" className="btn btn-play">VOLVER</Link>
            </div>
        </div>
    );
};

export default MemoryGame;
