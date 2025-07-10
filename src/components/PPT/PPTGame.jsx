import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { opciones, getComputerChoice, getWinner } from './utils';

import Swal from 'sweetalert2';
import piedraImg from '/public/PPT/piedra.png';
import papelImg from '/public/PPT/papel.png';
import tijeraImg from '/public/PPT/tijera.png';
import './PPT.css';

const imagenes = {
    piedra: piedraImg,
    papel: papelImg,
    tijera: tijeraImg,
};

const PPTGame = () => {
    // Estados para puntajes
    const [puntosJugador, setPuntosJugador] = useState(0);
    const [puntosComputadora, setPuntosComputadora] = useState(0);

    // Estados para elecciones
    const [jugadaJugador, setJugadaJugador] = useState(null);
    const [jugadaComputadora, setJugadaComputadora] = useState(null);

    // Estado para controlar visibilidad de botones
    const [jugando, setJugando] = useState(false);

    // Función que se llama cuando el usuario elige una opción
    const manejarEleccion = (opcion) => {
        setJugadaJugador(opcion);
        const eleccionComputadora = getComputerChoice();
        setJugadaComputadora(eleccionComputadora);

        const resultado = getWinner(opcion, eleccionComputadora);

        if (resultado === 'Ganaste') setPuntosJugador(prev => prev + 1);
        else if (resultado === 'Perdiste') setPuntosComputadora(prev => prev + 1);

        // Mostrar resultado con SweetAlert
        setTimeout(() => {
            Swal.fire({
                title: resultado,
                html: `<strong>Tu elección:</strong> ${opcion.toUpperCase()}<br><strong>Computadora:</strong> ${eleccionComputadora.toUpperCase()}`,
                icon: resultado === 'Ganaste' ? 'success' : resultado === 'Perdiste' ? 'error' : 'info',
                showConfirmButton: false,
                allowOutsideClick: true,
                showCloseButton: true,
            });
        }, 500);

        setJugando(false);
    };

    // Función para reiniciar solo la ronda actual
    const reiniciarRonda = () => {
        setJugadaJugador(null);
        setJugadaComputadora(null);
        setJugando(true);
    };

    // Función para reiniciar todo el juego
    const reiniciarJuego = () => {
        setPuntosJugador(0);
        setPuntosComputadora(0);
        setJugadaJugador(null);
        setJugadaComputadora(null);
        setJugando(false);
    };

    return (
        <div className="ppt-container text-center">

            <div className="points d-flex justify-content-center align-items-center gap-5">
                <div className="user">
                    <i class="bi bi-person"></i>
                    <p className="points-user">
                        {puntosJugador}
                    </p>
                </div>
                <div className="computer">
                    <i className="bi bi-pc-display"></i>
                    <p className="points-computer">{puntosComputadora}</p>
                </div>
            </div>

            <h1 className="first-title">PIEDRA | PAPEL | TIJERA</h1>

            {!jugando && !jugadaJugador && (
                <p className="description">¡PRESIONA EL BOTON PARA JUGAR!</p>
            )}

            {jugando && !jugadaJugador && (
                <p className="description-instructions">¡ELIGE ALGUNA OPCION!</p>
            )}

            <div className="btn-iniciales d-flex justify-content-center align-items-center gap-3">
                {!jugando && !jugadaJugador && (
                    <button className="btn btn-play" onClick={() => setJugando(true)}>JUGAR</button>
                )}

                {!jugando && !jugadaJugador && (
                    <Link to="/" className="btn btn-play">VOLVER </Link>
                )}
            </div>

            {jugando && (
                <div className="options-img d-flex justify-content-center align-items-center gap-3">
                    {opciones.map(opcion => (
                        <img
                            key={opcion}
                            src={imagenes[opcion]}
                            alt={opcion}
                            className="opcion-img animate-option"
                            onClick={() => manejarEleccion(opcion)}
                        />
                    ))}
                </div>
            )}

            {jugadaJugador && jugadaComputadora && (
                <div className="results d-flex justify-content-center align-items-center gap-5 mt-4">
                    <div className="text-center">
                        <h4 className='description'>JUGADOR</h4>
                        <img
                            src={imagenes[jugadaJugador]}
                            alt={jugadaJugador}
                            className="opcion-img animate-shake"
                        />

                    </div>
                    <div className="text-center">
                        <h4 className='description'>COMPUTADORA</h4>
                        <img
                            src={imagenes[jugadaComputadora]}
                            alt={jugadaComputadora}
                            className="opcion-img animate-fade"
                        />

                    </div>
                </div>
            )}

            {(jugadaJugador || jugadaComputadora) && (
                <div className="mt-4 d-flex flex-column align-items-center gap-3">
                    <button className="btn btn-play" onClick={reiniciarRonda}>VOLVER A JUGAR</button>
                    <button className="btn btn-play" onClick={reiniciarJuego}>SALIR</button>
                </div>
            )}
        </div>
    );
};

export default PPTGame;