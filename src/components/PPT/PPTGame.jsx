import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { opciones, getComputerChoice, getWinner } from './utils';

// Imágenes de cada jugada
import piedraImg from '/public/PPT/piedra.png';
import papelImg from '/public/PPT/papel.png';
import tijeraImg from '/public/PPT/tijera.png';
import './PPT.css';

// Objeto para mapear las imágenes con sus respectivas elecciones
const imagenes = {
    piedra: piedraImg,
    papel: papelImg,
    tijera: tijeraImg,
};

const PPTGame = ({ setMostrarFooter }) => {
    // Estados para puntajes
    const [puntosJugador, setPuntosJugador] = useState(0);
    const [puntosComputadora, setPuntosComputadora] = useState(0);

    // Estados para elecciones
    const [jugadaJugador, setJugadaJugador] = useState(null);
    const [jugadaComputadora, setJugadaComputadora] = useState(null);

    // Estado para controlar visibilidad de botones y puntajes
    const [jugando, setJugando] = useState(false);

    // Mostrar el footer solo si no se está jugando
    useEffect(() => {
        if (!jugando) {
            setMostrarFooter(true);
        }
    }, [jugando, setMostrarFooter]);

    // Función que se llama cuando el usuario elige una opción
    const manejarEleccion = (opcion) => {
        const eleccionComputadora = getComputerChoice();

        setJugadaJugador(opcion);
        setJugadaComputadora(eleccionComputadora);

        const resultado = getWinner(opcion, eleccionComputadora);

        // Actualiza los puntajes
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
        }, 400);
    };

    // Función para reiniciar solo la ronda actual
    const reiniciarRonda = () => {
        setJugadaJugador(null);
        setJugadaComputadora(null);
    };

    // Función para reiniciar todo el juego
    const reiniciarJuego = () => {
        setPuntosJugador(0);
        setPuntosComputadora(0);
        setJugadaJugador(null);
        setJugadaComputadora(null);
        setJugando(false);
        setMostrarFooter(true); // Volver a mostrar el footer cuando se sale del juego
    };

    // Mostrar puntos solo si el jugador está jugando o ya jugó
    const mostrarPuntajes = jugando;

    // MENÚ INICIAL: mostrar solo el menú si todavía no se inició el juego
    if (!jugando) {
        return (
            <div className="ppt-container1 text-center">
                <h1 className="first-title">PIEDRA | PAPEL | TIJERA</h1>
                <p className="description">¡PRESIONA EL BOTÓN PARA JUGAR!</p>

                <div className="btn-iniciales d-flex justify-content-center align-items-center gap-3">
                    <button
                        className="btn btn-play"
                        onClick={() => {
                            setJugando(true);
                            setMostrarFooter(false); // Ocultar footer al iniciar el juego
                        }}
                    >
                        JUGAR
                    </button>
                    <Link to="/" className="btn btn-play">VOLVER</Link>
                </div>
            </div>
        );
    }

    // INTERFAZ PRINCIPAL DEL JUEGO
    return (
        <div className="ppt-container2 text-center">
            {/* Mostrar puntos mientras esté en juego o mostrando resultados */}
            {mostrarPuntajes && (
                <div className="points d-flex justify-content-center align-items-center gap-5">
                    <div className="user justify-content-center align-items-center">
                        <i className="bi bi-person"></i>
                        <p className="points-user">{puntosJugador}</p>
                    </div>
                    <div className="computer justify-content-center align-items-center">
                        <i className="bi bi-pc-display"></i>
                        <p className="points-computer">{puntosComputadora}</p>
                    </div>
                </div>
            )}

            <h1 className="first-title">PIEDRA | PAPEL | TIJERA</h1>

            {/* Instrucción para elegir */}
            {!jugadaJugador && (
                <p className="description-instructions">¡ELIGE ALGUNA OPCIÓN!</p>
            )}

            {/* Opciones para elegir si todavía no se jugó */}
            {!jugadaJugador && (
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

            {/* Resultado: muestra las jugadas del jugador y la computadora */}
            {jugadaJugador && jugadaComputadora && (
                <div className="results d-flex justify-content-center align-items-center">
                    <div className="text-center">
                        <h4 className='description-players'>JUGADOR</h4>
                        <img
                            src={imagenes[jugadaJugador]}
                            alt={jugadaJugador}
                            className="opcion-img animate-shake"
                        />
                    </div>
                    <div className="text-center">
                        <h4 className='description-players'>COMPUTADORA</h4>
                        <img
                            src={imagenes[jugadaComputadora]}
                            alt={jugadaComputadora}
                            className="opcion-img animate-fade"
                        />
                    </div>
                </div>
            )}

            {/* Botones de volver a jugar o salir */}
            {(jugadaJugador || jugadaComputadora) && (
                <div className="d-flex flex-column align-items-center gap-4">
                    <button className="btn btn-play" onClick={reiniciarRonda}>VOLVER A JUGAR</button>
                    <button className="btn btn-play" onClick={reiniciarJuego}>SALIR</button>
                </div>
            )}
        </div>
    );
};

export default PPTGame;
