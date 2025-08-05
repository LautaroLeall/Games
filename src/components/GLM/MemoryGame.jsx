// src/components/GLM/MemoryGame.jsx
import React, { useState, useEffect } from 'react';
import './MemoryGame.css';

const sounds = {
    1: new Audio('https://cdn.freecodecamp.org/curriculum/take-home-projects/memory-light-game/sound-1.mp3'),
    2: new Audio('https://cdn.freecodecamp.org/curriculum/take-home-projects/memory-light-game/sound-2.mp3'),
    3: new Audio('https://cdn.freecodecamp.org/curriculum/take-home-projects/memory-light-game/sound-3.mp3'),
    4: new Audio('https://cdn.freecodecamp.org/curriculum/take-home-projects/memory-light-game/sound-4.mp3'),
};

const MemoryGame = ({ setMostrarFooter }) => {
    const [secuencia, setSecuencia] = useState([]);
    const [usuarioSecuencia, setUsuarioSecuencia] = useState([]);
    const [activo, setActivo] = useState(false);
    const [nivel, setNivel] = useState(0);
    const [jugando, setJugando] = useState(false);
    const [parpadeo, setParpadeo] = useState(null);
    const [bloquearInput, setBloquearInput] = useState(true);

    useEffect(() => {
        setMostrarFooter(false);
    }, [setMostrarFooter]);

    const obtenerColorAleatorio = () => Math.floor(Math.random() * 4) + 1;

    const reproducirSonido = (id) => {
        const sonido = sounds[id];
        sonido.currentTime = 0;
        sonido.play();
    };

    const iluminarBoton = (id) => {
        setParpadeo(id);
        reproducirSonido(id);
        setTimeout(() => setParpadeo(null), 400);
    };

    const reproducirSecuencia = async () => {
        setBloquearInput(true);
        for (let i = 0; i < secuencia.length; i++) {
            await new Promise((r) => setTimeout(r, 600));
            iluminarBoton(secuencia[i]);
        }
        setTimeout(() => setBloquearInput(false), 600);
    };

    const iniciarJuego = () => {
        const nuevoInicio = [obtenerColorAleatorio()];
        setSecuencia(nuevoInicio);
        setUsuarioSecuencia([]);
        setNivel(1);
        setActivo(true);
        setJugando(true);
        setTimeout(() => iluminarBoton(nuevoInicio[0]), 600);
        setTimeout(() => setBloquearInput(false), 1000);
    };

    const reiniciarJuego = () => {
        setActivo(false);
        setSecuencia([]);
        setUsuarioSecuencia([]);
        setNivel(0);
        setParpadeo(null);
        setBloquearInput(true);
        setJugando(false);
    };

    const manejarClick = (id) => {
        if (!jugando || bloquearInput) return;

        const nuevaSecuencia = [...usuarioSecuencia, id];
        setUsuarioSecuencia(nuevaSecuencia);
        iluminarBoton(id);

        const index = nuevaSecuencia.length - 1;

        if (nuevaSecuencia[index] !== secuencia[index]) {
            alert('¡Fallaste! 😵 Volvé a intentarlo');
            reiniciarJuego();
            return;
        }

        if (nuevaSecuencia.length === secuencia.length) {
            const siguiente = [...secuencia, obtenerColorAleatorio()];
            setNivel(nivel + 1);
            setSecuencia(siguiente);
            setUsuarioSecuencia([]);
            setTimeout(() => reproducirSecuencia(), 1000);
        }
    };

    return (
        <div className="simon-wrapper text-center">
            <h1 className="first-title">SIMON</h1>
            <p className="level">Nivel: {nivel}</p>

            <div className="simon-circulo">
                <div
                    className={`cuadrante top-left ${parpadeo === 1 ? 'activo' : ''}`}
                    onClick={() => manejarClick(1)}
                />
                <div
                    className={`cuadrante top-right ${parpadeo === 2 ? 'activo' : ''}`}
                    onClick={() => manejarClick(2)}
                />
                <div
                    className={`cuadrante bottom-left ${parpadeo === 3 ? 'activo' : ''}`}
                    onClick={() => manejarClick(3)}
                />
                <div
                    className={`cuadrante bottom-right ${parpadeo === 4 ? 'activo' : ''}`}
                    onClick={() => manejarClick(4)}
                />
                <div className="centro">
                    {!activo ? (
                        <button className="btn btn-play" onClick={iniciarJuego}>INICIAR</button>
                    ) : (
                        <button className="btn btn-play" onClick={reiniciarJuego}>REINICIAR</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MemoryGame;
