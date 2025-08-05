// src/components/TTT/TTTGame.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { verificarGanador, esEmpate, obtenerMovimientoComputadora } from './logic';
import circleImg from '/public/TTT/circle.png';
import crossImg from '/public/TTT/cross.png';
import './TTT.css';

const TTTGame = ({ setMostrarFooter }) => {
    // Estados del juego
    const [modoVsCPU, setModoVsCPU] = useState(null);
    const [tablero, setTablero] = useState(Array(9).fill(null));
    const [turnoX, setTurnoX] = useState(true);
    const [turnoInicialX, setTurnoInicialX] = useState(true);
    const [ganador, setGanador] = useState(null);
    const [puntosX, setPuntosX] = useState(0);
    const [puntosO, setPuntosO] = useState(0);

    const jugadorActual = turnoX ? 'X' : 'O';

    // Mostrar/Ocultar Footer dependiendo del estado inicial
    useEffect(() => {
        setMostrarFooter(modoVsCPU === null);
    }, [modoVsCPU, setMostrarFooter]);

    // Ejecuta una jugada y actualiza estado del juego
    const realizarJugada = useCallback((indice, jugador) => {
        const nuevoTablero = [...tablero];
        nuevoTablero[indice] = jugador;
        setTablero(nuevoTablero);

        const resultado = verificarGanador(nuevoTablero);
        if (resultado) {
            setGanador(resultado);
            if (resultado === 'X') setPuntosX(p => p + 1);
            else if (resultado === 'O') setPuntosO(p => p + 1);
            return;
        }

        if (esEmpate(nuevoTablero)) {
            setGanador('Empate');
            return;
        }

        // Cambia turno
        setTurnoX(jugador === 'X' ? false : true);
    }, [tablero]);

    // Turno automático de la computadora
    useEffect(() => {
        if (modoVsCPU && !ganador && jugadorActual === 'O') {
            const timer = setTimeout(() => {
                const indiceCPU = obtenerMovimientoComputadora(tablero);
                if (indiceCPU !== null) {
                    realizarJugada(indiceCPU, 'O');
                }
            }, 400);

            return () => clearTimeout(timer);
        }
    }, [tablero, modoVsCPU, ganador, jugadorActual, realizarJugada]);

    // Acción al hacer clic en una celda
    const manejarClick = (indice) => {
        if (tablero[indice] || ganador || (modoVsCPU && jugadorActual === 'O')) return;
        realizarJugada(indice, jugadorActual);
    };

    // Reinicia una ronda manteniendo la alternancia de turno
    const reiniciarRonda = () => {
        const nuevoInicio = !turnoInicialX;
        setTurnoInicialX(nuevoInicio);
        setTurnoX(nuevoInicio);
        setTablero(Array(9).fill(null));
        setGanador(null);
    };

    // Sale del juego y reinicia todo
    const reiniciarJuego = () => {
        setModoVsCPU(null);
        setTablero(Array(9).fill(null));
        setTurnoX(true);
        setTurnoInicialX(true);
        setGanador(null);
        setPuntosX(0);
        setPuntosO(0);
        setMostrarFooter(true); // Mostrar el footer nuevamente
    };

    // Renderiza el ícono X u O
    const renderIcono = (valor) => {
        if (valor === 'X') return <img src={crossImg} alt="X" />;
        if (valor === 'O') return <img src={circleImg} alt="O" />;
        return null;
    };

    // MENÚ INICIAL (Seleccionar con quién jugar)
    if (modoVsCPU === null) {
        return (
            <div className="ttt-container1 text-center">
                <h1 className="first-title">TA TE TI</h1>
                <p className="description">¿CON QUIÉN QUIERES JUGAR?</p>
                <div className="d-flex flex-column justify-content-center align-items-center gap-3">
                    <div className="where-play d-flex justify-content-center align-items-center gap-3">
                        <button className="btn btn-play btn-ttt" onClick={() => setModoVsCPU(false)}>AMIGO</button>
                        <button className="btn btn-play btn-ttt" onClick={() => setModoVsCPU(true)}>COMPUTADORA</button>
                    </div>
                    <Link to="/" className="btn btn-play">VOLVER</Link>
                </div>
            </div>
        );
    }

    // INTERFAZ PRINCIPAL DEL JUEGO
    return (
        <div className="ttt-container2 text-center">
            <div className="points d-flex justify-content-center align-items-center gap-5">
                <div className="user">
                    <i className="bi bi-x-lg"></i>
                    <p className="points-user">{puntosX}</p>
                </div>
                <div className="computer">
                    <i className="bi bi-circle"></i>
                    <p className="points-computer">{puntosO}</p>
                </div>
            </div>

            <h1 className="first-title">TA TE TI</h1>

            <p className="description">
                {ganador
                    ? ganador === 'Empate'
                        ? '¡ES UN EMPATE!'
                        : `¡GANÓ EL JUGADOR ${ganador}!`
                    : `TURNO DEL JUGADOR ${jugadorActual}`}
            </p>

            <div className="tablero d-grid justify-content-center align-items-center">
                {tablero.map((valor, indice) => (
                    <div
                        key={indice}
                        className={`celda ${valor ? 'ocupada' : ''}`}
                        onClick={() => manejarClick(indice)}
                    >
                        {renderIcono(valor)}
                    </div>
                ))}
            </div>

            {ganador && (
                <div className="mt-4 d-flex flex-column align-items-center gap-3">
                    <button className="btn btn-play" onClick={reiniciarRonda}>VOLVER A JUGAR</button>
                    <button className="btn btn-play" onClick={reiniciarJuego}>SALIR</button>
                </div>
            )}
        </div>
    );
};

export default TTTGame;
