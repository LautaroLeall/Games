// src/components/GLM/MemoryGame.jsx
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MdGamepad } from "react-icons/md";
import Swal from 'sweetalert2';
import './MemoryGame.css';

import {
    getRandomColor,
    flashButton,
    playSequence
} from './memoryLogic';

const MemoryGame = ({ setMostrarFooter }) => {
    // Secuencia del sistema y del usuario
    const [sequence, setSequence] = useState([]);
    const [userSequence, setUserSequence] = useState([]);
    // Control de estado del juego
    const [active, setActive] = useState(false);
    const [level, setLevel] = useState(0);
    // Para resaltar el botón iluminado
    const [highlight, setHighlight] = useState(null);
    // Bloquea clicks mientras suena o anima
    const [lockInput, setLockInput] = useState(true);
    // Modo estricto (solo configurable antes de jugar)
    const [strictMode, setStrictMode] = useState(false);
    // Para disparar la animación de error (“shake” CSS)
    const [errorAnim, setErrorAnim] = useState(false);

    // Ref que siempre refleja el último valor de `active`
    const activeRef = useRef(active);
    useEffect(() => { activeRef.current = active }, [active]);

    // Mostrar/ocultar footer según si el juego está activo
    useEffect(() => {
        setMostrarFooter(!active);
    }, [active, setMostrarFooter]);

    // Inicia el juego:
    // - Crea la primera secuencia
    // - Resetea el estado de usuario y nivel
    // - Activa la reproducción de la secuencia
    const handleStartGame = () => {
        const start = [getRandomColor()];
        setSequence(start);
        setUserSequence([]);
        setLevel(1);
        setActive(true);

        setTimeout(() => {
            playSequence(
                start,
                (id) => flashButton(id, setHighlight),
                setLockInput,
                () => activeRef.current  // pasa la función que chequea si sigue activo
            );
        }, 500);
    };

    // Resetea TODO al estado inicial y cancela
    // cualquier secuencia en curso (porque activeRef pasa a false).
    const handleResetGame = () => {
        setActive(false);
        setSequence([]);
        setUserSequence([]);
        setLevel(0);
        setHighlight(null);
        setLockInput(true);
    };

    // Alterna modo estricto solo antes de jugar.
    const handleStrictToggle = () => {
        if (!active) {
            setStrictMode(!strictMode);
        }
    };

    // Maneja clicks del jugador:
    // - Si el input está bloqueado o no activo, no hace nada.
    // - Si el usuario falla, dispara animación + alerta.
    // - Si completa, avanza nivel y reproduce nueva secuencia.
    const handleClick = (id) => {
        if (!active || lockInput) return;

        const updated = [...userSequence, id];
        setUserSequence(updated);
        flashButton(id, setHighlight);

        const idx = updated.length - 1;
        const isWrong = updated[idx] !== sequence[idx];

        if (isWrong) {
            // Shake animation al fallar
            setErrorAnim(true);
            setTimeout(() => setErrorAnim(false), 600);

            const swalOpts = { background: '#1a1a1a', color: '#fff' };

            if (strictMode) {
                Swal.fire({
                    icon: 'error',
                    title: '¡Modo estricto activado!',
                    text: 'Fallaste. Volvés al principio.',
                    confirmButtonText: 'Reiniciar',
                    ...swalOpts
                }).then(handleResetGame);
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: '¡Oops!',
                    text: 'Fallaste, pero podés seguir intentando.',
                    confirmButtonText: 'Continuar',
                    ...swalOpts
                }).then(() => {
                    setUserSequence([]);
                    setTimeout(() => {
                        playSequence(
                            sequence,
                            (c) => flashButton(c, setHighlight),
                            setLockInput,
                            () => activeRef.current
                        );
                    }, 1000);
                });
            }
            return;
        }

        // Si acierta toda la secuencia, sube nivel
        if (updated.length === sequence.length) {
            const next = [...sequence, getRandomColor()];
            setLevel(level + 1);
            setSequence(next);
            setUserSequence([]);
            setTimeout(() => {
                playSequence(
                    next,
                    (c) => flashButton(c, setHighlight),
                    setLockInput,
                    () => activeRef.current
                );
            }, 1000);
        }
    };

    return (
        <div className={`simon-container d-flex flex-column align-items-center text-center ${errorAnim ? 'shake-animation' : ''}`}>
            <h1 className="first-title">SIMON</h1>

            {/* Solo muestra el nivel cuando el juego está activo */}
            {active && (
                <p className="description m-3">
                    NIVEL ACTUAL: <strong>{level}</strong>
                </p>
            )}

            {/* Toggle de modo estricto; deshabilitado en partida */}
            <div className="d-flex justify-content-center">
                <button
                    className={`btn btn-strict ${strictMode ? 'active-strict' : ''}`}
                    onClick={handleStrictToggle}
                    disabled={active}
                >
                    {strictMode ? 'Modo Estricto: ON' : 'Modo Estricto: OFF'}
                </button>
            </div>

            {/* Zona de juego */}
            <div className="circle-wrapper">
                <div className={`quadrant green ${highlight === 1 ? 'active' : ''}`} onClick={() => handleClick(1)} />
                <div className={`quadrant red ${highlight === 2 ? 'active' : ''}`} onClick={() => handleClick(2)} />
                <div className={`quadrant yellow ${highlight === 3 ? 'active' : ''}`} onClick={() => handleClick(3)} />
                <div className={`quadrant blue ${highlight === 4 ? 'active' : ''}`} onClick={() => handleClick(4)} />

                <div className="center-circle shadow">
                    <MdGamepad />
                </div>
            </div>

            {/* Controles de inicio/reset y volver */}
            <div className="mt-4 d-flex gap-3 flex-wrap justify-content-center">
                <button
                    className="btn btn-play"
                    onClick={active ? handleResetGame : handleStartGame}
                >
                    {active ? 'REINICIAR' : 'JUGAR'}
                </button>

                {!active && (
                    <Link to="/" className="btn btn-play">
                        VOLVER
                    </Link>
                )}
            </div>
        </div>
    );
};

export default MemoryGame;
