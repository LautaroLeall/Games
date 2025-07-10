import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import * as bootstrap from 'bootstrap';

const Home = () => {
    useEffect(() => {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        const tooltips = Array.from(tooltipTriggerList).map(el => new bootstrap.Tooltip(el));

        // Limpieza al desmontar componente
        return () => {
            tooltips.forEach(tooltip => tooltip.dispose());
        };
    }, []);

    return (
        <div className="text-center">
            <div className="title-home mb-5 mt-5">
                <h1 className="fist-title">SELECCIONA UN JUEGO</h1>
            </div>
            <div className="btn-games d-flex justify-content-center align-items-center gap-5">
                <Link to="/piedra-papel-tijera"
                    className="btn btn-play"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    data-bs-custom-class="custom-tooltip"
                    data-bs-title="¡Juega a Piedra, Papel o Tijera!">
                    <img src="/ppt.png" className='img-games' alt="Juego Piedra Papel Tijera" />
                </Link>
                <Link to="/ta-te-ti"
                    className="btn btn-play"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    data-bs-custom-class="custom-tooltip"
                    data-bs-title="¡Juega a TA TE TI!">
                    <img src="/ta-te-ti.png" className='img-games' alt="Juego Ta Te Ti" />
                </Link>
            </div>
        </div>
    );
};

export default Home;
